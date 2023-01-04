function insertMenuBar() {
    const menu_bar = document.createElement('div')
    menu_bar.id = 'menu-bar'
    menu_bar.innerHTML = `
    <a id="logo" href="#"> JHIN JHIN </a>
    <div id="menu-container">
        <ul class="menu-list">
            <li class="memu-item"><a href="#">about</a></li>
            <li class="memu-item"><a href="#">blog</a></li>
            <li class="memu-item"><a href="#">projects</a></li>
        </ul>
    </div>
    `
    document.body.insertBefore(menu_bar, document.body.firstChild)
}

export {insertMenuBar}