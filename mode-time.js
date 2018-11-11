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
}

class ModeTimes {
	constructor () {
		this.times = {}
		this.length = 0
	}

	add (modeName, scheduledHour) {
		let modeTime = new ModeTime(modeName, scheduledHour)	
		this.times[modeName] = modeTime
		this.length++
	}

	remove (modeName) {
		if (this.times[modeName] == null) return	
		this.times[modeName] = null
		this.length--
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
}

// modulo function that accounts for negative values
function realModulo(num, modulo) {
  return ((num % modulo) + modulo) % modulo
}

// modeTimes = array of ModeTime objects, sorted by hour
// returns the currently scheduled mode to be running (ModeTime object)
function getCurrentMode(modeTimes, currentHour) {
	ModeTime.checkHour(currentHour)
	if (modeTimes.length == 0) {
		throw new Error("Cannot get current mode using an empty modeTimes array.")
	}

	let sortedTimes = modeTimes.getAll()

    for (var i = 0; i < sortedTimes.length; i++) {
      let modeTime = sortedTimes[i]
      if (modeTime.hour > currentHour) {
      	const prev = realModulo(i - 1, sortedTimes.length)
      	return sortedTimes[prev]
      }
    }

	// if we do not find any mode with an hour greater than the currentHour, use the last value with the latest hour
    return sortedTimes[sortedTimes.length - 1] 
}

module.exports = {
	ModeTime, ModeTimes, getCurrentMode
}