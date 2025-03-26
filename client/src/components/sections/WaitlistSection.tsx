import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/ui/waitlist-form";

export default function WaitlistSection() {
  return (
    <section className="py-20 bg-primary text-white" id="waitlist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Be First in Line</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join our waitlist today and be among the first to experience our product. Plus, get exclusive early access and special discounts!
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  );
}
