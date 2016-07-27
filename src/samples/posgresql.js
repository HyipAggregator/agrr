var repository = require('./../domain/repository');

repository.startSession(function (client) {
    repository.all(client, function (data) {
        console.log(data);

        //repository.deleteAll(client);
    });
});