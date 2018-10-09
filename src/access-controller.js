'use strict'

class AccessController {
  /* Overridable functions */
  async add (access, key) {}
  async canAppend(entry, identityProvider) {}
  async createManifest(type, name, identity) {}
  async load (options) {}
  async remove (access, key) {}
}

module.exports = AccessController
