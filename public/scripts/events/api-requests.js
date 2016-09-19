const apiRequests = (() => {
    const URL_USERS = 'api/user';

    function loginUser(user, pass) {
        const hash = CryptoJS.SHA256(pass);
        const requestBody = {
            username: user,
            password: hash.words
        };

        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'PUT',
                url: URL_USERS,
                data: JSON.stringify(requestBody),
                contentType: 'application/json'
            })
                .done(resolve)
                .fail(reject);
        });
    }

    function createUser(user, pass) {
        const hash = CryptoJS.SHA256(pass);
        const requestBody = {
            username: user,
            password: hash.words
        };

        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: URL_USERS,
                data: JSON.stringify(requestBody),
                contentType: 'application/json'
            })
                .done(resolve)
                .fail(reject);
        });
    }

    return {
        loginUser,
        createUser
    };
})();