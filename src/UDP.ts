import dgram, { Socket } from 'node:dgram'
import Message from './message'
import Header from './header'
import Question from './question'

export default class UDP {
  private client: Socket

  constructor() {
    this.client = dgram.createSocket('udp4')
    this.recieveMessage = this.recieveMessage.bind(this)
    this.send = this.send.bind(this)
  }

  private recieveMessage(message: Buffer) {
    const messageRecieved = Message.fromBuffer(message)

    console.log(messageRecieved)
    messageRecieved.answers?.map((answer) => {
      console.log(answer.rdata)
      console.log(answer.name.toASCII(messageRecieved.toBuffer()))
    })
    this.client.close()
  }
  public send() {
    const header = Header.createHeader(22, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0)
    const question = Question.create('dns.google.com')
    const message = new Message(header, question)
    this.client.on('message', this.recieveMessage)
    this.client.send(message.toBuffer(), 53, '198.41.0.4', (error, bytes) => {
      if (error) this.client.close()

      console.log('hi', bytes)
    })
  }
}
