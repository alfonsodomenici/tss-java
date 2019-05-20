import TagService from "./TagService.js"
import TagView from "./TagView.js"
import { render, html} from "./node_modules/lit-html/lit-html.js"

export default class TagsView extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.service = new TagService();
    }

    connectedCallback() {
        this.render();

    }

    render(){
        this.service.all(0, 10)
                .then(json => {
                    this.json = json;
                    render(this.createView(), this.root);
                })
    }
    
    get titolo(){
        return this.getAttribute('titolo');
    }
  
    set titolo(value){
        this.setAttribute('titolo',value);
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(`${attrName},${oldVal},${newVal}`);
    }

    static get observedAttributes() {
        return ['titolo'];
    }

    createView() {
        return html`
                <style>
                    h1{
                        color: var(--hello-color,red);
                    }
                    li{
                        list-style:none;
                    }
                </style>
                <h1>${this.getAttribute('titolo')}</h1>
                <ul>
                    ${this.json.data.map(tag => this.createTag(tag))}
                </ul>
            `
    }

    createTag( {id , tag, tipo}){
        return html`
                <li><tag-view @dtag=${ e => this.onDeleteTag(e)} data-id='${id}' tag='${tag}' tipo='${tipo}'></tag-view></li>
            `;
    }

    onDeleteTag(e){
        this.service.delete(e.detail.id)
                .then(response => this.render())
    }
}

customElements.define('tags-view', TagsView);





