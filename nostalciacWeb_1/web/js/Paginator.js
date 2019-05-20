import {html, render} from "./../node_modules/lit-html/lit-html.js"
        /*
         * page
         * count
         * callback
         * 
         */

export default class Paginator {
    constructor(properties) {
        this.prop = properties;
        this.bindings();
        this.current = 1;
        this.page = this.prop.page;
        this.count = this.prop.count;
        this.lastPage = this.lastPage();
        this.createView();
    }

    bindings() {
        this.onFirst = this.onFirst.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onLast = this.onLast.bind(this);
        this.checkButtons = this.checkButtons.bind(this);
    }

    lastPage() {
        let p = Math.floor(this.count / this.page);
        return this.count % this.page !== 0 ? p + 1 : p;
    }

    createView() {
        return html`
            <button id="btnFirst" class="pure-button" @click=${this.onFirst}>First</button>
            <button id="btnPrev" @click=${this.onPrev}>Prev</button>
            <button id="btnNext" @click=${this.onNext}>Next</button>
            <button id="btnLast" @click=${this.onLast}>Last</button>
        `
    }

    loadButtons() {
        this.first = document.querySelector("#btnFirst");
        this.prev = document.querySelector("#btnPrev");
        this.next = document.querySelector("#btnNext");
        this.last = document.querySelector("#btnLast");
        this.addClickEventListener(this.first,this.prev,this.next,this.last);
    }

    addClickEventListener(...buttons) {
        buttons.forEach(el => {
            el.addEventListener("click", this.checkButtons);
            el.addEventListener("click", this.prop.callback);
        })
    }
    
    checkButtons() {
        this.first.classList.toggle("pure-button-disabled", this.current == 1);
        this.prev.classList.toggle("pure-button-disabled", this.current == 1);
        this.next.classList.toggle("pure-button-disabled", this.current == this.lastPage);
        this.last.classList.toggle("pure-button-disabled", this.current == this.lastPage);
    }

    onFirst() {
        this.current = 1;
    }

    onPrev(e) {
        this.current--;
    }

    onNext(e) {
        this.current++;
    }

    onLast(e) {
        this.current = this.lastPage;
    }
}


