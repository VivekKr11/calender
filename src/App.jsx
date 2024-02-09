import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./App.css"

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noticeImages, setNoticeImages] = useState({});
  const [renderCalendar, setRenderCalendar] = useState(false);

  const updateNoticeImages = (year, month, day) => {
    // Replace the following with the logic to fetch notice images for the selected date or month
    // For demonstration purposes, I'm using sample URLs
    const dateKey = `${year}-${month + 1}-${day}`;
    const monthKey = `${year}-${month + 1}`;

    // Fetch notice images for the selected date and month (replace with your logic)
    const dateImages = [`https://example.com/notice1-${dateKey}.jpg`, `https://example.com/notice2-${dateKey}.jpg`];
    const monthImages = [`https://example.com/notice1-${monthKey}.jpg`, `https://example.com/notice2-${monthKey}.jpg`];

    setNoticeImages({
      ...noticeImages,
      [dateKey]: dateImages,
      [monthKey]: monthImages,
    });
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
    updateNoticeImages(year, month, day);
  }, [selectedDate]);

  const handleTabClick = (btnYear) => {
    setSelectedDate(new Date(btnYear, month, day));
    updateNoticeImages(btnYear, month, day);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth();
    const selectedDay = date.getDate();
    updateNoticeImages(selectedYear, selectedMonth, selectedDay);
  };

  return (
    <div className='container flex flex-row items-center justify-between m-auto'>
      <div className='w-2/3'>
        <div className="mt-4">
          <h1 className='text-6xl' > Notices for  {selectedDate.toDateString()}</h1>
          {noticeImages[`${year}-${month + 1}-${day}`] && (
            noticeImages[`${year}-${month + 1}-${day}`].map((imageUrl, index) => (
              <>

                <img
                  key={index}
                  src={imageUrl}
                  alt={`Notice for ${getMonthName(month)} ${day}, ${year}`}
                  className="max-w-full mb-2"
                />
              </>
            ))
          )}
          <h1 className='text-6xl'>Notices for {selectedDate.toLocaleString('en-US', { month: 'long' })}</h1>
          {noticeImages[`${year}-${month + 1}`] && (
            noticeImages[`${year}-${month + 1}`].map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Notice for ${getMonthName(month)} ${year}`}
                className="max-w-full mb-2"
              />
            ))
          )}
        </div>
      </div>
      <div className="w-1/3  p-4">
        <h1 className="text-2xl font-bold mb-4">Notice Board Calendar</h1>
        <div className="flex flex-wrap space-x-4 mb-4">
          {Array.from({ length: 9 }, (_, index) => 2016 + index).map((btnYear) => (
            <button
              key={btnYear}
              onClick={() => handleTabClick(btnYear)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded"
            >
              {btnYear}
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Notices for {getMonthName(month)} {year}</h2>
          {renderCalendar && (
            <div className='flex items-center justify-center'>
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
              />

            </div>
          )}
          <p className='text-center'><b>Selected Date:</b> {selectedDate.toDateString()}</p>

        </div>
      </div>

    </div>

  );
};

export default CalendarApp;
