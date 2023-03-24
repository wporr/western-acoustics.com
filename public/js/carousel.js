function carousel_groupid(element) {
    for (const classname of element.classList) {
        if (classname.startsWith('carousel-group-')) {
            return classname.replace(/^carousel-group-/, '');
        }
    }
}

function carousel_index(element) {
    return element.id.match(/-([^-]*)$/)[1];
}

function carousel_do(groupid, tab) {
    // mark buttons as clicked
    for (const button of document.getElementsByClassName(
        `carousel-group-${groupid} carousel-button`
    )) {
        button.classList.remove('carousel-button-selected');
    }
    document.getElementById(`carousel-button-${groupid}${tab}`).classList.add('carousel-button-selected');

    // mark content divs as hidden
    for (const content of document.getElementsByClassName(
        `carousel-group-${groupid} carousel-content`
    )) {
        content.classList.add('carousel-invisible');
    }
    document.getElementById(`carousel-content-${groupid}${tab}`).classList.remove('carousel-invisible');
}

document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.getElementsByClassName('carousel-button');
    const carousels = new Map();
    for (const button of buttons) {
        const gid = carousel_groupid(button);
        const i = carousel_index(button);
        if (!carousels.has(gid)) {
            carousels.set(gid, i);
        }

        button.addEventListener('click', (e) => {
            const gid = carousel_groupid(button);
            const i = carousel_index(button);
            carousel_do(gid, i);
        })
    }

    for (const [gid, i] of carousels) {
        carousel_do(gid, i);
    }
});
