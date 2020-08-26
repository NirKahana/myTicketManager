import React, {useEffect, useState} from 'react';
import moment from 'moment'

function Ticket( { ticket, index, flag, counter, setCounter, setClassForHiddenDetails } ) {

  const [hideButtonHidden, setHideButtonHidden] = useState(true)
  const [ticketClassName, setTicketClassName] = useState('ticket')

  useEffect(()=>{setTicketClassName('ticket')},[flag])

  let labels = null;;
  if (ticket.labels) {
      labels = ticket.labels.map((label, index) => <span className="label" key={index}>{label}</span>)
     }
  const changeButtonDisplay = () => {
    hideButtonHidden ? setHideButtonHidden(false) : setHideButtonHidden(true);
  }
  const hideButtonClicked = () => {
    setTicketClassName('hidden');
    setCounter(counter + 1);
    setClassForHiddenDetails('shown')
  }

  
  return (
    <>
      <li className={ticketClassName} onMouseEnter={changeButtonDisplay} onMouseLeave={changeButtonDisplay}>
        <div className="button-container">
          <span className="hide-button" hidden={hideButtonHidden} onClick={hideButtonClicked}>Hide</span>
        </div>
        <h3>{ticket.title}</h3>
        <p>{ticket.content}</p>
        <div className="labels-container">
          <span className="creation-details">By {ticket.userEmail}&nbsp;|&nbsp;{moment(ticket.creationTime).format("MM/DD/YYYY, hh:mm:ss A")}</span>
          <span className="label-tags">{labels}</span>
        </div>
      </li>
    </>
  );
}

export default Ticket;