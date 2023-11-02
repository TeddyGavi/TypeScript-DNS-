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

import { IHeader, IMessage, IQuestion, IResourceRecord } from './types'

export default class Message implements IMessage {
  header: IHeader
  question: IQuestion
  answer?: IResourceRecord | undefined
  authority?: IResourceRecord | undefined
  additional?: IResourceRecord | undefined

  constructor({ header, question, answer, authority, additional }: IMessage) {
    this.header = header
    this.question = question
    this.answer = answer || undefined
    this.authority = authority || undefined
    this.additional = additional || undefined
  }
}
