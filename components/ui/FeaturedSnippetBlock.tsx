interface FeaturedSnippetBlockProps {
  question: string;
  answer: string;
}

export default function FeaturedSnippetBlock({
  question,
  answer,
}: FeaturedSnippetBlockProps) {
  return (
    <div className="rounded-2xl border border-[#1E5BB8]/12 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(15,61,145,0.3)]">
      <h3 className="text-xl font-bold text-[#0F172A]">{question}</h3>
      <p className="mt-3 max-w-3xl text-base leading-7 text-[#475569]">
        {answer}
      </p>
    </div>
  );
}
