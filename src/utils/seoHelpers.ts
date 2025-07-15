import { Lawyer } from '../types/lawyer';

// Generate FAQ Schema for lawyer profiles
export const generateFAQSchema = (lawyer: Lawyer) => {
  // Dynamic FAQ generation based on lawyer's actual data
  const dynamicQuestions = [
    {
      question: `How much does ${lawyer.name} charge for legal services?`,
      answer: lawyer.hourlyRate 
        ? `${lawyer.name} typically charges ${lawyer.hourlyRate} per hour. However, fees may vary depending on the complexity of your case. Contact ${lawyer.name} directly at ${lawyer.phone} for a detailed consultation and pricing discussion.`
        : `${lawyer.name} offers competitive rates for legal services. Contact them directly at ${lawyer.phone} or ${lawyer.email} for detailed pricing information and to discuss your specific legal needs.`
    },
    {
      question: `What legal services does ${lawyer.name} provide?`,
      answer: `${lawyer.name} specializes in ${lawyer.practiceAreas.join(', ')}${lawyer.specializations?.length ? ` with particular expertise in ${lawyer.specializations.join(', ')}` : ''}. With ${lawyer.experience} years of experience, they provide comprehensive legal services in these practice areas.`
    },
    {
      question: `Where is ${lawyer.name} located and what areas do they serve?`,
      answer: `${lawyer.name} is located in ${lawyer.location}${lawyer.languages?.length > 1 ? ` and provides services in ${lawyer.languages.join(', ')}` : ''}. They serve clients throughout the surrounding areas and can discuss representation for your specific location.`
    },
    {
      question: `How can I contact ${lawyer.name}?`,
      answer: `You can reach ${lawyer.name} by phone at ${lawyer.phone} or by email at ${lawyer.email}${lawyer.website ? `. You can also visit their website at ${lawyer.website} for more information` : ''}. They are currently ${lawyer.availability?.toLowerCase() || 'available'} for new clients.`
    },
    {
      question: `What are ${lawyer.name}'s qualifications and experience?`,
      answer: `${lawyer.name} graduated from ${lawyer.education} and has ${lawyer.experience} years of legal experience${lawyer.barNumber ? ` (Bar Number: ${lawyer.barNumber})` : ''}. They have earned a ${lawyer.rating}/5 rating based on ${lawyer.reviews} client reviews${lawyer.verified ? ' and are a verified attorney in our directory' : ''}.`
    },
    {
      question: `Is ${lawyer.name} accepting new clients?`,
      answer: `${lawyer.name} is currently ${lawyer.availability?.toLowerCase() || 'available'} for new clients. ${lawyer.availability === 'Limited' ? 'Due to high demand, availability may be limited.' : lawyer.availability === 'Busy' ? 'They have limited availability but may be able to accommodate urgent matters.' : 'They are actively accepting new cases.'} Contact them at ${lawyer.phone} to discuss your legal needs.`
    },
    {
      question: `What makes ${lawyer.name} different from other lawyers?`,
      answer: `${lawyer.name} brings ${lawyer.experience} years of specialized experience in ${lawyer.practiceAreas.join(', ')}. ${lawyer.bio} Their ${lawyer.rating}/5 star rating from ${lawyer.reviews} clients reflects their commitment to excellent legal representation.`
    },
    {
      question: `Does ${lawyer.name} offer free consultations?`,
      answer: `Contact ${lawyer.name} at ${lawyer.phone} to inquire about consultation options and fees. Many attorneys offer initial consultations to discuss your case and determine if they're the right fit for your legal needs.`
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dynamicQuestions.map(qa => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  };
};

// Generate Local Business Schema for law firms
export const generateLocalBusinessSchema = (lawyer: Lawyer) => {
  const [city, state] = lawyer.location.split(',').map(s => s.trim());
  
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `${lawyer.name} - ${lawyer.practiceAreas[0]} Attorney`,
    "description": lawyer.bio,
    "image": lawyer.image,
    "telephone": lawyer.phone,
    "email": lawyer.email,
    "url": lawyer.website,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "US"
    },
    "openingHours": "Mo-Fr 09:00-17:00",
    "priceRange": lawyer.hourlyRate || "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": lawyer.rating,
      "reviewCount": lawyer.reviews,
      "bestRating": 5,
      "worstRating": 1
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Services",
      "itemListElement": lawyer.practiceAreas.map(area => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": area,
          "description": `Professional ${area} legal services`
        }
      }))
    }
  };
};

