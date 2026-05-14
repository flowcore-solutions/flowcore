import React from "react";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Flowcore Solutions",
    "url": "https://flowcoresolutions.in",
    "logo": "https://flowcoresolutions.in/assets/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9900000000",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.facebook.com/flowcoresolutions",
      "https://www.linkedin.com/company/flowcoresolutions"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "IndustrialBusiness",
    "name": "Flowcore Solutions",
    "image": "https://flowcoresolutions.in/assets/og-image.webp",
    "@id": "https://flowcoresolutions.in",
    "url": "https://flowcoresolutions.in",
    "telephone": "+91-9900000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Industrial Estate, Rajajinagar",
      "addressLocality": "Bangalore",
      "postalCode": "560010",
      "addressRegion": "KA",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
