# testonomica_widget

    <div id="testonomica_app" data-test="102"></div>
    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget@1.0.2/index.min.js"></script>

For paid tests:

    <div id="testonomica_app" data-test="102" data-token={YOUR_PRIVATE_TOKEN}></div>

Additional parameters
---

- **data-init**. Default value: `manual`. Possible values: `manual`, `auto`. For case, when you need some preparation
  use *manual*.
- **data-show-result-after-load**. Default value: `true`. Possible values: `true`, `false`.

## Manual initialize example with event subscription

    window.tncw.addEventListener('finish', function (e) {
        alert(`Your result key: ${e.key}.`);
    });
    window.tncw.addEventListener('load', function (e) {
        alert(`Iframe loaded.`);
    });
    window.tncw.init();

---

Changelog
---

### 1.1.0

- Enabled support for disabled third-party cookies.

### 1.0.5

- Rename `load` event to `loaded`
- Bugfix when token was validated like before 1.0.3.

### 1.0.4

- Keeps the contents of the main div on the screen until the iframe loaded.

### 1.0.3

- Allow load with no token for free tests.

### 1.0.2

- Added parameters **data-init**, **data-show-result-after-load**.
- Added event subscription **finish**.

---

Future
---

- scroll up when height sufficiently reduces
- data-save-result `true`, `false` if you are going to store progress data on your server.
- data-result-screen `true`, `false` (no sure). Show Message instead e.g. "Calculating...".
- add to finish event progress data for case when you are going to store data on your server.
- `window.tncw.status().then(status => { if (status === 'progress') alert('Status: in progress.'); })`
- start / restart test

