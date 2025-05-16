import {useEffect, useState} from 'react';
import {collection, getDocs, query, orderBy, limit} from "firebase/firestore";
import { db } from "../firebaseConfig";
import '../asset/scss/index.css';

//swiper 
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay ,Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MapEvents from '../components/MapEvents';

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
      <div className="container">
        <div className='home py-5'>
        <h2 className='mb-4 text-center fw-bold text-gradient'>🌟 Kommande Evenemang 🌟</h2>
        <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        autoplay={{delay: 5000, disableOnInteraction: false }}
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
          <div className='event-card p-3 border rounded shadow-sm bg-light'>
          <img src={event.image} alt={event.title} className='img-fluid rounded mb-2'/>
          <h5 className='fw-bold text-primary'>{event.title}</h5>
          <p className='text-muted'>
          Start: {new Date(event.startDateTime).toLocaleString("sv-SE")}
          </p>
          <a href={event.registrationLink} target='_blank' rel='noopener noreferrer' className="btn btn-primary btn-sm">
          Läs mer
          </a>
          </div>
          </SwiperSlide>
        ))}
        </Swiper>
        </div>

        <div className='category py-5'>
          <h3 className='text-center fw-bold mb-4'>Utforska Kategorier</h3>
          <div className='d-flex justify-content-center flex-wrap gap-3'>
            <button className='btn btn-outline-primary' onClick={() => handleCategoryClick('Musik')}>Musik</button>
            <button className='btn btn-outline-secondary' onClick={() => handleCategoryClick('Sport')}>Sport</button>
            <button className='btn btn-outline-success' onClick={() => handleCategoryClick('Konst')}>Konst</button>
            <button className='btn btn-outline-danger' onClick={() => handleCategoryClick('Teknik')}>Teknik</button>
            <button className='btn btn-outline-warning' onClick={() => handleCategoryClick('Mat')}>Mat</button>
          </div>
        </div>

        <MapEvents></MapEvents>        

      </div>
    );

    function handleCategoryClick(category) {
      window.location.href = `/category/${category}`;
    }
  }
  
  export default Home;
  