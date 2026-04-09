"use client";

import { Suspense } from "react";
import QuoteModal from "@/components/ui/QuoteModal";

export default function QuoteModalWrapper() {
  return (
    <Suspense fallback={null}>
      <QuoteModal />
    </Suspense>
  );
}
