class ModeTime {
	constructor (name, time) {
		ModeTime.checkHour(hour)
		this.name = name	
		if (typeof time === Number) {
			this.time = { "hours": time, "minutes": 0.0	}
		} else {
			this.time = time
		}
	}	

	get hours () {
		return this.time.hours
	}

	get minutes () {
		return this.time.minutes	
	}

	compareTo (otherMode) {
		let hourDiff = (this.time.hours - otherMode.time.hours)
		let minuteDiff = (this.time.minutes - otherMode.time.minutes)
		return (hourDiff === 0) ? minuteDiff : hourDiff
	}

	static checkTime (time) {
		if (time.hours < 0 || time.hours > 23) {
			throw new Error('Hour must be an integer between 0 and 23, inclusive.')
		}
		if (time.minutes < 0 || time.minutes > 59) {
			throw new Error('Minute must be integer between 0 and 59, inclusive.')
		}
	}

	toString () {
		return 'ModeTime [name: ' + this.name + ', hour: ' + this.time.hours + ', minutes: ' +  this.time.minutes + ']'
	}
}

class ModeTimes {
	constructor () {
		this.times = {}
	}

	get length () {
		let length = 0
		for (let key in this.times) {
			if (this.times[key]) {
				length++
			}
		}
		return length
	}

	// use this if you want to directly add a modeTime
	putModeTime (modeTime) {
		this.times[modeTime.name] = modeTime
	}

	// easiest way to add a mode and its time. ModeName should be unique.
	put (modeName, scheduledHour) {
		let modeTime = new ModeTime(modeName, scheduledHour)	
		this.putModeTime(modeTime)
	}

	remove (modeName) {
		this.times[modeName] = null
	}

	get (modeName) {
		return this.times[modeName]
	}

	contains (modeName) {
		return (this.times[modeName] != null)
	}

	names () {
		return Object.keys(this.times)
	}

	// returns all inserted ModeTimes, sorted by hour.
	getAll () {
		return Object.values(this.times)
			.filter(modeTime => modeTime) // remove nulls
			.sort((a, b) => a.compareTo(b))
	}

	// returns the scheduled mode to be running at the specified hour (ModeTime object)
	getModeByTime (t) {
		let time = t
		if (typeof time === Number) {
			time = { "hours": t, "minutes": 0.0 }
		}

		ModeTime.checkTime(time)
		if (this.length == 0) {
			throw new Error("Cannot get current mode using an empty ModeTimes collection.")
		}

		let sortedTimes = this.getAll()

	    for (var i = 0; i < sortedTimes.length; i++) {
	      let modeTime = sortedTimes[i]
	      if (modeTime.time > hour) {
	      	const prev = realModulo(i - 1, sortedTimes.length)
	      	return sortedTimes[prev]
	      }
	    }

		// if we do not find any mode with an hour greater than the currentHour, use the last value with the latest hour
	    return sortedTimes[sortedTimes.length - 1] 
	}

	toString () {
		let allTimes = this.getAll()	
		let start = "ModeTimes [ "
		const reducer = (acc, mt) => acc + "\n\t" + mt.toString()
		return start + allTimes.reduce(reducer, "") + "\n]"
	}
}

// modulo function that accounts for negative values
function realModulo (num, modulo) {
  return ((num % modulo) + modulo) % modulo
}


module.exports = {
	ModeTime, ModeTimes
}