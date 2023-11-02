/* 
The question section is used to carry the "question" in most queries,
i.e., the parameters that define what is being asked.  The section
contains QDCOUNT (usually 1) entries, each of the following format:

                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
      +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                                               |
    /                     QNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     QTYPE                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     QCLASS                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    */

import { QCLASS, QTYPE } from './enums'
import qName from './qName'
import { IQuestion } from './types'

export default class Question implements IQuestion {
  qname: qName
  qtype: QTYPE
  qclass: QCLASS

  constructor({ qname, qtype, qclass }: IQuestion) {
    this.qname = qname
    this.qtype = qtype
    this.qclass = qclass
  }
  static fromBuffer(buffer: Buffer): Question {
    const qname = qName.fromBuffer(buffer)
    const qnameLength = qname.length // bits!
    const qtype = buffer.readUInt16BE(qnameLength / 8)
    const qclass = buffer.readUInt16BE(2 + qnameLength / 8)

    return new Question({ qname, qtype, qclass })
  }

  // toBuffer(): Buffer {}
}
