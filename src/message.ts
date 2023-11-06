/* 
This is the main entry point, the message creates: 

All communications inside of the domain protocol are carried in a single
format called a message.  The top level format of message is divided
into 5 sections (some of which are empty in certain cases) shown below:

    +---------------------+
    |        Header       |
    +---------------------+
    |       Question      | the question for the name server
    +---------------------+
    |        Answer       | RRs answering the question
    +---------------------+
    |      Authority      | RRs pointing toward an authority
    +---------------------+
    |      Additional     | RRs holding additional information
    +---------------------+
*/

import Header from './header'
import Question from './question'
import ResourceRecord from './resourceRecord'
import { IMessage } from './types'

export default class Message implements IMessage {
  header: Header
  question: Question
  answer?: ResourceRecord | undefined
  authority?: ResourceRecord | undefined
  additional?: ResourceRecord | undefined

  constructor(
    header: Header,
    question: Question,
    answer?: ResourceRecord,
    authority?: ResourceRecord,
    additional?: ResourceRecord
  ) {
    this.header = header
    this.question = question
    this.answer = answer || undefined
    this.authority = authority || undefined
    this.additional = additional || undefined
  }

  static fromBuffer(buffer: Buffer): Message {
    // we know header is 12 bytes long
    // question is the length of the qname plus 4 bytes
    const header = Header.fromBuffer(buffer)
    const question = Question.fromBuffer(buffer.subarray(12))
    const answer = ResourceRecord.fromBuffer(
      buffer.subarray(question.length / 8 + 4, buffer.length)
    )

    return new Message(header, question, answer)
  }

  public toBuffer(): Buffer {
    return Buffer.concat([this.header.toBuffer(), this.question.toBuffer()])
  }
}
