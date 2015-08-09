// schema({
//     id: Number,
//     url: String,
//     container: String,
//     regex: String,
//     links: [{
//         links: [String],        
//         timestamp: Date,
//     }]
// })

var db = require('./db').connect();

var collection = null;
db.collection('sites', function(err, sites) {
    collection = sites;
});

exports.findAll = function(req, res) {
    collection.find().toArray(function(err, sites) {
        res.send(sites);  
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    collection.findOne({ 'id' : id }, function(err, site) {
        res.send(user);  
    });
};

exports.findByUrl = function(req, res) {
    var url = req.params.url;
    collection.findOne({ 'url' : url }, function(err, site) {
        res.send(site);  
    });
};

exports.add = function(req, res) {
    var site = req.body;
    collection.insert(site, function(err, result) {
        if(err) {
            res.send({"error" : err});
        }
        else {
            res.send(result[0]);
        }
    });
};

exports.getLinks = function(req, res) {
    var id = req.params.id;
    collection.findOne({ 'id' : id }, function(err, site) {
        res.send(site.links);  
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var l = req.body;
    var links = {
        timestamp: new Date().getTime(),
        links: l
    };
    collection.findOne(
        { 
            'id': id 
        }, {
            '$push': {
                'links': links
            } 
        }
    );
};

exports.remove = function(req, res) {
    var id = req.params.id;
    collection.remove({ 'id': id });
};

