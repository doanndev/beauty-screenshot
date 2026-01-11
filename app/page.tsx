'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import TopBar from '@/components/TopBar';
import LeftPanel from '@/components/LeftPanel';
import CanvasPreview from '@/components/CanvasPreview';
import { AppState, BackgroundType, DrawingTool, ImageState, Mark } from '@/types';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('solid');
  const [backgroundConfig, setBackgroundConfig] = useState({
    solid: { color: '#ffffff' },
    gradient: { colors: ['#667eea', '#764ba2'], direction: 'linear', angle: 0 },
    cosmic: { colors: ['#0f0c29', '#302b63', '#24243e'], direction: 'linear', angle: 0 },
    desktop: { type: 'macos', blur: false },
    custom: { color: '#ffffff', opacity: 100 },
  });
  const [layout, setLayout] = useState({
    scale: 1,
    padding: { top: 40, right: 40, bottom: 40, left: 40 },
    rounded: 12,
    shadow: {
      enabled: true,
      x: 0,
      y: 4,
      blur: 20,
      spread: 0,
      color: '#000000',
      opacity: 0.1,
    },
  });
  const [frame, setFrame] = useState({
    enabled: false,
    theme: 'dark' as 'dark' | 'light',
    title: '',
  });
  const [imageManipulation, setImageManipulation] = useState({
    flipH: false,
    flipV: false,
    position: { x: 0, y: 0 },
    crop: null as { x: number; y: number; width: number; height: number } | null,
  });
  const [activeTool, setActiveTool] = useState<DrawingTool | null>(null);
  const [drawingConfig, setDrawingConfig] = useState({
    strokeWidth: 3,
    color: '#ff0000',
    opacity: 100,
    fillColor: '',
  });
  const [drawings, setDrawings] = useState<any[]>([]);
  const [marks, setMarks] = useState<Array<{ id: number; x: number; y: number; number: number }>>([]);
  const [markCounter, setMarkCounter] = useState(1);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canvasZoom, setCanvasZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle image upload
  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageState({
          src: e.target?.result as string,
          width: img.width,
          height: img.height,
          originalWidth: img.width,
          originalHeight: img.height,
        });
        setDrawings([]);
        setMarks([]);
        setMarkCounter(1);
        setHistory([]);
        setHistoryIndex(-1);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              handleImageUpload(file);
              e.preventDefault();
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleImageUpload]);

  // Export image
  const handleExport = useCallback(async (format: 'png' | 'jpeg', scale: number) => {
    if (!canvasRef.current || !imageState) {
      alert('Please upload an image first');
      return;
    }

    const canvas = canvasRef.current;
    const exportCanvas = document.createElement('canvas');
    const exportCtx = exportCanvas.getContext('2d');
    if (!exportCtx) return;

    const finalWidth = canvas.width * scale;
    const finalHeight = canvas.height * scale;
    exportCanvas.width = finalWidth;
    exportCanvas.height = finalHeight;

    // Draw background
    const drawBackground = () => {
      switch (backgroundType) {
        case 'solid':
          exportCtx.fillStyle = backgroundConfig.solid.color;
          exportCtx.fillRect(0, 0, finalWidth, finalHeight);
          break;
        case 'gradient':
          const grad = backgroundConfig.gradient;
          const angle = (grad.angle * Math.PI) / 180;
          const x1 = finalWidth / 2 - (finalWidth / 2) * Math.cos(angle);
          const y1 = finalHeight / 2 - (finalHeight / 2) * Math.sin(angle);
          const x2 = finalWidth / 2 + (finalWidth / 2) * Math.cos(angle);
          const y2 = finalHeight / 2 + (finalHeight / 2) * Math.sin(angle);
          const linearGrad = exportCtx.createLinearGradient(x1, y1, x2, y2);
          linearGrad.addColorStop(0, grad.colors[0]);
          linearGrad.addColorStop(1, grad.colors[1]);
          exportCtx.fillStyle = linearGrad;
          exportCtx.fillRect(0, 0, finalWidth, finalHeight);
          break;
        case 'cosmic':
          const cosmic = backgroundConfig.cosmic;
          const cosmicGrad = exportCtx.createLinearGradient(0, 0, finalWidth, finalHeight);
          cosmicGrad.addColorStop(0, cosmic.colors[0]);
          cosmicGrad.addColorStop(0.5, cosmic.colors[1]);
          cosmicGrad.addColorStop(1, cosmic.colors[2]);
          exportCtx.fillStyle = cosmicGrad;
          exportCtx.fillRect(0, 0, finalWidth, finalHeight);
          break;
        default:
          exportCtx.fillStyle = '#ffffff';
          exportCtx.fillRect(0, 0, finalWidth, finalHeight);
      }
    };
    drawBackground();

    // Draw image with transformations
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageState.src;
    await new Promise((resolve) => {
      if (img.complete) {
        resolve(null);
      } else {
        img.onload = resolve;
      }
    });

    const scaledWidth = img.width * layout.scale * scale;
    const scaledHeight = img.height * layout.scale * scale;
    const paddingX = layout.padding.left * scale;
    const paddingY = layout.padding.top * scale;

    // Draw shadow
    if (layout.shadow.enabled) {
      exportCtx.save();
      const shadowColor = layout.shadow.color;
      const shadowOpacity = Math.floor(layout.shadow.opacity * 2.55).toString(16).padStart(2, '0');
      exportCtx.shadowColor = shadowColor + shadowOpacity;
      exportCtx.shadowBlur = layout.shadow.blur * scale;
      exportCtx.shadowOffsetX = layout.shadow.x * scale;
      exportCtx.shadowOffsetY = layout.shadow.y * scale;
      exportCtx.beginPath();
      const r = layout.rounded * scale;
      const centerX = paddingX + scaledWidth / 2 + imageManipulation.position.x * scale;
      const centerY = paddingY + scaledHeight / 2 + imageManipulation.position.y * scale;
      exportCtx.moveTo(centerX - scaledWidth / 2 + r, centerY - scaledHeight / 2);
      exportCtx.lineTo(centerX + scaledWidth / 2 - r, centerY - scaledHeight / 2);
      exportCtx.quadraticCurveTo(centerX + scaledWidth / 2, centerY - scaledHeight / 2, centerX + scaledWidth / 2, centerY - scaledHeight / 2 + r);
      exportCtx.lineTo(centerX + scaledWidth / 2, centerY + scaledHeight / 2 - r);
      exportCtx.quadraticCurveTo(centerX + scaledWidth / 2, centerY + scaledHeight / 2, centerX + scaledWidth / 2 - r, centerY + scaledHeight / 2);
      exportCtx.lineTo(centerX - scaledWidth / 2 + r, centerY + scaledHeight / 2);
      exportCtx.quadraticCurveTo(centerX - scaledWidth / 2, centerY + scaledHeight / 2, centerX - scaledWidth / 2, centerY + scaledHeight / 2 - r);
      exportCtx.lineTo(centerX - scaledWidth / 2, centerY - scaledHeight / 2 + r);
      exportCtx.quadraticCurveTo(centerX - scaledWidth / 2, centerY - scaledHeight / 2, centerX - scaledWidth / 2 + r, centerY - scaledHeight / 2);
      exportCtx.closePath();
      exportCtx.fill();
      exportCtx.restore();
    }

    exportCtx.save();
    const centerX = paddingX + scaledWidth / 2 + imageManipulation.position.x * scale;
    const centerY = paddingY + scaledHeight / 2 + imageManipulation.position.y * scale;
    exportCtx.translate(centerX, centerY);
    if (imageManipulation.flipH) exportCtx.scale(-1, 1);
    if (imageManipulation.flipV) exportCtx.scale(1, -1);
    exportCtx.beginPath();
    const r = layout.rounded * scale;
    exportCtx.moveTo(-scaledWidth / 2 + r, -scaledHeight / 2);
    exportCtx.lineTo(scaledWidth / 2 - r, -scaledHeight / 2);
    exportCtx.quadraticCurveTo(scaledWidth / 2, -scaledHeight / 2, scaledWidth / 2, -scaledHeight / 2 + r);
    exportCtx.lineTo(scaledWidth / 2, scaledHeight / 2 - r);
    exportCtx.quadraticCurveTo(scaledWidth / 2, scaledHeight / 2, scaledWidth / 2 - r, scaledHeight / 2);
    exportCtx.lineTo(-scaledWidth / 2 + r, scaledHeight / 2);
    exportCtx.quadraticCurveTo(-scaledWidth / 2, scaledHeight / 2, -scaledWidth / 2, scaledHeight / 2 - r);
    exportCtx.lineTo(-scaledWidth / 2, -scaledHeight / 2 + r);
    exportCtx.quadraticCurveTo(-scaledWidth / 2, -scaledHeight / 2, -scaledWidth / 2 + r, -scaledHeight / 2);
    exportCtx.closePath();
    exportCtx.clip();

    exportCtx.drawImage(img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
    exportCtx.restore();

    // Draw drawings
    drawings.forEach((drawing) => {
      if (drawing.type === 'pen' && drawing.path) {
        exportCtx.strokeStyle = drawing.config.color;
        exportCtx.lineWidth = drawing.config.strokeWidth * scale;
        exportCtx.globalAlpha = drawing.config.opacity / 100;
        exportCtx.beginPath();
        drawing.path.forEach((point: { x: number; y: number }, idx: number) => {
          if (idx === 0) {
            exportCtx.moveTo(point.x * scale, point.y * scale);
          } else {
            exportCtx.lineTo(point.x * scale, point.y * scale);
          }
        });
        exportCtx.stroke();
        exportCtx.globalAlpha = 1;
      }
    });

    // Draw marks
    marks.forEach((mark: Mark) => {
      exportCtx.fillStyle = mark.color || '#ff0000';
      exportCtx.beginPath();
      exportCtx.arc(mark.x * scale, mark.y * scale, 12 * scale, 0, Math.PI * 2);
      exportCtx.fill();
      exportCtx.fillStyle = '#ffffff';
      exportCtx.font = `${12 * scale}px sans-serif`;
      exportCtx.textAlign = 'center';
      exportCtx.textBaseline = 'middle';
      exportCtx.fillText(mark.number.toString(), mark.x * scale, mark.y * scale);
    });

    // Download
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const quality = format === 'jpeg' ? 0.92 : undefined;
    exportCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `beauty-screenshot.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, mimeType, quality);
  }, [imageState, layout, imageManipulation, frame, drawings, marks, backgroundType, backgroundConfig]);

  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'solid':
        return backgroundConfig.solid.color;
      case 'gradient':
        const grad = backgroundConfig.gradient;
        if (grad.direction === 'linear') {
          return `linear-gradient(${grad.angle}deg, ${grad.colors.join(', ')})`;
        }
        return `radial-gradient(${grad.colors.join(', ')})`;
      case 'cosmic':
        const cosmic = backgroundConfig.cosmic;
        return `linear-gradient(${cosmic.angle}deg, ${cosmic.colors.join(', ')})`;
      default:
        return '#ffffff';
    }
  };

  return (
    <div className={`flex h-screen flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <TopBar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        drawingConfig={drawingConfig}
        onDrawingConfigChange={setDrawingConfig}
        onUndo={() => {
          if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            // Restore state from history
          }
        }}
        onRedo={() => {
          if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            // Restore state from history
          }
        }}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        theme={theme}
        onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        onExport={handleExport}
        onDelete={() => {
          if (confirm('Are you sure you want to delete the current image?')) {
            setImageState(null);
            setDrawings([]);
            setMarks([]);
            setMarkCounter(1);
          }
        }}
      />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          backgroundType={backgroundType}
          onBackgroundTypeChange={setBackgroundType}
          backgroundConfig={backgroundConfig}
          onBackgroundConfigChange={setBackgroundConfig}
          layout={layout}
          onLayoutChange={setLayout}
          frame={frame}
          onFrameChange={setFrame}
          imageManipulation={imageManipulation}
          onImageManipulationChange={setImageManipulation}
          onExport={handleExport}
          onDelete={() => {
            if (confirm('Are you sure you want to delete the current image?')) {
              setImageState(null);
              setDrawings([]);
              setMarks([]);
              setMarkCounter(1);
            }
          }}
        />
        <CanvasPreview
          ref={canvasRef}
          imageState={imageState}
          onImageUpload={handleImageUpload}
          backgroundType={backgroundType}
          backgroundConfig={backgroundConfig}
          layout={layout}
          frame={frame}
          imageManipulation={imageManipulation}
          activeTool={activeTool}
          drawingConfig={drawingConfig}
          drawings={drawings}
          onDrawingsChange={setDrawings}
          marks={marks}
          onMarksChange={setMarks}
          markCounter={markCounter}
          onMarkCounterChange={setMarkCounter}
          zoom={canvasZoom}
          onZoomChange={setCanvasZoom}
          isFullscreen={isFullscreen}
          onFullscreenChange={setIsFullscreen}
        />
      </div>
    </div>
  );
}
