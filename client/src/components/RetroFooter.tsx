import { motion } from 'framer-motion';
import { personalInfo } from '../data/resumeData';

export default function RetroFooter() {
  return (
    <motion.footer 
      className="py-2 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left font-bold" style={{ textShadow: '1px 1px 0 #000' }}>
              © {new Date().getFullYear()} | Aadhitiya M | World 1-1
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.a 
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded font-bold focus:outline-none"
              style={{ 
                backgroundColor: '#E52521', 
                color: 'white',
                textShadow: '1px 1px 0px #000',
                boxShadow: '0px 3px 0px #000',
                border: '2px solid #000'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 3 }}
            >
              GITHUB
            </motion.a>
            <motion.a 
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded font-bold focus:outline-none"
              style={{ 
                backgroundColor: '#4169E1', 
                color: 'white',
                textShadow: '1px 1px 0px #000',
                boxShadow: '0px 3px 0px #000',
                border: '2px solid #000'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 3 }}
            >
              LINKEDIN
            </motion.a>
            <motion.a 
              href={`mailto:${personalInfo.email}`}
              className="px-3 py-1 rounded font-bold focus:outline-none"
              style={{ 
                backgroundColor: '#FFC107', 
                color: 'white',
                textShadow: '1px 1px 0px #000',
                boxShadow: '0px 3px 0px #000',
                border: '2px solid #000'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 3 }}
            >
              EMAIL
            </motion.a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm font-bold" style={{ textShadow: '1px 1px 0 #000' }}>
          <p>Created with React + Framer Motion + Super Mario Theme</p>
          <p className="mt-1">Use [↑][↓] or [W][S] keys to navigate between sections</p>
        </div>
      </div>
    </motion.footer>
  );
}