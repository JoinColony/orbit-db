FAQ
--------

## Table of contents

### Availability
* [Where does data added to IPFS go? Will it always be available?](#where-does-data-added-to-ipfs-go-will-it-always-be-available-)
* [OK, so does Orbit pin data for me?](#ok-so-does-orbit-pin-data-for-me-)
* [Permanent vs persistent](#permanent-vs-persistent)

## Availability

### Where does data added to IPFS go? Will it always be available?

The data added to IPFS locally (in your own computer) will get garbage collected as well as data available on different peers if they aren't "used" frequently. So to avoid garbage collection, we have to "pin" content. As long as the data is pinned – or found available in other peers in general – it'll always be available.

### OK, so does Orbit pin data for me?

No. Orbit is a CRDT / database / protocol layer on top of IPFS but it doesn't handle content pinning so far. So data has to be pinned by peers themselves (i.e users) or by a pinning service.

### Permanent vs persistent

The use of the word "permanent" might be confusing then. How can IPFS be ephemeral and permanent? The thing here is that it's all about the "link", content addressing is permanent but hosting content isn't.

**References:**
- https://github.com/ipfs/faq/issues/47
