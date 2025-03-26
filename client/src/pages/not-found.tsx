import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-green-500 font-mono crt-scanline">
      <motion.div 
        className="border-2 border-green-500 p-8 max-w-lg w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 glitch" data-text="ERROR 404">ERROR 404</h1>
          <div className="h-2 bg-green-500 mb-4"></div>
          <p className="text-2xl">GAME LEVEL NOT FOUND</p>
        </div>

        <div className="mb-8 space-y-4">
          <p className="text-sm blink">[ SYSTEM ERROR ]</p>
          <p>The level you are trying to access does not exist in this dimension.</p>
          <p>Please return to the main game screen to continue your adventure.</p>
        </div>

        <div className="text-center">
          {countdown > 0 ? (
            <p>Returning to main screen in {countdown}...</p>
          ) : (
            <Link href="/">
              <motion.button 
                className="bg-green-500 text-black px-6 py-3 hover:bg-green-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                [RETURN TO HOME BASE]
              </motion.button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
