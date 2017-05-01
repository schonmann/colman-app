<template>
  <div class="item-box" v-on:click="showItemInfoModal">
    <div class="item card">
      <label class="item-label">{{me.name}}</label>
      <div class="divider"></div>
      <img class="item-image"></img>
    </div>
  </div>
</template>

<script>
  export default {
    name: "item",
    props: {
        me: {type: Object}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  h1
    color: #42b983
  .logo
    width: 80px
    height: 80px
</style>

<style lang="scss" scoped>
.card{
    background-color: white;
    box-shadow: 2px 3px 10px #777;
    margin-left:5px;
    margin-right:5px;
    margin-bottom:5px;
    position: relative;
}
.item-box{
    display: inline-block;
}
.item {
    margin-left:5px;
    margin-right:5px;
    margin-bottom:5px;
    width:150px;
    height:200px;
    transition:all .1s ease-in;
    .item-box:hover & {
        transform: scale(1.05);
    }
}
.item-image{
    background-image: url("https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png") no-repeat center center fixed;
    max-width:100%;
    height:auto;
}
.item-label{
    width:150px;
    height:30px;
    font-size: 13px;
    line-height: 30px;
    padding-top:5px;
    padding-left:5px;
    padding-right:5px;
    word-break:keep-all;
    text-overflow:ellipsis;
    white-space: pre;
    overflow:hidden;
}
</style>