'use client';

import { BackgroundType } from '@/types';

interface BackgroundSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  backgroundType: BackgroundType;
  onBackgroundTypeChange: (type: BackgroundType) => void;
  backgroundConfig: any;
  onBackgroundConfigChange: (config: any) => void;
}

export default function BackgroundSection({
  isExpanded,
  onToggle,
  backgroundType,
  onBackgroundTypeChange,
  backgroundConfig,
  onBackgroundConfigChange,
}: BackgroundSectionProps) {
  const presetColors = [
    '#ffffff', '#000000', '#f3f4f6', '#1f2937',
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'
  ];

  const presetGradients = [
    { name: 'Purple', colors: ['#667eea', '#764ba2'] },
    { name: 'Blue', colors: ['#2193b0', '#6dd5ed'] },
    { name: 'Pink', colors: ['#ee0979', '#ff6a00'] },
    { name: 'Green', colors: ['#11998e', '#38ef7d'] },
  ];

  const cosmicGradients = [
    { name: 'Nebula', colors: ['#0f0c29', '#302b63', '#24243e'] },
    { name: 'Space', colors: ['#000000', '#1a1a2e', '#16213e'] },
    { name: 'Galaxy', colors: ['#1e3c72', '#2a5298', '#7e8ba3'] },
  ];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">Background</h3>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4 dark:border-gray-800">
          {/* Background Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['solid', 'gradient', 'cosmic', 'desktop', 'custom'] as BackgroundType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onBackgroundTypeChange(type)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    backgroundType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Solid Background */}
          {backgroundType === 'solid' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onBackgroundConfigChange({ ...backgroundConfig, solid: { color } })}
                    className="h-10 w-full rounded border-2 border-gray-300 transition-transform hover:scale-110 dark:border-gray-700"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={backgroundConfig.solid.color}
                onChange={(e) =>
                  onBackgroundConfigChange({ ...backgroundConfig, solid: { color: e.target.value } })
                }
                className="h-10 w-full rounded border border-gray-300 dark:border-gray-700"
              />
              <input
                type="text"
                value={backgroundConfig.solid.color}
                onChange={(e) =>
                  onBackgroundConfigChange({ ...backgroundConfig, solid: { color: e.target.value } })
                }
                placeholder="#ffffff"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          )}

          {/* Gradient Background */}
          {backgroundType === 'gradient' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preset Gradients</label>
              <div className="grid grid-cols-2 gap-2">
                {presetGradients.map((grad, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      onBackgroundConfigChange({
                        ...backgroundConfig,
                        gradient: { ...backgroundConfig.gradient, colors: grad.colors },
                      })
                    }
                    className="h-12 w-full rounded border border-gray-300 transition-transform hover:scale-105 dark:border-gray-700"
                    style={{
                      background: `linear-gradient(135deg, ${grad.colors.join(', ')})`,
                    }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color 1</label>
                <input
                  type="color"
                  value={backgroundConfig.gradient.colors[0]}
                  onChange={(e) =>
                    onBackgroundConfigChange({
                      ...backgroundConfig,
                      gradient: {
                        ...backgroundConfig.gradient,
                        colors: [e.target.value, backgroundConfig.gradient.colors[1]],
                      },
                    })
                  }
                  className="h-10 w-full rounded border border-gray-300 dark:border-gray-700"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color 2</label>
                <input
                  type="color"
                  value={backgroundConfig.gradient.colors[1]}
                  onChange={(e) =>
                    onBackgroundConfigChange({
                      ...backgroundConfig,
                      gradient: {
                        ...backgroundConfig.gradient,
                        colors: [backgroundConfig.gradient.colors[0], e.target.value],
                      },
                    })
                  }
                  className="h-10 w-full rounded border border-gray-300 dark:border-gray-700"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Angle</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={backgroundConfig.gradient.angle}
                  onChange={(e) =>
                    onBackgroundConfigChange({
                      ...backgroundConfig,
                      gradient: { ...backgroundConfig.gradient, angle: parseInt(e.target.value) },
                    })
                  }
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{backgroundConfig.gradient.angle}°</div>
              </div>
            </div>
          )}

          {/* Cosmic Background */}
          {backgroundType === 'cosmic' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preset Cosmic</label>
              <div className="grid grid-cols-1 gap-2">
                {cosmicGradients.map((grad, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      onBackgroundConfigChange({
                        ...backgroundConfig,
                        cosmic: { ...backgroundConfig.cosmic, colors: grad.colors },
                      })
                    }
                    className="h-12 w-full rounded border border-gray-300 transition-transform hover:scale-105 dark:border-gray-700"
                    style={{
                      background: `linear-gradient(135deg, ${grad.colors.join(', ')})`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Desktop Background */}
          {backgroundType === 'desktop' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop Type</label>
              <select
                value={backgroundConfig.desktop.type}
                onChange={(e) =>
                  onBackgroundConfigChange({
                    ...backgroundConfig,
                    desktop: { ...backgroundConfig.desktop, type: e.target.value },
                  })
                }
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="macos">macOS</option>
                <option value="windows">Windows</option>
                <option value="linux">Linux</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={backgroundConfig.desktop.blur}
                  onChange={(e) =>
                    onBackgroundConfigChange({
                      ...backgroundConfig,
                      desktop: { ...backgroundConfig.desktop, blur: e.target.checked },
                    })
                  }
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Blur Effect</span>
              </label>
            </div>
          )}

          {/* Custom Background */}
          {backgroundType === 'custom' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <input
                type="color"
                value={backgroundConfig.custom.color}
                onChange={(e) =>
                  onBackgroundConfigChange({
                    ...backgroundConfig,
                    custom: { ...backgroundConfig.custom, color: e.target.value },
                  })
                }
                className="h-10 w-full rounded border border-gray-300 dark:border-gray-700"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                value={backgroundConfig.custom.opacity}
                onChange={(e) =>
                  onBackgroundConfigChange({
                    ...backgroundConfig,
                    custom: { ...backgroundConfig.custom, opacity: parseInt(e.target.value) },
                  })
                }
                className="w-full"
              />
              <div className="text-xs text-gray-500">{backgroundConfig.custom.opacity}%</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

