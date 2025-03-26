import { motion } from "framer-motion";
import { FeatureCard } from "@/components/ui/feature-card";
import { Zap, ShieldCheck, Smartphone, Users, BarChart2, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Experience unmatched speed with our optimized application designed for efficiency."
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with best-in-class encryption and security protocols."
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Compatibility",
    description: "Access your workspace from any device with our seamless cross-platform integration."
  },
  {
    icon: Users,
    title: "Collaborative Workspaces",
    description: "Work together with your team in real-time with powerful collaboration tools."
  },
  {
    icon: BarChart2,
    title: "Advanced Analytics",
    description: "Gain insights with comprehensive analytics dashboard and custom reports."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated support team is available round the clock to assist you."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features That Set Us Apart</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our product is built with modern solutions to address your everyday challenges.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
