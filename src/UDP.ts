import dgram, { Socket } from 'node:dgram'
import Message from './message'
import Header from './header'
import Question from './question'
import { TYPE } from './enums'
import ResourceRecord from './resourceRecord'

export default class UDP {
  private client: Socket

  constructor() {
    this.client = dgram.createSocket('udp4')
    this.recieveMessage = this.recieveMessage.bind(this)
    this.send = this.send.bind(this)
  }

  private parseRecords(records: ResourceRecord[]) {
    records.forEach((record) => {
      if (record.type === TYPE.A) {
        const header = Header.createHeader()
        const question = Question.create('dns.google.com')
        const message = new Message(header, question)
        this.client.on('message', this.recieveMessage)
        this.client.send(
          message.toBuffer(),
          53,
          record.rdata,
          (error, bytes) => {
            if (error) this.client.close()

            console.log('hi', bytes)
          }
        )
      }
    })
  }

  private recieveMessage(message: Buffer) {
    const messageRecieved = Message.fromBuffer(message)

    console.log(
      'header:',
      messageRecieved.header,
      'question:',
      messageRecieved.question,
      'answers:',
      messageRecieved.answers,
      'auth:',
      messageRecieved.authority,
      'add:',
      messageRecieved.additional
    )
    if (messageRecieved.answers && messageRecieved.answers.length > 0) {
      this.parseRecords(messageRecieved.answers)
    } else if (
      messageRecieved.authority &&
      messageRecieved.authority.length > 0
    ) {
      this.parseRecords(messageRecieved.authority)
    } else if (
      messageRecieved.additional &&
      messageRecieved.additional.length > 0
    ) {
      this.parseRecords(messageRecieved.additional)
    }

    this.client.close()
  }
  public send(ip: string = '198.41.0.4') {
    const header = Header.createHeader()
    const question = Question.create('dns.google.com')
    const message = new Message(header, question)
    this.client.on('message', this.recieveMessage)
    this.client.send(message.toBuffer(), 53, ip, (error, bytes) => {
      if (error) this.client.close()

      console.log('hi', bytes)
    })
  }
}
