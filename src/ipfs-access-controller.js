'use strict'

const AbstractAccessController = require('./access-controller')

class IPFSAccessController extends AbstractAccessController {
  constructor (ipfs) {
    super()
    this._ipfs = ipfs
    this._access = {
      admin: [],
      write: [],
      read: [], // Not used atm
    }
  }

  async _getObjectFromIpfs(hash) {
    const dag = await this._ipfs.object.get(hash)
    return JSON.parse(dag.toJSON().data)
  }

  async _saveToIpfs(object) {
    const dag = await this._ipfs.object.put(Buffer.from(JSON.stringify(object)))
    return dag.toJSON().multihash.toString()
  }

  async createManifest(type, name, identity) {
    const access = JSON.stringify(this._access, null, 2)
    const accessControllerHash = await this._saveToIpfs(access)
    const manifest = {
      name,
      type,
      accessController: path.join('/ipfs', accessControllerHash),
    }

    return this._saveToIpfs(manifest)
  }

  async load ({ accessControllerAddress: address }) {
    // Transform '/ipfs/QmPFtHi3cmfZerxtH9ySLdzpg1yFhocYDZgEZywdUXHxFU'
    // to 'QmPFtHi3cmfZerxtH9ySLdzpg1yFhocYDZgEZywdUXHxFU'
    if (address.indexOf('/ipfs') === 0)
      address = address.split('/')[2]

    try {
      this._access = await this._getObjectFromIpfs(address)
    } catch (e) {
      console.log("ACCESS ERROR:", e)
    }
  }

  async canAppend(entry, identityProvider){
    //verify identity?
    if (this._access.write.includes('*'))
      return true

    if (this._access.write.includes(entry.identity.publicKey))
      return true

    return false
  }

  /* Properties */
  get admin () {
    return this._access.admin
  }

  get write () {
    // Both admins and write keys can write
    return this._access.write.concat(this._access.admin)
  }

  // Not used atm
  get read () {
    return this._access.read
  }

  /* Public Methods */
  async add (access, key) {
    // if(!Object.keys(this._access).includes(access))
    //   throw new Error(`unknown access level: ${access}`)
    // if (!this._access[access].includes(key))
    //   this._access[access].push(key)

    // TODO: uniques only
    switch (access) {
      case 'admin':
        Promise.resolve(this._access.admin.push(key))
        break
      case 'write':
        Promise.resolve(this._access.write.push(key))
        break
      case 'read':
        Promise.resolve(this._access.read.push(key))
        break
      default:
      break
    }
  }

  async remove (access, key) {
    const without = (arr, e) => {
      const reducer = (res, val) => {
        if (val !== key)
          res.push(val)
        return res
      }
      return arr.reduce(reducer, [])
    }

    // if(!Object.keys(this._access).includes(access))
    //   throw new Error(`unknown access level: ${access}`)
    // if (this._access[access].includes(key))
    //   this._access[access] = without(this._access[access], key)

    switch (access) {
      case 'admin':
        Promise.resolve(this._access.admin = without(this._access.admin, key))
        break
      case 'write':
        Promise.resolve(this._access.write = without(this._access.write, key))
        break
      case 'read':
        Promise.resolve(this._access.read = without(this._access.read, key))
        break
      default:
      break
    }
  }
}

module.exports = IPFSAccessController
