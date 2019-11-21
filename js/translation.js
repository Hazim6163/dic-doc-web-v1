// vars:
let nightMode = false;
let step = 1;
let defTrLang = 'AR';
const langs = ['AR', 'DE', 'EN'];
const nonSelectableItems = new Array();
// init colors:
const colors = initColors();
// get session data:
const data = JSON.parse(sessionStorage.getItem('data'));
// state:
const state = {
    data: {
        trans_res: data,
        trans_opr: null,
        nightMode,
        defTrLang
    }
};
// create state interval:
setInterval(() => {
    saveState();
}, 2000)
$.getJSON("https://json.geoiplookup.io/", (res) => {
    state['ip_info'] = res;
})

//get page: 
const page = $('#page');

//main page content:
createNavBar(page);
createMainContent();

// apply colors:
applyColors();
// apply non selectable:
applyNonSelectable();

/**************** functions ************ */
// create navbar
function createNavBar() {
    //nav:
    const nav = eHtml({ class: 'nav', container: page });
    // set nav colors:
    colors.BK_COLOR_6.push(nav);
    colors.COLOR_1.push(nav);
    // non select
    nonSelectableItems.push(nav)
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
    if (!nightMode) {
        color1 = '#00143c';
        color2 = '#9b0101';
        color3 = '#c3c3c3';
        color4 = '#828282';
        color5 = '#494949';
        color6 = '#f1f1f1';
    } else {
        //todo fill night colors:
        color3 = '#ffffff'
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
    colors.B_COLOR_1.forEach(element => {
        element.css('border', 'solid 1px ' + color1);
    });
    colors.B_COLOR_2.forEach(element => {
        element.css('border', 'solid 1px ' + color2);
    });
    colors.B_COLOR_3.forEach(element => {
        element.css('border', 'solid 1px ' + color3);
    });
    colors.B_COLOR_4.forEach(element => {
        element.css('border', 'solid 1px ' + color4);
    });
    colors.B_COLOR_5.forEach(element => {
        element.css('border', 'solid 1px ' + color5);
    });
    colors.B_COLOR_6.forEach(element => {
        element.css('border', 'solid 1px ' + color6);
    });
}

// save state function:
function saveState() {
    state['time'] = new Date();
    state.data.nightMode = nightMode;
    state.defTrLang = defTrLang;
    sessionStorage.setItem('state', JSON.stringify(state));
}

// toggle night mode:
function toggleNight() {
    nightMode = true;
    applyColors();
}

// create main content:
function createMainContent() {
    //step one container:
    const container = eHtml({ class: 'step1-container', container: page });
    // non select container:
    nonSelectableItems.push(container);
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
        $('#defLangMenu').toggle('fast');
        return;
    }
    const menu = eHtml({ class: 'def-lang-menu', id: 'defLangMenu' });
    menu.hide();
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
            $('#defLangMenu').toggle('fast');
            saveState();
            console.log(defTrLang)
        })
    })
    menu.show('fast')
}

// to step 2
function toStep2(step1Container) {
    saveState();
    console.log(step1Container.width())
    console.log('to step 2 :)')
}

// apply non selectable items:
function applyNonSelectable(){
    nonSelectableItems.forEach((item) =>{
        item.addClass('non-select');
    })
}