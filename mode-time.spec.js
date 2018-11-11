const { ModeTime, ModeTimes, getCurrentMode } = require('./mode-time')

/* ModeTime */
describe('ModeTime', () => {

	test('it should instantiate the mode time', () => {
		let time = new ModeTime('foo', 3)
		expect(time.hour).toEqual(3)
		expect(time.name).toEqual('foo')
	})

	test('it should reject mode time instantiation when the current hour is outside accepted range', () => {
		expect(() => new ModeTime('foo', 24)).toThrow()
		expect(() => new ModeTime('foo', -1)).toThrow()
	})

	test('mode time compareTo method returns right integer values', () => {
		let timeA = new ModeTime('foo', 3)
		let timeB = new ModeTime('foob', 4)
		expect(timeA.compareTo(timeB)).toEqual(-1)
		expect(timeB.compareTo(timeA)).toEqual(1)

		let timeC = new ModeTime('bar', 3)
		expect(timeC.compareTo(timeA)).toEqual(0)
	})
})

/* ModeTimes */
describe('ModeTimes', () => {
	let times;
	beforeEach(() => {
		times = new ModeTimes()	
	})

	test('it should instantiate mode times', () => {
		expect(times.length).toEqual(0)
		expect(times.times).toEqual({})
	})

	test('ModeTimes.add() adds new mode time to the collection', () => {
		let name = 'foo'
		times.add(name, 3)
		expect(times.contains(name)).toEqual(true)
	})

	test('ModeTimes.remove() removes mode time from collection', () => {
		let name = 'foo'
		times.add(name, 3)
		expect(times.contains(name)).toEqual(true)
		times.remove(name)
		expect(times.contains(name)).toEqual(false)
	})

	test('ModeTimes.getAll() returns a sorted array of ModeTimes', () => {
		times.add('foo', 5)
		times.add('bar', 3)
		times.add('boo', 23)

		let sorted = times.getAll()
		expect(sorted.length).toEqual(3)
		expect(sorted[1].hour).toBeGreaterThan(sorted[0].hour)
		expect(sorted[2].hour).toBeGreaterThan(sorted[1].hour)
	})
})

describe('getCurrentMode', () => {
	let modeTimes;
	beforeEach(() => {
		modeTimes = new ModeTimes()
		modeTimes.add('foo', 3)
		modeTimes.add('mario', 7)
		modeTimes.add('luigi', 12)
		modeTimes.add('bar', 21)
	})

	test('it rejects empty mode times', () => {
		expect(() => getCurrentMode(new ModeTimes(), 3)).toThrow()	
	})

	test('it rejects hours out of range', () => {
		expect(() => getCurrentMode(modeTimes, -1)).toThrow()
	})

	test('it finds the right mode for an hour in the middle', () => {
		let mode = getCurrentMode(modeTimes, 9)
		expect(mode.name).toEqual('mario')
	})

	test('it finds the right mode when the hour is greater than all modes in the collection', () => {
		let mode = getCurrentMode(modeTimes, 23)
		expect(mode.name).toEqual('bar')
	})

	test('it finds the right mode when the hour is less than all the modes', () => {
		let mode = getCurrentMode(modeTimes, 1)		
		expect(mode.name).toEqual('bar')
	})
})
