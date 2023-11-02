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

    expect(question).toBeInstanceOf(Question)
    expect(question.qname).toBeInstanceOf(QName)
    expect(question.qtype).toBe(QTYPE.A)
    expect(question.qclass).toBe(QCLASS.IN)
  })

  describe('Question Errors', () => {
    //currently anything other than qtype 1 and qclass 1 are not allowed
    it('should throw an error for unsupported QTYPE', () => {
      const qnameBuffer = Buffer.from(
        '03777777076578616d706c6503636f6d00',
        'hex'
      )
      const qtypeBuffer = Buffer.from([0x00, 0xff]) // Unsupported QTYPE
      const qclassBuffer = Buffer.from([0x00, 0x01])

      const buffer = Buffer.concat([qnameBuffer, qtypeBuffer, qclassBuffer])
      expect(() => Question.fromBuffer(buffer)).toThrow(
        `Unsupported QTYPE value: 255`
      )
    })
    it('should throw an error for an unsupported QCLASS', () => {
      const qnameBuffer = Buffer.from(
        '03777777076578616d706c6503636f6d00',
        'hex'
      )
      const qtypeBuffer = Buffer.from([0x00, 0x01])
      const qclassBuffer = Buffer.from([0x00, 0xff])
      const buffer = Buffer.concat([qnameBuffer, qtypeBuffer, qclassBuffer])

      expect(() => Question.fromBuffer(buffer)).toThrow(
        `Unsupported QCLASS value: 255`
      )
    })
  })
})
