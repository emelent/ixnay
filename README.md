# ixnay
Simple promise based IndexedDb utilties

## Functions

<dl>
<dt><a href="#createConnectionObject">createConnectionObject(db, methods)</a></dt>
<dd><p>Creates a Connection object which you can use to interact with the 
db really it just turns an array of higher order funcs into an object 
containing... normal order funcs? normal funcs.. funcs. just funcs.
i.e. [funcA, funcB] into {funcA: funcA(..), funcB: funcB(..)}</p>
</dd>
<dt><a href="#getObjectStore">getObjectStore(db, storeName, mode)</a> ⇒ <code>IndexedDbObjectStore</code></dt>
<dd><p>Retrieves object store with given mode.</p>
</dd>
<dt><a href="#insertOne">insertOne(db, storeName, entry)</a> ⇒ <code>function</code></dt>
<dd><p>Insert a single entry into database store.</p>
</dd>
<dt><a href="#Inserter">Inserter(db, storeName, entries)</a> ⇒ <code>function</code></dt>
<dd><p>Generator for inserting entries into db.</p>
</dd>
<dt><a href="#insertAll">insertAll(db, storeName, entries)</a> ⇒ <code>function</code></dt>
<dd><p>Insert multiple entries.</p>
</dd>
<dt><a href="#deleteAll">deleteAll(db)</a> ⇒ <code>function</code></dt>
<dd><p>Clear object store.</p>
</dd>
<dt><a href="#deleteById">deleteById(db)</a></dt>
<dd><p>Delete entry by id.</p>
</dd>
<dt><a href="#insert">insert(db)</a> ⇒ <code>function</code></dt>
<dd><p>Combine insert and insertAll into one function calls insertAll 
if the data passed is an array, otherwise it calls insertOne.</p>
</dd>
<dt><a href="#fetchById">fetchById(db)</a> ⇒ <code>function</code></dt>
<dd><p>Fetch a database store entry by id.</p>
</dd>
<dt><a href="#updateById">updateById(db)</a> ⇒ <code>function</code></dt>
<dd><p>Update a single db entry.</p>
</dd>
<dt><a href="#fetchAll">fetchAll(db)</a> ⇒ <code>function</code></dt>
<dd><p>Fetch all database store entries.</p>
</dd>
<dt><a href="#fetchByIndex">fetchByIndex(db)</a> ⇒ <code>function</code></dt>
<dd><p>Fetch all database store entries matching index.</p>
</dd>
<dt><a href="#close">close(db)</a> ⇒ <code>function</code></dt>
<dd><p>Close the db.</p>
</dd>
<dt><a href="#getConnection">getConnection(db)</a> ⇒ <code>function</code></dt>
<dd><p>Get db connection.</p>
</dd>
<dt><a href="#openDb">openDb(dbName, dbVersion, onUpgrade)</a> ⇒ <code>Promise</code></dt>
<dd><p>Open indexedDbConnection.</p>
</dd>
<dt><a href="#connect">connect(dbName, dbVersion, onUpgrade)</a> ⇒ <code>Promise</code></dt>
<dd><p>Open indexedDB connection and creates a connection object 
with everything plugged in.</p>
</dd>
</dl>

<a name="createConnectionObject"></a>

## createConnectionObject(db, methods)
Creates a Connection object which you can use to interact with the 
db really it just turns an array of higher order funcs into an object 
containing... normal order funcs? normal funcs.. funcs. just funcs.
i.e. [funcA, funcB] into {funcA: funcA(..), funcB: funcB(..)}

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 
| methods | <code>Array</code> | 

<a name="getObjectStore"></a>

## getObjectStore(db, storeName, mode) ⇒ <code>IndexedDbObjectStore</code>
Retrieves object store with given mode.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 
| storeName | <code>String</code> | 
| mode | <code>String</code> | 

<a name="insertOne"></a>

## insertOne(db, storeName, entry) ⇒ <code>function</code>
Insert a single entry into database store.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 
| storeName | <code>String</code> | 
| entry | <code>Object</code> | 

<a name="Inserter"></a>

## Inserter(db, storeName, entries) ⇒ <code>function</code>
Generator for inserting entries into db.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 
| storeName | <code>String</code> | 
| entries | <code>Array</code> | 

<a name="insertAll"></a>

## insertAll(db, storeName, entries) ⇒ <code>function</code>
Insert multiple entries.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 
| storeName | <code>String</code> | 
| entries | <code>Array</code> | 

<a name="deleteAll"></a>

## deleteAll(db) ⇒ <code>function</code>
Clear object store.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="deleteById"></a>

## deleteById(db)
Delete entry by id.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>\*</code> | 

<a name="insert"></a>

## insert(db) ⇒ <code>function</code>
Combine insert and insertAll into one function calls insertAll 
if the data passed is an array, otherwise it calls insertOne.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="fetchById"></a>

## fetchById(db) ⇒ <code>function</code>
Fetch a database store entry by id.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="updateById"></a>

## updateById(db) ⇒ <code>function</code>
Update a single db entry.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="fetchAll"></a>

## fetchAll(db) ⇒ <code>function</code>
Fetch all database store entries.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="fetchByIndex"></a>

## fetchByIndex(db) ⇒ <code>function</code>
Fetch all database store entries matching index.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="close"></a>

## close(db) ⇒ <code>function</code>
Close the db.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="getConnection"></a>

## getConnection(db) ⇒ <code>function</code>
Get db connection.

**Kind**: global function  

| Param | Type |
| --- | --- |
| db | <code>IndexedDbConnection</code> | 

<a name="openDb"></a>

## openDb(dbName, dbVersion, onUpgrade) ⇒ <code>Promise</code>
Open indexedDbConnection.

**Kind**: global function  

| Param | Type |
| --- | --- |
| dbName | <code>String</code> | 
| dbVersion | <code>String</code> | 
| onUpgrade | <code>function</code> | 

<a name="connect"></a>

## connect(dbName, dbVersion, onUpgrade) ⇒ <code>Promise</code>
Open indexedDB connection and creates a connection object 
with everything plugged in.

**Kind**: global function  

| Param | Type |
| --- | --- |
| dbName | <code>String</code> | 
| dbVersion | <code>String</code> | 
| onUpgrade | <code>function</code> | 

