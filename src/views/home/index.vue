<template>
  <div class="home">
    <div class="header">
      <form>
        <div class="form-group" :class="{'has-error': hasNoText}">
          <label for="input" class="input-label pull-left">事项:</label>
          <span class="btn btn-primary pull-right" @click="addHandle">添加</span>
          <div class="input">
            <input ref="input" type="text" class="form-control" id="input" v-model="inputText" autofocus @focus="focusHandle">
          </div>
        </div>
      </form>
    </div>
    <section class="articles">
      <ul @click="clickHandle">
        <li class="article todo" v-for="(item, index) in articles" :key="index + 'todo'">
          <span class="btn btn-success pull-right" operate="1" :index="index">完成</span>
          <span class="btn btn-danger pull-right" operate="0" :index="index">删除</span>
          <p>{{item}}</p>
        </li>
        <li class="article success" v-for="(item, index) in success" :key="index + 'success'">
          <p>{{item}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class Home extends Vue {
  articles: string[] = [];
  success: string[] = [];
  inputText: string = "";
  hasNoText: boolean = false;
  timer: number;

  clickHandle(e) {
    const target = e.target;
    let operate = target.getAttribute("operate");
    if (operate === undefined || operate === null) return;

    let index = parseInt(target.getAttribute("index"));
    let article = this.articles.splice(index, 1)[0];
    if (operate === "1") {
      this.success.push(article);
    }
  }

  addHandle() {
    if (this.inputText.trim() === "") {
      this.hasNoText = true;
      this.timer = setTimeout(() => {
        this.hasNoText = false;
      }, 3000);
      return;
    }
    this.articles.push(this.inputText);
    this.inputText = "";
  }

  focusHandle() {
    if (this.timer) clearTimeout(this.timer);
    this.hasNoText = false;
  }
}
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
  min-height: 300px;
  border-top: 1px solid #ccc;
  ul {
    padding: 0;
  }
  .article {
    list-style: none;
    text-align: left;
    line-height: 30px;
    margin: 10px;
    border-bottom: 1px solid #ccc;
    .btn {
      margin-left: 10px;
      opacity: 0;
      transition: opacity 0.5s;
    }
    &:hover {
      .btn {
        opacity: 1;
      }
    }
    &.success {
      color: #ccc;
    }
  }
}
</style>


