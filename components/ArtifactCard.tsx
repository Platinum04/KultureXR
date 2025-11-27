import React from 'react';
import { Link } from 'react-router-dom';
import { Artifact } from '../types';

interface ArtifactCardProps {
  artifact: Artifact;
}

const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-stone-200">
      <div className="h-48 overflow-hidden">
        <img 
          src={artifact.imageUrl} 
          alt={artifact.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-stone-800 mb-2">{artifact.name}</h3>
        <p className="text-stone-600 text-sm mb-4 line-clamp-3">{artifact.shortDescription}</p>
        <Link 
          to={`/experience/${artifact.id}`}
          className="inline-block w-full text-center bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
        >
          View in AR
        </Link>
      </div>
    </div>
  );
};

export default ArtifactCard;