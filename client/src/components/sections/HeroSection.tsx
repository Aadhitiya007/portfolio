import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      window.scrollTo({
        top: waitlistSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      window.scrollTo({
        top: featuresSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      className="pt-28 pb-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white relative" 
      id="hero"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Launching Soon: The Future of Productivity
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              Experience a revolutionary way to organize your work and life. Join our waitlist to be the first to know when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                variant="secondary" 
                className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg"
                onClick={scrollToWaitlist}
              >
                Join the Waitlist
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="bg-transparent hover:bg-primary-700 border border-white text-white"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-2xl mx-auto max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Product dashboard preview" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}
