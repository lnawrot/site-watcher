// schema({
//     id: Number,
//     name: String,
//     email: String,
//     sites: [
//         name: String,
//         url: String,        
//         timestamp: Date,
//     ]
// })

var db = require('./db').connect();

var collection = null;
db.collection('users', function(err, users) {
    collection = users;
});

exports.findAll = function(req, res) {
    collection.find().toArray(function(err, users) {
        res.send(users);  
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    collection.findOne({ 'id' : id }, function(err, user) {
        res.send(user);  
    });
};

exports.add = function(req, res) {
    var name = req.params.name;
    var email = req.params.email;
    
    collection.insert({
        'name': name,
        'email': email,
        'sites': []
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var site = req.body;
    collection.findOne(
        { 
            'id': id 
        }, {
            '$push': {
                'sites': site
            } 
        }
    );
};

exports.remove = function(req, res) {
    var id = req.params.id;
    collection.remove({ 'id': id });
};

