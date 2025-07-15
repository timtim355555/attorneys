import React from 'react';
import { Lawyer } from '../types/lawyer';

interface SchemaMarkupProps {
  type: 'homepage' | 'lawyer' | 'practiceArea' | 'location' | 'directory';
  lawyer?: Lawyer;
  practiceArea?: string;
  location?: string;
  lawyers?: Lawyer[];
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ 
  type, 
  lawyer, 
  practiceArea, 
  location, 
  lawyers = [] 
}) => {
  const generateSchema = () => {
    const baseUrl = 'https://precious-sherbet-ca08de.netlify.app';
    
    switch (type) {
      case 'homepage':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Attorneys-deets - Professional Lawyers Directory",
          "description": "Find the right lawyer for your case. Connect with experienced attorneys in your area specializing in various practice areas.",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Attorneys-deets",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          }
        };

      case 'lawyer':
        if (!lawyer) return null;
        
        // Generate dynamic FAQ based on lawyer's actual data
        const dynamicFAQ = [
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
          }
        ];

        return {
          "@context": "https://schema.org",
          "@type": "Attorney",
          "name": lawyer.name,
          "description": lawyer.bio,
          "image": lawyer.image,
          "telephone": lawyer.phone,
          "email": lawyer.email,
          "url": lawyer.website || `${baseUrl}/lawyer/${lawyer.id}/${lawyer.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": lawyer.location.split(',')[0],
            "addressRegion": lawyer.location.split(',')[1]?.trim()
          },
          "areaServed": lawyer.location,
          "knowsAbout": lawyer.practiceAreas,
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "addressCountry": "US"
            }
          },
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": lawyer.education
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": lawyer.rating,
            "reviewCount": lawyer.reviews,
            "bestRating": 5,
            "worstRating": 1
          },
          "priceRange": lawyer.hourlyRate || "$$",
          "paymentAccepted": "Cash, Check, Credit Card",
          "currenciesAccepted": "USD",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Law Degree",
            "educationalLevel": "Professional",
            "recognizedBy": {
              "@type": "Organization",
              "name": "State Bar Association"
            }
          },
          "memberOf": {
            "@type": "ProfessionalService",
            "name": "Legal Services"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/lawyer/${lawyer.id}/${lawyer.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`
          },
          "potentialAction": {
            "@type": "ContactAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `tel:${lawyer.phone.replace(/[^\d]/g, '')}`,
              "inLanguage": lawyer.languages || ["English"]
            }
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Legal Services",
            "itemListElement": lawyer.practiceAreas.map((area, index) => ({
              "@type": "Offer",
              "position": index + 1,
              "itemOffered": {
                "@type": "Service",
                "name": area,
                "description": `Professional ${area} legal services`,
                "provider": {
                  "@type": "Attorney",
                  "name": lawyer.name
                }
              }
            }))
          },
          "faqPage": {
            "@type": "FAQPage",
            "mainEntity": dynamicFAQ.map(qa => ({
              "@type": "Question",
              "name": qa.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": qa.answer
              }
            }))
          }
        };

      case 'practiceArea':
        if (!practiceArea) return null;
        const practiceAreaLawyers = lawyers.filter(l => 
          l.practiceAreas.some(area => area.toLowerCase() === practiceArea.toLowerCase())
        );
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${practiceArea} Lawyers Directory`,
          "description": `Find experienced ${practiceArea} attorneys. Browse verified lawyers specializing in ${practiceArea} with client reviews and ratings.`,
          "url": `${baseUrl}/practice-area/${practiceArea.toLowerCase().replace(/\s+/g, '-')}`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": practiceAreaLawyers.length,
            "itemListElement": practiceAreaLawyers.map((lawyer, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Attorney",
                "name": lawyer.name,
                "description": lawyer.bio,
                "image": lawyer.image,
                "telephone": lawyer.phone,
                "email": lawyer.email,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": lawyer.location.split(',')[0],
                  "addressRegion": lawyer.location.split(',')[1]?.trim()
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": lawyer.rating,
                  "reviewCount": lawyer.reviews
                }
              }
            }))
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Practice Areas",
                "item": `${baseUrl}/practice-areas`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": practiceArea,
                "item": `${baseUrl}/practice-area/${practiceArea.toLowerCase().replace(/\s+/g, '-')}`
              }
            ]
          }
        };

      case 'location':
        if (!location) return null;
        const locationLawyers = lawyers.filter(l => 
          l.location.toLowerCase().includes(location.toLowerCase())
        );
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `Lawyers in ${location}`,
          "description": `Find qualified attorneys in ${location}. Browse local lawyers with verified credentials and client reviews.`,
          "url": `${baseUrl}/lawyers-in/${location.toLowerCase().replace(/\s+/g, '-')}`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": locationLawyers.length,
            "itemListElement": locationLawyers.map((lawyer, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Attorney",
                "name": lawyer.name,
                "description": lawyer.bio,
                "image": lawyer.image,
                "telephone": lawyer.phone,
                "email": lawyer.email,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": lawyer.location.split(',')[0],
                  "addressRegion": lawyer.location.split(',')[1]?.trim()
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": lawyer.rating,
                  "reviewCount": lawyer.reviews
                }
              }
            }))
          }
        };

      case 'directory':
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Professional Lawyers Directory",
          "description": "Comprehensive directory of verified attorneys across all practice areas and locations.",
          "url": `${baseUrl}/lawyers`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": lawyers.length,
            "itemListElement": lawyers.slice(0, 20).map((lawyer, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Attorney",
                "name": lawyer.name,
                "description": lawyer.bio,
                "image": lawyer.image,
                "telephone": lawyer.phone,
                "email": lawyer.email,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": lawyer.location.split(',')[0],
                  "addressRegion": lawyer.location.split(',')[1]?.trim()
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": lawyer.rating,
                  "reviewCount": lawyer.reviews
                }
              }
            }))
          }
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();
  
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};