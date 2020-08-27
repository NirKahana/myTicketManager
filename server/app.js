// const app = require('./index');
const index = require('./index');

const port = 8080;

index.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);


