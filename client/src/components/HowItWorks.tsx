import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-800/70">
            Getting started with LaunchPad is simple. Our intuitive platform makes setup and daily use a breeze.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-gray-200"></div>
          
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20 z-10">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Sign Up</h3>
            <p className="text-slate-800/70">Create your account and set up your profile with just a few simple steps.</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20 z-10">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Connect Tools</h3>
            <p className="text-slate-800/70">Integrate your existing tools and import your data with our simple wizards.</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20 z-10">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Boost Productivity</h3>
            <p className="text-slate-800/70">Start leveraging LaunchPad's powerful features to transform your workflow.</p>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <a href="#waitlist" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
            Get Started Now <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
