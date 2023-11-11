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
import { IHeader } from './types'

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
  // TODO: default values of constructor
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
  }: IHeader) {
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

  static fromBuffer(buffer: Buffer): Header {
    const id = buffer.readUInt16BE(0) // 0 byte
    const secondByte = buffer.readUInt16BE(2) // starts at 3rd byte

    // pull out specific bits by shifting the LSB over to the 15 bit position then mask all bits needed with binary 1
    const qr = (secondByte >> 15) & 1 // 1 bit of 2 byte starting at 0
    const opcode = (secondByte >> 11) & 0xf // shift 4 -15 then mask the last 4 bits 1111 binary is 15 is F in hex
    const aa = (secondByte >> 10) & 1
    const tc = (secondByte >> 9) & 1
    const rd = (secondByte >> 8) & 1
    const ra = (secondByte >> 7) & 1
    const z = (secondByte >> 4) & 0x7
    const rcode = secondByte & 0xf

    //the next byte values are all full 16 bits each
    const qdcount = buffer.readUInt16BE(4)
    const ancount = buffer.readUInt16BE(6)
    const nscount = buffer.readUInt16BE(8)
    const arcount = buffer.readUInt16BE(10)

    return new Header({
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
    })
  }

  public toBuffer(): Buffer {
    const header = Buffer.alloc(12) //12 bytes or 96 bits
    //insertion based off left shifting by number of bytes to skip over! ie opposite of the creation with bitwise
    header.writeUInt16BE(this.id, 0)
    header.writeUInt16BE(
      (this.qr << 15) |
        (this.opcode << 11) |
        (this.aa << 10) |
        (this.tc << 9) |
        (this.rd << 8) |
        (this.ra << 7) |
        (this.z << 4) |
        this.rcode,
      2
    )

    header.writeUInt16BE(this.qdcount, 4)
    header.writeUInt16BE(this.ancount, 6)
    header.writeUInt16BE(this.nscount, 8)
    header.writeUInt16BE(this.arcount, 10)
    return header
  }

  // factory :\
  public static createHeader(
    id: number,
    qr: number,
    opcode: number,
    aa: number,
    tc: number,
    rd: number,
    ra: number,
    z: number,
    rcode: number,
    qdcount: number,
    ancount: number,
    nscount: number,
    arcount: number
  ): Header {
    return new Header({
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
    })
  }
}
