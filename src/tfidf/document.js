const NAMEISREQUIRED = 'name is required';

class Document {
    constructor(name) {
        if (!name) {
            throw NAMEISREQUIRED;
        }
        this._name = name;
    }
    get name() {
        return this._name;
    }
}

module.exports = {
    Document: Document,
    NAMEISREQUIRED: NAMEISREQUIRED
}

