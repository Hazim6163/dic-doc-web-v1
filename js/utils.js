//create html element:
function eHtml(data) {
    data.type ? e = $('<' + data.type + '>') : e = $('<div>');

    if (data.class) {
        e.addClass(data.class);
    }

    if (data.id) {
        e.attr('id', data.id);
    }

    if (data.html) {
        e.html(data.html);
    }

    if (data.text) {
        e.text(data.text);
    }

    if (data.container) {
        e.appendTo(data.container);
    }

    if (data.name) {
        e.attr('name', data.name);
    }

    if (data.value) {
        e.attr('value', data.value);
    }

    if (data.onClick) {
        e.click(() => {
            data.onClick(data.params)
        });
    }

    return e;
}

// apply non selectable item
function applyNonSelectable(data) {
    const item = data.item;
    const array = data.arr;
    if (item) {
        item.css({
            "-moz-user-select": "-moz-none",
            "-khtml-user-select": "none",
            "-webkit-user-select": "none",
            "-o-user-select": "none",
            "user-select": "none"
        })
    }
    if (array) {
        array.forEach(item => {
            item.css({
                "-moz-user-select": "-moz-none",
                "-khtml-user-select": "none",
                "-webkit-user-select": "none",
                "-o-user-select": "none",
                "user-select": "none"
            })
        });
    }
}

// check null undefined:
function isNullUndefinedObj(obj) {
    if (obj == true) {
        return false;
    }
    if (obj == false) {
        return false;
    }

    let result = false;
    if (!obj) {
        result = true;
    } if (obj) {
        if (obj == null) {
            result = true;
        }
    }
    return result;
}

// check string not empty: if text was white space will return str
function isString(text) {
    let result = false;
    switch (text) {
        case undefined:
            result = false;
            break;
        case null:
            result = 'null'
            break;
        case '':
            result = 'empty'
            break;
        default:
            result = 'str'
            break;
    }
    return result;
}
