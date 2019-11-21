// vars:
let nightMode = false;
// init colors:
const colors = initColors();
// get session data:
const data = JSON.parse(sessionStorage.getItem('data'));
// state:
const state = {
    data: {
        trans_res: data,
        trans_opr: null,
        nightMode
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

// apply colors:
applyColors();

/**************** functions ************ */
// create navbar
function createNavBar() {
    //nav:
    const nav = eHtml({ class: 'nav', container: page });
    // set nav colors:
    colors.BK_COLOR_3.push(nav);
    colors.COLOR_1.push(nav);
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
    // background color
    colors['BK_COLOR_1'] = new Array(); // #00143c 
    colors['BK_COLOR_2'] = new Array(); // #9b0101
    colors['BK_COLOR_3'] = new Array(); // #c3c3c3
    colors['BK_COLOR_4'] = new Array(); // #828282
    colors['BK_COLOR_5'] = new Array(); // #494949
    // border color
    colors['B_COLOR_1'] = new Array(); // #00143c
    colors['B_COLOR_2'] = new Array(); // #9b0101
    colors['B_COLOR_3'] = new Array(); // #c3c3c3
    colors['B_COLOR_4'] = new Array(); // #828282
    colors['B_COLOR_5'] = new Array(); // #494949

    return colors
}
// apply colors by color obj
function applyColors() {
    let color1;
    let color2;
    let color3;
    let color4;
    let color5;
    if (!nightMode) {
        color1 = '#00143c';
        color2 = '#9b0101';
        color3 = '#c3c3c3';
        color4 = '#828282';
        color5 = '#494949';
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
}

// save state function:
function saveState() {
    state['time'] = new Date();
    state.data.nightMode = nightMode;
    sessionStorage.setItem('state', JSON.stringify(state));
}

// toggle night mode:
function toggleNight() {
    nightMode = true;
    applyColors();
}
