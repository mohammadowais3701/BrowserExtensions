class SortMenu {
    constructor() {
        this.isOpen       = false;
        this.value        = 'site';

        this.initHandlers();
    }

    initHandlers() {
        const $b = $(document.body);
        $b.on('click',  '.sort-value', () => this.isOpen ? this.close() : this.open());
        $b.on('click',  '.sort-item',  e => this.setItem(e));
    }

    open() {
        this.isOpen = true;
        $('.sort-item-box').slideDown(100);
        $('.sort-menu .icon-arrow').removeClass('down');
    }

    close() {
        this.isOpen = false;
        $('.sort-item-box').slideUp(100);
        $('.sort-menu .icon-arrow').addClass('down');
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        $('.sort-menu .sort-value span.v').text(value);
    }

    setItem(e) {
        this.value = e.target.getAttribute('value');
        this.close();
        this.onChange();
    }

    onChange() {}
}
