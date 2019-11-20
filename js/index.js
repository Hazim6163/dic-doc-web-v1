
//get page: 
const page = $('#page');
//create doc editor:
const editorContainer = eHtml({ class: 'editor-container', container: page });
const editor = eHtml({ type: 'textarea', class: 'doc-editor', container: editorContainer });
editor.attr('wrap', 'soft');
// save btn
const next = eHtml({ class: 'next-btn', id: 'next', container: editorContainer, text: 'Next' });

// handel save operation:
next.click(() => {
    handleDoc({ text: editor.val() })
});

function handleDoc(data) {
    // remove custom chars:
    let text = data.text;
    text = cleanUp(text);
    //create words array:
    const wordsArr = extractDocWords(text);
    console.log(wordsArr);
    //send server request to get translation:
    // $.post('', {wordsArr: wordsArr}, (res)=>{
    //     handleTranslation(res);
    // })
}

// clean up doc
function cleanUp(text) {
    //remove custom chars
    //remove ( ) {} [] ; : . - _ * + ' # , ~ ´ ` \ ? = / & % $ § " ! ° ^ > < | 
    text = text.replace(/\(/g, ' ');
    text = text.replace(/\)/g, ' ');
    text = text.replace(/\{/g, ' ');
    text = text.replace(/\}/g, ' ');
    text = text.replace(/\[/g, ' ');
    text = text.replace(/\]/g, ' ');
    text = text.replace(/\;/g, ' ');
    text = text.replace(/\:/g, ' ');
    text = text.replace(/\./g, ' ');
    text = text.replace(/\_/g, ' ');
    text = text.replace(/\-/g, ' ');
    text = text.replace(/\*/g, ' ');
    text = text.replace(/\+/g, ' ');
    text = text.replace(/\'/g, ' ');
    text = text.replace(/\#/g, ' ');
    text = text.replace(/\,/g, ' ');
    text = text.replace(/\~/g, ' ');
    text = text.replace(/\´/g, ' ');
    text = text.replace(/\`/g, ' ');
    text = text.replace(/\\/g, ' ');
    text = text.replace(/\?/g, ' ');
    text = text.replace(/\=/g, ' ');
    text = text.replace(/\//g, ' ');
    text = text.replace(/\&/g, ' ');
    text = text.replace(/\%/g, ' ');
    text = text.replace(/\$/g, ' ');
    text = text.replace(/\§/g, ' ');
    text = text.replace(/\"/g, ' ');
    text = text.replace(/\!/g, ' ');
    text = text.replace(/\^/g, ' ');
    text = text.replace(/\°/g, ' ');
    text = text.replace(/\>/g, ' ');
    text = text.replace(/\</g, ' ');
    text = text.replace(/\|/g, ' ');

    //check if there is multi spaces and replace with one space
    let spaces = text.search('  ');
    while (spaces != -1) {
        text = text.replace(/\s\s/g, ' ');
        spaces = text.search('  ');
    }

    return text;
}

// extract words array from the doc:
function extractDocWords(text) {
    //extract words:
    let wordsArr = text.split(' ');
    //remove empty words
    wordsArr = wordsArr.filter((w) => {
        return w != '';
    })

    return wordsArr;
}