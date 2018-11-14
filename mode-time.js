class SimpleTime {
	// hours: 24 hour time notation values 0 - 23 inclusive
	// minutes: integers 0 - 59 inclusive
	constructor (hours, minutes, seconds) {
		this.hours = hours	
		this.minutes = minutes || 0
		this.seconds = seconds || 0
		SimpleTime.checkTime(this)
	}	

	compareTo (other) {
		let hourDiff = (this.hours - other.hours)
		let minuteDiff = (this.minutes - other.minutes)
		let secondsDiff = (this.seconds - other.seconds)
		if (hourDiff !== 0) return hourDiff
		if (minuteDiff !== 0) return minuteDiff
		return secondsDiff
	}

	static compare(st, st2) {
		return st.compareTo(st2)
	}

	static checkTime (time) {
		if (time.hours < 0 || time.hours > 23) {
			throw new Error('Hour must be an integer between 0 and 23, inclusive.')
		}
		if (time.minutes < 0 || time.minutes > 59) {
			throw new Error('Minute must be integer between 0 and 59, inclusive.')
		}
		if (time.seconds < 0 || time.seconds > 59) {
			throw new Error('Seconds must be integer between 0 and 59, inclusive.')
		}
	}
}

class ModeTime {
	// minutes are optional: if ommitted, it will use 00 for minutes.
	constructor (name, hours, minutes, seconds) {
		this.time = new SimpleTime(hours, minutes, seconds)
		this.name = name	
	}	

	get hours () {
		return this.time.hours
	}

	get minutes () {
		return this.time.minutes	
	}

	get seconds () {
		return this.time.seconds
	}

	compareTo (otherMode) {
		return this.time.compareTo(otherMode.time)
	}


	toString () {
		return `ModeTime [name: ${this.name}, hour: ${this.hours}, minutes: ${this.minutes}, seconds: ${this.seconds}]`
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

	putTimeString (modeName, timeString) {
		let comps = timeString.split(":")	
		const getPiece = (comps, idx) => {
			if (idx < comps.length) return parseInt(comps[idx])
			return null
		}
		this.put(modeName, getPiece(comps, 0), getPiece(comps, 1), getPiece(comps, 2))
	}

	// easiest way to add a mode and its time. ModeName should be unique.
	put (modeName, scheduledHour, scheduledMinutes, scheduledSeconds) {
		let modeTime = new ModeTime(modeName, scheduledHour, scheduledMinutes, scheduledSeconds)	
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

	// returns all inserted ModeTimes, sorted by time.
	getAll () {
		return Object.values(this.times)
			.filter(modeTime => modeTime) // remove nulls
			.sort((a, b) => a.compareTo(b))
	}

	// returns the mode whose scheduled running time covers the specified time (ModeTime object)
	getModeByTime (hour, minutes, seconds) {
		let time = new SimpleTime(hour, minutes, seconds)
		if (this.length == 0) {
			throw new Error("Cannot get current mode using an empty ModeTimes collection.")
		}

		let sortedModeTimes = this.getAll()

	    for (let i = 0; i < sortedModeTimes.length; i++) {
	      let next = sortedModeTimes[i].time
	      if (SimpleTime.compare(next, time) > 0) {
	      	const prev = realModulo(i - 1, sortedModeTimes.length)
	      	return sortedModeTimes[prev]
	      }
	    }

		// if we do not find any mode with an hour greater than the currentHour, use the last value with the latest hour
	    return sortedModeTimes[sortedModeTimes.length - 1] 
	}

	toString () {
		let allTimes = this.getAll()	
		const reducer = (acc, mt) => acc + "\n\t" + mt.toString()
		return "ModeTimes [ " + allTimes.reduce(reducer, "") + "\n]"
	}
}

// modulo function that accounts for negative values
function realModulo (num, modulo) {
  return ((num % modulo) + modulo) % modulo
}


module.exports = {
	SimpleTime, ModeTime, ModeTimes
}
