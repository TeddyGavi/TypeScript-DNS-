import Name from '../qName'

describe('qName Class...', () => {
  it('should create a Name instance with labels', () => {
    const labels = ['www', 'example', 'com']
    const pointer = null
    const name = new Name({ labels, pointer })

    expect(name).toBeInstanceOf(Name)
    expect(name.labels).toEqual(labels)
    expect(name.pointer).toBe(pointer)
  })

  it('Creates a new instance with a correct string label property', () => {
    const name = Name.create('www.example.com')
    const expected = { labels: ['www', 'example', 'com'], pointer: null }

    expect(name).toEqual(expected)
  })

  describe('toBuffer', () => {
    it('should convert a Name instance to a DNS QName buffer', () => {
      const name = Name.create('www.northeastern.edu')
      const qnameBuffer = name.toBuffer()

      const expected = Buffer.from(
        '037777770c6e6f7274686561737465726e0365647500',
        'hex'
      )
      expect(qnameBuffer).toEqual(expected)
    })
    /*  
    INCORRECT BUFFER
    it('should convert a Name instance to a DNS QName buffer', () => {
      const name = Name.create('www.example.com')

      const qnameBuffer = name.toBuffer()

      // Expected buffer based on the labels
      const expectedBuffer = Buffer.from(
        '03677777076578616d706c6503636f6d00',
        'hex'
      )
      console.log(qnameBuffer, expectedBuffer)

      expect(qnameBuffer).toEqual(expectedBuffer)
    }) */
  })
})