// Generate Organization Schema for the directory
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Attorneys-deets",
    "description": "Professional lawyers directory connecting clients with qualified attorneys",
    "url": "https://precious-sherbet-ca08de.netlify.app",
    "logo": "https://precious-sherbet-ca08de.netlify.app/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/attorneys-deets",
      "https://www.linkedin.com/company/attorneys-deets",
      "https://twitter.com/attorneys-deets"
    ]
  };
};

// Generate meta tags for SEO
export const generateMetaTags = (
  type: 'homepage' | 'lawyer' | 'practiceArea' | 'location',
  data?: {
    lawyer?: Lawyer;
    practiceArea?: string;
    location?: string;
  }
) => {
  const baseUrl = 'https://precious-sherbet-ca08de.netlify.app';
  
  switch (type) {
    case 'homepage':
      return {
        title: "Find the Right Lawyer | Attorneys-deets Professional Directory 2025",
        description: "Connect with experienced attorneys in your area. Browse verified lawyers by practice area and location. Get expert legal help today.",
        keywords: "lawyers, attorneys, legal services, law firms, legal directory, find lawyer",
        canonical: baseUrl,
        ogTitle: "Attorneys-deets - Professional Lawyers Directory",
        ogDescription: "Connect with qualified attorneys across all practice areas. Verified lawyers with client reviews and ratings.",
        ogImage: `${baseUrl}/og-image.jpg`,
        ogUrl: baseUrl
      };

    case 'lawyer':
      if (!data?.lawyer) return null;
      const lawyer = data.lawyer;
      const primaryArea = lawyer.practiceAreas[0];
      return {
        title: `${lawyer.name} - ${primaryArea} Attorney in ${lawyer.location} | Attorneys-deets`,
        description: `${lawyer.name} is an experienced ${primaryArea} attorney in ${lawyer.location} with ${lawyer.experience} years of practice. ${lawyer.rating}/5 rating from ${lawyer.reviews} reviews.`,
        keywords: `${lawyer.name}, ${primaryArea}, attorney, lawyer, ${lawyer.location}, legal services`,
        canonical: `${baseUrl}/best-attorney-for-${primaryArea.toLowerCase().replace(/\s+/g, '-')}-in-${lawyer.location.toLowerCase().replace(/\s+/g, '-')}-2025`,
        ogTitle: `${lawyer.name} - Top ${primaryArea} Attorney in ${lawyer.location}`,
        ogDescription: lawyer.bio,
        ogImage: lawyer.image,
        ogUrl: `${baseUrl}/lawyer/${lawyer.id}`
      };

    case 'practiceArea':
      if (!data?.practiceArea) return null;
      return {
        title: `${data.practiceArea} Lawyers | Find Top ${data.practiceArea} Attorneys 2025`,
        description: `Find experienced ${data.practiceArea} attorneys. Browse verified lawyers specializing in ${data.practiceArea} with client reviews and ratings.`,
        keywords: `${data.practiceArea}, lawyers, attorneys, legal services, law firms`,
        canonical: `${baseUrl}/practice-area/${data.practiceArea.toLowerCase().replace(/\s+/g, '-')}`,
        ogTitle: `Top ${data.practiceArea} Lawyers Directory`,
        ogDescription: `Connect with qualified ${data.practiceArea} attorneys in your area.`,
        ogImage: `${baseUrl}/practice-areas/${data.practiceArea.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        ogUrl: `${baseUrl}/practice-area/${data.practiceArea.toLowerCase().replace(/\s+/g, '-')}`
      };

    case 'location':
      if (!data?.location) return null;
      return {
        title: `Lawyers in ${data.location} | Top Attorneys Directory 2025`,
        description: `Find qualified attorneys in ${data.location}. Browse local lawyers with verified credentials and client reviews across all practice areas.`,
        keywords: `lawyers ${data.location}, attorneys ${data.location}, legal services ${data.location}`,
        canonical: `${baseUrl}/lawyers-in/${data.location.toLowerCase().replace(/\s+/g, '-')}`,
        ogTitle: `Top Lawyers in ${data.location}`,
        ogDescription: `Connect with qualified attorneys in ${data.location} across all practice areas.`,
        ogImage: `${baseUrl}/locations/${data.location.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        ogUrl: `${baseUrl}/lawyers-in/${data.location.toLowerCase().replace(/\s+/g, '-')}`
      };

    default:
      return null;
  }
};