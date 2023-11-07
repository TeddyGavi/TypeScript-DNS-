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
    if (this.pointer) {
      return 2
    }

    let bytes = 1
    for (let i = 0; i < this.labels.length; i++) {
      bytes += this.labels[i].length + 1
    }
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
      } else if (length >= 0xc0) {
        const offset = ((length & 0x3f) << 8) + buffer.readUInt8(position)

        return new qName({ labels, pointer: offset })
      } else {
        const copy = buffer.subarray(position, position + length)
        labels.push(copy.toString())
        position += length
      }
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

  public toASCII(buffer: Buffer): string {
    if (this.pointer) {
      let position = this.pointer
      const labels = []

      while (position < buffer.length) {
        const data = buffer.readUInt8(position)
        position++

        if (data === 0) {
          break
        }
        const copy = buffer.subarray(position, position + data)
        labels.push(copy.toString())
        position += data
      }
      return labels.join('.')
    } else {
      return this.labels.join('.')
    }
  }

  public static create(name: string): qName {
    const domainSplit = name.split('.')

    return new qName({ labels: domainSplit, pointer: null })
  }
}
