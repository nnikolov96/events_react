import React from 'react'
import { Link } from "react-router-dom";

  

const EventSummary = props => (

  <div className="event">
    <Link to={`/events/${props.event.id}`} style={{textDecoration: 'none', color: 'black'}} >
      <h2 className="event-title">{props.event.title}</h2>
    </Link>
  </div>
)

export default EventSummary;