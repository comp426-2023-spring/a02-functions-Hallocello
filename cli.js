#!/usr/bin/env node

import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const argv = minimist(process.argv.slice(2));

if (argv.h) {
	Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
    process.exit(0);
}

// We wil assign values and instantiate the variables at the same time to save space.

const time_zone = moment.tz.guess() || argv.z;
const lat = argv.n || argv.s * -1; //Need the *-1 since south is negative
const longi = argv.e || argv.w * -1; //Same logic as for argv.s

//We need to make the URL and the response

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' +lat
	+ '&longitude=' +longi
	+ '&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch'
	+ '&timezone=' timezone);

//Now store the data received
const data = await response.json();

if (args.j) {
	console.log(data);
	process.exit(0);
}

const days = args.d;

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
