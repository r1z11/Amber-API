var ObjectID = require('mongodb').ObjectID;

// POST user (Create a new user)
module.exports = function (app, db) {
    app.post('/users', (req, res) => {
        if (req.body) {
            const user = req.body;
            db.db('amber').collection('amber_collection').insertOne(user, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    console.log(result);
                    res.send(result.ops[0]);
                }
            });
        } else {
            console.log(res);
            res.send({ 'error': 'Missing required fields' });
        }
    });

    // GET user by id
    app.get('/users/:id', (req, res) => {
        console.log('get user');
        if (req.params.id) {
            const id = req.params.id;
            const details = {
                '_id': new ObjectID(id)
            };
            db.db('amber').collection('amber_collection').findOne(details, (err, item) => {
                if (err) {
                    console.log(err);
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    console.log(item);
                    res.send(item);
                }
            });
        } else {
            console.log(res);
            res.send({ 'error': 'Missing required fields' });
        }
    });

    // User login
    app.post('/users/login', (req, res) => {
        if (req.body.username && req.body.password) {
            const username = req.body.username;
            const password = req.body.password;
            const details = {
                'login.username': username,
                'login.password': password
            };
            db.db('amber').collection('amber_collection').findOne(details, (err, item) => {
                if (err) {
                    console.log(err);
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    console.log(item);
                    res.send(item);
                }
            });
        } else {
            console.log(res);
            res.send({ 'error': 'Missing required fields' });
        }
    });

    // DELETE user by id
    //     app.delete('/users/:id', (req, res) => {
    //         if (req.params.id) {
    //             const id = req.params.id;
    //             const details = { '_id': new ObjectID(id) };
    //             db.collection('amber').remove(details, (err, item) => {
    //                 if (err) {
    //                     console.log(err);
    //                     res.send({ 'error': 'An error has occurred' });
    //                 } else {
    //                     console.log(item);
    //                     res.send('User ' + id + ' deleted!');
    //                 }
    //             });
    //         } else {
    //             console.log(res);
    //             res.send({ 'error': 'Missing required fields' })
    //         }
    //     });

    // UPDATE user by id
    //     app.put('/users/:id', (req, res) => {
    //         if (req.params.id && req.body.title && req.body.body) {
    //             const id = req.params.id;
    //             const details = { '_id': new ObjectID(id) };
    //             const user = req.body;
    //             db.collection('amber').update(details, user, (err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                     res.send({ 'error': 'An error has occurred' });
    //                 } else {
    //                     console.log(result);
    //                     res.send(user);
    //                 }
    //             });
    //         } else {
    //             console.log(res);
    //             res.send({ 'error': 'Missing required fields' });
    //         }
    //     });

}