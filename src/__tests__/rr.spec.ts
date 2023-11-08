import { TYPE, CLASS } from '../enums'
import ResourceRecord from '../resourceRecord'

describe('ResourceRecord Class...', () => {
  //in this case the name will be a pointer to the header, not needed here, using northeastern
  const name = Buffer.from([0xc0, 0x0c])
  const typeBuffer = Buffer.from([0x00, 0x01]) // Assuming QTYPE A (1) in big-endian format
  const rrclassBuffer = Buffer.from([0x00, 0x01]) // Assuming QCLASS IN (1) in big-endian format
  const ttlBuffer = Buffer.from([0x00, 0x00, 0x00, 0x03c]) // 60
  const rdlengthBuffer = Buffer.from([0x00, 0x04]) // 4 bytes
  const rdataBuffer = Buffer.from([0x9b, 0x21, 0x11, 0x44])

  const buffer = Buffer.concat([
    name,
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
      expect(answer.rdata).toBe('155.33.17.68')
    })
  })
})
