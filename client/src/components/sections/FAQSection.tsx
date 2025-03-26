import { motion } from "framer-motion";
import { FAQItem } from "@/components/ui/faq-item";

const faqs = [
  {
    question: "When will the product launch?",
    answer: "We're planning to launch in Q1 2024. Join our waitlist to be notified as soon as we go live and to receive early access privileges."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we'll offer a 14-day free trial with all features unlocked. Waitlist members will receive an extended 30-day trial period."
  },
  {
    question: "What makes your product different?",
    answer: "Our product combines intuitive design with powerful functionality. We've focused on creating a seamless user experience that solves real problems without unnecessary complexity."
  },
  {
    question: "Do you offer enterprise plans?",
    answer: "Yes, we'll have dedicated enterprise plans with additional security features, priority support, and custom integrations. Contact our sales team for more information."
  },
  {
    question: "What platforms do you support?",
    answer: "Our product works on all major platforms including Windows, macOS, iOS, Android, and modern web browsers. Your data syncs seamlessly across all devices."
  }
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our product and waitlist.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <FAQItem 
                question={faq.question} 
                answer={faq.answer} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
