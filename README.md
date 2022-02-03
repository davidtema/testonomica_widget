# testonomica_widget

    <div id="testonomica_app" data-test="102"></div>
    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget@1.0.1/index.min.js"></script>

For paid tests:

    <div id="testonomica_app" data-test="102" data-token={YOUR_PRIVATE_TOKEN}></div>

Additional parameters
---

- **data-init**. Default value: `manual`. Possible values: `manual`, `auto`. For case, when you need some preparation
  use *manual*.
- **data-show-result-after-load**. Default value: `true`. Possible values: `true`, `false`.

## Manual initialize example with event subscription

    window.tncw.addEventListener('finish', function (e) {
        alert(`Your result key: ${e.key}`);
    });
    window.tncw.init();

---

Changelog
---

### 1.0.1

- Added parameters **data-init**, **data-show-result-after-load**.
- Added event subscription **finish**.

---

Future
---

- data-save-result `true`, `false` if you are going to store progress data on your server.
- data-result-screen `true`, `false` (no sure). Show Message instead e.g. "Calculating...".
- add to finish event progress data for case when you are going to store data on your server.
- `window.tncw.status().then(status => { if (status === 'progress') alert('Status: in progress.'); })`
- start / restart test

