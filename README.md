# testonomica_widget

    <link href="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget/build/main.css" rel="stylesheet">
    <div id="testonomica_app" data-test="102"></div>
    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget/build/bundle.js"></script>

A specific version:

    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget@2.0.2/build/bundle.js"></script>
    <link href="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget@2.0.2/build/main.css" rel="stylesheet">

For paid tests you must specify public token just like that:

    <div id="testonomica_app" data-test="102" data-token="{PUBLIC_TOKEN}"></div>

Additional parameters
---

- **data-init**. Default value: `manual`. Possible values: `manual`, `auto`. For case, when you need some preparation
  use *manual*.
- **data-display-report**. Default value: `true`. Possible values: `true`, `false`.
- **data-show-result-after-load**. Default value: `true`. Possible values: `true`, `false`.
- **data-lang**. Default value: `manual`. Possible values: `auto`, `ru`, `en`.

## Manual initialize example with event subscription

If you need to postpone initialization or subscribe to app events, you must explicitly set `data-init="manual"`
in the container tag and then refer to the object `window.tncw`, which goes with two methods: `addEventListener`
and `init`.

    <div id="testonomica_app" data-test="102" data-init="manual"></div>

    <script>
        window.tncw.addEventListener('finish', function (e) {
            alert(`Your result key: ${e.key}.`);
        });
        window.tncw.addEventListener('load', function (e) {
            alert(`Iframe loaded.`);
        });
        window.tncw.init();
    </script>

---

## Events

- `loaded`
- `finish`
- `log`

Changelog
---

### 2.0.0

- Rejection of Iframe.
- Style mode: "Office". E.g. `<div id="testonomica_app" class="tnc-office"...>`.

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

- **data-start-screen**. Default value: `api`. Possible values: `api`, `none`, `live` and `default`, which is `api`.
- scroll up when height reduces sufficiently.

