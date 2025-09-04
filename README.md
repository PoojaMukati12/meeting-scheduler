# 📝 Meeting Scheduler Dashboard

A full-stack **Meeting Scheduler** web app built with **React, Firebase, and Kinde OAuth**, allowing business owners to schedule, view, and manage meetings efficiently.

---

## Features & Highlights

- **User Authentication**  
  - Login/logout using **Kinde OAuth** for business users.  
  - Secured pages accessible only to logged-in users.  

- **Dashboard**  
  - View **upcoming** and **expired meetings** in separate tabs.  
  - Quick overview of scheduled meetings.  
  - **Schedule New Meeting** button redirects to the meeting page for creating a new meeting.  

- **Schedule Meeting Page**  
  - Automatically generates meeting event ID for new meetings.  
  - Displays meeting details if a meeting already exists.  
  - Real-time scheduling based on business availability.  

- **Meeting Details**  
  - Shows date, time, duration, and meeting location (e.g., Zoom link).  
  - Displays participant info and notes.  
  - Filter meetings dynamically by upcoming or expired.  

- **Settings Section**  
  - Simple, static placeholder for profile & preferences.  
  - Clean card UI for a polished dashboard look.  

- **Firebase Integration**  
  - Firestore database stores meetings and users.  
  - Real-time fetching of meetings based on business email.  

- **React & Tailwind**  
  - Built with React functional components and hooks.  
  - Responsive and visually clean UI using Tailwind CSS.  

- **Routing & Navigation**  
  - Dynamic routes: `/[businessEmail]/[meetingEventId]` for meeting pages.  
  - Schedule button generates event and redirects automatically.  

- **Future Ready**  
  - Placeholder sections (like Settings) for further enhancements.  
  - Structure ready for integration with **live chat** and external calendar APIs (Google Calendar / Calendly).  


