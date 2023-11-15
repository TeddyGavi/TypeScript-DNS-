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

  private static IPfromRdata(buffer: Buffer): string {
    if (buffer.length !== 4) {
      throw new Error('Invalid IPv4 address.')
    }

    const ip = `${buffer[0]}.${buffer[1]}.${buffer[2]}.${buffer[3]}`
    return ip
  }

  get length() {
    return this.name.length + this.rdlength + 10
  }

  static fromBuffer(buffer: Buffer): ResourceRecord {
    const name = qName.fromBuffer(buffer)
    const length = name.length
    const type = buffer.readUInt16BE(length)
    const rrclass = buffer.readUInt16BE(length + 2)
    const ttl = buffer.readUInt32BE(length + 4)
    const rdlength = buffer.readUInt16BE(length + 8)
    // 4 octect field for internet records
    // need to make a slice to read ONLY this section
    // possibly be more than one answer!
    // so this needs to account for the start of the rdata at 10 bytes past the name, THEN
    // end when we reach the end specified by the rdlength
    const startOfRdata = length + 10
    const endOfRdata = startOfRdata + rdlength
    const rdataSlice = buffer.subarray(startOfRdata, endOfRdata)
    let rdata: string

    if (TYPE.A === type) {
      rdata = this.IPfromRdata(rdataSlice)
    } else if (TYPE.NS === type) {
      rdata = qName.fromBuffer(rdataSlice).toASCII(rdataSlice)
    } else {
      throw new Error(`Unsupported record type of ${type}`)
    }
    return new ResourceRecord({ name, type, rrclass, ttl, rdlength, rdata })
  }
}
