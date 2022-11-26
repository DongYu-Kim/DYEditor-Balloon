export default function initializeEditor(_editor, style) {
    initialize(_editor);
    const editorToolbar = _editor.ui.view.body._parentElement.firstChild;
    editorToolbar.style.width = "291px";
    const editorContent = _editor.sourceElement;
    for(const _style in style)
        editorContent.style[_style] = style[_style];
    
}
function initialize(editor) {
    let idx = 0;
    for(const item of editor.ui._focusableToolbarDefinitions[0].toolbarView.items._items) {
        ELEMENTS[idx] = item.element;
        idx += 1;
    }
}
const ELEMENTS = new Array(14);
const ELEMENT_NAME = {
    fontSize: 0,
    bold: 1,
    italic: 2,
    underline: 3,
    strikethrough: 4,
    color: 5,
    backgroundColor: 6,
    _: 7,
    textAlign: 8,
    link: 9,
    image: 10,
    media: 11,
    table: 12,
    specialCharacter: 13,
}

export function removeImageUploadElement() {
    ELEMENTS[ELEMENT_NAME.image].style.display = 'none';
}