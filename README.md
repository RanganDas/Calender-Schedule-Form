🎙️ Studio Booking App (React)
This is a simple Studio Booking App built using React. It allows users to:

Book a studio session for a specific time slot

Receive a unique booking code

Join the session during their booked slot

Automatically cancel unjoined bookings after 30 minutes

View all upcoming bookings

Cancel a booking with a valid code

Features:

 Auto-reminders for booking time

 Auto-cancellation of inactive bookings

 Real-time slot availability check

 Booking code validation on cancellation

Functionality Breakdown:

1. Booking Form
Users fill out:

Name

Email

Phone (with country code selector)

Date

Time slot (15-minute intervals between 9 AM to 9 PM)

The form checks:

If all fields are filled

Email & phone number format

Future date/time selection

Slot availability

2. Booking Code Generation
On successful booking:

A 6-digit random code is generated

Code is shown in a modal

Booking is stored in localStorage

3. Reminders & Auto-Cancellation
Using setInterval:

The app checks every second if any session is due

If due and not joined → alert user

If 30 minutes pass and user hasn’t joined → auto-cancel the booking

4. Join & Cancel Booking
Users can join only during their 30-min window

Once joined, it is saved in joinedBookings (localStorage)

Canceling a booking requires entering the correct 6-digit code

5. Data Persistence
All booking and join data is saved in localStorage

On page reload, all state is preserved

File Used
App.js: Contains the entire frontend logic and UI

App.css: (Not shown here) should include the styling for layout, modal, buttons, etc.

Tech Stack
React (Hooks: useState, useEffect)

JavaScript (ES6+)

LocalStorage for temporary persistence

Basic CSS for styling


Decisions Made
No Backend: Chose to use localStorage instead of a backend/database for simplicity and quick prototyping.

Time Check Logic: Uses setInterval every second for real-time booking status updates.

15-Minute Slots: Allows for precise control over session durations.

Booking Code Auth: Adds a layer of validation without requiring user authentication.

Future Improvements
 Backend Integration (Node.js + MongoDB or Firebase) to store and manage bookings persistently.

 User Authentication (JWT-based login/signup) to associate bookings with accounts.

 Email Notifications to send confirmation, reminders, and cancellations.

 Admin Panel to manage bookings, see user activity, and manually override sessions.

 Responsive Design and mobile-first enhancements.

 Multi-user Support with conflict-free booking logic for overlapping slots.

 Analytics Dashboard to visualize bookings over time, peak hours, etc.
