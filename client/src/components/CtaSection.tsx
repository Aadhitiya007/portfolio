import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals already on the waitlist for LaunchPad. Early adopters get exclusive benefits and pricing.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-indigo-50 shadow-lg">
            <a href="#waitlist">Join the Waitlist Now</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
