'use client';

import { LayoutState } from '@/types';

interface LayoutSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  layout: LayoutState;
  onLayoutChange: (layout: LayoutState) => void;
}

export default function LayoutSection({
  isExpanded,
  onToggle,
  layout,
  onLayoutChange,
}: LayoutSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">Layout</h3>
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
          {/* Scale */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Scale</label>
              <span className="text-sm text-gray-500">{layout.scale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={layout.scale}
              onChange={(e) =>
                onLayoutChange({ ...layout, scale: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Padding */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Padding</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500">Top</label>
                <input
                  type="number"
                  min="0"
                  value={layout.padding.top}
                  onChange={(e) =>
                    onLayoutChange({
                      ...layout,
                      padding: { ...layout.padding, top: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Right</label>
                <input
                  type="number"
                  min="0"
                  value={layout.padding.right}
                  onChange={(e) =>
                    onLayoutChange({
                      ...layout,
                      padding: { ...layout.padding, right: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Bottom</label>
                <input
                  type="number"
                  min="0"
                  value={layout.padding.bottom}
                  onChange={(e) =>
                    onLayoutChange({
                      ...layout,
                      padding: { ...layout.padding, bottom: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Left</label>
                <input
                  type="number"
                  min="0"
                  value={layout.padding.left}
                  onChange={(e) =>
                    onLayoutChange({
                      ...layout,
                      padding: { ...layout.padding, left: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Rounded */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rounded</label>
              <span className="text-sm text-gray-500">{layout.rounded}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={layout.rounded}
              onChange={(e) =>
                onLayoutChange({ ...layout, rounded: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Shadow */}
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={layout.shadow.enabled}
                onChange={(e) =>
                  onLayoutChange({
                    ...layout,
                    shadow: { ...layout.shadow, enabled: e.target.checked },
                  })
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Shadow</span>
            </label>
            {layout.shadow.enabled && (
              <div className="space-y-2 pl-6">
                <div>
                  <label className="text-xs text-gray-500">X Offset</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={layout.shadow.x}
                    onChange={(e) =>
                      onLayoutChange({
                        ...layout,
                        shadow: { ...layout.shadow, x: parseInt(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Y Offset</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={layout.shadow.y}
                    onChange={(e) =>
                      onLayoutChange({
                        ...layout,
                        shadow: { ...layout.shadow, y: parseInt(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Blur</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layout.shadow.blur}
                    onChange={(e) =>
                      onLayoutChange({
                        ...layout,
                        shadow: { ...layout.shadow, blur: parseInt(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Opacity</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layout.shadow.opacity}
                    onChange={(e) =>
                      onLayoutChange({
                        ...layout,
                        shadow: { ...layout.shadow, opacity: parseInt(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Color</label>
                  <input
                    type="color"
                    value={layout.shadow.color}
                    onChange={(e) =>
                      onLayoutChange({
                        ...layout,
                        shadow: { ...layout.shadow, color: e.target.value },
                      })
                    }
                    className="h-8 w-full rounded border border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

