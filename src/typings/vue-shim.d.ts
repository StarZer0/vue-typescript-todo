/**
 * ts默认不支持tyoescript
 * 需要引入shim来告诉ts "*.vue"文件交给vue处理
 * export default Vue
 *
 * 同时,在引入vue组件的时候 需要添加.vue后缀
 * module '.vue' 告诉ts处理这一类文件用shim方式处理
 */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
