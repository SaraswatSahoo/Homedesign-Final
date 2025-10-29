import { FaqSectionWithCategories } from "@/components/ui/faq-with-categories";

const DEMO_FAQS = [
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply sign up for an account and follow our quick setup guide. We'll walk you through each step of the process.",
    category: "Getting Started",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    category: "Billing",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
    category: "Pricing",
  },
  {
    question: "How can I contact support?",
    answer: "Our support team is available 24/7 through our help center, email support, or live chat. We typically respond within 2 hours.",
    category: "Support",
  },
];

export default function FAQ() {
  return (
    <FaqSectionWithCategories
      title="Frequently Asked Questions"
      description="Find answers to common questions about our services"
      items={DEMO_FAQS}
      contactInfo={{
        title: "Still have questions?",
        buttonText: "Contact Support",
        onContact: () => console.log("Contact support clicked"),
      }}
    />
  );
}
