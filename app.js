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

// modulo function that accounts for negative values
function realModulo(num, modulo) {
  return ((num % modulo) + modulo) % modulo
}

// modeTimes = array of ModeTime objects, sorted by hour
// returns the currently scheduled mode to be running (ModeTime object)
function getCurrentMode(modeTimes, currentHour) {
	if (modeTimes.length == 0) throw new Error("Cannot get current mode using an empty modeTimes array.")
	ModeTime.checkHour(currentHour)

    for (var i = 0; i < modeTimes.length; i++) {
      let modeTime = times[i]
      if (modeTime.hour > currentHour) {
      	const prevHour = realModulo(i - 1, 24)
      	return modeTimes[prevHour]
      }
    }

	// if we do not find any mode with an hour greater than the currentHour, use the last value with the latest hour
    return modeTimes[modeTimes.length - 1] 
}