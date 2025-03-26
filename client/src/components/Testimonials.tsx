import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    rating: 5,
    text: "LaunchPad has completely transformed how our team collaborates. It's intuitive, powerful, and saves us hours every week.",
    name: "Sarah Johnson",
    title: "Product Manager, TechCorp"
  },
  {
    rating: 5,
    text: "The automation features alone are worth it. I've cut down my daily admin tasks by 75% and can focus on what really matters.",
    name: "Michael Thomas",
    title: "Freelance Designer"
  },
  {
    rating: 4.5,
    text: "As a startup founder, I need tools that scale with us. LaunchPad offers enterprise features at a price point that makes sense for growing teams.",
    name: "Elena Rodriguez",
    title: "CEO, Innovate Inc."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Early Users Are Saying
          </h2>
          <p className="text-lg text-slate-800/70">
            Don't just take our word for it. Here's what our beta testers have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {Array(Math.floor(testimonial.rating)).fill(0).map((_, i) => (
                    <Star key={i} className="fill-current h-5 w-5" />
                  ))}
                  {testimonial.rating % 1 > 0 && (
                    <div className="relative">
                      <Star className="fill-current h-5 w-5" />
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-white"></div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-slate-800/80 mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-800/60">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
