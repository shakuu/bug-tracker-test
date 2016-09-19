const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./storage/storage');

const app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
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
        .catch((user) => {
            response
                .status(400)
                .json({
                    username: user.username,
                    message: 'Incorrect username or password'
                });
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
        .catch((user) => {
            response
                .status(400)
                .json({
                    username: user.username,
                    message: 'Username exists'
                });
        });
});

const port = 8085;
app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}/`);
});