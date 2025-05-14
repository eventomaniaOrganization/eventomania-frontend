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
      {/* Featured Events Section */}
      <div className="featured-events my-5">
      <h3 className="text-center fw-bold mb-4">✨ Utvalda Evenemang ✨</h3>
      <div className="row justify-content-center">
      {events
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map((event) => (
      <div key={event.id} className="col-md-4 mb-4">
      <div className="card shadow-lg border-0 h-100">
      <img
        src={event.image}
        alt={event.title}
        className="card-img-top"
        style={{ maxHeight: 320, objectFit: "cover" }}
      />
      <div className="card-body">
        <h4 className="card-title fw-bold text-primary">{event.title}</h4>
        <p className="card-text text-muted">
        Start: {new Date(event.startDateTime).toLocaleString("sv-SE")}
        </p>
        <a
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        >
        Läs mer
        </a>
      </div>
      </div>
      </div>
      ))}
      </div>
      </div>

      {/* Popular Events Section */}
      <div className="popular-events my-5">
      <h3 className="text-center fw-bold mb-4">🔥 Populärt Just Nu</h3>
      <div className="row justify-content-center">
      {(() => {
      // Get IDs of featured events
      const featuredIds = events
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map(e => e.id);

      // Välj 8 slumpmässiga eventer som INTE är med bland featured
      const availableEvents = events.filter(event => !featuredIds.includes(event.id));
      const shuffled = availableEvents.slice().sort(() => 0.5 - Math.random());
      const popularEvents = shuffled.slice(0, 8);

      if (popularEvents.length === 0) {
      return (
        <div className="text-center text-muted">Inga populära evenemang just nu.</div>
      );
      }

      return popularEvents.map((event) => (
      <div key={event.id} className="col-md-4 mb-4">
        <div className="card border-0 shadow-sm h-100">
        <img
        src={event.image}
        alt={event.title}
        className="card-img-top"
        style={{ maxHeight: 200, objectFit: "cover" }}
        />
        <div className="card-body">
        <h5 className="card-title fw-bold">{event.title}</h5>
        <p className="card-text text-muted">
        Start: {new Date(event.startDateTime).toLocaleString("sv-SE")}
        </p>
        <a
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-primary btn-sm"
        >
        Läs mer
        </a>
        </div>
        </div>
      </div>
      ));
      })()}
      </div>
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
      </div>
    );

    function handleCategoryClick(category) {
      window.location.href = `/category/${category}`;
    }
  }
  
  export default Home;
  