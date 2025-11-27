import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ARTIFACTS } from '../constants';
import StoryPanel from '../components/StoryPanel';

// Use a workaround for the custom element to avoid TS errors without polluting the global JSX namespace
const ModelViewer = 'model-viewer' as any;

const ExperiencePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artifact = ARTIFACTS.find((a) => a.id === id);

  useEffect(() => {
    if (!artifact) {
      navigate('/gallery');
    }
  }, [artifact, navigate]);

  if (!artifact) return null;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-stone-900 relative">
      
      {/* AR / 3D Viewer Section */}
      <div className="relative flex-grow h-1/2 md:h-full bg-black">
        {/* Back Button Overlay */}
        <Link 
          to="/gallery" 
          className="absolute top-4 left-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-green-600 transition-colors backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>

        {/* Instruction Overlay for AR Tracking */}
        {!artifact.iframeUrl && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white flex items-center gap-3 shadow-lg pointer-events-none">
            {artifact.arPlacement === 'wall' ? (
              <>
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                <span className="text-sm font-medium">Point at a <span className="text-green-400 font-bold">Wall</span> to place</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                <span className="text-sm font-medium">Point at the <span className="text-green-400 font-bold">Floor</span> to place</span>
              </>
            )}
          </div>
        )}

        {/* Conditional Rendering: iframe (3rd Party) or model-viewer (Native) */}
        {artifact.iframeUrl ? (
          <iframe 
            title={artifact.name}
            src={artifact.iframeUrl}
            className="w-full h-full border-0"
            allow="fullscreen; autoplay; xr-spatial-tracking; camera; midi; encrypted-media; gyroscope; accelerometer"
            {...{
              "execution-while-out-of-viewport": "",
              "execution-while-not-rendered": "",
              "web-share": ""
            } as any}
          />
        ) : (
          <ModelViewer
            src={artifact.modelUrl}
            ios-src="" 
            poster={artifact.imageUrl}
            alt={`A 3D model of ${artifact.name}`}
            shadow-intensity="1"
            camera-controls
            auto-rotate
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-placement={artifact.arPlacement || 'floor'}
            environment-image="neutral"
            style={{ width: '100%', height: '100%', backgroundColor: '#202020' }}
          >
            <div slot="progress-bar" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>

            <button slot="ar-button" className="absolute bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transform transition-transform hover:scale-105">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
              View in Your Space
            </button>
          </ModelViewer>
        )}
      </div>

      {/* Story Panel Section */}
      <div className="h-1/2 md:h-full md:w-[450px] flex-shrink-0 relative z-20 bg-white md:shadow-[-10px_0_20px_rgba(0,0,0,0.2)]">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-stone-100 bg-stone-50">
            <h1 className="text-2xl font-bold text-stone-900">{artifact.name}</h1>
            <p className="text-sm text-stone-500 mt-1">
              {artifact.iframeUrl ? "Interactive AR Experience" : "Tap 'View in Your Space' to see in AR"}
            </p>
          </div>
          
          {/* The Story Component */}
          <div className="flex-grow overflow-hidden p-4">
             <StoryPanel 
                artifactName={artifact.name}
                basePrompt={artifact.baseStoryPrompt}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
