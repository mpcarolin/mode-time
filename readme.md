## A simple JavaScript library for scheduling application modes to run during various time ranges.

### Usage

#### To import, use require:

```
const { ModeTimes } = require('mode-time')
```

#### To manage various modes and their times, first instantiate a ModeTimes object

```
const times = new ModeTimes()
```

#### Then add mode times by specifying a name and an hour using 24-hour time notation:

```
times.add('light-theme', 7)  // a light theme mode, scheduled for 7am
times.add('dark-theme', 13)  // a dark theme mode, scheduled for 1pm
times.add('sepia-theme', 23) // a sepia theme mode, scheduled for 11pm
```

* Accepted hours must range between 0 and 23, inclusive
* ModeTimes also has methods for removing modes, checking if a mode exists in the collection, and more. See the class def in mode-times.js

#### Finally, pass the hour of the day to the getModeByHour method to determine which mode to switch to:

```
let mode = times.getModeByHour(12)
// returns { 'name': 'light-theme', 'hour': 7 }
```

#### Example use case

Whenever an application stipulates certain modes to run across specific time ranges, this can be helpful. I use this for a Chrome extension to switch between colored themes depending on the time of day.




