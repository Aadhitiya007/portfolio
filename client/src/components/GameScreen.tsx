import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { personalInfo, skills, experience, education, projects, achievements } from '../data/resumeData';

interface GameScreenProps {
  currentScreen: string;
  navigateTo: (screen: string) => void;
}

export default function GameScreen({ currentScreen, navigateTo }: GameScreenProps) {
  const [hasAnimated, setHasAnimated] = useState<Record<string, boolean>>({});
  
  // Set animation flag for current screen
  useEffect(() => {
    if (!hasAnimated[currentScreen]) {
      setHasAnimated(prev => ({ ...prev, [currentScreen]: true }));
    }
  }, [currentScreen, hasAnimated]);

  // Screen transition variants
  const screenVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.3 }
    }
  };
  
  // Item variants for staggered animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {/* Intro/Home Screen */}
        {currentScreen === 'intro' && (
          <motion.div
            key="intro"
            className="min-h-[70vh] flex flex-col items-center justify-center"
            variants={screenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-center">
              <motion.div
                className="mb-6 inline-block"
                variants={itemVariants}
              >
                <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                  <Typewriter
                    options={{
                      strings: ['Aadhitiya M', 'Software Engineer', 'Developer'],
                      autoStart: true,
                      loop: true,
                      delay: 80,
                    }}
                  />
                </span>
              </motion.div>
              
              <motion.p 
                className="text-xl mb-8 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Welcome to my retro game inspired portfolio. Press START or select a menu item to explore.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
              >
                <button
                  onClick={() => navigateTo('about')}
                  className="bg-green-500 text-black px-8 py-4 text-xl hover:bg-green-600 transition-colors"
                >
                  [PRESS START]
                </button>
              </motion.div>
              
              <motion.div 
                className="mt-16 text-sm"
                variants={itemVariants}
              >
                <p className="blink">Use navigation menu to explore different sections</p>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* About Screen */}
        {currentScreen === 'about' && (
          <motion.div
            key="about"
            className="game-console-container"
            variants={screenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="game-screen-header"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-2 bg-green-500 text-black inline-block px-4 py-1">ABOUT ME</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="bg-black border-2 border-green-500 p-6"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold mb-4">CHARACTER STATS</h3>
                <div className="mb-4">
                  <p className="mb-2"><span className="text-green-300">NAME:</span> {personalInfo.name}</p>
                  <p className="mb-2"><span className="text-green-300">CLASS:</span> {personalInfo.title}</p>
                  <p className="mb-2"><span className="text-green-300">LOCATION:</span> {personalInfo.location}</p>
                  <p className="mb-2"><span className="text-green-300">EMAIL:</span> {personalInfo.email}</p>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-2">ACHIEVEMENTS</h4>
                  <ul className="list-disc list-inside">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="mb-1">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-black border-2 border-green-500 p-6"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold mb-4">BACKSTORY</h3>
                <p className="mb-4 leading-relaxed">{personalInfo.about}</p>
                
                <h3 className="text-xl font-bold mb-2 mt-6">EDUCATION</h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold">{edu.degree}</p>
                    <p>{edu.institution} | {edu.duration}</p>
                    <p>{edu.location}</p>
                    <ul className="mt-2 list-disc list-inside">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              className="flex justify-center space-x-4 mt-8"
              variants={itemVariants}
            >
              <button
                onClick={() => navigateTo('intro')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                ← BACK
              </button>
              <button
                onClick={() => navigateTo('skills')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                NEXT →
              </button>
            </motion.div>
          </motion.div>
        )}
        
        {/* Skills Screen */}
        {currentScreen === 'skills' && (
          <motion.div
            key="skills"
            className="game-console-container"
            variants={screenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="game-screen-header"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-2 bg-green-500 text-black inline-block px-4 py-1">SKILLS</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="bg-black border-2 border-green-500 p-6"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold mb-4">TECHNICAL SKILLS</h3>
                
                {skills.technical.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}/100</span>
                    </div>
                    <div className="w-full h-4 bg-gray-800 rounded-lg overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
              
              <motion.div
                className="bg-black border-2 border-green-500 p-6"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold mb-4">SOFT SKILLS</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {skills.soft.map((skill, index) => (
                    <motion.div 
                      key={index}
                      className="border border-green-500 p-3 text-center"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.5 + (index * 0.1) } 
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">CLASS ABILITIES</h3>
                  <ul className="list-disc list-inside">
                    <li className="mb-2">Problem-solving under pressure</li>
                    <li className="mb-2">Fast learning of new technologies</li>
                    <li className="mb-2">Cross-functional team collaboration</li>
                    <li className="mb-2">Clean code crafting</li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex justify-center space-x-4 mt-8"
              variants={itemVariants}
            >
              <button
                onClick={() => navigateTo('about')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                ← BACK
              </button>
              <button
                onClick={() => navigateTo('experience')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                NEXT →
              </button>
            </motion.div>
          </motion.div>
        )}
        
        {/* Experience Screen */}
        {currentScreen === 'experience' && (
          <motion.div
            key="experience"
            className="game-console-container"
            variants={screenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="game-screen-header"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-2 bg-green-500 text-black inline-block px-4 py-1">EXPERIENCE</h2>
            </motion.div>
            
            <div className="bg-black border-2 border-green-500 p-6 mb-8">
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div 
                    key={index}
                    className="border-b border-green-500 pb-6 last:border-0"
                    variants={itemVariants}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-green-300">{job.duration}</p>
                    </div>
                    <p className="mb-3">{job.company} | {job.location}</p>
                    <ul className="list-disc list-inside">
                      {job.description.map((desc, i) => (
                        <li key={i} className="mb-2">{desc}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="flex justify-center space-x-4 mt-8"
              variants={itemVariants}
            >
              <button
                onClick={() => navigateTo('skills')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                ← BACK
              </button>
              <button
                onClick={() => navigateTo('projects')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                NEXT →
              </button>
            </motion.div>
          </motion.div>
        )}
        
        {/* Projects Screen */}
        {currentScreen === 'projects' && (
          <motion.div
            key="projects"
            className="game-console-container"
            variants={screenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="game-screen-header"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-2 bg-green-500 text-black inline-block px-4 py-1">PROJECTS</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-black border-2 border-green-500 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, borderColor: '#34d399' }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-black text-green-500 border border-green-500 px-2 py-1 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block text-green-300 hover:text-green-400 underline"
                    >
                      View Project
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="flex justify-center space-x-4 mt-8"
              variants={itemVariants}
            >
              <button
                onClick={() => navigateTo('experience')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                ← BACK
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                NEXT →
              </button>
            </motion.div>
          </motion.div>
        )}
        
        {/* Contact Screen */}
        {currentScreen === 'contact' && (
          <motion.div
            key="contact"
            className="game-console-container"
            variants={screenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="game-screen-header"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-2 bg-green-500 text-black inline-block px-4 py-1">CONTACT</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="bg-black border-2 border-green-500 p-6"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold mb-4">GET IN TOUCH</h3>
                <p className="mb-6">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-24 text-green-300">Email:</div>
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-green-300">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-green-300">Location:</div>
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-green-300">GitHub:</div>
                    <a 
                      href={personalInfo.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-green-300"
                    >
                      {personalInfo.socialLinks.github.replace('https://', '')}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-green-300">LinkedIn:</div>
                    <a 
                      href={personalInfo.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-green-300"
                    >
                      {personalInfo.socialLinks.linkedin.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-black border-2 border-green-500 p-6"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold mb-4">SEND MESSAGE</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-black border-2 border-green-500 p-2 focus:outline-none focus:border-green-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-black border-2 border-green-500 p-2 focus:outline-none focus:border-green-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full bg-black border-2 border-green-500 p-2 focus:outline-none focus:border-green-300"
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="button"
                      className="bg-green-500 text-black px-4 py-2 hover:bg-green-600 transition-colors"
                    >
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex justify-center space-x-4 mt-8"
              variants={itemVariants}
            >
              <button
                onClick={() => navigateTo('projects')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                ← BACK
              </button>
              <button
                onClick={() => navigateTo('intro')}
                className="px-4 py-2 border border-green-500 hover:bg-green-900 transition-colors"
              >
                RETURN HOME
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}