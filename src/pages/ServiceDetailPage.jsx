import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { servicesData } from "../data/servicesData";
import ServiceHero from "../components/ServiceHero";
import ServiceOverview from "../components/ServiceOverview";
import ServiceCapabilities from "../components/ServiceCapabilities";
import ServiceProcess from "../components/ServiceProcess";
import ServiceCTA from "../components/ServiceCTA";

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const serviceData = servicesData.find(s => s.slug === serviceSlug);

  // Fallback if URL is invalid
  if (!serviceData) {
    return <Navigate to="/services" replace />;
  }

  // Basic SEO schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.heroHeading,
    "description": serviceData.metaDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Captive Events",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{serviceData.seoTitle}</title>
        <meta name="description" content={serviceData.metaDescription} />
        <link rel="canonical" href={`https://captiveevents.com/services/${serviceData.slug}`} />
        <meta property="og:title" content={serviceData.seoTitle} />
        <meta property="og:description" content={serviceData.metaDescription} />
        <meta property="og:url" content={`https://captiveevents.com/services/${serviceData.slug}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="flex-grow bg-[#07070a] min-h-screen">
        <ServiceHero data={serviceData} />
        <ServiceOverview data={serviceData} />
        <ServiceCapabilities data={serviceData} />
        <ServiceProcess data={serviceData} />
        <ServiceCTA data={serviceData} />
      </div>
    </>
  );
};

export default ServiceDetailPage;
