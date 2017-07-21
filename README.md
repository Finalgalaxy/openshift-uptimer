# OpenShift Uptimer NPM module

## Why do you need this module?
OpenShift comes out with a free plan of 24-hours inactivity for IDLE applications.
That means if your Node.js application is not visited in 24 hours range (through HTTP requests), the whole application gets down until you restart it with `rhc app-restart yourapp` or revisiting it manually.

In Node.js applications without a HTTP interface, for example an application running multiple Telegram bots, even if the application is being actually used --- the 24 hours uptime timer is not refreshed so your application will go down and you'll have to restart it manually.

Here's what this module is for: to have an easy workaround for this issue by keeping your application always in running state.

However, for production environment, consider to upgrade to a better OpenShift plan that guarantees infinite uptime.

## How it works under the hoods
This module creates very easily an HTTP route with Express inside an OpenShift Node.js cartridge environment by automatically setting up IP and address as well.

You can also pass your own instance of express in order to avoid route collisions and multiple express running together on same port.

The default route is yourwebsite.com/uptime_route. You can use a webservice such as UptimeRobot (http://uptimerobot.com) to automatically make HTTP requests to your website and track uptime. Those requests can be made from 5 to 60 minutes.

## How to install it
`npm install --save openshift-uptimer`
This will also install Express dependency.

## I didn't use Express in my application. How can I use this module?
VERY simple:
```javascript
// JUST ONE LINE!
require('openshift_uptimer').auto_configure();  // Done!
```

If you like some customization or more control:
```javascript
var openshift = require('openshift_uptimer');
openshift.log(true); // Enable logging
openshift.auto_configure(); // Done!
```

A new route will be created at `yourwebsite.com/uptime_route` with just very few lines and it will automatically adapt to your OpenShift installation. Awesome, isn't it?

## I DID use Express in my application and I want to use the same Express instance. How can I do it?
This way:
```javascript
var openshift = require('openshift_uptimer');
openshift.set_express(your_express_instance);
openshift.set_uptime_route('/uptime_route');
```

It is the same result as doing:
```javascript
your_express_instance.get('/app', function(req,res)){
    res.send('Uptime OK!');
});
```

## How to use webservices as UptimeRobot
- Go to https://uptimerobot.com and register
- After confirming email, go to My Settings
- Press "Add new monitor"
- Choose HTTP
- Insert in the URL field: yourwebsite.com/uptime_route
- Set your uptime checker timer (from 5 to 60 minutes)

Enjoy!

## License
MIT

## Author
Fabio Crispino aka Finalgalaxy