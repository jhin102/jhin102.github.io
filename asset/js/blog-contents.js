function contentsLoad() {
    const parameters = new URLSearchParams(location.search)
    let pageNum = parameters.has('p') ? parameters.get('p') : 0

    fetch(`/blog/posts/${pageNum}.md`)
    .then((response) => response.text())
    .then((data) => {
        const converter = new showdown.Converter()
        const contentsMeta = document.getElementById('contents-meta')
        const contentsBody = document.getElementById('contents-body')
        const metadataRaw = data.slice(data.indexOf('<!--') + '<!--'.length, data.indexOf('-->'))

        const metadata = {}
        for (let line of metadataRaw.split('\n').slice(2, -2)) {
            metadata[line.split(':')[0]] = line.split(': ')[1]
        }

        if (!metadata.thumnail) {
            metadata.thumnail = '/asset/image/default-thumnail.png'
        }

        document.title = `${metadata.title} | JHIN`
        contentsMeta.innerHTML = `
            <h1><a href="#">${metadata.title}</a></h1>
            <p><a href="#">blog</a> | ${metadata.date}</p>
            <img src="${metadata.thumnail}"></img>`
        contentsBody.innerHTML = converter.makeHtml(data)
    })
}

export {contentsLoad}