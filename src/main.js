// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// =============== Base libraries integration ==================
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'

Vue.use(VueResource)
Vue.use(VueTranslate)

import store from './store'
import router from './router'

// ===== Bootstrap components integration (JQuery needed) ======
window.$ = window.jQuery = require('jquery')
require('bootstrap-sass')

// ======================= Utils ===============================
require('./util/arrayutils.js')
require('./util/util.js')
// ===================== Basic imports =========================
import Locales from './util/locale.js'
import Config from './util/config.js'
import Http from './util/http.js'
import App from './App'
// ======================= Base Component ======================
Vue.locales(Locales);
window.Http = Http;
window.Config = Config;
// ======================== Vue Instance =======================
/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  mounted() {
    this.$translate.setLang(Config.LANGUAGE);
  }
})
