<template>
	<div id="app" class="container">
		<div class="container">
			<div class="header">
				<h3 class="text-muted" style="display:inline-block;">
					<i class="fa fa-chevron-left secondary-text-color"></i>
						&nbsp<label v-translate>APP_TITLE</label>&nbsp
					<i class="fa fa-chevron-right secondary-text-color"></i>
				</h3>
				<div class="row" style="float:right;">
					<button class="btn btn-default btn-xs" @click="$translate.setLang('en');">EN</button>
					<button class="btn btn-default btn-xs" @click="$translate.setLang('pt');">PT</button>
				</div>
			</div>
			<div style="padding-top:20px;padding-bottom:30px;">
				<div class="row" style="padding-bottom:10px;">
					<div class="col-lg-3" v-translate>ORDER_BY</div>
					<div class="col-lg-3" v-translate>TYPE</div>
					<div class="col-lg-3" v-translate>STATUS</div>
				</div>
				<div class="row">
					<div class="col-lg-3">
						<select class="form-control" v-on:change="orderBy">
							<option disabled><span v-translate>SELECT_ONE</span></option>
							<option value="name" v-translate>NAME</option>
							<option value="description" v-translate>DESCRIPTION</option>
							<option value="type" v-translate>TYPE</option>
						</select>
					</div>
					<div class="col-lg-3">
						<select class="form-control" @change="">
							<option value="-1"><span v-translate>ALL</span></option>
							<option v-for="type,idx in types" v-bind:value="idx"><span v-translate>{{type}}</span></option>
						</select>
					</div>
					<div class="col-lg-3">
						<select class="form-control" @change="">
							<option disabled><span v-translate>SELECT_ONE</span></option>
							<option value="loaned" v-translate>LOANED</option>
							<option value="notLoaned" v-translate>NOT_LOANED</option>
						</select>
					</div>
					<div class="col-lg-3">
						<form class="search-form">
							<div class="form-group has-feedback">
								<label for="search" class="sr-only">Search</label>
								<input type="text" class="form-control" name="search" id="search" placeholder="search">
								<span class="glyphicon glyphicon-search form-control-feedback"></span>
							</div>
						</form>
					</div>
				</div>
			</div>
			<collection :filtered="items"></collection>
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
		<add-place-modal></add-place-modal>
	</div>
</template>

<script>

import Collection from './components/Collection'
import AddItemModal from './components/AddItemModal'
import ShowItemModal from './components/ShowItemModal'
import AddPlaceModal from './components/AddPlaceModal'

export default {
	'components': { Collection, AddItemModal, ShowItemModal, AddPlaceModal },
	'data': function(){
		return {
			types: [],
			places: [],
			items: [],
		}	
	},
	'methods': {
		orderBy: function(e) {
			var field = e.srcElement.value;
			this.items.sort((a,b) => a[field] > b[field]);
		},
		getTypeList: function (callback,fallback) {
			Http.get("getTypes", (types) => {
				callback(types);
			}, fallback);
		},
		getPlaceList: function (callback,fallback) {
			Http.get("getPlaces", (places) => {
				callback(places);
			}, fallback);
		},
		getItemList: function (callback,fallback) {
			Http.get('getAllItems', function (items) {
				callback(items);
			}, fallback);
		},
		getDataPackage: function(callback,fallback) {
			var DataPackage = {};
			this.getTypeList((types)=>{
				this.getPlaceList((places)=>{
					this.getItemList((items)=>{
						var dto = {};
						dto.types = types;
						dto.places = places;
						dto.items = items;
						callback(dto);
					});
				}, fallback);
			},fallback);
		},
		doAjax: function(){
			this.getDataPackage((dto)=>{
				this.types.replace(dto.types); 
				this.places.replace(dto.places); 
				this.items.replace(dto.items);
				window.DataPackage = dto;
			}, this.onAjaxFailure);
		},
		//Behavior on failure to get data package.
		onAjaxFailure: function(x,s,e) {
			alert("Error: " + s);
		}
	},
	mounted() {
		this.doAjax();
		window.App = this;
	}
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

.search-form .form-group {
  float: right !important;
  transition: all 0.35s, border-radius 0s;
  width: 32px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  border-radius: 25px;
  border: 1px solid #ccc;
}
.search-form .form-group input.form-control {
  padding-right: 20px;
  border: 0 none;
  background: transparent;
  box-shadow: none;
  display:block;
}
.search-form .form-group input.form-control::-webkit-input-placeholder {
  display: none;
}
.search-form .form-group input.form-control:-moz-placeholder {
  /* Firefox 18- */
  display: none;
}
.search-form .form-group input.form-control::-moz-placeholder {
  /* Firefox 19+ */
  display: none;
}
.search-form .form-group input.form-control:-ms-input-placeholder {
  display: none;
}
.search-form .form-group:hover,
.search-form .form-group.hover {
  width: 100%;
  border-radius: 4px 25px 25px 4px;
}
.search-form .form-group span.form-control-feedback {
  position: absolute;
  top: -1px;
  right: -2px;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #3596e0;
  left: initial;
  font-size: 14px;
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