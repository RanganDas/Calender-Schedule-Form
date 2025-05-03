Studio Booking App (React)
This is a Studio Booking Application built with React. It allows users to book time slots for studio sessions, join their sessions during the allocated window, and manage or cancel bookings. The app handles timing, validation, and auto-cancellation without the need for a backend.

Features
Book studio sessions for a specific time slot

Generate and display a unique 6-digit booking code

Join the session during the allotted time window

Auto-cancel bookings that are not joined within 30 minutes

View a list of upcoming bookings

Cancel a booking using a valid booking code

Functionality Overview
Booking Form
Users are prompted to provide:

Name

Email

Phone number (with country code selector)

Date

Time slot (15-minute intervals between 9:00 AM and 9:00 PM)

Form validations include:

All fields must be filled out

Email and phone formats must be valid

The selected date/time must be in the future

The time slot must be available (not already booked)

Booking Code Generation
A random 6-digit booking code is generated upon successful booking

The code is shown in a modal

The booking details are stored in localStorage

Reminders and Auto-Cancellation
A setInterval checks every second whether a session is due

If a session is due and the user hasn't joined, an alert is shown

If 30 minutes pass and the session remains unjoined, it is automatically canceled

Join and Cancel Booking
Users may join only during their scheduled 30-minute window

Upon joining, the booking is moved to a joinedBookings list in localStorage

Bookings can be canceled using the associated 6-digit code

Data Persistence
All booking data is stored in the browser's localStorage

Data and session states are preserved even after page reload

File Structure
App.js: Contains the full application logic and UI

App.css: Responsible for styling, layout, modal design, and component visuals

Tech Stack
React (with Hooks: useState, useEffect)

JavaScript (ES6+)

Browser localStorage for temporary persistence

Basic CSS for UI styling

Design Decisions
LocalStorage over Backend: Chosen for quick prototyping and simplicity

Real-time Booking Checks: Implemented using setInterval for timely reminders and cancellations

Short Time Intervals: 15-minute slots ensure efficient scheduling

Booking Code Validation: Offers basic authentication without requiring user accounts

Future Improvements
Integrate a backend (Node.js with MongoDB or Firebase) for persistent data storage

Implement user authentication using JWT for session tracking

Add email notifications for booking confirmations, reminders, and cancellations

Develop an admin dashboard for managing bookings and viewing activity logs

Improve responsiveness and accessibility for mobile devices

Handle multi-user concurrency and booking conflict resolution

Build an analytics dashboard to display booking patterns and usage statistics
