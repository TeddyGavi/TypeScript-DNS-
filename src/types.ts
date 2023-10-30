interface IHeader {
  //Octet structure
  /**
   * id is 16 bit unsigned (positive) integer
   * @type {number}
   */

  id: number

  /**
   *  A one bit field that specifies whether this message is a query (0), or a response (1).
   *  @type {number}
   */

  qr: number

  /**
   * A four bit field that specifies kind of query in this message.  This value is set by the originator of a query and copied into the response.  The values are:
   * @type {number}
   */

  opcode: number
  /**
   * Authoritative Answer - this bit is valid in responses and specifies that the responding name server is an authority for the domain name in question section.
   * @type {number}
   */

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
}
