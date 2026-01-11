'use client';

import { ImageManipulationState } from '@/types';

interface ImageToolsSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  imageManipulation: ImageManipulationState;
  onImageManipulationChange: (manipulation: ImageManipulationState) => void;
}

export default function ImageToolsSection({
  isExpanded,
  onToggle,
  imageManipulation,
  onImageManipulationChange,
}: ImageToolsSectionProps) {
  const positions = [
    { label: 'TL', value: 'top-left', x: -1, y: -1 },
    { label: 'TC', value: 'top-center', x: 0, y: -1 },
    { label: 'TR', value: 'top-right', x: 1, y: -1 },
    { label: 'ML', value: 'middle-left', x: -1, y: 0 },
    { label: 'C', value: 'center', x: 0, y: 0 },
    { label: 'MR', value: 'middle-right', x: 1, y: 0 },
    { label: 'BL', value: 'bottom-left', x: -1, y: 1 },
    { label: 'BC', value: 'bottom-center', x: 0, y: 1 },
    { label: 'BR', value: 'bottom-right', x: 1, y: 1 },
  ];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">Image Tools</h3>
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
          {/* Flip */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Flip</label>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  onImageManipulationChange({
                    ...imageManipulation,
                    flipH: !imageManipulation.flipH,
                  })
                }
                className={`flex-1 rounded-lg px-3 py-2 text-sm transition-colors ${
                  imageManipulation.flipH
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Flip H
              </button>
              <button
                onClick={() =>
                  onImageManipulationChange({
                    ...imageManipulation,
                    flipV: !imageManipulation.flipV,
                  })
                }
                className={`flex-1 rounded-lg px-3 py-2 text-sm transition-colors ${
                  imageManipulation.flipV
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Flip V
              </button>
            </div>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
            <div className="grid grid-cols-3 gap-2">
              {positions.map((pos) => (
                <button
                  key={pos.value}
                  onClick={() =>
                    onImageManipulationChange({
                      ...imageManipulation,
                      position: { x: pos.x * 50, y: pos.y * 50 },
                    })
                  }
                  className={`h-10 rounded border text-xs transition-colors ${
                    imageManipulation.position.x === pos.x * 50 &&
                    imageManipulation.position.y === pos.y * 50
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500">X Offset</label>
                <input
                  type="number"
                  value={imageManipulation.position.x}
                  onChange={(e) =>
                    onImageManipulationChange({
                      ...imageManipulation,
                      position: { ...imageManipulation.position, x: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Y Offset</label>
                <input
                  type="number"
                  value={imageManipulation.position.y}
                  onChange={(e) =>
                    onImageManipulationChange({
                      ...imageManipulation,
                      position: { ...imageManipulation.position, y: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Crop - Placeholder */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Crop</label>
            <button
              className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => alert('Crop tool coming soon')}
            >
              Open Crop Tool
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

