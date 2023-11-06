import qName from '../qName'

describe('qName Class...', () => {
  it('should create a Name instance with labels', () => {
    const labels = ['www', 'example', 'com']
    const pointer = null
    const name = new qName({ labels, pointer })

    expect(name).toBeInstanceOf(qName)
    expect(name.labels).toEqual(labels)
    expect(name.pointer).toBe(pointer)
  })

  it('Creates a new instance with a correct string label property', () => {
    const name = qName.create('www.example.com')
    const expected = { labels: ['www', 'example', 'com'], pointer: null }

    expect(name).toEqual(expected)
  })

  describe('toBuffer', () => {
    it('should convert a qName instance to a DNS qName buffer', () => {
      const name = qName.create('www.northeastern.edu')
      const qnameBuffer = name.toBuffer()

      const expected = Buffer.from(
        '037777770c6e6f7274686561737465726e0365647500',
        'hex'
      )
      expect(qnameBuffer).toEqual(expected)
    })

    it('should convert a qName instance to a DNS qName buffer', () => {
      const name = qName.create('www.example.com')

      const qnameBuffer = name.toBuffer()

      // Expected buffer based on the labels
      const expectedBuffer = Buffer.from(
        '03777777076578616d706c6503636f6d00',
        'hex'
      )
      expect(qnameBuffer).toEqual(expectedBuffer)
      expect(name).toBeInstanceOf(qName)
    })
  })
  describe('fromBuffer', () => {
    it('should convert qName buffer to proper labels', () => {
      const buffer = Buffer.from(
        '037777770c6e6f7274686561737465726e0365647500',
        'hex'
      )

      const name = qName.fromBuffer(buffer)
      const expected = ['www', 'northeastern', 'edu']
      expect(name.labels).toEqual(expected)
    })
  })

  describe('toString', () => {
    it('should create a ascii string from labels', () => {
      const buffer = Buffer.from(
        '037777770c6e6f7274686561737465726e0365647500',
        'hex'
      )
      const name = qName.fromBuffer(buffer).toASCII(buffer)
      const expected = 'www.northeastern.edu'
      expect(name).toBe(expected)
    })
  })
})
