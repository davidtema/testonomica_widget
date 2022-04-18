# testonomica_widget

    <div id="testonomica_app" data-test="102"></div>
    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget/index.min.js"></script>
    
Specific version:

    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget@1.1.5/index.min.js"></script>

For paid tests:

    <div id="testonomica_app" data-test="102" data-token="{PUBLIC_TOKEN}"></div>

Additional parameters
---

- **data-init**. Default value: `manual`. Possible values: `manual`, `auto`. For case, when you need some preparation
  use *manual*.
- **data-display-report**. Default value: `true`. Possible values: `true`, `false`.
- **data-show-result-after-load**. Default value: `true`. Possible values: `true`, `false`.
- **data-lang**. Default value: `manual`. Possible values: `auto`, `ru`, `en`.

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

### 1.1.5

- Fixed empty screen in Chrome 99+ (removed iframe.loading = 'lazy')
- Added logging

### 1.1.4

- Added managing language via attr `data-lang`.

### 1.1.3

- Added report display managing via attr `data-display-report`.

### 1.1.1

- Added browser locale detection. Non-russian locale is host/{LANG}/...

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
- add to finish event progress data for case when you are going to store data on your server.
- `window.tncw.status().then(status => { if (status === 'progress') alert('Status: in progress.'); })`
- start / restart test

