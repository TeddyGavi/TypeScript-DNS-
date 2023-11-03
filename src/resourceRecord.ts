/* 
Resource record format

The answer, authority, and additional sections all share the same
format: a variable number of resource records, where the number of
records is specified in the corresponding count field in the header.
Each resource record has the following format:
                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                                               |
    /                                               /
    /                      NAME                     /
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TYPE                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     CLASS                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TTL                      |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                   RDLENGTH                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--|
    /                     RDATA                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
*/

import { CLASS, TYPE } from './enums'
import qName from './qName'
import { IResourceRecord } from './types'

export default class ResourceRecord implements IResourceRecord {
  name: qName
  type: TYPE
  rrclass: CLASS
  ttl: number
  rdlength: number
  rdata: string

  constructor({ name, type, rrclass, ttl, rdlength, rdata }: IResourceRecord) {
    this.name = name
    this.type = type
    this.rrclass = rrclass
    this.ttl = ttl
    this.rdlength = rdlength
    this.rdata = rdata
  }

  static fromBuffer(buffer: Buffer): ResourceRecord {
    const name = qName.fromBuffer(buffer)
    const nameLength = name.length // bits!
    const type = buffer.readUInt16BE(nameLength / 8)
    const rrclass = buffer.readUInt16BE(nameLength / 8 + 2)
    const ttl = buffer.readUInt32BE(nameLength / 8 + 4)
    const rdlength = buffer.readUInt16BE(nameLength / 8 + 8)

    if (type !== 1) {
      throw new Error('Currently only A records are supported')
    }
    // 4 octect field for internet records
    const rdata = buffer.readBigUInt64BE(nameLength / 8 + 10).toString()

    return new ResourceRecord({ name, type, rrclass, ttl, rdlength, rdata })
  }
}
