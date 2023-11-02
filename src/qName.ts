import { IQName } from './types'

/* The name field is an encoded version of the host name string, so if we’re looking up dns.google.com it will be encoded as the following (bytes) 3dns6google3com0. 

I need to take a string from command line and turn it into byte string, then this needs to be encoded

THIS is then added to the question as the QName

*/

export default class Name implements IQName {
  labels: string[]
  pointer: number | null

  constructor({
    labels,
    pointer,
  }: {
    labels: string[]
    pointer: number | null
  }) {
    this.labels = labels
    this.pointer = pointer
  }

  get length(): number {
    // this will be the length of each label * 8 (8 bits per byte)

    const bytes = this.labels.reduce((total, part) => {
      return total + part.length + 1
    }, 1)

    return bytes * 8
  }

  public static create(name: string): Name {
    const domainSplit = name.split('.')

    return new Name({ labels: domainSplit, pointer: null })
  }

  static fromBuffer(buffer: Buffer): Name {
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
    return new Name({ labels, pointer: null })
  }

  public toASCII(): string {
    return this.labels.join('.')
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
}
