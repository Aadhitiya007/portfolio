import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Howl } from "howler";

// Components
import RetroHeader from "../components/RetroHeader";
import RetroFooter from "../components/RetroFooter";
import GameScreen from "../components/GameScreen";
import MarioBackground from "../components/MarioBackground";
import { useSoundEffects } from "../hooks/useSoundEffects";

// Game sounds for UI effects (not background music)
const sounds = {
  select: new Howl({
    src: ["/sounds/select.mp3"],
    volume: 0.5
  })
};

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<string>("intro");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const soundEffects = useSoundEffects();
  
  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle sound toggle
  const toggleSound = () => {
    if (soundEnabled) {
      soundEffects.pauseBackgroundMusic();
    } else {
      soundEffects.playBackgroundMusic();
    }
    setSoundEnabled(!soundEnabled);
  };
  
  // Navigate to a different screen
  const navigateTo = (screen: string) => {
    // Try to play selection sound if available
    try {
      if (soundEnabled && sounds.select) {
        sounds.select.play();
      }
    } catch (e) {
      console.log("Selection sound not available");
    }
    setCurrentScreen(screen);
  };
  
  // Update local soundEnabled state when background music status changes
  useEffect(() => {
    setSoundEnabled(soundEffects.isBackgroundMusicPlaying);
  }, [soundEffects.isBackgroundMusicPlaying]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // WASD or Arrow Keys for navigation
      if (!isLoading) {
        switch (e.key.toLowerCase()) {
          case 'w':
          case 'arrowup':
            // Navigate to previous screen based on order
            const screens = ['intro', 'about', 'skills', 'experience', 'projects', 'contact'];
            const currentIndex = screens.indexOf(currentScreen);
            if (currentIndex > 0) {
              navigateTo(screens[currentIndex - 1]);
            }
            break;
          case 's':
          case 'arrowdown':
            // Navigate to next screen based on order
            const screenOrder = ['intro', 'about', 'skills', 'experience', 'projects', 'contact'];
            const currIndex = screenOrder.indexOf(currentScreen);
            if (currIndex < screenOrder.length - 1) {
              navigateTo(screenOrder[currIndex + 1]);
            }
            break;
          case 'm':
            // Toggle sound
            toggleSound();
            break;
          default:
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentScreen, isLoading, soundEnabled]);
  // eslint-disable-line react-hooks/exhaustive-deps - navigateTo and toggleSound are stable function references
  
  // Implement smooth scrolling
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Analytics
  useEffect(() => {
    console.log('[Analytics] page_view', { page: 'portfolio' });
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Super Mario Background */}
      <MarioBackground speed={0.8} />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen"
          >
            <h1 className="text-3xl mb-4 text-white font-bold" style={{ textShadow: '2px 2px 0 #000' }}>LOADING...</h1>
            <div className="w-64 h-6 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
              <motion.div 
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
            <p className="mt-4 text-lg text-white font-bold" style={{ textShadow: '2px 2px 0 #000' }}>PRESS START</p>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col relative z-10"
          >
            <div className="bg-opacity-80 bg-blue-900 py-2 mb-2 border-b-4 border-yellow-500">
              <RetroHeader 
                navigateTo={navigateTo} 
                currentScreen={currentScreen}
                toggleSound={toggleSound}
                soundEnabled={soundEnabled}
              />
            </div>
            <main className="flex-grow container mx-auto px-4">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg border-4 border-red-500 shadow-lg">
                <GameScreen 
                  currentScreen={currentScreen} 
                  navigateTo={navigateTo}
                />
              </div>
            </main>
            <div className="mt-4 bg-opacity-80 bg-blue-900 py-2 border-t-4 border-yellow-500">
              <RetroFooter />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
