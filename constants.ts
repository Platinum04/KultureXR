
import { Artifact, Language } from './types';

export const APP_NAME = "KultureXR";

export const SUPPORTED_LANGUAGES = [
  Language.English,
  Language.Yoruba,
  Language.Hausa,
  Language.Nupe,
  Language.Fulani
];

export const ARTIFACTS: Artifact[] = [
  {
    id: 'okuta-ilorin',
    name: 'Okuta Ilorin (The Stone of Iron)',
    shortDescription: 'The historic stone used for sharpening metals that gave Ilorin its name.',
    imageUrl: 'https://images.unsplash.com/photo-1629208637574-6df738ba3614?q=80&w=1000&auto=format&fit=crop', 
    modelUrl: '', 
    // SwiftXR Iframe for Okuta Ilorin
    iframeUrl: 'https://platinum04.swiftxr.site/ai-hack-2',
    baseStoryPrompt: 'Tell the legend of Okuta Ilorin. Describe Ojo Isekuse sharpening his iron tools on this very stone, the sound of metal ringing out (Ilo-irin), and how it gave the city its name. Invoke the spirit of the warriors who stood here and the founding of the city.',
    arPlacement: 'floor'
  },
  {
    id: 'dada-pottery',
    name: 'Dada Pottery Pot',
    shortDescription: 'A handcrafted black clay pot from the ancient Dada Pottery workshop in Okelele.',
    imageUrl: 'https://images.unsplash.com/photo-1616865443817-7985a5254158?q=80&w=1000&auto=format&fit=crop',
    // SwiftXR Iframe for Dada Pottery
    iframeUrl: 'https://platinum04.swiftxr.site/ai-hack-3',
    // Using a vase model as placeholder for the pot
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb', 
    baseStoryPrompt: 'This is a pot from the legendary Dada Pottery workshop in Okelele. Describe the women shaping the cool clay with their hands, the open fires used for firing, and the unique blackening process using locust bean pods (Iru). It is a vessel of domestic life and artistic heritage.',
    arPlacement: 'floor'
  },
  {
    id: 'virtual-museum',
    name: 'Virtual Heritage Museum',
    shortDescription: 'A walk-through virtual gallery containing various cultural artifacts from Kwara State.',
    imageUrl: 'https://images.unsplash.com/photo-1564121211835-e88c85223a8b?q=80&w=1000&auto=format&fit=crop',
    // SwiftXR Iframe for Virtual Museum
    iframeUrl: 'https://platinum04.swiftxr.site/ai-hack-1',
    modelUrl: '', 
    baseStoryPrompt: 'Welcome to the Virtual Heritage Museum of Kwara. Describe the experience of walking through this hall and seeing the diversity of Kwara culture: the beads of the Nupe, the woven Aso-Oke of the Igbomina, and the royal swords of the Emirate gathered in one place.',
    arPlacement: 'floor'
  },
  {
    id: 'durbar-frame',
    name: 'Durbar Festival Frame',
    shortDescription: 'A framed capture of the majestic Durbar festival, celebrating the equestrian tradition.',
    imageUrl: 'https://images.unsplash.com/photo-1550762072-7355a083b627?q=80&w=1000&auto=format&fit=crop',
    // Using a wall-mountable placeholder 
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb',
    baseStoryPrompt: 'A framed picture of the Grand Durbar. Describe the vibrant colors of the turbans, the decorated horses, the sound of the Kakaki trumpet, and the Emir riding in majesty through the city. It represents the strength and unity of the Emirate.',
    arPlacement: 'wall'
  }
];
