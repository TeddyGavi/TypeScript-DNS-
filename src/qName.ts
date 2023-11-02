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

  toBuffer(): Buffer {
    return Buffer.alloc(1)
  }

  public static create(name: string): Name {
    const domainSplit = name.split('.')

    for (let i = 0; i < domainSplit.length; i++) {
      const length = domainSplit[i].length
      domainSplit[i] = length + domainSplit[i]
      if (i === domainSplit.length - 1) domainSplit[i] = domainSplit[i] + '0'
    }
    return new Name({ labels: domainSplit, pointer: null })
  }
}
