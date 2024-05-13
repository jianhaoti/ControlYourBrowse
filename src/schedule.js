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
      new Draggable(draggableElement, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          return { title: eventEl.innerText };
        },
      });
    }
  };

  useEffect(() => {
    const calendarElement = document.getElementById("mycalendar");

    let isCreatingEvent = false; // Flag to prevent multiple event creation

    const calendar = new Calendar(calendarElement, {
      plugins: [timeGridPlugin, interactionPlugin],
      headerToolbar: {
        center: "title",
        left: "",
        right: "",
      },
      slotMinTime: "05:00:00",
      slotMaxTime: "23:00:00",
      editable: true,
      droppable: true,
      dayHeaderFormat: { weekday: "long" },
      initialView: "timeGridWeek",
      drop: function (info) {
        if (!isCreatingEvent) {
          isCreatingEvent = true;
          setTimeout(() => {
            isCreatingEvent = false;
          }, 100);
        } else {
          info.revert();
        }
      },
    });

    calendar.render();
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
