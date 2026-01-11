export type BackgroundType = 'solid' | 'gradient' | 'cosmic' | 'desktop' | 'custom';

export type DrawingTool = 'pen' | 'shape' | 'zoom' | 'mark' | null;

export type ShapeType = 'rectangle' | 'circle' | 'line' | 'arrow';

export interface ImageState {
  src: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

export interface AppState {
  imageState: ImageState | null;
  backgroundType: BackgroundType;
  backgroundConfig: any;
  layout: LayoutState;
  frame: FrameState;
  imageManipulation: ImageManipulationState;
  activeTool: DrawingTool;
  drawingConfig: DrawingConfig;
  drawings: Drawing[];
  marks: Mark[];
}

export interface LayoutState {
  scale: number;
  padding: { top: number; right: number; bottom: number; left: number };
  rounded: number;
  shadow: ShadowConfig;
}

export interface ShadowConfig {
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
}

export interface FrameState {
  enabled: boolean;
  theme: 'dark' | 'light';
  title: string;
}

export interface ImageManipulationState {
  flipH: boolean;
  flipV: boolean;
  position: { x: number; y: number };
  crop: { x: number; y: number; width: number; height: number } | null;
}

export interface DrawingConfig {
  strokeWidth: number;
  color: string;
  opacity: number;
  fillColor: string;
  shapeType?: ShapeType;
}

export interface Drawing {
  id: string;
  type: 'pen' | 'shape';
  tool: DrawingTool;
  config: DrawingConfig;
  path?: Array<{ x: number; y: number }>;
  shape?: {
    type: ShapeType;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Mark {
  id: number;
  x: number;
  y: number;
  number: number;
  color?: string;
  size?: number;
}

