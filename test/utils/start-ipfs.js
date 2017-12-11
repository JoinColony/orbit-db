'use strict'

// const IPFS = require('ipfs')
const IPFS = require('ipfs-api')

/**
 * Start an IPFS instance
 * @param  {Object}  config  [IPFS configuration to use]
 * @return {[Promise<IPFS>]} [IPFS instance]
 */
const startIpfs = (config = {}) => {
  return new Promise(async (resolve, reject) => {
    // const ipfs = new IPFS(config)
    // ipfs.on('error', reject)
    // ipfs.on('ready', () => resolve(ipfs))
    // const ipfs = IPFS(config.host, config.port)
    const ipfs = IPFS(config.address)
    const peer = await ipfs.id()
    ipfs._peerInfo = peer // monkey patch the peer ID to make it js-ipfs compatible
    resolve(ipfs)
  })
}

module.exports = startIpfs
