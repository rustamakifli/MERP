import "../static/css/events.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("You must be logged in to see the events");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/events/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load events");
        setLoading(false);
      }
    };
    const storedRegistrations = localStorage.getItem("registrations");
    if (storedRegistrations) {
        setRegistrations(JSON.parse(storedRegistrations));
    }
    fetchEvents();
  }, []);

  const handleRegistration = async (eventId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("You must be logged in to book or cancel events");
      return;
    }

    if (registrations[eventId]) {
      try {
        const reservationCode = registrations[eventId].reservation_code;
        console.log("Cancelling reservation with code:", reservationCode);
        await axios.delete("http://127.0.0.1:8000/api/v1/events/cancel/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { reservation_code: reservationCode }
        });
        console.log(registrations[eventId].reservation_code);
        setRegistrations((prev) => {
          const updated = { ...prev };
          delete updated[eventId];
          return updated;
        });
      } catch (error) {
        setError("Failed to cancel registration");
      }
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/events/register/",
          { event_id: eventId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRegistrations((prev) => ({
          ...prev,
          [eventId]: response.data,
        }));
        localStorage.setItem("registrations", JSON.stringify({
          ...registrations,
          [eventId]: response.data,
      }));
      } catch (error) {
          if (error.response && error.response.data.error) {
            setError(error.response.data.error); 
        } else {
            setError("Failed to book event");
        }
      }
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 title">Available Events</h1>
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.thumbnail}
                className="event-img"
                alt={event.title}
              />
              <div className="event-body">
                <h5 className="event-title">{event.title}</h5>
                <p className="event-text">
                  <strong>Start Date:</strong>{" "}
                  {new Date(event.start_date).toLocaleDateString()}
                  <br />
                  <strong>End Date:</strong>{" "}
                  {new Date(event.end_date).toLocaleDateString()}
                </p>
                {registrations[event.id] ? (
                  <p className="booking-info">
                    <strong>Booked:</strong> Reservation Code:{" "}
                    {registrations[event.id].reservation_code}
                  </p>
                ) : null}

                <button
                  className={`btn ${
                    registrations[event.id] ? "btn-danger" : "btn-primary"
                  }`}
                  onClick={() => handleRegistration(event.id)}
                >
                  {registrations[event.id] ? "Cancel Booking" : "Book"}
                </button>
                {/* <a href={`/event/${event.id}`} className="btn btn-primary">
                  View Details
                </a> */}
              </div>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default Events;
