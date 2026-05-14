import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  questions: FAQItem[];
}

export const FAQSchema = ({ questions }: FAQSchemaProps) => {
  if (!questions || questions.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
