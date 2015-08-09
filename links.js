var CronJob = require('cron').CronJob;
var cheerio = require('cheerio');
var db = require('./db').connect();

var collection = null;

function checkSites() {
	db.collection('sites', function(err, sites) {
	    collection = sites;
	});

	collection.find({}).each(function(site) {
		checkSite(site);
	});
}

function checkSite(site) {
	var options = {
		host: site.url,
		port: 80,
		path: '/index.html'
	};

	http.get(options, function(res) {
		console.log("Got response: " + res);

		var data = getLinks(site.selector, res.body);
		data = clearData(site.links, data);
		saveLinks(site.id, data);
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}

function getLinks(selector, body) {
	$ = cheerio.load(body);
	var links = $(".pageMainContainerLeft620 a");
	var results = [];
	for(var i = 0, ii = links.length; i < ii; i++) {
		results.push(links[i].pathname);
	}
	
	return results;
}

function clearData(links, data) {
	var data = data.concat(result);
	data = _.uniq(data);
}

function saveLinks(id, links) {
	var data = {
		links: links,
		timestamp: new Date().getTime()
	};

	collection.findOne(
        { 
            'id': id 
        }, 
        {
            '$push': {
                'links': data
            } 
        }
    );
};

function startJob() {
	// run this job every hour 06-20 on weekdays
	var job = new CronJob('00 30 06-20 * * 1-5', checkSites, 
		function () {
			// this function is executed when the job stops
		},
		true,
		timeZone: 'Europe/Warsaw'
	);
};
