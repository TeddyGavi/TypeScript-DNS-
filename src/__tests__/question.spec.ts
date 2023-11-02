import { QCLASS, QTYPE } from '../enums'
import Question from '../question'
import QName from '../qName'

describe('Question', () => {
  it('should create a Question instance from a DNS message buffer', () => {
    const qnameBuffer = Buffer.from(
      '037777770c6e6f7274686561737465726e0365647500',
      'hex'
    )
    const qtypeBuffer = Buffer.from([0x00, 0x01]) // Assuming QTYPE A (1) in big-endian format
    const qclassBuffer = Buffer.from([0x00, 0x01]) // Assuming QCLASS IN (1) in big-endian format

    const buffer = Buffer.concat([qnameBuffer, qtypeBuffer, qclassBuffer])

    const question = Question.fromBuffer(buffer)

    // Add assertions to check if the Question instance is correctly created
    expect(question).toBeInstanceOf(Question)
    expect(question.qname).toBeInstanceOf(QName)
    expect(question.qtype).toBe(QTYPE.A)
    expect(question.qclass).toBe(QCLASS.IN)
  })
})
