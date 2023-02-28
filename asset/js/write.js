import { insertMenuBar } from "./menu-bar.js"

function getDateString() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString("en-US", options)
}

function getMetaData() {
    let title = document.getElementById('input-title').value
    let data = document.getElementById('input-body').value
    let thumnail = document.getElementById('input-thumnail').value
    let tags = document.getElementById('input-tags').value

    if (!thumnail) {
        thumnail = '/asset/image/default-thumnail.png'
    }

    if (!title) {
        title = '제목 없음'
    }

    if (!data) {
        data = '본문 영역'
    }

    return {title, data, thumnail, tags, date: getDateString()}
}

function download() {
    const metaData = getMetaData()
    const text =
    `<!--\n`+
    `================================================\n`+
    `title: ${metaData.title}\n`+
    `date: ${metaData.date}\n`+
    `thumnail: ${metaData.thumnail}\n`+
    `tags: ${metaData.tags}\n`+
    `================================================\n`+
    `-->\n\n`+
    `${metaData.data}`

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'post.md');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function reload() {
    const metaData = getMetaData()

    const converter = new showdown.Converter()
    const contentsMeta = document.getElementById('contents-meta')
    const contentsBody = document.getElementById('contents-body')

    contentsMeta.innerHTML = `
        <h1><a href="#">${metaData.title}</a></h1>
        <p><a href="#">blog</a> | ${metaData.date}</p>
        <img id="thumbnail" src="${metaData.thumnail}"></img>`
    contentsBody.innerHTML = converter.makeHtml(metaData.data)
}

function textareaResize() {
    const textArea = document.getElementById('input-body')
    textArea.style.height = '1px'
    const nextHeight = textArea.scrollHeight + 12
    textArea.style.height = (nextHeight > 500 ? nextHeight: 500) + 'px';
}

function setEvent() {
    document.getElementById('download').addEventListener("click", download);
    document.getElementById('reload').addEventListener("click", reload);
    document.getElementById('input-body').addEventListener("keydown", textareaResize);
    reload()
    insertMenuBar()
}

setEvent()