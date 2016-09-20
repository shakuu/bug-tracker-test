const generator = (() => {
    return function* IdGenerator() {
        let lastId = 0;
        while (true) {
            yield lastId += 1;
        }
    };
})();

module.exports = generator;