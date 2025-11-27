import React from 'react';
import { ARTIFACTS } from '../constants';
import ArtifactCard from '../components/ArtifactCard';

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Digital Museum Gallery</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Browse our collection of digitized artifacts. Each item holds a unique story from Kwara State's diverse history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ARTIFACTS.map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;