import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebaseConfig.jsx';

const firebaseconfig = firebaseConfig

const app = initializeApp(firebaseconfig);

const db = getFirestore(app);

const auth = getAuth(app);

export const fetchAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Events'));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('All events:', events);
    return events;
  } catch (error) {
    console.error('Error fetching all events:', error);
    return [];
  }
};

// Fetch events by city using the Events collection in firestore
export const fetchEventsByCity = async (city) => {
  try {
    const eventsRef = collection(db, 'Events');
    console.log("Firestore instance details:", JSON.stringify(db));
    console.log(`City being searched: ${city}`);
    console.log(`Firestore instance: ${db}`);

    const q = query(eventsRef, where('City', '==', city));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No events found for city: ${city}`);
      return [];
    }

    const fetchedEvents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Fetched ${fetchedEvents.length} events for city: ${city}`);
    return fetchedEvents;
  } catch (error) {
    console.error('Error fetching events by city from Firestore:', error);
    return [];
  }
};

export { db, auth };
