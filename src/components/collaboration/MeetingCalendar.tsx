import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

type Meeting = {
  id: string;
  title: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Declined';
};

export const MeetingCalendar = () => {
  const [events, setEvents] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Investor Meeting',
      date: '2026-07-15',
      status: 'Confirmed',
    },
    {
      id: '2',
      title: 'Startup Pitch',
      date: '2026-07-18',
      status: 'Pending',
    },
  ]);

  const handleDateClick = (info: DateClickArg) => {
    const meetingTitle = prompt('Enter Meeting Title');

    if (!meetingTitle) return;

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title: meetingTitle,
      date: info.dateStr,
      status: 'Pending',
    };

    setEvents((prev) => [...prev, newMeeting]);
  };

  const updateStatus = (
    id: string,
    status: 'Confirmed' | 'Declined'
  ) => {
    setEvents((prev) =>
      prev.map((meeting) =>
        meeting.id === id ? { ...meeting, status } : meeting
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        📅 Meeting Scheduler
      </h2>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        selectable={true}
        editable={true}
        height="auto"
      />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Scheduled Meetings
        </h3>

        {events.map((meeting) => (
          <div
            key={meeting.id}
            className="border rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">
                  {meeting.title}
                </h4>

                <p className="text-gray-500">
                  {meeting.date}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  meeting.status === 'Confirmed'
                    ? 'bg-green-100 text-green-700'
                    : meeting.status === 'Declined'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {meeting.status}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => alert('Meeting Request Sent')}
              >
                Send Request
              </button>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() =>
                  updateStatus(meeting.id, 'Confirmed')
                }
              >
                Accept
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() =>
                  updateStatus(meeting.id, 'Declined')
                }
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};