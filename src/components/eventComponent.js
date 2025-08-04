// oma tiedosto, koska calendar.js alkaa näyttämään sellaiselta sekamelskalta... 
// basically tämä toiminto lisää kellonajan kalenterissa näkyvään tapahtumaan. 
//lisätty 13.6.

import React from "react";
import { format } from "date-fns";

const EventComponent = ({ event }) => {
  return (
    <div>
      <strong>{event.title}</strong><br />
      <small>
        {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
      </small>
    </div>
  );
};

export default EventComponent;