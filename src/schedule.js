import React, { useEffect, useState, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Schedule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const defaultColor = "#7B3D3D";
  const [eventColor, setEventColor] = useState(defaultColor);

  // This useEffect mimics domLoaded
  useEffect(() => {
    const calendarTitle = document.createElement("style");
    const calendarElement = document.getElementById("mycalendar");

    calendarTitle.innerHTML = `
      /* Colors the columns */
      :root {
        --fc-border-color: black;
        --fc-default-bg-color: ${defaultColor}; 
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

      /* Unnamed event opacity */
      .unnamed-event {
        opacity: 0.5 !important;
      }

      /* Custom mirror color */
      .fc-highlight {
        background-color: ${defaultColor} !important;
        opacity: 0.1 !important;
      }
    `;

    document.head.appendChild(calendarTitle);
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

      // Event listeners to update time automatically
      eventDrop: (info) => {
        setSelectedEvent(info.event);
        setEventTitle(info.event.title);
        setStartTime(formatTimeForInput(info.event.start));
        setEndTime(formatTimeForInput(info.event.end));
        console.log("event drop endtime starttime and id", info.event.start);
      },
      eventResize: (info) => {
        setSelectedEvent(info.event);
        setEventTitle(info.event.title);
        setStartTime(formatTimeForInput(info.event.start));
        setEndTime(formatTimeForInput(info.event.end));
        console.log("event resize endtime starttime and id", info.event.start);
      },

      select: (info) => {
        // Remove unnamed events before making new events
        calendar.getEvents().forEach((event) => {
          if (!event.title.trim()) {
            event.remove();
          }
        });

        const newEvent = calendar.addEvent({
          title: "",
          start: info.start,
          end: info.end,
          allDay: info.allDay,
          backgroundColor: defaultColor,
          borderColor: defaultColor,
          classNames: ["unnamed-event"], // Add a class for styling
        });
        setSelectedEvent(newEvent);
        console.log("i am setting new event", selectedEvent);
        //okay, it seems like i am setting the neew event here, but after this step ,it is becoming null 
        setEventTitle(newEvent.title);
        setStartTime(formatTimeForInput(newEvent.start));
        setEndTime(formatTimeForInput(newEvent.end));
        setEventColor(defaultColor);
        console.log("newevent endtime starttime and id",  newEvent.start);

        calendar.unselect();
      },

      eventClick: (info) => {
        setSelectedEvent(info.event);
        setEventTitle(info.event.title);
        setStartTime(formatTimeForInput(info.event.start));
        setEndTime(formatTimeForInput(info.event.end));
        setEventColor(info.event.backgroundColor);
        console.log("eventclick drop endtime starttime and id", info.event.start);
      },
    });
    calendar.render();

    // calender background click logic
    const handleCalendarClick = (click) => {
      // removes untitled events
      calendar.getEvents().forEach((event) => {
        console.log(event.title);
        if (event.title === "") {
          event.remove();
        }
      });

      // reset selected events
      if (!click.target.closest(".fc-event")) {
        console.log("i am entering the code to set to null");
        setSelectedEvent(null);
        console.log("i am setting it to null");
        // okaay...i a not setting it to null
        setEventTitle("");
        setStartTime("");
        setEndTime("");
      }
    };

    calendarElement.addEventListener("click", handleCalendarClick);
    // Cleanup
    return () => {
      calendarElement.removeEventListener("click", handleCalendarClick);

      document.head.removeChild(calendarTitle);
      calendar.destroy();
    };
  }, []);

  // backspace removes event
  useEffect(() => {
    // Defensive check to ensure selectedEvent and its properties are not null/undefined
    if (selectedEvent && selectedEvent.start) {
      document.addEventListener("keydown", handleKeyDown);
      console.log("Selected event start time:", selectedEvent.start);
      //okay, i enter here.....and selected evnet start tie does work?
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      console.warn("selectedEvent or selectedEvent.start is null/undefined");
    }
  }, [selectedEvent]);
  

  const handleKeyDown = (keypress) => {
    if (keypress.key === "Backspace" && selectedEvent) {
      removeEvent(selectedEvent);
    }
  };


  // useEffect(() => {
  //   console.log("logging changes", selectedEvent.end);
  //   //null here
  // }, [selectedEvent]);

  const formatTimeForInput = (date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (selectedEvent) {
      if (!eventTitle.startsWith(" ")) {
        selectedEvent.setProp("title", eventTitle.trim());
        selectedEvent.setProp("classNames", []); // Remove the unnamed-event class
        setSelectedEvents(selectedEvent);
      } else {
        console.error("Can't with a space");
      }
    }
  };

  const removeEvent = (event) => {
    event.remove();
    console.log("i am entering code to set it to null via removeevent");
    setSelectedEvent(null);
    console.log("i am setting it to null by removing");
    //nevermind, not happening here
    setEventTitle("");
    setStartTime(null);
    setEndTime(null);
  };

  const handleColorChange = (color) => {
    setEventColor(color);
    if (selectedEvent) {
      selectedEvent.setProp("backgroundColor", color);
      selectedEvent.setProp("borderColor", color);
      setSelectedEvent(selectedEvent); //this is the fix....
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
        {/* usestate: selectedevent becomes non-null when you have an event in focus that you 'selected' */}
        {/* this is becoming always null for some reason */}
        {selectedEvent ? (
          <div>
            {/* Title */}
            <input
              type="text"
              value={eventTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleBlur();
                }
              }}
            />
            {/* Time */}
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
            {/* Color */}
            <div style={{ marginTop: "10px" }}>
              <label>Tag: </label>
              <input
                type="color"
                value={eventColor}
                onChange={(e) => handleColorChange(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
              {/* */}
            </div>
          </div>
        ) : (
          <p>Select an event to edit</p>
        )}
      </div>

      {/* Calendar */}
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
