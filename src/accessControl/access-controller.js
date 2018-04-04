'use strict'

const EventEmitter = require('events').EventEmitter

/**
 * Capabilities based access controller for OrbitDB
 */
class AccessController extends EventEmitter {
  constructor () {
    super()
    this._capabilities = {}
    this.controllerType = null
  }

  /* Properties */
  get capabilities () {
    return this._capabilities
  }

  get (capability) {
    return this.capabilities[capability]
  }

  /* Overridable functions */
  async load (address) {}
  async save () {}
  async init (name) {}
  async close () {}

  /**
   * Add capability
   *
   * Capabilities are an object that describe the capability,
   * ie. what CAN be done, and a key, ie. WHO can do it:
   * { capability: 'WRITE',      key: '04fGBa94Jjfow...' },
   * { capability: 'READ',       key: '04fGBa94Jjfow...' },
   * { capability: 'ADD_READ',   key: '04fGBa94Jjfow...' },
   * { capability: 'DEL_BY_KEY', key: '04fGBa94Jjfow...' }

   * @param {[String]} capability [Name of the capability to add the key to, eg. 'WRITE']
   * @param {[String]} key        [Authorization for the capabality, eg. a public key]
   */
  async add (capability, key) {}

  /**
   * Remove a capability
   * @param  {[String]} capability [Name of the capability to remove, eg. 'WRITE']
   * @param  {[String]} key        [Authorization to remove the capability from, eg. a public key]
   */
  async remove (capability, key) {}

  async add (capability, key) {
    const allowedKeys = new Set(this._capabilities[capability] || [])
    allowedKeys.add(key)
    this._capabilities[capability] = Array.from(allowedKeys)
  }

  async remove (capability, key) {
    const allowedKeys = new Set(this._capabilities[capability] || [])
    if (!allowedKeys || (allowedKeys.size === 1 && allowedKeys.has(key)))
      delete this._capabilities[capability]
    else
      this._capabilities[capability] = Array.from(allowedKeys)
  }
}

module.exports = AccessController
