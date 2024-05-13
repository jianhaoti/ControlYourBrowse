import React, { useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import './schedule.css';  // Make sure the path is correct

const Schedule = () => {
  useEffect(() => {
    const draggableElement = document.getElementById("mydraggable");
    const calendarElement = document.getElementById("mycalendar");
    const addButton = document.getElementById("add-event");

    console.log("schedule is mounting")

    let isCreatingEvent = false;  // Flag to prevent multiple event creation

    const calendar = new Calendar(calendarElement, {
      plugins: [timeGridPlugin, interactionPlugin],
      headerToolbar: {
        center: 'title',
        left: '',
        right: '',
      },
      slotMinTime: "05:00:00",
      slotMaxTime: "23:00:00",
      editable: true,
      droppable: true,
      dayHeaderFormat: { weekday: 'long' },
      initialView: 'timeGridWeek',
      drop: function(info) {
        if (!isCreatingEvent) {
          isCreatingEvent = true;
          setTimeout(() => { isCreatingEvent = false; }, 100);
        } else {
          info.revert();
        }
      }
    });

    calendar.render();

    let draggable = new Draggable(draggableElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return { title: eventEl.innerText };
      }
    });

    if (!addButton.hasClickListner) {
      addButton.addEventListener('click', () => {
        let eventTitle = prompt('Enter event title:');
        if (eventTitle) {
          let newEvent = document.createElement('div');
          newEvent.className = 'fc-event';
          newEvent.innerHTML = `<div class='fc-event-main'>${eventTitle}</div>`;
          draggableElement.appendChild(newEvent);
          new Draggable(draggableElement, {
            itemSelector: '.fc-event',
            eventData: function(eventEl) {
              return { title: eventEl.innerText };
            }
          });
        }
      });
      addButton.hasClickListner = true;
    }
  }, []);

  return (
    <div>
      <div id="mydraggable">
        <div className="draggable-header">
          <h3>Weeklies</h3>
          <button id="add-event" className="add-event-btn">
            <img src="assets/addIcon.svg" alt="Add Event" width="24" height="24" />
          </button>
        </div>
      </div>
      <div className="mycalendar-container">
        <div id="mycalendar"></div>
      </div>
    </div>
  );
};

export default Schedule;
