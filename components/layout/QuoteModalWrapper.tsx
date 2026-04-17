"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const QuoteModal = dynamic(() => import("@/components/ui/QuoteModal"), {
  ssr: false,
});

export default function QuoteModalWrapper() {
  return (
    <Suspense fallback={null}>
      <QuoteModal />
    </Suspense>
  );
}
