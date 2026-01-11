'use client';

interface ZoomToolbarProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  isFullscreen: boolean;
  onFullscreenChange: (fullscreen: boolean) => void;
}

export default function ZoomToolbar({
  zoom,
  onZoomChange,
  isFullscreen,
  onFullscreenChange,
}: ZoomToolbarProps) {
  const handleZoomIn = () => {
    onZoomChange(Math.min(zoom + 25, 500));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoom - 25, 25));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      onFullscreenChange(true);
    } else {
      document.exitFullscreen();
      onFullscreenChange(false);
    }
  };

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={handleZoomOut}
        className="flex h-8 w-8 items-center justify-center rounded text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        title="Zoom Out"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="min-w-[3rem] text-center text-sm font-medium text-gray-700 dark:text-gray-300">
        {zoom}%
      </span>
      <button
        onClick={handleZoomIn}
        className="flex h-8 w-8 items-center justify-center rounded text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        title="Zoom In"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-700" />
      <button
        onClick={handleFullscreen}
        className="flex h-8 w-8 items-center justify-center rounded text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        title="Fullscreen"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isFullscreen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          )}
        </svg>
      </button>
    </div>
  );
}

