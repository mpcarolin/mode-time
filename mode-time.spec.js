const { SimpleTime, ModeTime, ModeTimes } = require('./mode-time')

describe('SimpleTime', () => {
	test('it instantiates with right parameters', () => {
		let st = new SimpleTime(4,3,43)
		expect(st).toBeDefined()
	})		

	test('it rejects instantiation with bad parameters', () => {
		expect(() => new SimpleTime(-1)).toThrow()
		expect(() => new SimpleTime(1, 71)).toThrow()
		expect(() => new SimpleTime(1, 44, 99)).toThrow()
	})

	test('compareTo()', () => {
		let st = new SimpleTime(7, 30)
		let st2 = new SimpleTime(7, 31)
		expect(st.compareTo(st2)).toEqual(-1)
		st.hours = 8
		expect(st.compareTo(st2)).toEqual(1)

		st = new SimpleTime(7, 30, 3)
		st2 = new SimpleTime(7, 30, 4)
		expect(st.compareTo(st2)).toEqual(-1)
	})
})

/* ModeTime */
describe('ModeTime', () => {

	test('it should instantiate the mode time', () => {
		let time = new ModeTime('foo', 3)
		expect(time.hours).toEqual(3)
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

	test('toString()', () => {
		let time = new ModeTime('foo', 3, 2, 1)
		expect(time.toString()).toEqual(expect.stringContaining('foo'))
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

	test('put() adds a new mode time to the collection', () => {
		let name = 'foo'
		times.put(name, 3)
		expect(times.contains(name)).toEqual(true)
	})

	test('put() overwrites existing mode time', () => {
		let name = 'foo'
		times.put(name, 3)
		expect(times.contains(name)).toEqual(true)
		expect(times.length).toEqual(1)

		times.put(name, 4)
		expect(times.get(name).hours).toEqual(4)
		expect(times.length).toEqual(1)
	})

	test('putModeTime() adds a mode time directly', () => {
		let mt = new ModeTime('foo', 3)	
		times.putModeTime(mt)
		expect(times.contains('foo')).toEqual(true)
	})

	test('names() returns a list of the keys', () => {
		expect(times.names()).toEqual([])
		times.put('foo', 4)
		expect(times.names()).toContainEqual('foo')
	})

	test('remove() removes mode time from collection', () => {
		let name = 'foo'

		times.put(name, 3)
		expect(times.contains(name)).toEqual(true)
		expect(times.length).toEqual(1)

		times.remove(name)
		expect(times.contains(name)).toEqual(false)
		expect(times.length).toEqual(0)

		times.remove(name)
		expect(times.length).toEqual(0)
	})

	test('remove() does nothing when passed a key that was never puted', () => {
		times.remove('a key that does not exist')
		expect(times.length).toEqual(0)
	})

	test('getAll() returns a sorted array of ModeTimes', () => {
		times.put('foo', 5)
		times.put('bar', 3)
		times.put('boo', 23)

		let sorted = times.getAll()
		expect(sorted.length).toEqual(3)
		expect(sorted[1].hours).toBeGreaterThan(sorted[0].hours)
		expect(sorted[2].hours).toBeGreaterThan(sorted[1].hours)

	})

	test('toString() returns a valid string', () => {
		times.put('foo', 5)
		times.put('bar', 3)
		times.put('boo', 23)
		expect(times.toString()).toEqual(expect.stringContaining('foo'))
	})

	describe('getModeByTime()', () => {
		let modeTimes;
		beforeEach(() => {
			modeTimes = new ModeTimes()
			modeTimes.put('foo', 3)
			modeTimes.put('mario', 7)
			modeTimes.put('luigi', 12, 24, 30)
			modeTimes.put('bar', 21, 1)
		})

		test('it rejects empty mode times', () => {
			expect(() => new ModeTimes().getModeByTime(3)).toThrow()	
		})

		test('it rejects hours out of range', () => {
			expect(() => modeTimes.getModeByTime(-1)).toThrow()
		})

		test('it finds the right mode for an hour in the middle', () => {
			let mode = modeTimes.getModeByTime(9)
			expect(mode.name).toEqual('mario')
		})

		test('it finds the right mode when the hour is greater than all modes in the collection', () => {
			let mode = modeTimes.getModeByTime(23)
			expect(mode.name).toEqual('bar')
		})

		test('it finds the right mode when the hour is less than all the modes', () => {
			let mode = modeTimes.getModeByTime(1)		
			expect(mode.name).toEqual('bar')
		})

		test('it finds the right mode when using minutes', () => {
			let mode = modeTimes.getModeByTime(12, 23)		
			expect(mode.name).toEqual('mario')
			mode = modeTimes.getModeByTime(12, 25)		
			expect(mode.name).toEqual('luigi')
		})

		test('it finds the right mode with seconds precision', () => {
			let mode = modeTimes.getModeByTime(12, 23, 22)		
			expect(mode.name).toEqual('mario')
			mode = modeTimes.getModeByTime(12, 24, 31)		
			expect(mode.name).toEqual('luigi')
		})

		test('it works with a single mode', () => {
			let times = new ModeTimes()
			times.put('bar', 20)
			expect(times.getModeByTime(9).name).toEqual('bar')
			expect(times.getModeByTime(21).name).toEqual('bar')
		})
	})
})

