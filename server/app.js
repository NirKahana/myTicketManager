
const fs = require('fs').promises;
const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/tickets', async (req, res) => {
  const ticketsJSON = await fs.readFile('./data.json');
  const ticketsArray = JSON.parse(ticketsJSON);
  if (req.query.searchText) {
    const newTicketsArray = ticketsArray.filter((ticket, index) => ticketsArray[index].title.toLowerCase().includes(req.query.searchText.toLowerCase()));
    res.send(newTicketsArray);
  } else {
    res.send(ticketsArray);
  }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  const ticketsJSON = await fs.readFile('./data.json');
  const ticketsArray = JSON.parse(ticketsJSON);
  const desiredTicket = ticketsArray.find((ticket) => ticket.id === req.params.ticketId);
  desiredTicket.done = true;
  res.send(ticketsArray);
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  const ticketsJSON = await fs.readFile('./data.json');
  const ticketsArray = JSON.parse(ticketsJSON);
  const desiredTicket = ticketsArray.find((ticket) => ticket.id === req.params.ticketId);
  desiredTicket.done = false;
  res.send(ticketsArray);
});


module.exports = app;


