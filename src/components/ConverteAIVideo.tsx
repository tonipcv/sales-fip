"use client";

import { useEffect } from 'react';

export default function ConverteAIVideo() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/67f53e45db67380060025afe/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div 
      id="vid_67f53e45db67380060025afe" 
      className="absolute top-0 left-0 w-full h-full"
      style={{ position: 'relative', width: '100%', padding: '56.25% 0 0' }}
    >
      <img 
        id="thumb_67f53e45db67380060025afe" 
        src="https://images.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/67f53e45db67380060025afe/thumbnail.jpg" 
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="thumbnail" 
      />
      <div 
        id="backdrop_67f53e45db67380060025afe" 
        className="absolute top-0 left-0 w-full h-full backdrop-blur-sm"
      />
    </div>
  );
} 