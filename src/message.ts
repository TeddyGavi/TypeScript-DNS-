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
  answers?: ResourceRecord[]
  authority?: ResourceRecord[]
  additional?: ResourceRecord[]

  constructor(
    header: Header,
    question: Question,
    answers?: ResourceRecord[],
    authority?: ResourceRecord[],
    additional?: ResourceRecord[]
  ) {
    this.header = header
    this.question = question
    this.answers = answers
    this.authority = authority
    this.additional = additional
  }
  private static createResourceRecordArray(
    buffer: Buffer,
    offset: number,
    length: number
  ): ResourceRecord[] {
    const result: ResourceRecord[] = []
    for (let i = 0; i < length; i++) {
      const rr = ResourceRecord.fromBuffer(buffer.subarray(offset))
      result.push(rr)
      offset += rr.length
    }
    return result
  }

  static fromBuffer(buffer: Buffer): Message {
    // we know header is 12 bytes long
    const headerLength = 12
    // question is the length of the qname plus 4 bytes
    const header = Header.fromBuffer(buffer.subarray(0, headerLength))
    const question = Question.fromBuffer(buffer.subarray(headerLength))
    let answers: ResourceRecord[] = []
    let authority: ResourceRecord[] = []
    let additional: ResourceRecord[] = []
    const answerOffset = headerLength + question.length

    if (header.ancount > 0) {
      answers = Message.createResourceRecordArray(
        buffer,
        answerOffset,
        header.ancount
      )
    }

    if (header.nscount > 0) {
      const authOffset = headerLength + question.length + answerOffset
      authority = Message.createResourceRecordArray(
        buffer,
        authOffset,
        header.nscount
      )
      const addtionalOffset =
        headerLength + question.length + answerOffset + authOffset

      if (header.arcount > 0) {
        additional = Message.createResourceRecordArray(
          buffer,
          addtionalOffset,
          header.arcount
        )
      }
    }
    // const authNameServer: null | ResourceRecord[] = null
    // const additional: ResourceRecord[] = []
    // for (let i = 0; i < header.ancount; i++) {
    //   const answer = ResourceRecord.fromBuffer(buffer.subarray(answerOffset))
    //   answers.push(answer)
    //   answerOffset += answer.length
    // }

    // if (header.nscount > 0) {
    //   let authOffset = headerLength + question.length + answerOffset
    //   for (let i = 0; i < header.nscount; i++) {
    //     const rr = ResourceRecord.fromBuffer(buffer.subarray(authOffset))
    //     authNameServer.push(rr)
    //     authOffset += rr.length
    //   }
    // }

    return new Message(header, question, answers, authority, additional)
  }

  public toBuffer(): Buffer {
    return Buffer.concat([this.header.toBuffer(), this.question.toBuffer()])
  }
}
