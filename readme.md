## A simple javascript library for defining scheduled modes to switch at various times.

### Usage

#### To import, use require:

```
const { ModeTimes, getCurrentMode } = require('mode-time')
```

#### To manage various modes and their times, first make a ModeTimes object

```
const times = new ModeTimes()
```

#### Then add mode times by specifying a name and an hour using 24-hour time notation:

```
times.add('light-theme', 7)  // a light theme mode, scheduled for 7am
times.add('dark-theme', 13)  // a dark theme mode, schedules for 1pm
times.add('sepia-theme', 23) // a sepia theme mode, scheduled for 11pm
```

* Accepted hours must range between 0 and 23, inclusive
* ModeTimes also has methods for removing modes, checking if a mode exists in the collection, and more. See the class def in mode-times.js

#### Finally, pass your ModeTimes object and the hour of the day to the getCurrentMode method to determine which mode to switch to:

```
let mode = getCurrentMode(times, 12)
// returns { 'name': 'light-theme', 'hour': 7 }
```





