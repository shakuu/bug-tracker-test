const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./storage/storage');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.put('/api/user', (request, response) => {
    console.log(request.body);
});

app.post('/api/user', (request, response) => {
    const user = {
        username: request.body.username,
        passowrd: request.body.password
    };

    storage.users.createUser(user)
        .then((user) => {
            response
                .status(201)
                .json(user.username);
        })
        .catch((user) => {
            response
                .status(401)
                .json(user.username);
        });
});

const port = 8085;
app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}/`);
});