<template>
  <div id="app" class="container">
    <div class="container">
      <div class="header">
        <h3 class="text-muted" style="display:inline-block;">
          <i class="fa fa-chevron-left secondary-text-color"></i>
            &nbsp<label v-translate>APP_TITLE</label>&nbsp
          <i class="fa fa-chevron-right secondary-text-color"></i>
        </h3>
        <div class="row" style="display:inline-block;float:right;">
          <button class="btn btn-default btn-xs" @click="$translate.setLang('en')">EN</button>
          <button class="btn btn-default btn-xs" @click="$translate.setLang('pt')">PT</button>
        </div>
      </div>
      <collection></collection>
      <div class="row marketing">
        <div class="col-lg-6">
          <h4 class="primary-text-color" v-translate>ADD_ITEMS_TO_COLLECTION</h4>
          <p v-translate>D_ADD_ITEMS_TO_COLLECTION</p>
          <h4 class="primary-text-color" v-translate>REGISTER_NEW_PLACES</h4>
          <p v-translate>D_REGISTER_NEW_PLACES</p>
          <h4 class="primary-text-color" v-translate>LOAN_YOUR_ITEMS</h4>
          <p v-translate>D_LOAN_YOUR_ITEMS</p>
        </div>
      </div>
      <div class="footer">
        <p>Developed by Antonio C. Schönmann Alves</p>
      </div>
    </div>
	  <add-item-modal></add-item-modal>
    <show-item-modal></show-item-modal>
  </div>
</template>

<script>
import Collection from './components/Collection'
import AddItemModal from './components/AddItemModal'
import ShowItemModal from './components/ShowItemModal'

export default {
  components: { Collection, AddItemModal, ShowItemModal }
}
</script>

<style lang="sass">
  // Bootstrap
  $icon-font-path: '../node_modules/bootstrap-sass/assets/fonts/bootstrap/';
  $link-color: #42b983;
  $brand-success: #42b983;
  @import 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap';

  // font awesome
  $fa-font-path: '../node_modules/font-awesome/fonts/';
  @import 'node_modules/font-awesome/scss/font-awesome';
  p
    text-align: justify
</style>

<style type="scss">
.browserupgrade {
  margin: 0.2em 0;
  background: #ccc;
  color: #000;
  padding: 0.2em 0;
}

body {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.header,
.marketing,
.footer {
  padding-right: 1rem;
  padding-left: 1rem;
}

.header {
  margin-top: 3rem;
  padding-bottom: 1rem;
  border-bottom: .05rem solid #e5e5e5;
}

.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 3rem;
}

.divider {
  border-bottom: .05rem solid #e5e5e5;
}

.footer {
  padding-top: 1.5rem;
  color: #777;
  border-top: .05rem solid #e5e5e5;
}

@media (min-width: 48em) {
  .container {
    max-width: 66rem;
  }
}
.container-narrow > hr {
  margin: 2rem 0;
}
.marketing {
  margin: 3rem 0;
}
.marketing p + h4 {
  margin-top: 1.5rem;
}

/* Modal transition. */
.fade2 {
    transform: scale(0.95);
    opacity: 0;
    transition: all .2s linear;
}
.fade2.show {
    opacity: 1;
    transform: scale(1);
}

@media screen and (min-width: 48em) {
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
  .header {
    margin-bottom: 2rem;
  }
}

.dark-primary-color    { background: #455A64; }
.default-primary-color { background: #607D8B; }
.light-primary-color   { background: #CFD8DC; }
.text-primary-color    { color: #FFFFFF; }
.accent-color          { background: #FF5722; }
.primary-text-color    { color: #212121; }
.secondary-text-color  { color: #757575; }
.divider-color         { border-color: #BDBDBD; }

</style>