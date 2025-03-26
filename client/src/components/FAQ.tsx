import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "When will LaunchPad be available?",
    answer: "We're targeting a public launch in Q1 2023. Join our waitlist to be notified as soon as we go live and get early access opportunities."
  },
  {
    question: "How much will it cost?",
    answer: "We'll offer multiple pricing tiers to suit different needs, starting from a free plan for individuals to enterprise options for larger teams. Waitlist members will receive special early-adopter pricing."
  },
  {
    question: "Can I import data from other tools?",
    answer: "Yes! LaunchPad supports data import from most popular productivity and workflow tools. Our migration assistants make the process smooth and painless."
  },
  {
    question: "Is LaunchPad secure?",
    answer: "Absolutely. We use industry-standard encryption protocols, regular security audits, and follow best practices for data protection. Your data's security is our top priority."
  },
  {
    question: "Will there be a mobile app?",
    answer: "Yes, LaunchPad will be available on iOS and Android at launch. Our mobile apps provide a seamless experience with the desktop version, allowing you to stay productive on the go."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-800/70">
            Got questions? We've got answers. If you don't see what you're looking for, reach out to our team.
          </p>
        </div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b border-gray-200 py-2">
                <AccordionTrigger className="text-lg font-medium text-slate-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-800/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-slate-800/70 mb-4">Still have questions?</p>
          <a href="mailto:hello@launchpad.com" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Contact our support team <span className="ml-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
