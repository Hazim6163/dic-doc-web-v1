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