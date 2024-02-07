import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarApp = () => {
  const [selectedYear, setSelectedYear] = useState(new Date());

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
    // Add entries for 2018 to 2024 with URLs for each month
  };

  const year = selectedYear.getFullYear();
  const month = selectedYear.getMonth();

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthNames[month];
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yearly Calendar App</h1>
      <div className="flex space-x-4 mb-4">
        {Array.from({ length: 9 }, (_, index) => 2016 + index).map((btnYear) => (
          <button
            key={btnYear}
            onClick={() => setSelectedYear(new Date(btnYear, month, 1))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {btnYear}
          </button>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Calendar for {year}</h2>
        <Calendar
          value={selectedYear}
          onChange={(date) => setSelectedYear(date)}
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
      </div>
    </div>
  );
};

export default CalendarApp;
