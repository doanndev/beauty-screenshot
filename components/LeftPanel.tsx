'use client';

import { useState } from 'react';
import { BackgroundType, LayoutState, FrameState, ImageManipulationState } from '@/types';
import BackgroundSection from './LeftPanel/BackgroundSection';
import LayoutSection from './LeftPanel/LayoutSection';
import FrameSection from './LeftPanel/FrameSection';
import ImageToolsSection from './LeftPanel/ImageToolsSection';
import ExportDropdown from './ExportDropdown';

interface LeftPanelProps {
  backgroundType: BackgroundType;
  onBackgroundTypeChange: (type: BackgroundType) => void;
  backgroundConfig: any;
  onBackgroundConfigChange: (config: any) => void;
  layout: LayoutState;
  onLayoutChange: (layout: LayoutState) => void;
  frame: FrameState;
  onFrameChange: (frame: FrameState) => void;
  imageManipulation: ImageManipulationState;
  onImageManipulationChange: (manipulation: ImageManipulationState) => void;
  onExport: (format: 'png' | 'jpeg', scale: number) => void;
  onDelete: () => void;
}

export default function LeftPanel({
  backgroundType,
  onBackgroundTypeChange,
  backgroundConfig,
  onBackgroundConfigChange,
  layout,
  onLayoutChange,
  frame,
  onFrameChange,
  imageManipulation,
  onImageManipulationChange,
  onExport,
  onDelete,
}: LeftPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['background', 'layout'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="w-80 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="p-4 space-y-4">
        {/* Background Section */}
        <BackgroundSection
          isExpanded={expandedSections.has('background')}
          onToggle={() => toggleSection('background')}
          backgroundType={backgroundType}
          onBackgroundTypeChange={onBackgroundTypeChange}
          backgroundConfig={backgroundConfig}
          onBackgroundConfigChange={onBackgroundConfigChange}
        />

        {/* Layout Section */}
        <LayoutSection
          isExpanded={expandedSections.has('layout')}
          onToggle={() => toggleSection('layout')}
          layout={layout}
          onLayoutChange={onLayoutChange}
        />

        {/* Frame Section */}
        <FrameSection
          isExpanded={expandedSections.has('frame')}
          onToggle={() => toggleSection('frame')}
          frame={frame}
          onFrameChange={onFrameChange}
        />

        {/* Image Tools Section */}
        <ImageToolsSection
          isExpanded={expandedSections.has('imageTools')}
          onToggle={() => toggleSection('imageTools')}
          imageManipulation={imageManipulation}
          onImageManipulationChange={onImageManipulationChange}
        />
      </div>

      {/* Export and Delete buttons at bottom */}
      <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-2">
          <div className="w-full">
            <ExportDropdown onExport={onExport} />
          </div>
          <button
            onClick={onDelete}
            className="w-full rounded-lg bg-red-100 px-4 py-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

