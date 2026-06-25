import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function useSEO() {
  useEffect(() => {
    const fetchAndApplySEO = async () => {
      try {
        const docRef = doc(db, "settings", "seo");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          if (data.metaTitle) {
            document.title = data.metaTitle;
          }
          
          if (data.metaDescription) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement('meta');
              metaDesc.setAttribute('name', 'description');
              document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', data.metaDescription);
          }
          
          if (data.keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
              metaKeywords = document.createElement('meta');
              metaKeywords.setAttribute('name', 'keywords');
              document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', data.keywords);
          }
        }
      } catch (error) {
        console.error("Failed to fetch SEO settings:", error);
      }
    };

    fetchAndApplySEO();
  }, []);
}
