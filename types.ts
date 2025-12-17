export enum FengShuiElement {
  WOOD = 'Wood',
  FIRE = 'Fire',
  EARTH = 'Earth',
  METAL = 'Metal',
  WATER = 'Water',
  UNKNOWN = 'Unknown'
}

export interface ItemAnalysis {
  name: string;
  element: FengShuiElement;
  energyScore: number; // 1-10
  description: string;
  placementAdvice: string;
}

export interface ShaQiIssue {
  title: string;
  type: 'Beam' | 'Corner' | 'Clutter' | 'Orientation' | 'Other';
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  remedy: string; // The "Hua Sha" technique
}

export interface SOPTask {
  time: string; // e.g., "Morning (Dragon Hour)"
  action: string;
  meaning: string;
  icon?: string;
}

export interface FengShuiReport {
  overallScore: number;
  overallVibe: string;
  orientationAnalysis: string;
  items: ItemAnalysis[];
  issues: ShaQiIssue[];
  dailySOP: SOPTask[];
}

export type Orientation = 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West' | 'Unknown';