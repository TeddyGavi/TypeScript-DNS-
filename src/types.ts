export interface IHeader {
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
   * 0               a standard query (QUERY)
   * 1               an inverse query (IQUERY)
   * 2               a server status request (STATUS)
   * 3-15            reserved for future use
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

  /**
   * @description 4 bit field is set as part of responses.
   *              0 -- no error condition
   *              1 -- format error, the server was unable to interpret the query
   *              2 -- server failure
   *              3 -- name error -
   *              4 -- server does not support this type of request
   *              5 -- refused
   *              6 - 15 -- reserved for future
   
   
   * @type {number}
   */

  rcode: number

  /**
   * @description unsigned 16 bit int specifying number of entries in question sections
   * @type {number}
   */

  qdcount: number

  /**
   * @description unsigned 16 bit, specifying the number of resource records in the answer section
   * @type {number}
   */

  ancount: number

  /**
   * @description unsigned 16 bit, specifying the number of name services records in the authority records section
   * @type {number}
   */

  nscount: number

  /**
   * @description unsigned 16 bit, specifying the number of resource records in additional records section
   * @type {number}
   */

  arcount: number
}

export interface IQuestion {
  /**
   * @description a domain name represented as a sequence of labels, where each label consists of a length octet followed by that number of octets.  The domain name terminates with the zero length octet for the null label of the root.  Note that this field may be an odd number of octets; no padding is used.
   * @type {number}
   */

  qname: number

  /**
   * @description  a two octet code which specifies the type of the query. The values for this field include all codes valid for a TYPE field, together with some more general codes which can match more than one type of RR.
   * @type {number}
   */

  qtype: number

  /**
   * @description     a two octet code that specifies the class of the query. For example, the QCLASS field is IN for the Internet.
   * @type {number}
   */

  qclass: number
}
