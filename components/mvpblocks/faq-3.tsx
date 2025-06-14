"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "group rounded-lg border border-border/60",
        "transition-all duration-200 ease-in-out",
        isOpen ? "bg-card/30 shadow-sm" : "hover:bg-card/50",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4"
      >
        <h3
          className={cn(
            "text-left text-base font-medium transition-colors duration-200",
            "text-foreground/80",
            isOpen && "text-foreground",
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "shrink-0 rounded-full p-0.5",
            "transition-colors duration-200",
            isOpen ? "text-primary" : "text-muted-foreground",
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
          >
            <div className="border-t border-border/40 px-6 pb-4 pt-2">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq3() {
  const faqs: Omit<FAQItemProps, "index">[] = [
    {
      question: "What makes AI Code Agent unique?",
      answer:
        "AI Code Agent stands out through its advanced machine learning models, context-aware code analysis, and personalized suggestions. We've developed an assistant that truly understands your coding style and project needs, providing intelligent recommendations that actually improve your development workflow.",
    },
    {
      question: "How does the AI learn my coding style?",
      answer:
        "Our AI analyzes your code patterns, formatting preferences, and common solutions you implement. Over time, it builds a personalized profile to deliver suggestions that match your approach to development, becoming more accurate and helpful with each use.",
    },
    {
      question: "Is my code data secure when using AI Code Agent?",
      answer:
        "Yes, security is our top priority. Your code never leaves your environment without your explicit permission. All analysis happens locally when possible, and any cloud processing uses enterprise-grade encryption and anonymization techniques to ensure your intellectual property remains protected.",
    },
    {
      question: "How can I get started with AI Code Agent?",
      answer:
        "Getting started is simple - install our extension in your preferred IDE, authorize the application, and start coding. The AI begins learning immediately and will provide suggestions within minutes. Our documentation provides detailed setup instructions and tips for maximizing productivity.",
    },
    {
      question: "Do you offer team or enterprise plans?",
      answer:
        "Absolutely! We offer team and enterprise plans with additional features like shared learning profiles, organization-wide code standards enforcement, and dedicated support. Contact our sales team for custom pricing based on your team size and requirements.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-16">
      {/* Decorative elements */}
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-wider"
          >
            FAQs
          </Badge>

          <h2 className="mb-3 bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-3xl font-bold text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about MVPBlocks
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn("mx-auto mt-12 max-w-md rounded-lg p-6 text-center")}
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary">
            <Mail className="h-4 w-4" />
          </div>
          <p className="mb-1 text-sm font-medium text-foreground">
            Still have questions?
          </p>
          <p className="mb-4 text-xs text-muted-foreground">
            We&apos;re here to help you
          </p>
          <button
            type="button"
            className={cn(
              "rounded-md px-4 py-2 text-sm",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90",
              "transition-colors duration-200",
              "font-medium",
            )}
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
