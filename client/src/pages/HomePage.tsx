import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Howl } from "howler";

// Components
import RetroHeader from "../components/RetroHeader";
import RetroFooter from "../components/RetroFooter";
import GameScreen from "../components/GameScreen";
import RetroBackground from "../components/RetroBackground";

// Game sounds
const sounds = {
  select: new Howl({
    src: ["/sounds/select.mp3"],
    volume: 0.5
  }),
  background: new Howl({
    src: ["/sounds/background.mp3"],
    volume: 0.3,
    loop: true
  })
};

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<string>("intro");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
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
      sounds.background.pause();
    } else {
      sounds.background.play();
    }
    setSoundEnabled(!soundEnabled);
  };
  
  // Navigate to a different screen
  const navigateTo = (screen: string) => {
    if (soundEnabled) {
      sounds.select.play();
    }
    setCurrentScreen(screen);
  };
  
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
    <div className="min-h-screen bg-black text-green-500 font-mono crt-scanline relative">
      {/* Dynamic Matrix-like Background */}
      <RetroBackground 
        density={80} 
        speed={0.8} 
        color="rgba(0, 255, 0, 0.7)" 
      />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen"
          >
            <h1 className="text-3xl mb-4 glitch" data-text="LOADING...">LOADING...</h1>
            <div className="w-64 h-4 bg-gray-800 rounded-lg overflow-hidden">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
            <p className="mt-4 text-xs blink">INITIALIZING SYSTEM...</p>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col relative z-10"
          >
            <RetroHeader 
              navigateTo={navigateTo} 
              currentScreen={currentScreen}
              toggleSound={toggleSound}
              soundEnabled={soundEnabled}
            />
            <main className="flex-grow">
              <GameScreen 
                currentScreen={currentScreen} 
                navigateTo={navigateTo}
              />
            </main>
            <RetroFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
