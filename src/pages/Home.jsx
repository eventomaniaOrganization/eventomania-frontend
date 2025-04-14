import {useEffect, useState} from 'react';
import {collection, getDocs, query, orderBy, limit} from "firebase/firestore";
import { db } from "../firebaseConfig";

//swiper 
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchLatestEvents = async () => {
      const eventsRef = collection(db, "events")
      const q = query(eventsRef, orderBy("startDateTime"), limit(10))
      const snapshot = await getDocs(q)

      const eventList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))

      setEvents(eventList)
    }

    fetchLatestEvents()
  }, [])


    return (
      <div className="home container py-5">
        <h2 className='mb-4 text-center fw-bold'>Kommande Evenemang</h2>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{clickable: true}}
          breakpoints={{
            768: {slidesPerView: 2},
            1024: {slidesPerView: 3}
          }}
        >

          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className='event-card p-3 border rounded shadow-sm'>
                <img src={event.image} alt={event.title} className='img-fluid rounded mb-2'/>
                <h5 className='fw-bold'>{event.title}</h5>
                <p className='text-muted'>
                  Start: {new Date(event.startDateTime).toLocaleString("sv-SE")}
                </p>
                <a href={event.registrationLink} target='_blank' rel='noopener noreferrer' className="btn btn-primary btn-sm">
                  läs mer
                </a>
              </div>
            </SwiperSlide>
          ))}
          
          
        </Swiper>
      </div>
    );
  }
  
  export default Home;
  