import React, { useState } from 'react';
import { MdOutlinePeopleAlt } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { FaEarthAfrica } from "react-icons/fa6";
import "./BookingForm.css";

export default function BookingForm() {
  const [participants, setParticipants] = useState(1);
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('english');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the submission, e.g., send data to a backend server
    alert(`Booking made for ${participants} participants on ${date} with ${language} language.`);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="participants"> <MdOutlinePeopleAlt /> Select participants</label>
        <select
          id="participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        >
          <option value="1">1 People</option>
          <option value="2">2 People</option>
          <option value="3">3 People</option>
          <option value="4">4 People</option>
          <option value="5">5 People</option>
          <option value="6">6 People</option>
          <option value="7">7 People</option>
          <option value="8">8 People</option>
        </select>
      </div>
      
      <div className="input-group">
        <label htmlFor="date"><CiCalendarDate /> Select date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="language"><FaEarthAfrica /> Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="english">English</option>
          <option value="thai">Thai</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>
      
      <button type="submit" className="booking-btn">BOOKING</button>
    </form>
  );
}
