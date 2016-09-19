const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./storage/storage');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.put('/api/user', (request, response) => {
    const user = {
        username: request.body.username,
        password: request.body.password
    };

    storage.users.verifyUser(user)
        .then((user) => {
            response
                .status(202)
                .json(user);
        })
        .catch((error) => {
            response
                .status(400)
                .json(error);
        });
});

app.post('/api/user', (request, response) => {
    const user = {
        username: request.body.username,
        password: request.body.password
    };

    storage.users.createUser(user)
        .then((user) => {
            response
                .status(201)
                .json(user);
        })
        .catch((error) => {
            response
                .status(400)
                .json(error);
        });
});

const port = 8085;
app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}/`);
});