class Popup {
    constructor() {
        this.store = {
            sessions: []
        };
        this.isSessionTab = false;
        this.sortMenu = new SortMenu();
        this.sortMenu.onChange = () => this.renderMainView();
        this.$vb = $('.view-box');
        this.$mb = $('.menu-box');

        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            if(tabs && tabs[0].id) {
                this.tabId  = tabs[0].id;
                this.tabUrl = tabs[0].url;

                chrome.runtime.sendMessage({action: 'checkTab', tabId: this.tabId}, res => {
                    this.isSessionTab = res;
                    chrome.storage.local.get(this.store, res => {
                        this.store = res;
                        this.renderMainView();
                    });
                    this.initHandlers();
                });
            }
        });
    }

    initHandlers() {
        const $b = $(document.body);
        $b.on('submit', 'form.create-session-form', e => this.createFormSubmit(e));
        $b.on('submit', 'form.edit-session-form',   e => this.editFormSubmit(e));
        $b.on('submit', 'form.remove-session-form', e => this.removeFormSubmit(e));
        $b.on('click',  '.new-session',             e => this.openNewSession(e));
        $b.on('click',  '.save-session',            e => this.renderCreateView(e));
        $b.on('click',  '.session-item-edit',       e => this.renderEditView(e));
        $b.on('click',  '.session-item-remove',     e => this.renderRemoveView(e));
        $b.on('click',  '.return-to-main',          e => this.renderMainView(e));
        $b.on('click',  '.session-item-name',       e => this.openSession(e));
        $b.on('input',  '.search-input',            e => this.searchSession(e));
        $b.on('click',  '.show-menu',               e => this.showMenu(e));
        $b.on('click',  '.hide-menu',               e => this.hideMenu(e));
        $b.on('click',  '.show-hotkeys',            e => this.showHotKeys(e));
        $b.on('click',  '.hide-hotkeys',            e => this.hideHotKeys(e));
        $b.on('click',  '.rate-us',                 e => this.rateUsClick(e));
    }

    get activeDomain() {
        const u = new URL(this.tabUrl);
        return u.host;
    }

    renderMainView() {
        this.$vb.html(`
            <div class="main-view">
                <div class="icon icon-menu show-menu"></div>
                <div class="view-title">Multi Login</div>

                ${this.searchTpl}

                <div class="new-session-box">
                    <div class="new-session">
                        <span>New session</span>
                        <div class="icon icon-plus-w"></div>
                    </div>
                </div>

                ${this.isSessionTab ? `
                    <div class="add-session-box">
                        <div class="site-name">${this.activeDomain}</div>
                        <div class="icon icon-plus save-session"></div>
                    </div>
                ` : ''}
                
                <div class="saved-title">Saved session</div>
                ${this.sortMenuTpl}
                <div class="session-list">${this.sessionsListTpl}</div>
            </div>
        `);
    }

    get searchTpl() {
        return this.store.sessions.length ? `
            <div class="search-box">
                <div class="icon icon-search"></div>
                <input class="search-input" placeholder="Search sessions...">
            </div>
        ` : '';
    }

    get sortMenuTpl() {
        return `
            <div class="sort-menu-box">
                <div class="sort-menu">
                    <div class="sort-value">
                        <span>Show by <span class="v">${this.sortMenu.value}</span></span>
                        <div class="icon icon-arrow down"></div>
                    </div>
                    <div class="sort-item-box">
                        <div class="sort-item" value="site">Show by site</div>
                        <div class="sort-item" value="date">Show by date</div>
                        <div class="sort-item" value="name">Show by name</div>
                    </div>
                </div>
            </div>
        `
    }

    get sessionsListTpl() {
        const sessions = this.store.sessions.sort(this.sortFunction);

        if(!this.store.sessions.length) return '<div class="empty-sessions">You don\'t have saved sessions yet.</div>';

        return sessions.map((item, i) => `
            <div class="session-item" item-id="${item.id}">
                <div class="session-item-name">${i + 1}. ${item.name}</div>
                <div class="session-item-site">${item.url}</div>
                <div class="session-item-actions">
                    <div class="session-item-edit icon icon-pencil"></div>
                    <div class="session-item-remove icon icon-close"></div>
                </div>
            </div>
        `).join('');
    }

    get sortFunction() {
        switch(this.sortMenu.value) {
            case 'site': return function (a, b) {
                const cl = s => s.replace(/https?:\/\//, '').replace('www.', '');
                const _a = cl(a.url);
                const _b = cl(b.url);
                return _a > _b ? 1 : -1;
            };
            case 'date': return function (a, b) {
                return a.id > b.id ? 1 : -1;
            };
            case 'name': return function (a, b) {
                return a.name > b.name ? 1 : -1;
            };
        }
        return function () {};
    }

    renderCreateView() {
        this.$vb.html(`
            <div class="form-view">
                <div class="icon icon-back return-to-main"></div>
                <div class="view-title">Add new session</div>
                <form class="create-session-form" autocomplete="off">
                    <input name="id"   type="hidden"  value="${Date.now()}">
                    <input name="name" placeholder="Enter name..." required                       >
                    <input name="url"  placeholder="Paste URL"     required value="${this.tabUrl}">
                    <div class="btn-box">
                        <div class="line"></div>
                        <button type="submit">
                            <span class="icon icon-plus-r"></span>
                        </button>
                    </div>
                </form>
            </div>
        `);
    }

    renderEditView(e) {
        const itemId = e.target.closest('[item-id]').getAttribute('item-id');
        const item = this.store.sessions.find(s => s.id === itemId);
        this.$vb.html(`
            <div class="form-view">
                <div class="icon icon-back return-to-main"></div>
                <div class="view-title">Edit session</div>
                <form class="edit-session-form" autocomplete="off">
                    <input name="id"   type="hidden"                        value="${item.id}" >
                    <input name="name" placeholder="Enter name..." required value="${item.name}" >
                    <input name="url"  placeholder="Paste URL"     required value="${item.url}">
                    <div class="btn-box">
                        <div class="line"></div>
                        <button type="submit">
                            <span class="icon icon-save"></span>
                        </button>
                    </div>
                </form>
            </div>
        `);
    }

    renderRemoveView(e) {
        const itemId = e.target.closest('[item-id]').getAttribute('item-id');
        const item = this.store.sessions.find(s => s.id === itemId);

        this.$vb.append(`
            <div class="modal-box">
                <div class="modal">
                    <div class="modal-headline">Are you sure</div>
                    <div class="modal-text">to delete ${item.name}?</div>
                    <form class="remove-session-form">
                        <input type="hidden" name="id" value="${item.id}">
                        <div class="btn-box">
                            <button type="button" class="no-btn return-to-main">No</button>
                            <button class="yes-btn">Yes</button>
                        </div>
                    </form>
                </div>
            </div>
        `);
    }

    getFormValues(e) {
        return {
            id  : e.target.elements.id.value,
            name: e.target.elements.name.value,
            url : e.target.elements.url.value,
        };
    }

    createFormSubmit(e) {
        e.preventDefault();
        const item = this.getFormValues(e);
        this.store.sessions.push(item);
        this.saveStore(() => this.renderMainView());
        chrome.runtime.sendMessage({action: 'saveSession', tabId: this.tabId, sessionId: item.id})
    }

    editFormSubmit(e) {
        e.preventDefault();
        const item = this.getFormValues(e);
        const i = this.store.sessions.map(s => s.id).indexOf(item.id);
        for(let key in item) {
            this.store.sessions[i][key] = item[key];
        }
        this.saveStore(() => this.renderMainView());
    }

    removeFormSubmit(e) {
        e.preventDefault();
        const itemId = e.target.elements.id.value;
        const i = this.store.sessions.map(s => s.id).indexOf(itemId);
        this.store.sessions.splice(i, 1);
        this.saveStore(() => this.renderMainView());
        chrome.runtime.sendMessage({action: 'removeSession', sessionId: itemId})
    }

    saveStore(cb) {
        chrome.storage.local.set(this.store, () => {
            cb && cb();
        });
    }

    openSession(e) {
        const sessionId = e.target.closest('[item-id]').getAttribute('item-id');
        const session   = this.store.sessions.find(s => s.id === sessionId);
        const url       = session.url;
        chrome.runtime.sendMessage({action: 'openSession', sessionId, url});
    }

    openNewSession() {
        chrome.runtime.sendMessage({action: 'openNewSession'})
    }

    searchSession(e) {
        const searchValue = e.target.value.toLowerCase();
        $('.session-item').each((i, el) => {
            const $el = $(el);
            const name = $el.find('.session-item-name').text().toLowerCase();
            name.includes(searchValue) ? $el.show() : $el.hide();
        });
    }

    showMenu() {
        this.$mb.show();
        setTimeout(() => this.$mb.addClass('show'), 100);
    }

    hideMenu() {
        this.$mb.removeClass('show');
        setTimeout(() => this.$mb.hide(), 100);
    }

    showHotKeys() {
        $('.hotkeys-box').addClass('show')
    }

    hideHotKeys() {
        $('.hotkeys-box').removeClass('show')
    }

    rateUsClick() {
        open(`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`);
    }

}

// noinspection JSUnusedGlobalSymbols
const p = new Popup();
