import { faker } from "@faker-js/faker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const populateLargeEvent = async (count = 500) => {
    const eventsRef = collection(db, 'events')
    const randomOffsetLat = () => (Math.random() - 0.5) * 0.09;  // ca ±5 km
    const randomOffsetLon = () => (Math.random() - 0.5) * 0.15;  // ca ±5 km

    for (let i = 0; i < count; i++) {
        const fakeEvent = {
            title: faker.company.catchPhrase(),
            description: faker.lorem.paragraph(),
            image: faker.image.urlPicsumPhotos({ width: 800, height: 400 }), // unik bild
            address: {
                text: "Helsingborg, Sverige",
                lat: 56.0465 + randomOffsetLat(),
                lon: 12.6945 + randomOffsetLon()
            },
            startDateTime: faker.date.soon({ days: 60 }).toISOString(),
            endDateTime: faker.date.soon({ days: 60, refDate: new Date(Date.now() + 2 * 3600000) }).toISOString(),
            category: faker.helpers.arrayElement([
                'Konsert', 'Festival', 'Teater', 
                'Sport', 'Marknad', 'Musik', 
                'Välgörenhet och ändamål', 'Affärer',  
                'Underhållning']),
            price: faker.number.int({ min: 0, max: 1000 }),
            registrationLink: faker.internet.url(),
            moreInfoLink: faker.internet.url()
        };

        try{
            await addDoc(eventsRef, fakeEvent)
            if((i + 1) % 100 === 0){
                console.log(`${i + 1}: event skapades`)
            }

        }
        catch(err){
            console.error(`fel vid event ${i + 1}`, err)
        }
    }
    console.log("klar alla event skapades")

}