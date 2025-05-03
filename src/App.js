import React, { useState, useEffect } from "react";
import "./App.css";

const timeSlots = [
  "09:00 AM",
  "09:15 AM",
  "09:30 AM",
  "09:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
  "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "01:00 PM",
  "01:15 PM",
  "01:30 PM",
  "01:45 PM",
  "02:00 PM",
  "02:15 PM",
  "02:30 PM",
  "02:45 PM",
  "03:00 PM",
  "03:15 PM",
  "03:30 PM",
  "03:45 PM",
  "04:00 PM",
  "04:15 PM",
  "04:30 PM",
  "04:45 PM",
  "05:00 PM",
  "05:15 PM",
  "05:30 PM",
  "05:45 PM",
  "06:00 PM",
  "06:15 PM",
  "06:30 PM",
  "06:45 PM",
  "07:00 PM",
  "07:15 PM",
  "07:30 PM",
  "07:45 PM",
  "08:00 PM",
  "08:15 PM",
  "08:30 PM",
  "08:45 PM",
  "09:00 PM",
];

function App() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  });

  const [bookings, setBookings] = useState([]);
  const [confirmation, setConfirmation] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [latestCode, setLatestCode] = useState("");
  const [joinedBookings, setJoinedBookings] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);

    const joined = JSON.parse(localStorage.getItem("joinedBookings")) || {};
    setJoinedBookings(joined);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    bookings.forEach((b, i) => {
      const bookingTime = new Date(`${b.date} ${b.time}`);
      const endTime = new Date(bookingTime.getTime() + 30 * 60000);

      // Reminder when time is reached
      if (
        currentTime.toLocaleString() === bookingTime.toLocaleString() &&
        !joinedBookings[b.code]
      ) {
        alert(`🔔 Reminder: ${b.name}, your booking time has started!`);
      }

      // Auto cancel after 30 mins if not joined
      if (currentTime >= endTime && !joinedBookings[b.code]) {
        const updated = bookings.filter((_, idx) => idx !== i);
        saveBookings(updated);
        setConfirmation(`⏰ ${b.name}'s booking auto-cancelled after no join.`);
        setTimeout(() => setConfirmation(""), 3000);
      }
    });
  }, [currentTime, bookings, joinedBookings]);

  const saveBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const saveJoinedBookings = (updated) => {
    setJoinedBookings(updated);
    localStorage.setItem("joinedBookings", JSON.stringify(updated));
  };

  const isSlotBooked = (date, time) =>
    bookings.some((b) => b.date === date && b.time === time);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { date, time, email, phone, name } = formData;
    const now = new Date();
    const selectedDate = new Date(`${date} ${time}`);

    if (!date || !time || !email || !phone || !name)
      return "All fields are required.";
    if (selectedDate < now) return "Date/time cannot be in the past.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format.";
    if (!/^\+?\d{10,15}$/.test(phone)) return "Invalid phone number.";
    if (isSlotBooked(date, time)) return "Slot already booked.";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const newBooking = { ...formData, code };
    const updated = [...bookings, newBooking];
    saveBookings(updated);

    setConfirmation("🎉 Booking successful!");
    setFormData({ date: "", time: "", name: "", email: "", phone: "" });
    setLatestCode(code);
    setShowCodeModal(true);

    setTimeout(() => setConfirmation(""), 3000);
  };

  const handleJoin = (code) => {
    const updated = { ...joinedBookings, [code]: true };
    saveJoinedBookings(updated);
    alert("✅ You have joined the session!");
  };

  const cancelBooking = (index) => {
    const userCode = prompt("Enter your 6-digit booking code to cancel:");
    if (!userCode) return;

    if (userCode === bookings[index].code) {
      const updated = bookings.filter((_, i) => i !== index);
      saveBookings(updated);
      setConfirmation("❌ Booking cancelled.");
      setTimeout(() => setConfirmation(""), 3000);
    } else {
      alert("❌ Incorrect booking code. Cancellation failed.");
    }
  };

  return (
    <div className="container">
      <h1>🎙️ Studio Booking</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time Slot:
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option
                key={slot}
                value={slot}
                disabled={isSlotBooked(formData.date, slot)}
              >
                {slot} {isSlotBooked(formData.date, slot) ? "(Booked)" : ""}
              </option>
            ))}
          </select>
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>

        <label>Phone:</label>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap", // Allows items to wrap on smaller screens
          }}
        >
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            required
            style={{
              width: "100px",
              minWidth: "80px", // Minimum width to prevent shrinking too much
              flexShrink: 0, // Prevent shrinking the select dropdown
            }}
          >
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+81">🇯🇵 +81</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+33">🇫🇷 +33</option>
            <option value="+86">🇨🇳 +86</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+880">🇧🇩 +880</option>
          </select>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="off"
            style={{
              color: "white",
              flex: 1,
              minWidth: "250px", // Ensure it doesn't shrink too small
              width: "calc(100% - 110px)", // Subtract space taken by country code dropdown
              boxSizing: "border-box", // Ensures padding and borders don't affect width
            }}
          />
        </div>

        <button type="submit" className="book-btn">
          📅 Book Now
        </button>
      </form>

      {confirmation && <div className="alert">{confirmation}</div>}

      {showCodeModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>✅ Booking Confirmed!</h2>
            <p>Your unique booking code is:</p>
            <div className="booking-code">{latestCode}</div>
            <button
              style={{
                border: "none",
                borderRadius: "5px",
                color: "white",
                padding: "5px",
                background: "red",
                width: "100px",
              }}
              onClick={() => setShowCodeModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="booked-list">
        <h2 style={{ color: "white" }}>📋 Booked Slots</h2>
        {bookings.length === 0 ? (
          <p style={{ color: "white" }}>No bookings yet.</p>
        ) : (
          bookings.map((b, i) => {
            const bookingTime = new Date(`${b.date} ${b.time}`);
            const endTime = new Date(bookingTime.getTime() + 30 * 60000);
            const showJoin =
              currentTime >= bookingTime && currentTime < endTime;
            const hasJoined = joinedBookings[b.code];

            return (
              <div key={i} className="booking-item">
                <div>
                  <strong>{b.name}</strong>
                  <br />
                  {b.date} at {b.time}
                </div>
                {showJoin && !hasJoined && (
                  <button
                    className="join-btn"
                    style={{
                      marginRight: "10px",
                      background: "#28a745",
                      color: "white",
                      padding: "5px",
                      width:"100px",
                      border:"none",
                      borderRadius:"5px",
                      fontSize:"15px"
                    }}
                    onClick={() => handleJoin(b.code)}
                  >
                    Join
                  </button>
                )}
                <button className="cancel-btn" onClick={() => cancelBooking(i)}>
                  Cancel
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
