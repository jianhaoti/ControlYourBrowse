import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import "./calendar.css";

document.addEventListener("DOMContentLoaded", function () {
  var draggableElement = document.getElementById("mydraggable");
  var calendarElement = document.getElementById("mycalendar");
  var addButton = document.getElementById("add-event");
  var isCreatingEvent = false; // Flag to prevent multiple event creation

  // Initialize the calendar
  // -----------------------------------------------------------------
  var calendar = new Calendar(calendarElement, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    editable: true,
    droppable: true,
    initialView: "timeGridWeek",
    drop: function (info) {
      if (!isCreatingEvent) {
        isCreatingEvent = true;
        setTimeout(() => {
          isCreatingEvent = false;
        }, 100); // Reset the flag after a short delay
      } else {
        info.revert(); // Revert the drop if an event is already being created
      }
    },
  });

  // Initialize draggables
  // -----------------------------------------------------------------
  let draggable = new Draggable(draggableElement, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
    },
  });
  if (!addButton.hasClickListner) {
    addButton.addEventListener("click", function () {
      var eventTitle = prompt("Enter event title:");
      if (eventTitle) {
        var newEvent = document.createElement("div");
        newEvent.className = "fc-event";
        newEvent.innerHTML = `<div class="fc-event-main">${eventTitle}</div>`;
        draggableElement.appendChild(newEvent);
        // Reinitialize Draggable to include the new event
        new Draggable(draggableElement, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            return {
              title: eventEl.innerText,
            };
          },
        });
      }
    });
    addButton.hasClickListner = true;
  }
  calendar.render();
});
