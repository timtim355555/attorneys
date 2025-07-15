import React, { useState } from 'react';
import { Users } from 'lucide-react';

interface LazyImageProps {
   src: string;
   alt: string;
   className: string;
   priority?: boolean;
   loading?: 'lazy' | 'eager';
}

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  loading = 'lazy'
}) => {
   const [loaded, setLoaded] = useState(false);
   const [error, setError] = useState(false);
   const [inView, setInView] = useState(priority);
   const imgRef = React.useRef<HTMLImageElement>(null);

   // Intersection Observer for lazy loading
   React.useEffect(() => {
     if (priority || inView) return;
    
     const observer = new IntersectionObserver(
       (entries) => {
         if (entries[0].isIntersecting) {
           setInView(true);
           observer.disconnect();
         }
       },
       { 
         threshold: 0.1,
         rootMargin: '50px' // Start loading 50px before entering viewport
       }
     );
    
     if (imgRef.current) {
       observer.observe(imgRef.current);
     }
    
     return () => observer.disconnect();
   }, [priority, inView]);

   React.useEffect(() => {
     if (priority) {
       // Create link element for preloading
       const link = document.createElement('link');
       link.rel = 'preload';
       link.as = 'image';
       link.href = src;
       link.fetchPriority = 'high';
       document.head.appendChild(link);
      
       return () => {
         if (document.head.contains(link)) {
           document.head.removeChild(link);
         }
       };
     }
   }, [src, priority]);

   return (
     <div 
       ref={imgRef}
       className={`${className} bg-gray-200 flex items-center justify-center relative overflow-hidden`}
     >
       {!loaded && !error && (
         <div className="animate-pulse bg-gray-300 w-full h-full flex items-center justify-center absolute inset-0">
           <Users className="h-8 w-8 text-gray-400" />
         </div>
       )}
      
       {(inView || priority) && (
         <img
           src={src}
           alt={alt}
           className={`${className} transition-opacity duration-300 ${
             loaded ? 'opacity-100' : 'opacity-0'
           } ${error ? 'hidden' : ''}`}
           onLoad={() => setLoaded(true)}
           onError={() => setError(true)}
           loading={priority ? 'eager' : loading}
           decoding={priority ? 'sync' : 'async'}
           fetchPriority={priority ? 'high' : 'auto'}
         />
       )}
      
       {error && (
         <div className={`${className} bg-gray-100 flex items-center justify-center absolute inset-0`}>
           <Users className="h-8 w-8 text-gray-400" />
         </div>
       )}
     </div>
   );
};