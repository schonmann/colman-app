// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// =============== Base libraries integration ==================
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'
import store from './store'
import router from './router'
import Locales from './util/locale.js'
import App from './App'

// ===== Bootstrap components integration (JQuery needed) ======
window.$ = window.jQuery = require('jquery')
require('bootstrap-sass')
require('./util/arrayutils.js')

// ======================== Utils =======================
window.Util = require('./util/util.js')
window.Http = require('./util/http.js')
window.Config = require('./util/config.js')

// ======================== Models ======================

window.Item = require('./model/item.js')
window.Person = require('./model/person.js')
window.Place = require('./model/place.js')
window.Loan = require('./model/loan.js')
window.ModelWrapper = require('./model/modelwrapper.js')

// ======================== DAO ======================

window.ItemDAO = require('./dao/itemDAO.js')
window.PersonDAO = require('./dao/personDAO.js')
window.PlaceDAO = require('./dao/placeDAO.js')
window.LoanDAO = require('./dao/loanDAO.js')
window.InfoDAO = require('./dao/infoDAO.js')

Vue.use(VueResource)
Vue.use(VueTranslate)
Vue.locales(Locales)

//Initialize vue instance and set the default vue-translate language (see locale.js/config.js).
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  mounted() {
    this.$translate.setLang(Config.LANGUAGE);
  }
});