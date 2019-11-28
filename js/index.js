
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
    // todo: ask user for the lang:
    const lang = 'en';
    // remove custom chars:
    let text = data.text;
    text = cleanUp(text);
    //create words array:
    let wordsArr = extractDocWords(text, lang);
    $('body').empty();
    $('body').append(eHtml({ class: 'text-container', id: 'textContainer' }));
    const container = eHtml({ class: 'text-container', container: $('body') });
    wordsArr.forEach((word) => {
        createWordContainer(word);
    })
}

// create word container:
function createWordContainer(word) {
    const container = eHtml({ class: 'wordContainer' });
    const remove = eHtml({ class: 'removeWordIconContainer', html: '<i class="fas fa-minus-square"></i>', container });
    remove.click(() => {
        container.remove();
    })
    const wContainer = eHtml({ class: 'word', text: word, container });
    const copy = eHtml({ class: 'copyIconContainer', html: '<i class="far fa-copy"></i>', container });
    copy.click(() => {
        const el = document.createElement('textarea');
        el.value = word;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    })

    $('#textContainer').append(container);
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
function extractDocWords(text, lang) {
    //extract words:
    text = text.replace(/\n/g, ' ');
    console.log(text)
    let wordsArr = text.split(' ');
    //remove empty words
    wordsArr = wordsArr.filter((w) => {
        return w != '';
    })
    //remove duplicated words: 
    const uniq = new Set(wordsArr);
    wordsArr = Array.from(uniq);

    return wordsArr;
}