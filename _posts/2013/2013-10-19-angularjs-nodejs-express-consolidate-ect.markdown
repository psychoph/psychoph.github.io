---
layout: post
title: "Angularjs + Nodejs + Express + Consolidate + Ect"
date: "2013-10-19 20:31"
author: Jason Hardin
pageclass: programming
category: programming
tags:
  - Angularjs
  - ect
  - Nodejs
  - Express
  - Consolidate
  - programming
---
I have started working on a role-playing campaign and character manager called game binder. I am using this as a way to learn Angularjs, Nodejs and Mongodb.

I spent the last 4 hours trying to get the Nodejs server running without jade. The reason for this is that I didn’t want to write authentication and user creation processes as those already exist in Nodejs via passport. Frederik Nakstad also wrote a nice example app that performs authentication and permissions using Angularjs and Nodejs. See [fnakstad's github repository](https://github.com/fnakstad/angular-client-side-auth).

The problem in my mind with the app is it uses jade as the templating engine. I didn’t see the need for jade with Angularjs, it made the code more confusing than straight HTML. I also read that jade is slower than a bunch of other template engines. [The ect templating](http://ectjs.com/) engine is supposedly the fastest engine. My problem then became modifying Fredrik’s code to work with ect. The structure for the app is as follows:

{% highlight text %}
/client/views -- Angularjs's partials and main index.html
             /index.html
             /partials
/server -- Nodejs's routes for express and the api calls for Angularjs
       /routes.js --
server.js -- the Nodejs server
package.json -- Nodejs's package configuration file
{% endhighlight %}

Below is the server.js file that works with the ect template engine and angular with the structure above.

{% highlight javascript %}
var express =       require('express')
    , cons =        require('consolidate')
    , http =        require('http')
    , path =        require('path');

var app = module.exports = express();

// assign the swig engine to .html files
app.engine('html', cons.ect);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/client/views');
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));

require('./server/routes.js')(app);

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
{% endhighlight %}

Below is the server/routes.js file that I think I stripped down to be the basics that would be needed to run Angularjs with the above server.js file and the structure.

{% highlight javascript %}
var _ =           require('underscore')
    , path =      require('path');

var routes = [

    // Views
    {
        path: '/partials/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }]
    },

    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            var role = userRoles.public, username = '';
            if(req.user) {
                role = req.user.role;
                username = req.user.username;
            }
            res.cookie('user', JSON.stringify({
                'username': username,
                'role': role
            }));
            res.render('index');
        }]
    }
];

module.exports = function(app) {

    _.each(routes, function(route) {
        route.middleware.unshift(ensureAuthorized);
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}
{% endhighlight %}

Below is the package.json file that should be all that is needed to install the right components.

{% highlight yaml %}
{
  "dependencies": {
    "express": "*",
    "consolidate": "*",
    "ect": "*"
    "underscore": "*",
    "validator": ">=1.1.1"
  },
  "scripts": {
    "start": "node server.js",
    "test": "grunt test"
  },
  "engines": {
    "node": "0.10.x",
    "npm": "1.3.x"
  },
  "devDependencies": {
    "sinon": ">=1.7.2",
    "chai": ">=1.6.1",
    "mocha": ">=1.10.0",
    "supertest": ">=0.8.0",
    "grunt": ">=0.4.1",
    "grunt-mocha-test": ">=0.7.0"
  }
}
{% endhighlight %}
