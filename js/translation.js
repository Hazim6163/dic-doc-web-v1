// vars:
let nightMode = false;
let step = 1;
let defTrLang;
const langs = ['AR', 'DE', 'EN'];
let trans_opr = null;
let wordsObj;
let currentIndex = 1;
// init colors:
const colors = initColors();
//get page: 
const page = $('#page');
// get session data:
let data = JSON.parse(sessionStorage.getItem('data'));
//check if there is saved state:
let state = JSON.parse(sessionStorage.getItem('state'));
const stateStatus = isState();
if (stateStatus.valid) {
    data = state.data.trans_res;
    trans_opr = state.data.trans_opr;
    nightMode = state.data.nightMode;
    defTrLang = state.data.defTrLang;
    if (stateStatus.lvl == 1) {
        //main page content:
        createNavBar(page);
        createMainContent();
    } else {
        //step 2 content:
        createNavBar(page);
        inflateStep2Items();
    }
} else {
    // state:
    state = {
        data: {
            trans_res: data,
            trans_opr,
            nightMode,
            defTrLang
        }
    };
    //main page content:
    createNavBar(page);
    createMainContent();
}
// create state interval:
saveState();
setInterval(() => {
    saveState();
}, 2000)
$.getJSON("https://json.geoiplookup.io/", (res) => {
    state['ip_info'] = res;
})


// apply colors:
applyColors();

/**************** functions ************ */
// create navbar
function createNavBar() {
    // add body to main background array:
    colors.MAIN_BK.push($('body'));
    // add page title to colors array:
    colors.COLOR_1.push($('#pageHeader'));
    //nav:
    const nav = eHtml({ class: 'nav' });
    page.prepend(nav);
    // set nav colors:
    colors.BK_COLOR_6.push(nav);
    colors.COLOR_1.push(nav);
    // non select
    applyNonSelectable({ item: nav });
    const backC = eHtml({ class: 'back-container', container: nav });
    const nightC = eHtml({ class: 'night-container', container: nav });
    //fill up nav items:
    backC.append(eHtml({ class: 'back-icon nav-icon-container', html: '<i class="fas fa-arrow-circle-left nav-icon"></i>' }));
    backC.append(eHtml({ class: 'back-label nav-item', text: 'Doc Editor' }));
    // back to doc editor:
    backC.click(() => {
        sessionStorage.removeItem('data');
        sessionStorage.removeItem('state');
        window.location.href = 'index.html';
    })
    //append night icon
    nightC.append(eHtml({ class: 'night-icon nav-icon-container', html: '<i class="fas fa-cloud-moon nav-icon"></i>' }));
    //append night label:
    if (nightMode) nightC.append(eHtml({ class: 'night-label nav-item', text: 'Night Mode : On' }));
    if (!nightMode) nightC.append(eHtml({ class: 'night-label nav-item', text: 'Night Mode : Off' }));
    // toggle night mode:
    nightC.click(() => {
        toggleNight();
    })

}
// init colors groups 
function initColors() {
    const colors = {};
    // font color
    colors['COLOR_1'] = new Array(); // #00143c
    colors['COLOR_2'] = new Array(); // #9b0101
    colors['COLOR_3'] = new Array(); // #c3c3c3
    colors['COLOR_4'] = new Array(); // #828282
    colors['COLOR_5'] = new Array(); // #494949
    colors['COLOR_6'] = new Array(); // #f1f1f1
    // background color
    colors['BK_COLOR_1'] = new Array(); // #00143c 
    colors['BK_COLOR_2'] = new Array(); // #9b0101
    colors['BK_COLOR_3'] = new Array(); // #c3c3c3
    colors['BK_COLOR_4'] = new Array(); // #828282
    colors['BK_COLOR_5'] = new Array(); // #494949
    colors['BK_COLOR_6'] = new Array(); // #f1f1f1
    colors['MAIN_BK'] = new Array(); // #ffffff
    // border color
    colors['B_COLOR_1'] = new Array(); // #00143c
    colors['B_COLOR_2'] = new Array(); // #9b0101
    colors['B_COLOR_3'] = new Array(); // #c3c3c3
    colors['B_COLOR_4'] = new Array(); // #828282
    colors['B_COLOR_5'] = new Array(); // #494949
    colors['B_COLOR_6'] = new Array(); // #f1f1f1

    return colors
}
// apply colors by color obj
function applyColors() {
    let color1;
    let color2;
    let color3;
    let color4;
    let color5;
    let color6;
    let background;
    if (!nightMode) {
        color1 = '#00143c';
        color2 = '#9b0101';
        color3 = '#c3c3c3';
        color4 = '#828282';
        color5 = '#494949';
        color6 = '#f1f1f1';
        background = '#ffffff';
    } else {
        color1 = '#f1f1f1';
        color2 = '#9b0101';
        color3 = '#c3c3c3';
        color4 = '#828282';
        color5 = '#494949';
        color6 = '#262626';
        background = '#212121';
    }
    colors.COLOR_1.forEach(element => {
        element.css('color', color1);
    });
    colors.COLOR_2.forEach(element => {
        element.css('color', color2);
    });
    colors.COLOR_3.forEach(element => {
        element.css('color', color3);
    });
    colors.COLOR_4.forEach(element => {
        element.css('color', color4);
    });
    colors.COLOR_5.forEach(element => {
        element.css('color', color5);
    });
    colors.COLOR_6.forEach(element => {
        element.css('color', color6);
    });
    colors.BK_COLOR_1.forEach(element => {
        element.css('background-color', color1);
    });
    colors.BK_COLOR_2.forEach(element => {
        element.css('background-color', color2);
    });
    colors.BK_COLOR_3.forEach(element => {
        element.css('background-color', color3);
    });
    colors.BK_COLOR_4.forEach(element => {
        element.css('background-color', color4);
    });
    colors.BK_COLOR_5.forEach(element => {
        element.css('background-color', color5);
    });
    colors.BK_COLOR_6.forEach(element => {
        element.css('background-color', color6);
    });
    colors.MAIN_BK.forEach(element => {
        element.css('background-color', background);
    });
    colors.B_COLOR_1.forEach(element => {
        element.css('border', color1);
    });
    colors.B_COLOR_2.forEach(element => {
        element.css('border-color', color2);
    });
    colors.B_COLOR_3.forEach(element => {
        element.css('border-color', color3);
    });
    colors.B_COLOR_4.forEach(element => {
        element.css('border-color', color4);
    });
    colors.B_COLOR_5.forEach(element => {
        element.css('border-color', color5);
    });
    colors.B_COLOR_6.forEach(element => {
        element.css('border-color', color6);
    });
}

