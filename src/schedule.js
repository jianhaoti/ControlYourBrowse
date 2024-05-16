import React, { useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Schedule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const formatTimeForInput = (date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const calendarTitle = document.createElement("style");
    calendarTitle.innerHTML = `
      /* Colors the columns */
      :root {
        --fc-border-color: black;
      }

      /* Gray rows between times */
      .fc .fc-timegrid-slot {
        border-color: gray;
      }

      /* External borders black */
      .fc .fc-scrollgrid {
        border-top: 1px solid var(--fc-border-color);
        border-right: none;
        border-bottom: 1px solid var(--fc-border-color);
        border-left: 1px solid var(--fc-border-color);
      }

      /* Remove the highlight for today */
      .fc-day-today {
        background: transparent !important;
      }

      /* Title bar */
      .fc-toolbar-title {
        content: "My Week";
        visibility: hidden;
        position: relative;
      }

      .fc-toolbar-title::after {
        content: "My Week";
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        top: 1.5vh;
        text-align: center;
      }

      /* Responsive day header titles */
      .fc-col-header-cell {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Spacing for Days */
      .fc-col-header-cell .fc-col-header-cell-cushion {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5em;
        font-size: 1em;
      }

      /* Font sizes depending on window size */
      @media (max-width: 768px) {
        .fc-col-header-cell .fc-col-header-cell-cushion {
          font-size: 0.8em;
        }
      }

      @media (max-width: 480px) {
        .fc-col-header-cell .fc-col-header-cell-cushion {
          font-size: 0.6em;
        }
      }

      /* Calendar background color */
      .fc-view {
        background-color: #f1e6e4;
      }

      /* Headers for days of the week */
      .fc-col-header-cell,
      .fc-timegrid-axis {
        background-color: #d1b2ae; /* Lighter shade */
      }
    `;

    document.head.appendChild(calendarTitle);

    const calendarElement = document.getElementById("mycalendar");
    const calendar = new Calendar(calendarElement, {
      plugins: [timeGridPlugin, interactionPlugin],
      headerToolbar: {
        center: "title",
        left: "",
        right: "",
      },
      slotMinTime: "00:00:00",
      slotMaxTime: "24:00:00",
      slotDuration: "00:15:00", // 15-minute increments
      slotLabelInterval: "01:00:00", // Label every 1 hr
      editable: true,
      droppable: true,
      allDaySlot: false,
      dayHeaderFormat: { weekday: "long" },
      initialView: "timeGridWeek",
      height: 100, // limit the content height
      windowResize: () => {
        calendar.updateSize(); // Update calendar size on window resize
      },
      eventResizableFromStart: true, // Allow resizing from start
      eventDurationEditable: true, // Allow event duration editing
      selectable: true, // Enable selection
      selectMirror: true, // Show a placeholder for the selection

      // Event listeners to update time automatically
      eventDrop: (info) => {
        setSelectedEvent(info.event);
        setEventTitle(info.event.title);
        setStartTime(formatTimeForInput(info.event.start));
        setEndTime(formatTimeForInput(info.event.end));
      },
      eventResize: (info) => {
        setSelectedEvent(info.event);
        setEventTitle(info.event.title);
        setStartTime(formatTimeForInput(info.event.start));
        setEndTime(formatTimeForInput(info.event.end));
      },

      select: (info) => {
        const newEvent = calendar.addEvent({
          title: "New Event",
          start: info.start,
          end: info.end,
          allDay: info.allDay,
        });
        setSelectedEvent(newEvent);
        setEventTitle(newEvent.title);
        setStartTime(formatTimeForInput(newEvent.start));
        setEndTime(formatTimeForInput(newEvent.end));

        calendar.unselect(); // Clear the selection
      },

      eventClick: (info) => {
        setSelectedEvent(info.event);
        setEventTitle(info.event.title);
        setStartTime(formatTimeForInput(info.event.start));
        setEndTime(formatTimeForInput(info.event.end));
      },
    });
    calendar.render();

    // Handle clicks outside of events
    const handleCalendarClick = (event) => {
      if (!event.target.closest(".fc-event")) {
        setSelectedEvent(null);
        setEventTitle("");
        setStartTime("");
        setEndTime("");
      }
    };

    calendarElement.addEventListener("click", handleCalendarClick);

    // Cleanup
    return () => {
      document.head.removeChild(calendarTitle);
      calendar.destroy(); // Also ensure you clean up the calendar instance
      calendarElement.removeEventListener("click", handleCalendarClick);
    };
  }, []);

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
    if (selectedEvent) {
      selectedEvent.setProp("title", e.target.value);
    }
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);

    // Handle cross-day events
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const durationMs = endDate - startDate;
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      id="main-container"
      style={{ display: "flex", height: "100vh", width: "100%" }}
    >
      <div
        id="details-column"
        style={{
          width: "200px",
          padding: "10px",
          borderRight: "1px solid #ccc",
          backgroundColor: "#c9ada7",
        }}
      >
        <h3>Event</h3>
        {selectedEvent ? (
          <div>
            <input
              type="text"
              value={eventTitle}
              onChange={handleTitleChange}
            />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: "1", marginRight: "2px" }}>{startTime}</div>
              <span style={{ margin: "0 2px" }}>→</span>
              <div style={{ flex: "1", marginLeft: "2px" }}>{endTime}</div>
              <div style={{ marginLeft: "10px", color: "gray" }}>
                {calculateDuration(startTime, endTime)}
              </div>
            </div>
          </div>
        ) : (
          <p>Select an event to edit</p>
        )}
      </div>
      <div
        id="mycalendar-container"
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "2vw",
          paddingRight: "2vw",
          paddingBottom: "10vh",
        }}
      >
        <div id="mycalendar" style={{ flex: "1" }}></div>
      </div>
    </div>
  );
};

export default Schedule;
