var repository = require('./../domain/repository');

repository.startSession(function (session) {
    session.all(function (data) {
        console.log(data);

        //repository.deleteAll(client);
    });
});