import Hello from "./TagsView.js"

customElements.whenDefined('tags-view').then(() => {
  const tags = document.querySelector('tags-view');
  tags.titolo = "ELENCO TAGS 2019"
})


