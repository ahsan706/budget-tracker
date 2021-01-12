const { port } = require('./config/constants');
const app = require('./app');

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
