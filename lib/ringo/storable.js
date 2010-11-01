
var Storable = exports.Storable = function Storable() {};

Storable.defineEntity = function(store, type, mapping) {

    // This uses explicit getters/setters so it requires an explicit mapping
    if (!mapping || !mapping.properties) {
        throw new Error("ringo-storable requires explicit property mapping");
    }

    // user facing constructor, called with a single properties object
    var ctor = function(props) {
        return Object.create(ctor.prototype, {
            _props: {value: props || {}, writable: true},
            _entity: {value: undefined, writable: true}
            // uses the _key getter defined in the prototype
        });
    };

    // factory function used by the store implementation, called with a
    // key and an optional entity argument
    ctor.createInstance = function(key, entity) {
        return Object.create(ctor.prototype, {
            _props: {value: undefined, writable: true},
            _key: {value: key, writable: true},
            _entity: {value: entity, writable: true}
        });
    };

    // make it inherit Storable
    ctor.prototype = new Storable();
    // define mapping and toString properties
    Object.defineProperties(ctor, {
        mapping: {value: mapping},
        toString: {value: function() {return "function " + type + "() {}"}}
    });

    // define getters and setters for all properties defined by mapping,
    Object.keys(mapping.properties).forEach(function(key) {
        Object.defineProperty(ctor.prototype, key, {
            get: function() {
                var props = this._props || loadProperties(this);
                return props[key];
            },
            set: function(value) {
                var props = this._props || loadProperties(this);
                props[key] = value;
            },
            enumerable: true
        })
    });

    // define getters for standard properties
    Object.defineProperties(ctor.prototype, {
        _id: {
            get: function() {
                return this._key && store.getId(this._key) || undefined;
            }
        },
        _key: {
            get: function() {
                return this._entity ? getKey(this._entity) : undefined;
            }
        },
        save : {
            value: function(tx) {
                var entity = this._entity || loadEntity(this);
                store.save(this._props, entity, tx);
            }
        },
        remove: {
            value: function(tx) {
                var key = getKey(this);
                store.remove(key, tx);
            }
        },
        toString: {
            value: function() {return "[Storable " + type + "]"},
            writable: true
        }
    });

    // utility methods
    function loadProperties(obj) {
        if (!obj._entity) {
            obj._entity = store.getEntity(type, obj._key);
        }
        obj._props = store.getProperties(store, obj._entity);
        return obj._props;
    }
    function loadEntity(obj) {
        obj._entity = store.getEntity(type, obj._props || obj._key);
        return obj._entity;
    }
    function getKey(obj) {
        if (!obj._key && obj._entity) {
            obj._key = store.getKey(obj._entity);
        }
        return obj._key;
    }

    return ctor;
};

