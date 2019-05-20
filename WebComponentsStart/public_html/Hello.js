import TagService from "./TagService.js"
import { render , html} from "./node_modules/lit-html/lit-html.js"
export default class Hello extends HTMLElement{
        
        constructor(){
            super();
            console.log('connectedCallback()');
            this.root = this.attachShadow({mode: 'open'});
            this.service = new TagService();
        }
        
        connectedCallback(){
            console.log('connectedCallback()');
            this.service.all(0,10)
                    .then(json => {
                        this.json = json;
                        render(this.createView(),this.root);
                    })
            
        }
        
        createView(){
            console.log(this.json);
            return html`
                <style>
                    h1{
                        color: var(--hello-color,red);
                    }
                </style>
                <h1>Elenco Tags</h1>
                ${this.json.data.map(tag => this.createTag(tag))}
            `
        }
        
        createTag(tag){
            console.log(tag);
            return html`
                <p>${tag.tag}</p>
            `;
        }
        
}

customElements.define('my-hello', Hello); 


