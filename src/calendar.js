import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import "./calendar.css";

document.addEventListener("DOMContentLoaded", function () {
  var draggableElement = document.getElementById("mydraggable");
  var calendarElement = document.getElementById("mycalendar");
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
  });

  let draggable = new Draggable(draggableElement, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
    },
  });

  calendar.render();
});
