"use client";

import { useEffect } from 'react';

interface ConverteAIVideoProps {
  playerId?: string;
}

export default function ConverteAIVideo({ playerId = '682c6d60e54e517847ba447e' }: ConverteAIVideoProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/${playerId}/player.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [playerId]);

  return (
    <div 
      id={`vid_${playerId}`} 
      style={{ position: 'relative', width: '100%', padding: '56.25% 0 0' }}
    >
      <img 
        id={`thumb_${playerId}`} 
        src={`https://images.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/${playerId}/thumbnail.jpg`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        alt="thumbnail"
      />
      <div 
        id={`backdrop_${playerId}`} 
        style={{ WebkitBackdropFilter: 'blur(5px)', backdropFilter: 'blur(5px)', position: 'absolute', top: 0, height: '100%', width: '100%' }}
      />
    </div>
  );
} 