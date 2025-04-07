"use client";

import { useEffect } from 'react';

export default function ConverteAIVideo() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/67f41bbdf1a80f4c291fa48b/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div 
      id="vid_67f41bbdf1a80f4c291fa48b" 
      className="absolute top-0 left-0 w-full h-full"
      style={{ position: 'relative', width: '100%', padding: '56.25% 0 0' }}
    >
      <img 
        id="thumb_67f41bbdf1a80f4c291fa48b" 
        src="https://images.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/67f41bbdf1a80f4c291fa48b/thumbnail.jpg" 
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="thumbnail" 
      />
      <div 
        id="backdrop_67f41bbdf1a80f4c291fa48b" 
        className="absolute top-0 left-0 w-full h-full backdrop-blur-sm"
      />
    </div>
  );
} 