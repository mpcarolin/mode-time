class ModeTime {
	constructor (name, hour) {
		ModeTime.checkHour(hour)
		this.name = name	
		this.hour = hour
	}	

	compareTo (otherMode) {
		return (this.hour - otherMode.hour)
	}

	static checkHour (hour) {
		if (hour < 0 || hour > 23) {
			throw new Error('Hour must be an integer between 0 and 23, inclusive.')
		}
	}

	toString () {
		return 'ModeTime [name: ' + this.name + ', hour: ' + this.hour + ']'
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
	getModeByHour (hour) {
		ModeTime.checkHour(hour)
		if (this.length == 0) {
			throw new Error("Cannot get current mode using an empty ModeTimes collection.")
		}

		let sortedTimes = this.getAll()

	    for (var i = 0; i < sortedTimes.length; i++) {
	      let modeTime = sortedTimes[i]
	      if (modeTime.hour > hour) {
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