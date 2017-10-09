/*
 * Just promisified some indexedDb methods and put it together 
 * in a nice little js goodie.
 */


// ==========================
//  HELPER FUNCS
// ==========================

 /**
  * Creates a Connection object which you can use to interact with the 
  * db really it just turns an array of higher order funcs into an object 
  * containing... normal order funcs? normal funcs.. funcs. just funcs.
  
  * i.e. [funcA, funcB] into {funcA: funcA(..), funcB: funcB(..)}
  * @param {IndexedDbConnection} db 
  * @param {Array} methods 
  */
  const createConnectionObject  = (db, methods) => methods.reduce((object, fn) => {
	const obj = Object.assign({}, object)
	obj[fn.name] = fn(db) 
	return obj
}, {})

/**
 * Retrieves object store with given mode.
 * @param {IndexedDbConnection} db 
 * @param {String} storeName 
 * @param {String} mode 
 * 
 * @return {IndexedDbObjectStore}
 */
const getObjectStore = (db, storeName, mode) => {
	const tx = db.transaction(storeName, mode)
	return tx.objectStore(storeName)
}

/**
 * Insert a single entry into database store.
 * @param {IndexedDbConnection} db 
 * @param {String} storeName 
 * @param {Object} entry 
 * 
 * @return {function}
 */
const insertOne = (db, storeName, entry) => new Promise(
	(resolve, reject) => {
		const store = getObjectStore(db, storeName, 'readwrite')
		const req = store.add(entry)

		req.onsuccess = evt => resolve({entry, success:evt})
		req.onerror = error => reject({entry, error})
	}
)

/**
 * Generator for inserting entries into db.
 * @param {IndexedDbConnection} db 
 * @param {String} storeName 
 * @param {Array} entries 
 * 
 * @return {function}
 */
const Inserter = function *(db, storeName, entries){
	const results = []
	for(let entry of entries)
		results.push(yield insertOne(db, storeName, entry))
	return results
}

/**
 * Insert multiple entries.
 * @param {IndexedDbConnection} db 
 * @param {String} storeName 
 * @param {Array} entries 
 * 
 * @return {function}
 */
const insertAll = (db, storeName, entries) => {
	const generator = Inserter(db, storeName, entries)
	function iterate(iteration){
		if(iteration.done) return iteration.value
		const promise = iteration.value
		const reiterate = x => iterate(generator.next(x))
		return promise.then(reiterate).catch(reiterate)
	}
	return iterate(generator.next())
}


// ==========================
//  THE REAL FUNCS
// ==========================

/**
 * Clear object store.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const deleteAll = db => storeName => new Promise(
	(resolve, reject) => {
		const store = getObjectStore(db, storeName, 'readwrite')
		const req = store.clear()

		req.onsuccess = evt => resolve(evt)
		req.onerror = err => reject(err)
	}
)

/**
 * Delete entry by id.
 * @param {*} db 
 */
const deleteById = db => (storeName, id) => new Promise(
	(resolve, reject) => {
		const store = getObjectStore(db, storeName, 'readwrite')
		const req = store.delete(id)

		req.onsuccess = evt => resolve(evt)
		req.onerror = err => reject(err)
	}
)
/**
 * Combine insert and insertAll into one function calls insertAll 
 * if the data passed is an array, otherwise it calls insertOne.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const insert = db => (storeName, data) => Array.isArray(data)? 
	insertAll(db, storeName, data):insertOne(db, storeName, data)

/**
 * Fetch a database store entry by id.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const fetchById = db => (storeName, id) => new Promise(
	(resolve, reject) => {
		const store = getObjectStore(db, storeName, 'readonly')
		const req = store.get(id)
		req.onsuccess = evt => resolve(evt.target.result)
		req.onerror = err => reject(err)
	}
)

/**
 * Update a single db entry.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const updateById = db => (storeName, id, data) => new Promise(
	(resolve, reject) => {
		const store = getObjectStore(db, storeName, 'readwrite')
		const req = store.get(id)
		req.onsuccess = ({target: {result}}) => {
			const update = Object.assign({}, result, data) 
			const innerReq = store.put(update)
			innerReq.onsuccess = evt => resolve(evt.target.result)
			innerReq.onerror = err => reject(err)
		}
		req.onerror = err => reject(err)
	}
)

/**
 * Fetch all database store entries.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const fetchAll = db => storeName => new Promise(
	(resolve, reject) => {
		const store = getObjectStore(db, storeName, 'readonly')
		const req = store.getAll()
		req.onsuccess = evt => resolve(evt.target.result)
		req.onerror = err => reject(err)
	}
)

/**
 * Fetch all database store entries matching index.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const fetchByIndex = db => (storeName, index, val) => new Promise(
	(resolve, reject) => {
		const store = getObjectStore(db, storeName, 'readonly')
		const req = store.index(index).getAll(val)
		req.onsuccess = evt => resolve(evt.target.result)
		req.onerror = err => reject(err)
	}
)

/**
 * Close the db.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const close = db => () => db.close()

/**
 * Get db connection.
 * @param {IndexedDbConnection} db 
 * 
 * @return {function}
 */
const getConnection = db => () => db


/**
 * Open indexedDbConnection.
 * @param {String} dbName 
 * @param {String} dbVersion 
 * @param {function} onUpgrade 
 * 
 * @return {Promise}
 */
const openDb = (dbName, dbVersion, onUpgrade) => new Promise(
	(resolve, reject) => {
		const req = indexedDB.open(dbName, dbVersion)
		req.onupgradeneeded = onUpgrade
		req.onsuccess = ({target: {result}}) => resolve(result)
		req.onerror = err => reject(err)
	}
)

/**
 * Open indexedDB connection and creates a connection object 
 * with everything plugged in.
 * @param {String} dbName 
 * @param {String} dbVersion 
 * @param {function} onUpgrade 
 * 
 * @return {Promise}
 */
const connect = (dbName, dbVersion, onUpgrade) => new Promise(
	(resolve, reject) => {
		const req = indexedDB.open(dbName, dbVersion)
		req.onupgradeneeded = onUpgrade
		req.onsuccess = ({target: {result}}) => resolve(createConnectionObject(result, [
			deleteById,
			deleteAll,
			insert,
			updateById,
			fetchById,
			fetchByIndex,
			fetchAll,
			close,
			getConnection
		]))
		req.onerror = err => reject(err)
	}
)

module.exports = {
	connect,
	openDb,
	deleteById,
	deleteAll,
	insert,
	updateById,
	fetchById,
	fetchByIndex,
	fetchAll
}