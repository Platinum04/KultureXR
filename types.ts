export enum Language {
  English = 'English',
  Yoruba = 'Yoruba',
  Nupe = 'Nupe',
  Fulani = 'Fulani',
  Hausa = 'Hausa'
}

export interface Artifact {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string; // Preview image
  modelUrl: string; // GLB file URL
  baseStoryPrompt: string; // Context for AI generation
  arPlacement?: 'floor' | 'wall'; // Placement hint for AR
  iframeUrl?: string; // Optional URL for 3rd party AR viewers (e.g. SwiftXR, 8thWall)
}

export interface StoryData {
  text: string;
  language: Language;
  isLoading: boolean;
  error: string | null;
}
