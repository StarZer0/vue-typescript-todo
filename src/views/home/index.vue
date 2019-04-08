<template>
  <div class="home">
    <div class="header"></div>
    <div class="articles"></div>
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
  height: 100px;
}
</style>


