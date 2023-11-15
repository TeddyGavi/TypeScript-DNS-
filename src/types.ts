import { CLASS, QCLASS, QTYPE, TYPE } from './enums'
import Header from './header'
import qName from './qName'
import Question from './question'
import ResourceRecord from './resourceRecord'

export interface IHeader {
  //Octet structure
  /** @description id is 16 bit unsigned (positive) integer
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

export interface IQName {
  /**
   * @description A QName should contain a sequence of labels, where each label consist of a length octet followed by that number of octets. The domain name terminates with the zero length octet for the nul label of the root
   * @example For example, if the domain name is "www.example.com," it would be represented as ["3www", "7example", "3com"] in the QName class.
   * @type {string[]}
   */

  labels: string[]

  /**
   * @description points to the offset to use to when compression is used, ie in a packet the first two bits are 1's. This allows the domain name in a message to be either:This allows the domain name in a message to be either:
   * • a sequence of labels ending in a zero octet
   * • a pointer
   * • a sequence of labels ending with a pointer
   */

  pointer: number | null
}

export interface IQuestion {
  /**
   * @description a domain name represented as a sequence of labels, where each label consists of a length octet followed by that number of octets.  The domain name terminates with the zero length octet for the null label of the root.  Note that this field may be an odd number of octets; no padding is used.
   * @type {qName}
   */

  qname: qName

  /**
   * @description  a two octet code which specifies the type of the query. The values for this field include all codes valid for a TYPE field, together with some more general codes which can match more than one type of RR.
   * @type {QTYPE}
   */

  qtype: QTYPE

  /**
   * @description     a two octet code that specifies the class of the query. For example, the QCLASS field is IN for the Internet.
   * @type {QCLASS}
   */

  qclass: QCLASS
}

export interface IResourceRecord {
  /**
   * @description the name of the node to which this resource record pertains,  The domain name that was queried, in the same format as the QNAME in the questions.
   * @type {qName}
   */

  name: qName

  /**
   * @description Two octets containing one of the type codes. This field specifies the meaning of the data in the RDATA field.
   * @type {TYPE}
   */

  type: TYPE

  /**
   * @description Two octets which specify the class of the data in the RDATA field. You should expect 0x0001 for this project, representing Internet addresses.
   * @type {CLASS}
   */

  rrclass: CLASS

  /**
   * @description unsigned 32 bit integer, the number of seconds the results can be cached
   * @type {number}
   */

  ttl: number

  /**
   * @description unsigned 16bit integer, the length of the RDATA field
   * @type {number}
   */

  rdlength: number

  /**
   * @description   a variable length string of octets that describes the resource. The format of this information varies according o the TYPE and CLASS of the resource record. For example, the if the TYPE is A and the CLASS is IN, the RDATA field is a 4 octet ARPA Internet address.
   * @type {string}
   */

  rdata: string
}

export interface IMessage {
  /**
   * @description the header is always present, and includes fields that specify which of the remaining sections are present and also specify whether the message is a query or a response or a standard query
   * @type {Header}
   */

  header: Header

  /**
   * @description the question for the server!
   * @type {Question}
   */

  question?: Question

  /**
   * @description Resource record format which answers the question!
   * @type {ResourceRecord}
   */

  answers?: ResourceRecord[]

  /**
   * @description RR format that point to the authoritative name server
   * @type {ResourceRecord}
   */

  authority?: ResourceRecord[]

  /**
   * @description contains responses that relate to the query but are not strictly answers to the question
   * @type {ResourceRecord}
   */
  additional?: ResourceRecord[]
}
