# DNS Resolver in TypeScript

- [John Crickett Coding Challenge](https://codingchallenges.fyi/challenges/challenge-dns-resolver/)
- [DNS-primer](https://courses.cs.duke.edu//fall16/compsci356/DNS/DNS-primer.pdf)

## References

- [Domain Specs](https://datatracker.ietf.org/doc/html/rfc1035)
- [Example by](https://github.com/jainmohit2001/coding-challenges/tree/master/src/22) - [jainmohit2001](https://github.com/jainmohit2001)
- [Example by](https://github.com/k-nut/tsdns) - [k-nut](https://github.com/k-nut)


Define Class Structures:

a. Header Class: Create a class that represents the DNS header, including fields like ID, flags, and counts.

b. Question Class: Define a class for DNS questions, which includes QNAME, QTYPE, and QCLASS fields.

c. ResourceRecord Class: Create a class for resource records that can be used in the answer, authority, and additional sections. This class should include fields like name, type, class, time-to-live (TTL), and data.

Message Class:

Create a Message class that serves as the top-level class for DNS messages. This class will contain instances of the header, an array of questions, and arrays for answer, authority, and additional sections (which consist of resource records).

Parsing and Encoding Methods:

Implement methods within each class for parsing binary data into object instances and encoding object instances back into binary data. For example, you should have methods like parse and encode for the Header, Question, and ResourceRecord classes.

Message Building and Parsing:

In the Message class, implement methods for constructing DNS messages, such as addQuestion, addAnswer, addAuthority, and addAdditional. Also, provide methods for parsing binary data into a Message object.

Query and Response Classes:

If desired, you can create separate classes for DNS queries and responses, inheriting from the Message class. These classes may have methods and properties specific to queries or responses.

Error Handling:

Implement error handling mechanisms for parsing errors, encoding errors, and validation checks to ensure the DNS message adheres to the DNS protocol.

Testing and Validation:

Develop test cases to validate that your classes correctly handle various DNS message scenarios, including query and response messages. Testing is crucial to ensure your implementation works as expected.

Usage:

Use the classes in your application to build and parse DNS messages as needed. You can also extend the classes or add additional functionality to suit your specific use case.