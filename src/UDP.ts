import dgram, { Socket } from 'node:dgram'
import Message from './message'
import Header from './header'
import Question from './question'
import { TYPE } from './enums'

export default class UDP {
  private client: Socket

  constructor() {
    this.client = dgram.createSocket('udp4')
    this.recieveMessage = this.recieveMessage.bind(this)
    this.send = this.send.bind(this)
  }

  private recieveMessage(message: Buffer) {
    const messageRecieved = Message.fromBuffer(message)

    if (messageRecieved.answers) {
      messageRecieved.answers.forEach((ans) => {
        if (TYPE.NS === ans.type) {
          const authNameServerIp = ans.rdata

          const header = Header.createHeader(
            22,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0
          )
          const question = Question.create('dns.google.com')
          const newMessage = new Message(header, question)

          this.client.send(
            newMessage.toBuffer(),
            53,
            authNameServerIp,
            (error, bytes) => {
              if (error) this.client.close()
              console.log(
                `Sending another DNS query to authoritative name server: ${authNameServerIp}`
              )
            }
          )
        }
      })
    }
    this.client.close()
  }
  public send() {
    const header = Header.createHeader(22, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0)
    const question = Question.create('dns.google.com')
    const message = new Message(header, question)
    this.client.on('message', this.recieveMessage)
    this.client.send(message.toBuffer(), 53, '198.41.0.4', (error, bytes) => {
      if (error) this.client.close()

      console.log('hi', bytes)
    })
  }
}
