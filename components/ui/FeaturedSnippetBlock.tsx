interface FeaturedSnippetBlockProps {
  question: string;
  answer: string;
}

export default function FeaturedSnippetBlock({
  question,
  answer,
}: FeaturedSnippetBlockProps) {
  return (
    <div className="border-l-4 border-[#1E5BB8] bg-[#F0F6FF] pl-5 pr-4 py-4 rounded-r-xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#1E5BB8] mb-2">
        Quick Answer
      </p>
      <h3 className="text-base font-bold text-[#0F172A] leading-snug">{question}</h3>
      <p className="mt-2 text-sm leading-7 text-[#475569]">{answer}</p>
    </div>
  );
}
