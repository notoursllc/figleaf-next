// this component was influenced by:
// https://github.com/bootstrap-vue/bootstrap-vue/blob/7ea0cc4a16d27b179eca47d351eaa9fe6fdfd56e/src/components/modal/helpers/bv-modal.js#L85

import FigConfirm from './Confirm.vue';
import confirm from './confirm.js';

let installed = false;

export default {
    install: (app, options = {}) => {
        if (installed) {
            return;
        }

        installed = true;

        const name = options.name || FigConfirm.name;
        app.component(name, FigConfirm);
        app.provide('FigConfirm', confirm)

        // TODO: this is probably a better way that app.provide above
        // app.config.globalProperties.$figConfirm = confirm;
    }
}
