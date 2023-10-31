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
  qdcode: number
  nscount: number
  arcount: number

  constructor(
    id: number,
    qr: number,
    opcode: number,
    aa: number,
    tc: number,
    rd: number,
    ra: number,
    z: number,
    rcode: number,
    qdcode: number,
    qdcount: number,
    ancount: number,
    nscount: number,
    arcount: number
  ) {
    this.id = id
    this.qr = qr
    this.opcode = opcode
    this.aa = aa
    this.tc = tc
    this.rd = rd
    this.ra = ra
    this.z = z
    this.rcode = rcode
    this.qdcode = qdcode
    this.qdcount = qdcount
    this.ancount = ancount
    this.nscount = nscount
    this.arcount = arcount
  }
}
