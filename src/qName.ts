/* The name field is an encoded version of the host name string, so if we’re looking up dns.google.com it will be encoded as the following (bytes) 3dns6google3com0. 

I need to take a string from command line and turn it into byte string, then this needs to be encoded

THIS is then added to the question as the QName

*/

import { IQName } from './types'

export default class qName implements IQName {
  labels: string[]
  pointer: number | null

  constructor({ labels, pointer }: IQName) {
    this.labels = labels
    this.pointer = pointer
  }
  /**
   * @method length
   * @returns length of the name as *BYTES!*
   */
  get length(): number {
    // this will be the length of each label

    const bytes = this.labels.reduce((total, part) => {
      return total + part.length + 1
    }, 1)
    return bytes
  }

  static fromBuffer(buffer: Buffer): qName {
    const labels: string[] = []
    let position = 0

    while (position < buffer.length) {
      const length = buffer.readUInt8(position)
      position++

      if (length === 0) {
        break
      }
      const copy = Uint8Array.prototype.slice
        .call(buffer)
        .slice(position, position + length)
      labels.push(copy.toString())
      position += length
    }
    return new qName({ labels, pointer: null })
  }

  toBuffer(): Buffer {
    const name: Buffer[] = []

    for (const label of this.labels) {
      const length = Buffer.from([label.length])
      const bufferLabel = Buffer.from(label)
      name.push(Buffer.concat([length, bufferLabel]))
    }

    name.push(Buffer.from([0]))
    return Buffer.concat(name)
  }

  public toASCII(): string {
    return this.labels.join('.')
  }

  public static create(name: string): qName {
    const domainSplit = name.split('.')

    return new qName({ labels: domainSplit, pointer: null })
  }
}
