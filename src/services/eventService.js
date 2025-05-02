import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const fetchEvents = async () => {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, orderBy("startDateTime"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};