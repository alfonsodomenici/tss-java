import TagService from "./TagService.js"
        import { render, html} from "./node_modules/lit-html/lit-html.js"
export default class TagView extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.onDelete = this.onDelete.bind(this);
    }

    connectedCallback() {
        render(this.createView(), this.root);
    }

    createView() {
        return html`
                <style>
                    div{
                        border: solid 1px red;
                        margin-bottom: .5em;
                        padding: 2em;
                    }
                    div:hover{
                        background: lightgreen;
                    }
                </style>
                <div>
                    <h3>${this.getAttribute('tipo')}</h3>
                    <p>${this.getAttribute('data-id')} - ${this.getAttribute('tag')}</p>
                    <button @click=${this.onDelete}>Elimina</button>
                </div>
            `
    }

    onDelete() {
        this.dispatchEvent(new CustomEvent('dtag', {
            bubbles: true,
            composed: true,
            detail: {
                id: this.getAttribute('data-id')
            }
        }));
        
    }

}

customElements.define('tag-view', TagView);




