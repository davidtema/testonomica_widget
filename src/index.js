import {parseConfigFromTag, Testonomica} from "testonomica_api/src/index";
import ProgressStorage from "testonomica_api/src/service/storage/ProgressStorage";
import {EVENT_FINISH} from "../../testonomica_api/src/events";
import {INIT_AUTO} from "../../testonomica_api/src/const";
import 'testonomica_api/src/style.scss';

const tag = document.getElementById('testonomica_app');

const config = parseConfigFromTag(tag);
const storage = new ProgressStorage(config.getTestId());

const runner = new Testonomica(storage, config.getTestId(), config.getHost(), config.getToken());
runner.addEventListener(EVENT_FINISH, function (e) {
    console.log(e.key)
});

const tncw = {
    addEventListener: function (name, callback) {
        runner.addEventListener(name, callback);
    },
    init: function () {
        runner.createApp(tag, config);
    }
}

if (config.getInit() === INIT_AUTO) {
    runner.createApp(tag, config);
}

window.tncw = tncw;

// window.tncw.addEventListener('finish', function(e) {
//      alert(`Your result key is ${e.key}.`);
// });
// window.tncw.addEventListener('log', function (e) {
//     console.log(...e.msg);
// });
// window.tncw.init();