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

  private IPfromRdata(): string {
    const octets: number[] = []
    for (let i = 0; i < this.rdata.length; i += 8) {
      const split = this.rdata.slice(i, i + 8)
      octets.push(parseInt(split, 2))
    }
    return octets.join('.')
  }

  /**
   * @method getDataByRecord
   * @description Takes in a record and returns the ip address
   * @parm {record} @type {number}
   */

  public getDataByRecord(record: number): string {
    // this could support other records in the future...?
    if (record !== 1) {
      throw new Error('Currently only A records are supported')
    }
    return this.IPfromRdata()
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
    // need to make a slice to read ONLY this section
    const rdataSlice = buffer.subarray(nameLength / 8 + 10, buffer.length)
    const rdata = rdataSlice.readUInt32BE(0).toString(2)

    return new ResourceRecord({ name, type, rrclass, ttl, rdlength, rdata })
  }
}
