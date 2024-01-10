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
    let newIp: string | undefined
    for (const record of records) {
      if (record.type === TYPE.A) {
        newIp = record.rdata
      } else if (record.type === TYPE.NS) {
        this.send(record.rdata)
      }
    }
    if (newIp) {
      console.log('Found IP of record A', newIp)
      this.client.close()
    } else {
      console.log('No A record found')
    }
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
  }
  public send(ip: string = '198.41.0.4', domain = 'dns.google.com') {
    const header = Header.createHeader()
    const question = Question.create(domain)
    const message = new Message(header, question)
    this.client.on('message', this.recieveMessage)
    this.client.send(message.toBuffer(), 53, ip, (error, bytes) => {
      if (error) this.client.close()

      console.log('hi', bytes)
    })
  }
}
