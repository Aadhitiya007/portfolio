import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RetroHeaderProps {
  navigateTo: (screen: string) => void;
  currentScreen: string;
  toggleSound: () => void;
  soundEnabled: boolean;
}

export default function RetroHeader({ 
  navigateTo, 
  currentScreen, 
  toggleSound, 
  soundEnabled 
}: RetroHeaderProps) {
  const [time, setTime] = useState(new Date());
  
  // Time display
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Navigation items
  const navItems = [
    { id: 'intro', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'XP' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <header className="border-b-2 border-green-500 p-4 bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <motion.div 
            className="flex items-center mb-4 md:mb-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-4 text-2xl font-bold bg-green-500 text-black p-2">
              Aadhitiya M
            </div>
            <div className="hidden md:block text-sm">
              {time.toLocaleTimeString()} | Level 99 Developer
            </div>
          </motion.div>
          
          <motion.nav 
            className="flex space-x-1 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-3 py-2 ${
                  currentScreen === item.id 
                    ? 'bg-green-500 text-black' 
                    : 'bg-black text-green-500 border border-green-500 hover:bg-green-900'
                } focus:outline-none transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={toggleSound}
              className="px-3 py-2 bg-black text-green-500 border border-green-500 hover:bg-green-900 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? 'SOUND: ON' : 'SOUND: OFF'}
            </motion.button>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}