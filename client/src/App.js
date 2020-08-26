import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Ticket from './components/Ticket'
import './App.css';


function App() {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [flag, setFlag] = useState(0);
  const [counter, setCounter] = useState(0);
  const [classForHiddenDetails, setClassForHiddenDetails] = useState('hidden')


  const fetchData = async () => {
    const { data }  = await axios.get(`/api/tickets`);
    setTicketsArray(data);
  }
  useEffect(() => {fetchData()},[]);


  const inputChanged = async (event) => {
    let filteredList = await (axios.get(`/api/tickets?searchText=${event.target.value}`)).data
    setTicketsArray(filteredList);cd
  }

  const restoreButtonClicked = () => {
    setFlag(flag +1);
    setCounter(0);
    setClassForHiddenDetails('hidden')
  }
  
  
  return (
    <>
      <div className='background'>
        <input 
            className="search-input" 
            placeholder="search tickets..." 
            onChange={(e) => {inputChanged(e)}}
        >
        </input>

        <div className="details">Showing:&nbsp;
          {ticketsArray.length - counter}&nbsp;
          <span className={classForHiddenDetails}>
            ({counter} hidden tickets - <span className="restore" onClick={restoreButtonClicked}>Restore</span>)
          </span>
        </div>

        <ul className="ticket-list">
          {ticketsArray.map((ticket, index) => 
            <Ticket 
              ticket={ticket} 
              key={index}
              index={index}
              flag={flag}
              counter={counter}
              setCounter={setCounter}
              setClassForHiddenDetails={setClassForHiddenDetails}
            /> 
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
