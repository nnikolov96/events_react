import React from 'react';
import EventSummary from "./EventSummary";

const EventList = props => (
  <div>
    {props.events.map(function (event) {
      return <EventSummary key={event.id} event={event} />;
    })}
  </div>
)

export default EventList;