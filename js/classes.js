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

    // get word editor container:
    originalWoEdContainer() {
        const container = eHtml({ class: 'word-editor-container', id: 'wordEditorContainer' + this.index });
        const word = this;
        //original word: 
        createOriginalWordContainer(word).appendTo(container);

        return container;
    }

    // create original word container:
    createOriginalWordContainer(word) {
        // word container:
        const container = eHtml({ class: 'word-container', id: 'wordContainer' + word.index });
        // lang:
        const wordLang = eHtml({ class: 'word-lang', id: 'wordLang' + this.index, container, text: word.lang });
        // word label:
        const wordLabel = eHtml({ class: 'word-label', container, text: word.word });
        // edit icon: 
        const wordEditIcon = eHtml({ class: 'word-edit-icon-container', container, html: '<i class="fas fa-pencil-alt word-edit-icon"></i>' });
        // input field:
        const wordInput = eHtml({ class: 'word-input', id: 'wordInput' + word.index, text: wordLabel.text(), container });

        return container;
    }

    //check if the word has ar translations:
    isArTr() {
        let has = false;
        if (this.ar) if (this.ar.length > 0) has = true;
        return has;
    }
    //check if the word has en translations:
    isEnTr() {
        let has = false;
        if (this.en) if (this.en.length > 0) has = true;
        return has;
    }
    //check if the word has de translations:
    isDeTr() {
        let has = false;
        if (this.de) if (this.de.length > 0) has = true;
        return has;
    }

    // create translations ar words editors containers:
    trArWosEdsContainer() {
        const wordsEditorsContainer = eHtml({ class: 'ar-editors-words-container' });
        //check if the word has ar translations: 
        if (!this.isArTr()) {
            return wordsEditorsContainer;
        }
        this.ar.forEach(word => {
            wordsEditorsContainer.append(this.trWordEditorContainer(word, 'AR'))
        });
        return wordsEditorsContainer;
    }
    // create translations en words editors containers:
    trEnWosEdsContainer() {
        const wordsEditorsContainer = eHtml({ class: 'en-editors-words-container' });
        //check if the word has en translations: 
        if (!this.isEnTr()) {
            return wordsEditorsContainer;
        }
        this.en.forEach(word => {
            wordsEditorsContainer.append(this.trWordEditorContainer(word, 'EN'))
        });
        return wordsEditorsContainer;
    }
    // create translations DE words editors containers:
    trDeWosEdsContainer() {
        const wordsEditorsContainer = eHtml({ class: 'de-editors-words-container' });
        //check if the word has de translations: 
        if (!this.isDeTr()) {
            return wordsEditorsContainer;
        }
        this.de.forEach(word => {
            wordsEditorsContainer.append(this.trWordEditorContainer(word, 'DE'))
        });
        return wordsEditorsContainer;
    }

    // create translation word editor container:
    trWordEditorContainer(w, lang) {
        const container = eHtml({ class: 'tr-word-editor-container' });
        //tr word: 
        createTrWordContainer(w, lang).appendTo(container);

        return container;
    }
    // create tr word container:
    createTrWordContainer(word, lang) {
        // word container:
        const container = eHtml({ class: 'tr-word-container' });
        // lang:
        const wordLang = eHtml({ class: 'tr-word-lang', text: lang });
        // word label:
        const wordLabel = eHtml({ class: 'tr-word-label', container, text: word });
        // edit icon: 
        const wordEditIcon = eHtml({ class: 'tr-word-edit-icon-container', container, html: '<i class="fas fa-pencil-alt tr-word-edit-icon"></i>' });
        // input field:
        const wordInput = eHtml({ class: 'tr-word-input', text: wordLabel.text(), container });

        return container;
    }

    // change word: 
    changeWord(newWord) {
        this.word = newWord;
    }

    // add translate:
    addTr(tr, lang) {
        switch (lang) {
            case 'AR':
                this.ar.push(tr);
                break;
            case 'EN':
                this.en.push(tr);
                break;
            case 'DE':
                this.de.push(tr);
                break;
            default:
                break;
        }
    }

}