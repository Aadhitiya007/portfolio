import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Revolutionize Your <span className="text-primary">Workflow</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-800/80 max-w-xl">
              LaunchPad is the all-in-one platform designed to supercharge your productivity. Join our waitlist and be the first to experience the future of work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20">
                <a href="#waitlist">Join the Waitlist</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-200 hover:border-primary/30">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 mt-8 lg:mt-0 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-xl shadow-2xl shadow-primary/10 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-orange-500"></div>
              <div className="w-full h-[300px] md:h-[400px] bg-gray-100 flex items-center justify-center">
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">LaunchPad Dashboard</h3>
                  <p className="text-gray-600">Streamline your workflow with our intuitive interface</p>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/3 -right-16 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-16 -left-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-bold text-primary">5x</div>
            <div className="text-sm text-slate-800/70">Faster Workflows</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-bold text-primary">10k+</div>
            <div className="text-sm text-slate-800/70">Beta Signups</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-slate-800/70">Customer Satisfaction</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-slate-800/70">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
