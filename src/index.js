import {Testonomica} from "testonomica_api/src/index";
import ProgressStorage from "testonomica_api/src/service/storage/ProgressStorage";
import 'testonomica_api/src/style.scss';
import {HOST} from "testonomica_api/src/const";

// todo убрать все зависимости, сделать инициализацию приложения в testonomica_api. 
// Использовать как результат компиляции testonomica_api.
// То есть tncw должно быть в testonomica_api.

const tncw = { 
    init: function (config) {
        // todo validate config
        if (!config.containerId) {
            throw new Error('"containderId" is not specified.');
        }

        if (!config.test) {
            throw new Error('"test" is not specified.');
        }

        if (!config.handlers) {
            throw new Error('"handlers" is not specified.');
        }

        if (!config.handlers.finish) {
            throw new Error('"handlers.finish" is not specified.');
        }

        if (!config.host) {
            config.host = HOST;
        }

        if (!config.startScreen) {
            config.startScreen = 'auto';
        }

        const container = document.getElementById(config.containerId);
        const storage = new ProgressStorage(config.test);
        const runner = new Testonomica(storage, config.test, config.host, 'public-token-is-not-used-anymore');
        
        // prevent default handlers
        if (config.prevent) {
            config.prevent.forEach(function(name) {
                runner.clearEventListeners(name);
            })
        }

        const handlers = Object.entries(config.handlers);
        for (const [name, callback] of handlers) {
            runner.addEventListener(name, callback);
        }

        runner.createApp(container, config);
    }
}

window.tncw = tncw;

// window.tncw.init({
//  containerId: 'my-app',
//  test: 'proforientation-v2',
//  preventDefault: ['finish'],
//  handlers: {
//      finish: function(key) {
//          // save key and go to result page
//      }
//  }
// });