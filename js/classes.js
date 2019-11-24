class Word {
    constructor(data, index) {
        this._id = data._id;
        this.index = index;
        this.ar = data.ar;
        this.en = data.en;
        this.de = data.de;
        this.extra = data.extra;
        this.in = data.in;
        this.lang = data.lang;
        this.newWord = data.newWord;
        this.s_word = data.s_word;
        this.word = data.word;
    }
}

// functions:
// get word editor container:
const originalWoEdContainer = (word) => {
    const container = eHtml({ class: 'word-editor-container', id: 'wordEditorContainer' + word.index });
    //original word: 
    createOriginalWordContainer(word).appendTo(container);

    return container;
}

// create original word container:
const createOriginalWordContainer = (word) => {
    // word container:
    const container = eHtml({ class: 'word-container', id: 'wordContainer' + word.index });
    colors.COLOR_1.push(container);
    applyColors();
    // lang:
    const wordLang = eHtml({ class: 'word-lang', id: 'wordLang' + word.index, container, text: word.lang });
    // word label:
    const wordLabel = eHtml({ class: 'word-label', container, text: word.word });
    // input field:
    const wordInput = eHtml({ type: 'input', class: 'word-input', id: 'wordInput' + word.index, value: wordLabel.text(), container });
    // hide input by default:
    wordInput.toggle();
    // edit icon:
    const wordEditIcon = eHtml({ class: 'word-edit-icon-container', container, html: '<i class="fas fa-pencil-alt word-edit-icon"></i>' });

    // click listeners:
    wordEditIcon.click(() => {
        wordLabel.toggle();
        wordInput.toggle();
        wordInput.trigger('focus');
    })
    wordLabel.click(() => {
        wordLabel.toggle();
        wordInput.toggle();
        wordInput.trigger('focus');
    })
    wordInput.focusout(() => {
        wordLabel.text(wordInput.val());
        word.word = wordInput.val();
        word.s_word = wordInput.val().toLowerCase();
        // todo send request to the server about the new word and check for the translations if founded and update the translations by remove the old ones and add the new by the default language:
        wordInput.toggle();
        wordLabel.toggle();
    })
    return container;
}
//check if the word has ar translations:
const isArTr = (word) => {
    let has = false;
    if (word.ar) if (word.ar.length > 0) has = true;
    return has;
}

//check if the word has en translations:
const isEnTr = (word) => {
    let has = false;
    if (word.en) if (word.en.length > 0) has = true;
    return has;
}
//check if the word has de translations:
const isDeTr = (word) => {
    let has = false;
    if (word.de) if (word.de.length > 0) has = true;
    return has;
}

const isTr = (word, tr) => {
    console.log(tr)
    let has = false;
    switch (tr) {
        case 'AR':
            if (word.ar) if (word.ar.length > 0) has = true;
            break;
        case 'EN':
            if (word.en) if (word.en.length > 0) has = true;
            break;
        case 'DE':
            if (word.de) if (word.de.length > 0) has = true;
            break;

        default:
            break;
    }
    return has;
}

// create translations ar words editors containers:
const trArWosEdsContainer = (word) => {
    const wordsEditorsContainer = eHtml({ class: 'ar-editors-words-container' });
    //check if the word has ar translations: 
    if (!word.isArTr()) {
        return wordsEditorsContainer;
    }
    word.ar.forEach(w => {
        wordsEditorsContainer.append(trWordEditorContainer(w, 'AR'))
    });
    return wordsEditorsContainer;
}
// create translations en words editors containers:
const trEnWosEdsContainer = (word) => {
    const wordsEditorsContainer = eHtml({ class: 'en-editors-words-container' });
    //check if the word has en translations: 
    if (!word.isEnTr()) {
        return wordsEditorsContainer;
    }
    word.en.forEach(w => {
        wordsEditorsContainer.append(trWordEditorContainer(w, 'EN'))
    });
    return wordsEditorsContainer;
}
// create translations DE words editors containers:
const trDeWosEdsContainer = (word) => {
    const wordsEditorsContainer = eHtml({ class: 'de-editors-words-container' });
    //check if the word has de translations: 
    if (!word.isDeTr()) {
        return wordsEditorsContainer;
    }
    word.de.forEach(w => {
        wordsEditorsContainer.append(trWordEditorContainer(w, 'DE'))
    });
    return wordsEditorsContainer;
}
// get translations lang words containers by the lang:
const trLangWosEdsContainer = (word, lang) => {
    const empty = eHtml({class: 'empty tr words editor ' + lang});
    switch (lang) {
        case 'ar':
            return trArWosEdsContainer(word);
            break;
        case 'en':
            return trEnWosEdsContainer(word);
            break;
        case 'de':
            return trDeWosEdsContainer(word);
            break;
        default:
            break;
    }
    return empty;
}

// create translation word editor container:
const trWordEditorContainer = (wordObj, w, lang) => {
    const container = eHtml({ class: 'tr-word-editor-container' });
    //tr word: 
    createTrWordContainer(wordObj, w, lang).appendTo(container);

    return container;
}
// create tr word container:
const createTrWordContainer = (wordObj, word, lang) => {
    // word container:
    const container = eHtml({ class: 'tr-word-container' });
    // lang:
    const wordLang = eHtml({ class: 'tr-word-lang', text: lang, container });
    // word label:
    const wordLabel = eHtml({ class: 'tr-word-label', container, text: word });
    // input field:
    const wordInput = eHtml({ type: 'input', class: 'tr-word-input', value: wordLabel.text(), container });
    wordInput.toggle();
    // edit icon: 
    const wordEditIcon = eHtml({ class: 'tr-word-edit-icon-container', container, html: '<i class="fas fa-pencil-alt tr-word-edit-icon"></i>' });

    // click listeners:
    wordEditIcon.click(() => {
        wordLabel.toggle();
        wordInput.toggle();
        wordInput.trigger('focus');
    })
    wordLabel.click(() => {
        wordLabel.toggle();
        wordInput.toggle();
        wordInput.trigger('focus');
    })
    wordInput.focusout(() => {
        wordLabel.text(wordInput.val());
        if (wordObj) {
            addTr(wordObj, wordInput.val(), lang);
        }
        wordInput.toggle();
        wordLabel.toggle();
    })

    return container;
}

// change word: 
const changeWord = (wordObj, newWord) => {
    wordObj.word = newWord;
    return wordObj;
}

// add translate:
const addTr = (wordObj, tr, lang) => {
    switch (lang) {
        case 'AR':
            wordObj.ar.push(tr);
            break;
        case 'EN':
            wordObj.en.push(tr);
            break;
        case 'DE':
            wordObj.de.push(tr);
            break;
        default:
            break;
    }
    return wordObj;
}