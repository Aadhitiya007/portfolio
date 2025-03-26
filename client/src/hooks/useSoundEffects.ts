import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

export interface SoundEffects {
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  pauseBackgroundMusic: () => void;
  toggleBackgroundMusic: () => void;
  isBackgroundMusicPlaying: boolean;
  volumeLevel: number;
  setVolumeLevel: (volume: number) => void;
}

export function useSoundEffects(): SoundEffects {
  const [backgroundMusic, setBackgroundMusic] = useState<Howl | null>(null);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0.5); // Default volume at 50%

  // Initialize sounds on component mount
  useEffect(() => {
    // Create the background music instance
    const bgMusic = new Howl({
      src: ['./Stage Win (Super Mario) - QuickSounds.com.mp3'],
      loop: true,
      volume: volumeLevel,
      autoplay: false,
      preload: true,
      onload: () => {
        console.log('Background music loaded successfully');
      },
      onloaderror: (id, error) => {
        console.error('Error loading background music:', error);
      },
      onplay: () => {
        setIsBackgroundMusicPlaying(true);
      },
      onpause: () => {
        setIsBackgroundMusicPlaying(false);
      },
      onstop: () => {
        setIsBackgroundMusicPlaying(false);
      }
    });

    setBackgroundMusic(bgMusic);

    // Cleanup on unmount
    return () => {
      if (bgMusic) {
        bgMusic.stop();
      }
    };
  }, []);

  // Update volume when volumeLevel changes
  useEffect(() => {
    if (backgroundMusic) {
      backgroundMusic.volume(volumeLevel);
    }
  }, [volumeLevel, backgroundMusic]);

  const playBackgroundMusic = useCallback(() => {
    if (backgroundMusic && !isBackgroundMusicPlaying) {
      backgroundMusic.play();
    }
  }, [backgroundMusic, isBackgroundMusicPlaying]);

  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusic) {
      backgroundMusic.stop();
    }
  }, [backgroundMusic]);

  const pauseBackgroundMusic = useCallback(() => {
    if (backgroundMusic && isBackgroundMusicPlaying) {
      backgroundMusic.pause();
    }
  }, [backgroundMusic, isBackgroundMusicPlaying]);

  const toggleBackgroundMusic = useCallback(() => {
    if (isBackgroundMusicPlaying) {
      pauseBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  }, [isBackgroundMusicPlaying, pauseBackgroundMusic, playBackgroundMusic]);

  return {
    playBackgroundMusic,
    stopBackgroundMusic,
    pauseBackgroundMusic,
    toggleBackgroundMusic,
    isBackgroundMusicPlaying,
    volumeLevel,
    setVolumeLevel
  };
}