import Message from '../message'

describe('Message Class...', () => {
  it('Creates a new Message class and reads correct data from response', () => {
    const messageBuffer = Buffer.from(
      '00168080000100020000000003646e7306676f6f676c6503636f6d0000010001c00c0001000100000214000408080808c00c0001000100000214000408080404',
      'hex'
    )

    const message = Message.fromBuffer(messageBuffer)
    console.log(message)
  })
})
