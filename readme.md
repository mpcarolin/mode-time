[![npm version](https://badge.fury.io/js/mode-time.svg)](https://badge.fury.io/js/mode-time)
# mode-time

**A simple JavaScript library for scheduling application modes to run across various time ranges.**

## installation

```
npm install mode-time
```

## usage

#### To import, use require:

```
const { ModeTimes } = require('mode-time')
```

#### To manage various modes and their times, first instantiate a ModeTimes object

```
const times = new ModeTimes()
```

#### Then add mode times by specifying a name and a time using 24-hour notation:

```
times.put('light-theme', 7)  // a light theme mode, scheduled for 7:00:00am
times.put('dark-theme', 13, 23, 44)  // a dark theme mode, scheduled for 1:23:44pm
times.put('sepia-theme', 23, 59) // a sepia theme mode, scheduled for 11:59:00pm
times.putTimeString('gray-theme', '10:30:38') // a gray theme scheduled for 10:30:38am
```

* Accepted hours must range between 0 and 23, inclusive, where 0 is 12:00am and 23 is 11:00pm.
* Accepted minutes must range between 0 and 59, inclusive
* The ModeTimes class also provides methods for removing modes, checking if a mode exists in the collection, and more. See the class definition in mode-times.js.

#### Finally, pass the time of the day to the getModeByTime method to determine which mode to switch to:

```
// we want to find the mode whose range covers the time 2:01:22pm
let mode = times.getModeByTime(14, 1, 22) 
// returns { 'name': 'dark-theme', 'hour': 13, 'minute':  23, 'seconds': 44}
```

#### Example use case

Whenever an application stipulates certain modes to run across specific time ranges, this can be helpful. I currently use this for a Chrome extension to switch between colored themes depending on the time of day, using alarms.
