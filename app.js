const express = require('express');
const app = express();

app.use(express.static('public'));

const port = 8085;
app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}/`);
});