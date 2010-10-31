# ringo-storable

A pure ECMAScript 5 implementation of Ringo's Storable base class.
This is an experimental, proof-of-concept kind of implementaion.
It will only work with explicitly mapped stores such as
ringo-hibernate or ringo-sqlstore.

To use ringo-storable in a store implementation use this line to
import the Storable base class:

    var {Storable} = require("ringo/storable");

The current package has been tested successfully (albeit very quickly)
with ringo-hibernate and ringo-sqlstore.
