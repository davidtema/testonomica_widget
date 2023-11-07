# testonomica_widget

    <link href="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget/build/main.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget/build/bundle.js"></script>
    <div id="testonomica_app"></div>

A specific version:

    <script src="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget@3.0.0/build/bundle.js"></script>
    <link href="https://cdn.jsdelivr.net/gh/davidtema/testonomica_widget@3.0.0/build/main.css" rel="stylesheet">
    <div id="testonomica_app"></div>

---

## Initialization

    <script>
        window.tncw.init({
        containerId: 'testonomica_app',
        test: 'proftest-v2',
        handlers: {
            any_start_click: function () {
                // hide header and footer
            },
            finish: function (e) {
                // save the key to a session or to db by e.result_key
                // then you can redirect user to the result screen
            }
        }
    });
    </script>

---

## Events

- `loaded`
- `finish`
- `log`

Changelog
---

### 3.0.0

#### Initialization
- Only manual initialization left. 
- Added events: `any_start_click`

#### Custom welcome screen
- Removed `live` mode because of it inconvenience. 
- Added autorendering buttons after initialization. The default selector is a class `testonomica_buttons`.

    <div id="my-welcome-screen">
        <h1>Test</h1>
        <div class="testonomica_buttons"></div>
    </div>
    <div id="testonomica_app" style="display: none"></div>

Subscribe to `any_start_click` event in order to hide the custom welcome screen and enable widget.

### 2.0.4

- add `data-start-screen`. Default value: `api`. Possible values: `api`, `live`.

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

- scroll up when height reduces sufficiently.

