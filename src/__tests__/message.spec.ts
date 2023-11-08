import Header from '../header'
import Message from '../message'
import qName from '../qName'
import Question from '../question'
import ResourceRecord from '../resourceRecord'

describe('Message Class...', () => {
  it('Creates a new Message class fromBuffer', () => {
    const messageBuffer = Buffer.from(
      '00168080000100020000000003646e7306676f6f676c6503636f6d0000010001c00c0001000100000214000408080808c00c0001000100000214000408080404',
      'hex'
    ) // from coding challenge, this is 'dns.google.com'
    const message = Message.fromBuffer(messageBuffer)
    expect(message).toBeInstanceOf(Message)
    expect(message.header.id).toBe(22)
    expect(message.question.qname).toBeInstanceOf(qName)
    expect(message.question).toBeInstanceOf(Question)
    message.answers?.forEach((answer) => {
      expect(answer).toBeInstanceOf(ResourceRecord)
    })
    const ips = message.answers?.map((an) => {
      return an.rdata
    })
    expect(ips![0]).toBe('8.8.8.8')
    expect(ips![1]).toBe('8.8.4.4')
  })
  it('Parses name and IP correctly', () => {
    const buffer = Buffer.from(
      '00160100000100000000000003646e7306676f6f676c6503636f6d0000010001',
      'hex'
    )

    const message = Message.fromBuffer(buffer)
    expect(message.header.id).toBe(22)
    expect(message.question.qname.toASCII(buffer)).toBe('dns.google.com')
  })
  it('Creates a new Message with header and question sections', () => {
    const buffer = Buffer.from(
      '00160100000100000000000003646e7306676f6f676c6503636f6d0000010001',
      'hex'
    )
    const header = Header.createHeader(22, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0)
    const question = Question.create('dns.google.com')
    const message = new Message(header, question)
    expect(message).toBeInstanceOf(Message)
    const messageBuffer = message.toBuffer()
    expect(messageBuffer.toString('hex')).toBe(buffer.toString('hex'))
  })
})
