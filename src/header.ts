import bit from 'bitwise'
import { IHeader } from './types'
/*
The header contains the following fields:
                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      ID                       |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |QR|   Opcode  |AA|TC|RD|RA|   Z    |   RCODE   |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    QDCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ANCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    NSCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ARCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
*/

export default class Header implements IHeader {
  id: number
  qr: number
  opcode: number
  aa: number
  tc: number
  rd: number
  ra: number
  z: number
  rcode: number
  qdcount: number
  ancount: number
  nscount: number
  arcount: number

  constructor({
    id,
    qr,
    opcode,
    aa,
    tc,
    rd,
    ra,
    z,
    rcode,
    qdcount,
    ancount,
    nscount,
    arcount,
  }: {
    id: number
    qr: number
    opcode: number
    aa: number
    tc: number
    rd: number
    ra: number
    z: number
    rcode: number
    ancount: number
    qdcount: number
    nscount: number
    arcount: number
  }) {
    this.id = id
    this.qr = qr
    this.opcode = opcode
    this.aa = aa
    this.tc = tc
    this.rd = rd
    this.ra = ra
    this.z = z
    this.rcode = rcode
    this.qdcount = qdcount
    this.ancount = ancount
    this.nscount = nscount
    this.arcount = arcount
  }
  static fromBuffer(buffer: Buffer) {
    return new Header({
      id: bit.buffer.readUInt(buffer, 0, 16),
      qr: bit.buffer.readUInt(buffer, 16, 1),
      opcode: bit.buffer.readUInt(buffer, 17, 4),
      aa: bit.buffer.readUInt(buffer, 21, 1) || 1,
      tc: bit.buffer.readUInt(buffer, 22, 1) || 1,
      rd: bit.buffer.readUInt(buffer, 23, 1) || 1,
      ra: bit.buffer.readUInt(buffer, 24, 1) || 1,
      z: bit.buffer.readUInt(buffer, 25, 3),
      rcode: bit.buffer.readUInt(buffer, 28, 4),
      qdcount: bit.buffer.readUInt(buffer, 32, 16),
      ancount: bit.buffer.readUInt(buffer, 48, 16),
      nscount: bit.buffer.readUInt(buffer, 64, 16),
      arcount: bit.buffer.readUInt(buffer, 80, 16),
    })
  }
}
