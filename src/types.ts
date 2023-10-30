interface IHeader {
  //Octet structure
  /**
   * @description id is 16 bit unsigned (positive) integer
   * @type {number}
   */

  id: number

  /**
   * @description A one bit field that specifies whether this message is a query (0), or a response (1).
   * @type {number}
   */

  qr: number

  /**
   * @description A four bit field that specifies kind of query in this message.  This value is set by the originator of a query and copied into the response.  The values are:
   * @type {number}
   */

  opcode: number

  /**
   * @description Authoritative Answer - this bit is valid in responses and specifies that the responding name server is an authority for the domain name in question section.
   * @type {number}
   */

  aa: number

  /**
   * @description TrunCation - specifies that this message was truncated due to length greater than that permitted on the transmission channel.
   * @type {number}
   */

  tc: number

  /**
   * @description Recursion Desired - this bit may be set in a query and is copied into the response.  If RD is set, it directs the name server to pursue the query recursive. Recursive query support is optional.
   * @type {number}
   */

  rd: number

  /**
   * @description Recursion Available - this be is set or cleared in a response, and denotes whether recursive query support is available in the name server.
   * @type {number}
   */

  ra: number

  /**
   * @description Reserved for future use.  Must be zero in all queries and responses
   * @type {number}
   */

  z: number
  rcode: number
  qdcount: number
  ancount: number
  nscount: number
  arcount: number
}
