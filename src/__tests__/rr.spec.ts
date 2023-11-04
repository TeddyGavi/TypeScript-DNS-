import { TYPE, CLASS } from '../enums'
import ResourceRecord from '../resourceRecord'

describe('ResourceRecord Class...', () => {
  const nameBuffer = Buffer.from(
    '037777770c6e6f7274686561737465726e0365647500',
    'hex'
  ) // northeastern
  const typeBuffer = Buffer.from([0x00, 0x01]) // Assuming QTYPE A (1) in big-endian format
  const rrclassBuffer = Buffer.from([0x00, 0x01]) // Assuming QCLASS IN (1) in big-endian format
  const ttlBuffer = Buffer.from([0x00, 0x00, 0x00, 0x03c]) // 60
  const rdlengthBuffer = Buffer.from([0x00, 0x04]) // 4 bytes
  const rdataBuffer = Buffer.from([0x9b, 0x21, 0x11, 0x44])

  const buffer = Buffer.concat([
    nameBuffer,
    typeBuffer,
    rrclassBuffer,
    ttlBuffer,
    rdlengthBuffer,
    rdataBuffer,
  ])
  const answer = ResourceRecord.fromBuffer(buffer)
  it('Creates a new Resource Record from an Answer buffer', () => {
    expect(answer).toBeInstanceOf(ResourceRecord)
    expect(answer.ttl).toBe(60)
    expect(answer.type).toBe(TYPE.A)
    expect(answer.rrclass).toBe(CLASS.IN)
  })

  describe('Correctly parses A record...', () => {
    it('Resolves correct IP Address from answer', () => {
      const ip = answer.getDataByRecord(1)
      expect(ip).toBe('155.33.17.68')
    })
  })
})
