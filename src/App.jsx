import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [renderCalendar, setRenderCalendar] = useState(false);

  const yearMonthImages = {
    2016: {
      0: 'https://example.com/2016-january.jpg',
      1: 'https://example.com/2016-february.jpg',
      2: 'https://example.com/2016-march.jpg',
    },
    2017: {
      0: 'https://example.com/2017-january.jpg',
      1: 'https://example.com/2017-february.jpg',
      2: 'https://example.com/2017-march.jpg',
    },
   
  };

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const day = selectedDate.getDate();

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthNames[month];
  };

  useEffect(() => {
    setRenderCalendar(false); 
    setTimeout(() => setRenderCalendar(true), 0); 
  }, [selectedDate]);

  const handleTabClick = (btnYear) => {
    setSelectedDate(new Date(btnYear, month, day));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yearly Calendar App</h1>
      <div className="flex space-x-4 mb-4">
        {Array.from({ length: 9 }, (_, index) => 2016 + index).map((btnYear) => (
          <button
            key={btnYear}
            onClick={() => handleTabClick(btnYear)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {btnYear}
          </button>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Calendar for {getMonthName(month)} {year}</h2>
        {renderCalendar && (
          <>
            <Calendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
            <div className="mt-4">
              {yearMonthImages[year] && yearMonthImages[year][month] && (
                <img
                  src={yearMonthImages[year][month]}
                  alt={`Image for ${getMonthName(month)} ${year}`}
                  className="max-w-full"
                />
              )}
            </div>
          </>
        )}
        <p>Selected Date: {selectedDate.toDateString()}</p>
      </div>
    </div>
  );
};

export default CalendarApp;
