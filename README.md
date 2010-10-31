# ringo-storable

A pure ECMAScript 5 implementation of Ringo's `Storable` class.
`Storable` is a base class for mapping JavaScript objects to a variety
of relational or non-relational database backends.

To use this class you have to provide a
[store implementation](http://ringojs.org/wiki/Store_API/).
The `Storable` constructor can be imported as follows:

    var {Storable} = require("ringo/storable");

The current package has been tested successfully (albeit very quickly)
with ringo-hibernate and ringo-sqlstore. This is an experimental,
proof-of-concept kind of implementaion. It will only work with explicitly
mapped stores.

