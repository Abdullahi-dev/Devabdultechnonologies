import { collection, serverTimestamp, getDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { FALLBACK_ARTICLES } from "../constants/fallbackArticles";

export const seedDatabase = async () => {
  try {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.error("You must be logged in to seed the database.");
      return false;
    }
    
    for (const key in FALLBACK_ARTICLES) {
      const article = FALLBACK_ARTICLES[key];
      const docRef = doc(db, "blogs", article.slug);
      const docSnap = await getDoc(docRef);
      
      const data: any = {
        title: article.title,
        category: article.category,
        status: "published",
        image: article.image,
        slug: article.slug,
        excerpt: article.content.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...',
        content: article.content,
        allowComments: article.allowComments || false,
        keywords: article.keywords || "",
        authorUid: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email || "Admin",
        updatedAt: serverTimestamp(),
        publishedAt: serverTimestamp(),
      };
      
      if (!docSnap.exists()) {
        data.createdAt = serverTimestamp();
        await setDoc(docRef, data);
        console.log(`Seeded article: ${article.title}`);
      } else {
        // Update existing, preserving createdAt
        await setDoc(docRef, data, { merge: true });
        console.log(`Updated article: ${article.title}`);
      }
    }
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
};
