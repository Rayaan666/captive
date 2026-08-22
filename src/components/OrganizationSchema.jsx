import { Helmet } from "react-helmet-async";

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://captiveevents.com/#organization",
        "name": "Captive Events",
        "url": "https://captiveevents.com/",
        "logo": "https://captiveevents.com/logo.png",
        "description": "Captive Events provides bespoke event management, corporate events, exhibitions, brand activations, roadshows, gala dinners, audiovisual production, event videography, and event marketing services across Dubai and the UAE.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+971 58 173 2763",
          "contactType": "customer service",
          "email": "info@captiveevents.com",
          "areaServed": "AE",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.instagram.com/captiveevents/",
          "https://www.facebook.com/captiveevents/",
          "https://ae.linkedin.com/company/captive-events-dubai",
          "https://www.tiktok.com/@captiveevents"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://captiveevents.com/#website",
        "url": "https://captiveevents.com/",
        "name": "Captive Events",
        "alternateName": "Captive Events Dubai",
        "publisher": {
          "@id": "https://captiveevents.com/#organization"
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;