// save state function:
function saveState() {
    state['time'] = new Date();
    state.data.nightMode = nightMode;
    state.defTrLang = defTrLang;
    state.data.trans_opr = trans_opr;
    state.data.trans_res.forceNewDoc = false;
    sessionStorage.setItem('state', JSON.stringify(state));
}

// toggle night mode:
function toggleNight() {
    nightMode = !nightMode;
    $('.nav').remove();
    createNavBar();
    $('#defLangMenu').height(0);
    applyColors();
    saveState();
}

// create main content:
function createMainContent() {
    //step one container:
    const container = eHtml({ class: 'step1-container', container: page });
    // non select container:
    applyNonSelectable({ item: container });
    // default lang label
    const defaultLangLabel = eHtml({ class: 'default-lang-label', container, text: 'Default Translate Language :' });
    colors.COLOR_1.push(defaultLangLabel);
    // default lang drop menu
    const defaultLangDrop = eHtml({ class: 'default-lang-drop', container });
    colors.BK_COLOR_1.push(defaultLangDrop);
    colors.COLOR_6.push(defaultLangDrop);
    // default lang drop label
    const defaultLang = eHtml({ class: 'default-lang', id: 'defaultLang', text: defTrLang, container: defaultLangDrop });
    // default lang drop icon
    const defaultLangDropIcon = eHtml({ class: 'default-lang-drop-icon-container', html: '<i class="fas fa-caret-down default-lang-drop-icon"></i>', container: defaultLangDrop });
    defaultLangDrop.click(() => {
        defaultLangDropClick(defaultLangDrop);
    })
    // hint : 
    const hint = eHtml({ class: 'step-one-hint', text: 'Note: you can add more Languages later.', container });
    colors.COLOR_4.push(hint);
    // start btn:
    const start = eHtml({ class: 'start', text: 'Start', container });
    colors.COLOR_6.push(start);
    colors.BK_COLOR_1.push(start);
    // start click: 
    start.click(() => {
        toStep2(container);
        step = 2;
    })
}

