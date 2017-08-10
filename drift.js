(function (global, factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined')
		module.exports = factory()
	else if (typeof define === 'function' && define.amd)
		define(factory())
	else
		global.drift = factory()
}(this, function () {
	'use strict'

	/**
	 * @constructor
	 */
	function Drift () {
		this.next = this
		this.prev = this
		this.length = 0
	}
	
	/**
	 * @type {Object}
	 */
	var prototype = Drift.prototype = Object.create(null, {
		constructor: {value: Drift} 
	})

	/**
	 * @param {Element} node
	 * @return {Element}
	 */
	prototype.remove = function remove (node) {
		if (this.length === 0)
			return
		node.next.prev = node.prev
		node.prev.next = node.next
		this.length--
		return node
	}

	/**
	 * @param {Object} node
	 * @param {Object} before
	 * @return {Object}
	 */
	prototype.insert = function insert (node, before) {
		node.next = before
		node.prev = before.prev
		before.prev.next = node
		before.prev = node
		this.length++
		return node
	}

	/**
	 * @param {Object} node
	 * @return {Object}
	 */
	prototype.push = function push (node) {
		return this.insert(node, this)
	}

	/**
	 * @return {Object}
	 */
	prototype.pop = function pop () {
		return this.remove(this.prev)
	}

	/**
	 * @return {Object}
	 */
	prototype.shift = function shift () {
		return this.remove(this.next)
	}

	/**
	 * @return {Object}
	 */
	prototype.unshift = function unshift (node) {
		return this.insert(node, this.next)
	}

	/**
	 * @param {function} callback
	 */
	prototype.forEach = function forEach (callback) {
		for (var i = 0, node = this; i < this.length; i++)
			callback.call(this, node = node.next, i)
	}
}))
