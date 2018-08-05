const DEFAULTPAGE =1;
const DEFAULTRECORSPERPAGE=10;
class Query {
    constructor(terms) {
        this._terms = terms;
        this._page = DEFAULTPAGE;
        this._recordsPerPage = DEFAULTRECORSPERPAGE;
    }
    get terms() {
        return this._terms;
    }
    set page(value) {
        this._page = parseInt(value) || DEFAULTPAGE;
    }
    get page() {
        return this._page;
    }
    set recordsPerPage(value) {
        this._recordsPerPage = parseInt(value) || DEFAULTRECORSPERPAGE;
    }
    get recordsPerPage() {
        return this._recordsPerPage;
    }
    toJSON() {
        return {
            terms: this.terms,
            page: this.page,
            recordsPerPage: this.recordsPerPage
        }
    }
   
}

module.exports = {
    Query:Query,
    DEFAULTPAGE:DEFAULTPAGE, //export for test
    DEFAULTRECORSPERPAGE:DEFAULTRECORSPERPAGE //export for test
}