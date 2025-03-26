import { motion } from 'framer-motion';
import { personalInfo } from '../data/resumeData';

export default function RetroFooter() {
  return (
    <motion.footer 
      className="border-t-2 border-green-500 py-4 bg-black text-green-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} | Aadhitiya M | Portfolio v1.0.0
            </p>
          </div>
          
          <div className="flex space-x-4">
            <motion.a 
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              [GITHUB]
            </motion.a>
            <motion.a 
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              [LINKEDIN]
            </motion.a>
            <motion.a 
              href={`mailto:${personalInfo.email}`}
              className="hover:text-green-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              [EMAIL]
            </motion.a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs">
          <p>Created with React + Framer Motion + Tailwind CSS | Retro Game Inspired Portfolio</p>
          <p className="mt-1">Use [W][A][S][D] to navigate or click the menu buttons</p>
        </div>
      </div>
    </motion.footer>
  );
}