// default translate language menu:
function defaultLangDropClick(drop) {
    if ($('#defLangMenu').html()) {
        //if the menu hidden to show:
        if ($('#defLangMenu').height() == 0) {
            $('#defLangMenu').animate({
                height: '71px'
            }, 200, () => {
                applyColors();
                $('#defLangMenu').css('border', '1px solid')
            });
        } else {
            $('#defLangMenu').animate({ height: '0px', border: '0px' }, 200);
        }
        return;
    }
    const menu = eHtml({ class: 'def-lang-menu', id: 'defLangMenu' });
    colors.B_COLOR_1.push(menu);
    colors.COLOR_1.push(menu);
    applyColors()
    menu.height(0);
    menu.insertAfter(drop);
    langs.forEach((l) => {
        const lang = eHtml({
            class: 'lang-menu-item',
            text: l,
            container: menu
        });
        lang.click(() => {
            defTrLang = l;
            $('#defaultLang').text(l);
            $('#defLangMenu').animate({ height: '0px', border: '0px' }, 200);
            saveState();
        })
    })
    defaultLangDropClick(drop);
}

// to step 2
function toStep2(step1Container) {
    step1Container.remove();
    inflateStep2Items();
}

//step 2 inflater:
function inflateStep2Items() {
    // step 2 container
    const container = eHtml({ class: 'step2Container', container: page });
    // translate editor:
    const editorContainer = eHtml({ class: 'editor-container', container });
    // side words nav
    const sideWordsNav = eHtml({ class: 'side-words-nav', container });

    // check if trans_opr has data:
    if (trans_opr != null) {
        wordsObj = trans_opr.wordsObj;
        currentIndex = trans_opr.currentIndex;
    } else {
        // merge res words arrays
        const words = mergeResWords();
        // create word objects:
        wordsObj = wordsArrToObj(words);
        // init trans_opr:
        trans_opr = { wordsObj: null, currentIndex: 0 };
        trans_opr.wordsObj = wordsObj;
        trans_opr.currentIndex = currentIndex;
        saveState();
    }

    // create editor:
    createEditor(editorContainer);
    // create words nav:
    createWordsNav(sideWordsNav);

}

// state status checker
function isState() {
    let lvl = 0;
    let valid = false;
    const state = JSON.parse(sessionStorage.getItem('state'));
    if (isNullUndefinedObj(state)) {
        //no state funded
        return { valid, lvl };
    }
    //check if force new doc:
    if (state.data.trans_res.forceNewDoc) {
        //force new state:
        return { valid, lvl };
    }
    // check lvl 1 state:
    // check night mode var
    const validNight = !isNullUndefinedObj(state.data.nightMode);
    // check default language var:
    const validDefTrLang = !isNullUndefinedObj(state.data.defTrLang);
    // check translation response var:
    const validTransRes = !isNullUndefinedObj(state.data.trans_res);
    if (validNight)
        nightMode = state.data.nightMode;
    if (validDefTrLang);
    defTrLang = state.data.defTrLang;
    if (validTransRes)
        data = state.data.trans_res;
    if (validDefTrLang && validNight && validTransRes) {
        //state is valid to apply lvl 1
        valid = true;
        lvl = 1;
    }
    // check translation operation var:
    const validTransOpr = !isNullUndefinedObj(state.data.trans_opr);
    if (validTransOpr)
        trans_opr = state.data.trans_opr;
    if (validDefTrLang && validNight && validTransRes && validTransOpr) {
        //state is valid to apply lvl 2
        valid = true;
        lvl = 2;
    }
    return { valid, lvl }
}

// merge new words and translated words from the doc translate response:
function mergeResWords() {
    const words = new Array();
    data.wordsNew.forEach((w) => {
        w['newWord'] = true;
        words.push(w)
    });
    data.wordsTr.forEach((w) => {
        w['newWord'] = false;
        words.push(w);
    })

    return words;
}

// create words objects from the array return words objects array:
function wordsArrToObj(arr) {
    // words objectsArr:
    const wordsObj = new Array();
    // word index:
    let index = 0;
    arr.forEach((w) => {
        // increase index counter
        index++;
        // create word object push to arr:
        wordsObj.push(new Word(w, index));
    })
    // return wordsObjects
    return wordsObj;
}

// create words editor:
function createEditor(container) {
    console.log(wordsObj)
    const currentWord = getWordByIndex(currentIndex+1);
    originalWoEdContainer(currentWord).appendTo(container);
    // check if the word obj has default lang translations:
    if(isTr(currentWord, defTrLang)){
        console.log('passed')
        trLangWosEdsContainer(currentWord, defTrLang).appendTo(container);
    }
    
}

//get word by index:
function getWordByIndex(index) {
    return wordsObj.find((o) => {
        return o.index == index;
    });
}

// create words nav:
function createWordsNav(container) {

}