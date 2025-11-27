import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ARTIFACTS } from '../constants';
import ArtifactCard from '../components/ArtifactCard';

const LandingPage: React.FC = () => {
  // Featured artifacts (take first 4)
  const featured = ARTIFACTS.slice(0, 4);

  const heroImages = [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdFRVa9ogjqrqIribuXgVNhvdi86bWBqn31g&s', // Mosque-like
      alt: 'Ilorin Central Mosque'
    },
    {
      url: 'https://images.unsplash.com/photo-1598309255528-10e086b42b70?q=80&w=1920', // Palace-like
      alt: 'Emirs Palace'
    },
    {
      url: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=1920', // Hill-like
      alt: 'Sobi Hill'
    },
    {
      url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheinformant247.com%2Ftourism-the-magestic-owu-waterfall%2F&psig=AOvVaw026OJyieIj_pBoWgl7MTDq&ust=1763110004694000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCID7x-Pe7pADFQAAAAAdAAAAABAE', // Waterfall
      alt: 'Waterfall'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
        
        {/* Carousel Background */}
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-50' : 'opacity-0'
            }`}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900/80"></div>
          </div>
        ))}

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-sm">
            History Comes Alive.
          </h1>
          <p className="text-xl md:text-2xl text-stone-100 max-w-2xl mx-auto mb-10 drop-shadow-md font-medium">
            Experience the rich cultural heritage of Kwara State through Immersive Augmented Reality and Multilingual Storytelling.
          </p>
          <Link 
            to="/gallery"
            className="inline-flex items-center bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-800 transform hover:scale-105 transition-all shadow-lg hover:shadow-green-500/20"
          >
            Start Exploration
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 flex gap-2 z-20">
          {heroImages.map((_, idx) => (
             <button 
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-green-500' : 'w-2 bg-white/50'}`}
                onClick={() => setCurrentImageIndex(idx)}
             />
          ))}
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-20 bg-stone-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-stone-800 mb-6">Preserving Culture with Technology</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              KultureXR bridges the gap between ancient traditions and modern technology. 
              We use cutting-edge AI to translate the stories of our ancestors into local languages 
              (Yoruba, Nupe, Fulani, Hausa) ensuring our heritage is accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Clean & Structured */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-green-600 font-bold tracking-wider uppercase text-xs mb-2 block">User Guide</span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">How It Works</h2>
            <p className="text-stone-600">Discovering Kwara's heritage is simple. Follow these steps to immerse yourself in history.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Select Artifact", 
                desc: "Browse our digital gallery and choose a historical item.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                )
              },
              { 
                step: "02", 
                title: "View in AR", 
                desc: "Project the artifact into your real-world environment.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )
              },
              { 
                step: "03", 
                title: "Choose Language", 
                desc: "Select from 5 local languages for the backstory.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                )
              },
              { 
                step: "04", 
                title: "Listen & Learn", 
                desc: "Hear the history narrated by our AI storyteller.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="bg-stone-50 p-8 rounded-2xl border border-stone-200 hover:border-green-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm text-green-700 flex items-center justify-center mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-stone-400 mb-2 uppercase tracking-wide">Step {item.step}</div>
                <h3 className="text-lg font-bold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Preview */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-2">Featured Artifacts</h2>
              <p className="text-stone-600">A glimpse into our collection.</p>
            </div>
            <Link to="/gallery" className="text-green-700 font-semibold hover:underline">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(artifact => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} KultureXR. Preserving History.</p>
      </footer>
    </div>
  );
};

export default LandingPage;