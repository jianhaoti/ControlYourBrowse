import React, { useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

const Schedule = () => {
  const handleAddWeekly = () => {
    const draggableElement = document.getElementById("mydraggable");

    let eventTitle = prompt("Enter event title:");
    if (eventTitle) {
      let newEvent = document.createElement("div");
      newEvent.className = "fc-event";
      newEvent.innerHTML = `<div class='fc-event-main'>${eventTitle}</div>`;
      draggableElement.appendChild(newEvent);

      // drag-and-drop feature
      if (!draggableElement.draggableInstance) {
        draggableElement.draggableInstance = new Draggable(draggableElement, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            return { title: eventEl.innerText };
          },
        });
      }
    }
  };

  useEffect(() => {
    const calendarTitle = document.createElement("style");
    calendarTitle.innerHTML = `
      /* Colors the columns */
      :root {
        --fc-border-color: black;
      }   

      /* Gray rows beetween times */
      .fc .fc-timegrid-slot{
        border-color: gray
      }

      /* External borders black */
      .fc .fc-scrollgrid {
        border-top: 1px solid --var(fc-border-color);
        border-right: none;
        border-bottom: 1px solid --var(fc-border-color);
        border-left:1px solid --var(fc-border-color);
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

      /* font sizes depending on window size */
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

      /* Calender background color */
      .fc-view {
        background-color: #f1e6e4;
      }

      /* Headers for days of the week */
      .fc-col-header-cell, 
      .fc-timegrid-axis{
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
      slotMinTime: "05:00:00",
      slotMaxTime: "23:00:00",
      slotDuration: "00:15:00", // 15-minute increments
      slotLabelInterval: "01:00:00", // Label every 30 minutes
      editable: true,
      droppable: true,
      allDaySlot: false,
      dayHeaderFormat: { weekday: "long" },
      initialView: "timeGridWeek",
      height: 700, //limit the content height
      windowResize: () => {
        calendar.updateSize(); // Update calendar size on window resize
      },
    });
    calendar.render();

    // cleanup
    return () => {
      document.head.removeChild(style);
      calendar.destroy(); // Also ensure you clean up the calendar instance
    };
  }, []);

  return (
    <div>
      <div
        id="mydraggable"
        style={{
          position: "fixed",
          zIndex: 2,
          top: "20px",
          left: "20px",
          width: "150px",
          paddingBottom: "10px",
          paddingLeft: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#c9ada7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#c9ada7",
          }}
        >
          <h3 style={{ color: "black", margin: "0 10px 0 0" }}>Weeklies</h3>
          <button
            id="add-event"
            style={{
              backgroundColor: "transparent",
              border: "none",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: "0",
            }}
            onClick={handleAddWeekly}
          >
            {/* plus icon */}
            <img
              src="assets/addIcon.svg"
              alt="Add Event"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>
      <div
        id="mycalendar-container"
        style={{
          position: "relative",
          zIndex: 1,
          marginLeft: "200px",
        }}
      >
        <div
          id="mycalendar"
          style={{
            maxWidth: "1100px",
            margin: "20px auto",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Schedule;
