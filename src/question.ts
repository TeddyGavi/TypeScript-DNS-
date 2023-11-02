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
import { IQName, IQuestion } from './types'

export default class Question implements IQuestion {
  qname: IQName
  qtype: QTYPE
  qclass: QCLASS

  constructor({
    qname,
    qtype,
    qclass,
  }: {
    qname: IQName
    qtype: QTYPE
    qclass: QCLASS
  }) {
    this.qname = qname
    this.qtype = qtype
    this.qclass = qclass
  }
  // static fromBuffer(buffer: Buffer): Question {

  // }

  // toBuffer(): Buffer {

  // }
}
