<template>
  <div class="home">
    <div class="header">
      <form>
        <div class="form-group" :class="{'has-error': false}">
          <label for="input" class="input-label pull-left">事项:</label>
          <span class="btn btn-primary pull-right">添加</span>
          <div class="input">
            <input type="text" class="form-control" id="input">
          </div>
        </div>
      </form>
    </div>
    <section class="articles">
      <ul>
        <li class="article">
          <p>JavaScript高级程序设计</p>
        </li>
      </ul>
    </section>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  padding: 10px;
  .form-group {
    margin: 0;
  }
  .input-label {
    width: 80px;
    line-height: 32px;
    border: 1px solid #ccc;
    border-right: 0;
  }
  .input {
    margin: 0 80px;
    .form-control {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.articles {
  height: 300px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  ul {
    padding: 0;
  }
  .article {
    list-style: none;
    text-align: left;
    line-height: 30px;
    margin: 10px 10px 10px 40px;
    border-bottom: 1px solid #ccc;
  }
}
.footer {
  height: 100px;
}
</style>


