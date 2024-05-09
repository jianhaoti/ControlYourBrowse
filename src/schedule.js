import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import "./schedule.css";

document.addEventListener("DOMContentLoaded", function () {
  var draggableElement = document.getElementById("mydraggable");
  var calendarElement = document.getElementById("mycalendar");
  var addButton = document.getElementById("add-event");
  var isCreatingEvent = false; // Flag to prevent multiple event creation

  // Initialize the calendar
  // -----------------------------------------------------------------
  var calendar = new Calendar(calendarElement, {
    plugins: [timeGridPlugin, interactionPlugin],
    headerToolbar: {
      center: "title",
      left: "",
      right: "",
    },
    slotMinTime: "05:00:00", // Start time at 5 AM
    slotMaxTime: "23:00:00", // End time at 10 PM

    editable: true,
    droppable: true,
    dayHeaderFormat: { weekday: "long" }, // no dates
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
