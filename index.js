const EVENT_FINISH = 'finish';
const EVENT_RESIZE = 'resize';
const EVENT_LOADED = 'loaded';

class TncEventDispatcher {
    constructor() {
        this.listeners = {};
    }

    addEventListener(name, callback) {
        this.listeners[name] = callback
    }

    dispatchEvent(e) {
        if (this.listeners[e.type]) {
            this.listeners[e.type](e.detail);
        }
    }
}

class Widget {
    constructor(block, config, dispatcher) {
        this.block = block;
        this.config = config;
        this.dispatcher = dispatcher;
    }

    init() {
        const config = this.config;
        const query = {
            token: config.token,
            showResultAfterLoad: config.showResultAfterLoad
        }

        // loading screen: copy and display content of block
        const loadingBlock = document.createElement("div");
        loadingBlock.innerHTML = block.innerHTML;
        block.after(loadingBlock);
        this.block.innerHTML = ''; // clear block

        const iframe = document.createElement('iframe');
        iframe.src = config.host + '/tests/widget/' + config.testId + '/?' + (new URLSearchParams(query)).toString();
        iframe.loading = 'lazy';
        iframe.scrolling = 'no';
        iframe.style.border = 'none';
        iframe.style.height = 'auto';
        iframe.style.width = '100%';
        iframe.style.display = 'none'; // hide until it's loading
        this.block.appendChild(iframe);

        this.dispatcher.addEventListener(EVENT_LOADED, function (e) {
            loadingBlock.remove();
            iframe.style.display = 'block';
        });

        this.dispatcher.addEventListener(EVENT_RESIZE, function (e) {
            const height = parseInt(e.frameHeight);
            iframe.style.height = height + 'px';
        });
    }

    addEventListener(name, callback) {
        this.dispatcher.addEventListener(name, callback);
    }
}

function boolParam(value, defaultValue) {
    if (value === null) {
        return defaultValue;
    }
    if (value === '1' || value === 1 || value === true || value === 'true') {
        return 1;
    }
    return 0;
}

function stingParam(value, defaultValue) {
    if (value === null) {
        return defaultValue;
    }
    return value;
}

function configure(block) {
    const testId = block.getAttribute('data-test');
    if (!testId) {
        throw new Error('Error no test specified (e.g data-test="102").');
    }
    const token = block.getAttribute('data-token');
    // показ результата при загрузке страницы если результат имеется
    const showResultAfterLoad = boolParam(block.getAttribute('data-show-result-after-load'), 1);
    // инициализация iframe
    const init = stingParam(block.getAttribute('data-init'), 'auto', ['auto']);
    if (['auto', 'manual'].indexOf(init) === -1) {
        throw new Error('Unsupported value init: ' + init);
    }
    return {
        host: block.getAttribute('data-host') ?? 'https://testonomica.com',
        testId,
        token,
        showResultAfterLoad,
        init
    }
}

const block = document.getElementById('testonomica_app');
if (!block) {
    throw new Error('Error tag id "testonomica_app" not found.');
}
const config = configure(block);

const dispatcher = new TncEventDispatcher();

window.onmessage = function (e) {
    if (e.origin !== config.host) {
        return;
    }
    if (e.data.hasOwnProperty("name")) {
        const name = e.data.name;
        // frameHeight
        if (name === 'frameHeight') {
            dispatcher.dispatchEvent(new CustomEvent(EVENT_RESIZE, {detail: {frameHeight: e.data.frameHeight}}))
            return;
        }
        if (name === EVENT_FINISH) {
            dispatcher.dispatchEvent(new CustomEvent(EVENT_FINISH, {detail: {key: e.data.key}}))
        }
        if (name === EVENT_LOADED) {
            dispatcher.dispatchEvent(new CustomEvent(EVENT_LOADED))
        }
    }
}

// tncw is Testonomica Widget
const tncw = new Widget(block, config, dispatcher);
if (config.init === 'auto') {
    tncw.init();
}
window.tncw = tncw;

// client code bellow for example:
// window.tncw.addEventListener(EVENT_FINISH, function (e) {
//     alert(`Your result key is ${e.key}.`);
// });
// window.tncw.init();