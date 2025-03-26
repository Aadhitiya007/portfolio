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
    <header className="p-2">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <motion.div 
            className="flex items-center mb-4 md:mb-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-4 text-2xl font-bold text-white py-1 px-3 rounded" style={{ 
              backgroundColor: '#E52521', 
              textShadow: '2px 2px 0px #000',
              boxShadow: '0px 3px 0px #000'
            }}>
              AADHITIYA M
            </div>
            <div className="hidden md:block text-white font-bold" style={{ textShadow: '1px 1px 0 #000' }}>
              {time.toLocaleTimeString()} | COINS: 99
            </div>
          </motion.div>
          
          <motion.nav 
            className="flex flex-wrap gap-2 md:gap-3 pb-2 md:pb-0 w-full md:w-auto justify-center md:justify-end"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-3 py-1 rounded font-bold focus:outline-none transition-all`}
                style={{ 
                  backgroundColor: currentScreen === item.id ? '#E52521' : '#FFC107', 
                  color: 'white',
                  textShadow: '1px 1px 0px #000',
                  boxShadow: '0px 3px 0px #000',
                  transform: currentScreen === item.id ? 'translateY(2px)' : 'translateY(0)',
                  border: '2px solid #000'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 3 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={toggleSound}
              className="px-3 py-1 rounded font-bold focus:outline-none"
              style={{ 
                backgroundColor: '#4CAF50', 
                color: 'white',
                textShadow: '1px 1px 0px #000',
                boxShadow: '0px 3px 0px #000',
                border: '2px solid #000'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 3 }}
            >
              {soundEnabled ? '🔊 ON' : '🔇 OFF'}
            </motion.button>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}