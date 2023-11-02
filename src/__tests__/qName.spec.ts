import Name from '../qName'

describe('qName Class...', () => {
  it('Creates a new instance with a correct string label property', () => {
    const name = Name.create('www.example.com')
    const expected = { labels: ['3www', '7example', '3com0'], pointer: null }

    expect(name).toEqual(expected)
  })
})
