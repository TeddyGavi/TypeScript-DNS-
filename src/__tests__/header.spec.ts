import Header from '../header'

describe('Header Class', () => {
  // Test the creation of a Header instance
  it('should create a Header instance with provided values', () => {
    const header = new Header({
      id: 12345,
      qr: 1,
      opcode: 2,
      aa: 1,
      tc: 0,
      rd: 1,
      ra: 0,
      z: 0,
      rcode: 3,
      qdcount: 10,
      ancount: 20,
      nscount: 30,
      arcount: 40,
    })

    expect(header).toBeInstanceOf(Header)
    expect(header.id).toBe(12345)
    expect(header.qr).toBe(1)
  })

  it('should create a Header instance from a buffer', () => {
    const buffer = Buffer.from(
      '00808180000100010000000003777777056b2d6e7574026575000001000103777777056b2d6e7574026575000001000100000e100004b91a9c18',
      'hex'
    )
    const header = Header.fromBuffer(buffer)

    expect(header).toBeInstanceOf(Header)
    expect(header.id).toBe(128)
  })

  it('should create a Header instance from a buffer', () => {
    const buffer = Buffer.from(
      '00160100000100000000000003646e7306676f6f676c6503636f6d0000010001',
      'hex'
    )
    const header = Header.fromBuffer(buffer)
    expect(header.rd).toBe(1)
    expect(header.id).toBe(22)
  })

  // Test the toBuffer method
  it('should convert a Header instance to a buffer', () => {
    const header = new Header({
      id: 12345,
      qr: 1,
      opcode: 2,
      aa: 1,
      tc: 0,
      rd: 1,
      ra: 0,
      z: 0,
      rcode: 3,
      qdcount: 10,
      ancount: 20,
      nscount: 30,
      arcount: 40,
    })

    const buffer = header.toBuffer()
    const expectedBuffer = Buffer.from('30399503000a0014001e0028', 'hex')
    const areEqual = Buffer.compare(buffer, expectedBuffer) === 0

    expect(areEqual).toBe(true)
  })
})
