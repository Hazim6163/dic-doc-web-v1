
//get page: 
const page = $('#page');
//create doc editor:
const editorContainer = eHtml({ class: 'editor-container', container: page });
const editor = eHtml({ type: 'textarea', class: 'doc-editor', container: editorContainer });
editor.attr('wrap', 'soft');
// save btn
const next = eHtml({ class: 'next-btn', id: 'next', container: editorContainer, text: 'Next' });