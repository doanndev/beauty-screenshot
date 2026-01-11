'use client';

import { FrameState } from '@/types';

interface FrameSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  frame: FrameState;
  onFrameChange: (frame: FrameState) => void;
}

export default function FrameSection({
  isExpanded,
  onToggle,
  frame,
  onFrameChange,
}: FrameSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">Frame</h3>
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
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={frame.enabled}
              onChange={(e) =>
                onFrameChange({ ...frame, enabled: e.target.checked })
              }
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable macOS Frame</span>
          </label>

          {frame.enabled && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => onFrameChange({ ...frame, theme: 'dark' })}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm transition-colors ${
                      frame.theme === 'dark'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => onFrameChange({ ...frame, theme: 'light' })}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm transition-colors ${
                      frame.theme === 'light'
                        ? 'bg-white text-gray-900 border-2 border-gray-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    Light
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title (Optional)</label>
                <input
                  type="text"
                  value={frame.title}
                  onChange={(e) => onFrameChange({ ...frame, title: e.target.value })}
                  placeholder="Window title"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

