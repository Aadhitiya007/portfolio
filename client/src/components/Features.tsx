import { motion } from "framer-motion";
import { Bolt, ShieldCheck, Puzzle, LineChart, Users, RefreshCw } from "lucide-react";

const features = [
  {
    icon: <Bolt className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Experience blazing performance with our optimized architecture designed for speed and efficiency."
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "Industry-leading security measures to keep your data safe and compliant with regulations."
  },
  {
    icon: <Puzzle className="h-6 w-6" />,
    title: "Seamless Integration",
    description: "Connect with over 100+ tools and platforms you already use with just a few clicks."
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Powerful Analytics",
    description: "Gain valuable insights into your performance with comprehensive reporting and dashboards."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description: "Work seamlessly with your team members in real-time with smart collaboration tools."
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Automated Workflows",
    description: "Create custom automation rules to handle repetitive tasks and save valuable time."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-slate-800/70">
            LaunchPad brings everything you need to streamline your workflow and boost productivity.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-800/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
