import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService';
import '../asset/scss/index.css';

const ALLOWED_CATEGORIES = ['Konsert', 'Teater', 'Sport'];

// Filtrerar endast event i juni och juli
const isSummerEvent = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  return month === 6 || month === 7;
};

const Offers = () => {
  const [offersByCategory, setOffersByCategory] = useState({});

  useEffect(() => {
    const loadOffers = async () => {
      const events = await fetchEvents();

      // Filtrerar bort events som inte finns i ALLOWED_CATEGORIES förutom juni och juli månad
      const filtered = events.filter(
        (event) =>
          event.category &&
          ALLOWED_CATEGORIES.includes(event.category) &&
          isSummerEvent(event.startDateTime)
      );

      // Grupperar events per kategori
      const grouped = ALLOWED_CATEGORIES.reduce((acc, category) => {
        acc[category] = filtered.filter((e) => e.category === category);
        return acc;
      }, {});

      setOffersByCategory(grouped);
    };

    loadOffers();
  }, []);

  const formatStartDateTime = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hh}:${min}`;
  };

  // Slumpmässig rabatt mellan 10% och 50% i steg om 5%
  const getRandomDiscount = () => (Math.floor(Math.random() * 9) + 2) * 5;

  return (
    <div className="container py-3 mt-5">
      <h1 className="mb-5">
        🎫 Sommarrabatt – upp till 50% på utvalda event! 🎫
      </h1>

      <div className="offers-grid-container">
        {ALLOWED_CATEGORIES.map((category) => (
          <div
            key={category}
            className="offers-category-column"
          >
            <h2 className="mb-3">{category}</h2>

            {offersByCategory[category] &&
            offersByCategory[category].length > 0 ? (
              offersByCategory[category].map((event) => {
                const originalPrice = event.price;

                // Hämta slumpmässig rabatt i steg om 5%
                const discountPercent = getRandomDiscount();

                const discountedPrice = Math.round(
                  originalPrice * (1 - discountPercent / 100)
                );

                return (
                  <div
                    key={event.id}
                    className="offer-card mb-4"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="offer-img"
                    />
                    <div>
                      <h3>{event.title}</h3>
                      <p>
                        <strong>Kategori:</strong> {event.category}
                      </p>
                      <p>
                        <strong>Start:</strong>{' '}
                        {formatStartDateTime(event.startDateTime)}
                      </p>
                      <p>
                        <strong>Plats:</strong>
                        {event.address?.text}
                      </p>

                      {/* Visar både originalpris och rabatt */}
                      <p>
                        <strong>Pris:</strong>{' '}
                        <span
                          style={{
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}
                        >
                          {originalPrice} kr
                        </span>{' '}
                        →{' '}
                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                          {discountedPrice} kr
                        </span>{' '}
                        <span className="badge bg-success">
                          {discountPercent}% rabatt
                        </span>
                      </p>

                      {event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Boka nu
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Inga erbjudanden för {category}.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
