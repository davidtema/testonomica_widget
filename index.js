// Creates Iframe
function config(block) {
    const testId = block.getAttribute('data-test');
    if (!testId) {
        throw new Error('Error no test specified (e.g data-test="102").');
    }
    const token = block.getAttribute('data-token');
    if (!token) {
        throw new Error('Error no token specified (e.g data-token="PUBLIC_TOKEN").');
    }
    return {
        host: block.getAttribute('data-host') ?? 'https://testonomica.com',
        testId,
        token
    }
}

const block = document.getElementById('testonomica_app');
if (!block) {
    throw new Error('Error tag id "testonomica_app" not found.');
}
const conf = config(block);

const iframe = document.createElement('iframe');
iframe.src = conf.host + '/tests/widget/' + conf.testId + '/?token=' + conf.token;
iframe.loading = 'lazy';
iframe.scrolling = 'no';
iframe.style.border = 'none';
iframe.style.height = 'auto';
iframe.style.width = '100%';
block.appendChild(iframe);

window.onmessage = function (e) {
    if (e.origin !== conf.host) {
        return;
    }
    if (!e.data.hasOwnProperty("frameHeight")) {
        return;
    }
    let height = parseInt(e.data.frameHeight);
    iframe.style.height = height + 'px';
}