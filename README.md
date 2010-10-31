# ringo-storable

A pure-JS implementation of Ringo's Storable implementation.
This is an experimental, proof-of-concept kind of implementaion.
It will only work with explicitly mapped stores such as
ringo-hibernate or ringo-sqlstore.

To use ringo-storable in a store implementation use this line to
import the Storable base class:

    var {Storable} = require("ringo/storable");
