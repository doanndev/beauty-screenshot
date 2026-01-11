'use client';

import { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { ImageState, BackgroundType, DrawingTool, DrawingConfig, Drawing, Mark } from '@/types';
import ZoomToolbar from './CanvasPreview/ZoomToolbar';
import MacOSFrame from './CanvasPreview/MacOSFrame';

interface CanvasPreviewProps {
  imageState: ImageState | null;
  onImageUpload: (file: File) => void;
  backgroundType: BackgroundType;
  backgroundConfig: any;
  layout: any;
  frame: any;
  imageManipulation: any;
  activeTool: DrawingTool;
  drawingConfig: DrawingConfig;
  drawings: Drawing[];
  onDrawingsChange: (drawings: Drawing[]) => void;
  marks: Mark[];
  onMarksChange: (marks: Mark[]) => void;
  markCounter: number;
  onMarkCounterChange: (counter: number) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  isFullscreen: boolean;
  onFullscreenChange: (fullscreen: boolean) => void;
}

const CanvasPreview = forwardRef<HTMLCanvasElement, CanvasPreviewProps>(
  (
    {
      imageState,
      onImageUpload,
      backgroundType,
      backgroundConfig,
      layout,
      frame,
      imageManipulation,
      activeTool,
      drawingConfig,
      drawings,
      onDrawingsChange,
      marks,
      onMarksChange,
      markCounter,
      onMarkCounterChange,
      zoom,
      onZoomChange,
      isFullscreen,
      onFullscreenChange,
    },
    canvasRef
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<Array<{ x: number; y: number }>>([]);
    const [currentShape, setCurrentShape] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [shapeStart, setShapeStart] = useState<{ x: number; y: number } | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

    // Get background style
    const getBackgroundStyle = useCallback(() => {
      switch (backgroundType) {
        case 'solid':
          return backgroundConfig.solid.color;
        case 'gradient':
          const grad = backgroundConfig.gradient;
          return `linear-gradient(${grad.angle}deg, ${grad.colors.join(', ')})`;
        case 'cosmic':
          const cosmic = backgroundConfig.cosmic;
          return `linear-gradient(${cosmic.angle}deg, ${cosmic.colors.join(', ')})`;
        case 'desktop':
          return '#1e1e1e';
        case 'custom':
          const custom = backgroundConfig.custom;
          const rgb = hexToRgb(custom.color);
          return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${custom.opacity / 100})`;
        default:
          return '#ffffff';
      }
    }, [backgroundType, backgroundConfig]);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 255, b: 255 };
    };

    // Render canvas
    useEffect(() => {
      const canvas = (canvasRef as any).current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      const drawBackground = () => {
        switch (backgroundType) {
          case 'solid':
            ctx.fillStyle = backgroundConfig.solid.color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
          case 'gradient':
            const grad = backgroundConfig.gradient;
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const angle = (grad.angle * Math.PI) / 180;
            const x1 = canvas.width / 2 - (canvas.width / 2) * Math.cos(angle);
            const y1 = canvas.height / 2 - (canvas.height / 2) * Math.sin(angle);
            const x2 = canvas.width / 2 + (canvas.width / 2) * Math.cos(angle);
            const y2 = canvas.height / 2 + (canvas.height / 2) * Math.sin(angle);
            const linearGrad = ctx.createLinearGradient(x1, y1, x2, y2);
            linearGrad.addColorStop(0, grad.colors[0]);
            linearGrad.addColorStop(1, grad.colors[1]);
            ctx.fillStyle = linearGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
          case 'cosmic':
            const cosmic = backgroundConfig.cosmic;
            const cosmicGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            cosmicGrad.addColorStop(0, cosmic.colors[0]);
            cosmicGrad.addColorStop(0.5, cosmic.colors[1]);
            cosmicGrad.addColorStop(1, cosmic.colors[2]);
            ctx.fillStyle = cosmicGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
          case 'desktop':
            ctx.fillStyle = '#1e1e1e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
          case 'custom':
            const custom = backgroundConfig.custom;
            const rgb = hexToRgb(custom.color);
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${custom.opacity / 100})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
          default:
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      };
      drawBackground();

      if (!imageState) {
        // Draw upload prompt
        ctx.fillStyle = '#9ca3af';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Drop image here or click to upload', canvas.width / 2, canvas.height / 2);
        return;
      }

      // Draw image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageState.src;
      
      if (img.complete) {
        drawImageOnCanvas();
      } else {
        img.onload = drawImageOnCanvas;
      }

      function drawImageOnCanvas() {
        const scale = layout.scale;
        const padding = layout.padding;
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;

        ctx.save();

        // Apply transformations
        const centerX = padding.left + imgWidth / 2 + imageManipulation.position.x;
        const centerY = padding.top + imgHeight / 2 + imageManipulation.position.y;

        ctx.translate(centerX, centerY);
        if (imageManipulation.flipH) ctx.scale(-1, 1);
        if (imageManipulation.flipV) ctx.scale(1, -1);

        // Draw shadow (using a separate path for shadow)
        if (layout.shadow.enabled) {
          ctx.save();
          ctx.shadowColor = layout.shadow.color + Math.floor(layout.shadow.opacity * 2.55).toString(16).padStart(2, '0');
          ctx.shadowBlur = layout.shadow.blur;
          ctx.shadowOffsetX = layout.shadow.x;
          ctx.shadowOffsetY = layout.shadow.y;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight, layout.rounded);
          } else {
            // Fallback for browsers without roundRect
            const r = layout.rounded;
            ctx.moveTo(-imgWidth / 2 + r, -imgHeight / 2);
            ctx.lineTo(imgWidth / 2 - r, -imgHeight / 2);
            ctx.quadraticCurveTo(imgWidth / 2, -imgHeight / 2, imgWidth / 2, -imgHeight / 2 + r);
            ctx.lineTo(imgWidth / 2, imgHeight / 2 - r);
            ctx.quadraticCurveTo(imgWidth / 2, imgHeight / 2, imgWidth / 2 - r, imgHeight / 2);
            ctx.lineTo(-imgWidth / 2 + r, imgHeight / 2);
            ctx.quadraticCurveTo(-imgWidth / 2, imgHeight / 2, -imgWidth / 2, imgHeight / 2 - r);
            ctx.lineTo(-imgWidth / 2, -imgHeight / 2 + r);
            ctx.quadraticCurveTo(-imgWidth / 2, -imgHeight / 2, -imgWidth / 2 + r, -imgHeight / 2);
            ctx.closePath();
          }
          ctx.fill();
          ctx.restore();
        }

        // Clip to rounded rectangle
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight, layout.rounded);
        } else {
          // Fallback for browsers without roundRect
          const r = layout.rounded;
          ctx.moveTo(-imgWidth / 2 + r, -imgHeight / 2);
          ctx.lineTo(imgWidth / 2 - r, -imgHeight / 2);
          ctx.quadraticCurveTo(imgWidth / 2, -imgHeight / 2, imgWidth / 2, -imgHeight / 2 + r);
          ctx.lineTo(imgWidth / 2, imgHeight / 2 - r);
          ctx.quadraticCurveTo(imgWidth / 2, imgHeight / 2, imgWidth / 2 - r, imgHeight / 2);
          ctx.lineTo(-imgWidth / 2 + r, imgHeight / 2);
          ctx.quadraticCurveTo(-imgWidth / 2, imgHeight / 2, -imgWidth / 2, imgHeight / 2 - r);
          ctx.lineTo(-imgWidth / 2, -imgHeight / 2 + r);
          ctx.quadraticCurveTo(-imgWidth / 2, -imgHeight / 2, -imgWidth / 2 + r, -imgHeight / 2);
          ctx.closePath();
        }
        ctx.clip();

        // Draw image
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);

        ctx.restore();

        // Draw drawings
        drawings.forEach((drawing) => {
          if (drawing.type === 'pen' && drawing.path) {
            ctx.strokeStyle = drawing.config.color;
            ctx.lineWidth = drawing.config.strokeWidth;
            ctx.globalAlpha = drawing.config.opacity / 100;
            ctx.beginPath();
            drawing.path.forEach((point, idx) => {
              if (idx === 0) {
                ctx.moveTo(point.x, point.y);
              } else {
                ctx.lineTo(point.x, point.y);
              }
            });
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });

        // Draw marks
        marks.forEach((mark) => {
          ctx.fillStyle = mark.color || '#ff0000';
          ctx.beginPath();
          ctx.arc(mark.x, mark.y, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(mark.number.toString(), mark.x, mark.y);
        });
      }
    }, [
      imageState,
      backgroundType,
      backgroundConfig,
      layout,
      imageManipulation,
      drawings,
      marks,
      getBackgroundStyle,
    ]);

    // Handle mouse events for drawing
    const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = (canvasRef as any).current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
      };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!imageState) {
        // Trigger file picker
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) onImageUpload(file);
        };
        input.click();
        return;
      }

      const coords = getCanvasCoordinates(e);

      if (activeTool === 'pen') {
        setIsDrawing(true);
        setCurrentPath([coords]);
      } else if (activeTool === 'shape') {
        setShapeStart(coords);
        setCurrentShape({ x: coords.x, y: coords.y, width: 0, height: 0 });
      } else if (activeTool === 'mark') {
        const newMark: Mark = {
          id: Date.now(),
          x: coords.x,
          y: coords.y,
          number: markCounter,
        };
        onMarksChange([...marks, newMark]);
        onMarkCounterChange(markCounter + 1);
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!imageState) return;

      const coords = getCanvasCoordinates(e);

      if (isDrawing && activeTool === 'pen') {
        setCurrentPath([...currentPath, coords]);
      } else if (shapeStart && activeTool === 'shape') {
        setCurrentShape({
          x: Math.min(shapeStart.x, coords.x),
          y: Math.min(shapeStart.y, coords.y),
          width: Math.abs(coords.x - shapeStart.x),
          height: Math.abs(coords.y - shapeStart.y),
        });
      }
    };

    const handleMouseUp = () => {
      if (isDrawing && activeTool === 'pen' && currentPath.length > 0) {
        const newDrawing: Drawing = {
          id: Date.now().toString(),
          type: 'pen',
          tool: 'pen',
          config: drawingConfig,
          path: currentPath,
        };
        onDrawingsChange([...drawings, newDrawing]);
        setCurrentPath([]);
        setIsDrawing(false);
      } else if (shapeStart && activeTool === 'shape' && currentShape) {
        const newDrawing: Drawing = {
          id: Date.now().toString(),
          type: 'shape',
          tool: 'shape',
          config: drawingConfig,
          shape: {
            type: 'rectangle',
            ...currentShape,
          },
        };
        onDrawingsChange([...drawings, newDrawing]);
        setCurrentShape(null);
        setShapeStart(null);
      }
    };

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    };

    return (
      <div
        ref={containerRef}
        className="relative flex flex-1 items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-950"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className="relative"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
          }}
        >
          {frame.enabled && imageState && (
            <MacOSFrame theme={frame.theme} title={frame.title} />
          )}
          <canvas
            ref={canvasRef}
            className="cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
            }}
          />
        </div>
        <ZoomToolbar
          zoom={zoom}
          onZoomChange={onZoomChange}
          isFullscreen={isFullscreen}
          onFullscreenChange={onFullscreenChange}
        />
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';

export default CanvasPreview;

