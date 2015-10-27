/**
 * An HTML5 LocalStorage helper library. 
 * https://github.com/ipeters90/javascript-localstorage-helper/
 * 
 * @author Ike Peters
 */

'use strict'

/**
* creates new instance of the storage manager
*/
function getStorageManager() {
	return new storageManager();
}

/**
* Storage manager function constructor
* @contstructor
*/
function storageManager() {
	var ls = window.localStorage;

	/**
	* retrieve a localstorage key
	* @method get {value}
	* @param key
	*/
	this.get = function(key) {
		var item;
	    try {
	    	item = JSON.parse(ls.getItem(key))
	    } catch(e) {
	    	item = ls.getItem(key)
	    }
	    console.log(item);
	    return item; // return the key
	};

	/**
	* Setting a key to localStorage
	* @method set {value} key
	* @param key
	* @param val
	* @param expiry
	*/
	this.set = function(key,val,expiry) {
		var expires = new Date().getTime()+(expiry*1000); // expiry in seconds
	    ls.setItem(key,JSON.stringify(val),expires);
	    return this.get(key);
	};

	/**
	* Removing a key from localStorage
	* @method remove
	* @param key
	*/
	this.remove = function(key) {
        if (key in ls) {
            ls.removeItem(key);
        }
        var removedStorage = this.get(key);
        console.log(removedStorage === undefined || removedStorage === null);
	};

	/**
	* Updating an existing key or create new if it doesn't exist
	* @method setProperty
	* @param key
	* @param property
	* @param value
	* @param expiry
	*/
	this.setProperty = function(key, property, value, expiry) {
		var item = this.get(key);
		var expires = new Date().getTime()+(expiry*1000);
		if (typeof item === 'object' && item !== null) {
			item[property] = value;
			ls.setItem(key, JSON.stringify(item), expires);
		} else if(item === undefined) { // create a new key if not found
			var newObject = {};
			newObject[property] = value;
			this.set(key, newObject, expires);
		} else {
			throw "Not an object"; // throw err when key is not an object
		}
	};
    this.clear = function() {
        var len = ls.length;
        ls.clear();
        return len;
    };
};