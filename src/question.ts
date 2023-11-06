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

  /**
   * @method get length
   * @returns length of total question in BYTES
   */

  get length() {
    // Bytes
    return this.qname.length + 4
  }

  static fromBuffer(buffer: Buffer): Question {
    const qname = qName.fromBuffer(buffer)
    const qnameLength = qname.length // bytes!
    const qtype = buffer.readUInt16BE(qnameLength)
    const qclass = buffer.readUInt16BE(2 + qnameLength)

    if (qtype !== 1) {
      throw new Error(`Unsupported QTYPE value: ${qtype}`)
    }

    if (qclass !== 1) {
      throw new Error(`Unsupported QCLASS value: ${qclass}`)
    }

    return new Question({ qname, qtype, qclass })
  }

  public toBuffer(): Buffer {
    const qname = this.qname.toBuffer()
    const qnameLength = qname.length // BYTES!
    const totalLength = qnameLength + 4
    const question = Buffer.alloc(totalLength)

    qname.copy(question, 0, 0, qnameLength) // copy the qname Buffer into the question buffer

    question.writeUInt16BE(this.qtype, qnameLength)
    question.writeUInt16BE(this.qclass, qnameLength + 2)
    return question
  }

  public static create(name: string): Question {
    //only support host address and internet questions
    return new Question({ qname: qName.create(name), qtype: 1, qclass: 1 })
  }
}
