# vue 项目中引入 typescript

1. vue-cli 搭建基础项目结构
2. cnpm install -D ts-loader tslint-loader tslint-config-standard
3. cnpm install -S vue-class-component vue-property-decorator

## 配置 webpack

```
// webpack.base.conf.js
resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
    }
},
module: {
    rules: [
        // 添加对ts语法的支持
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader'
        },
        // 添加对tsx语法的支持
         {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        },
        //...
    ]
}
```

## 配置 tsconfig.json

在项目根路径下添加 tsconfig.json 并配置

## 配置 tslint.json

在项目根路径下添加 tslint.json 并配置

## 添加 vue-shim.d.ts

创建目录/src/typings,新建文件 vue-shim.d.ts

```
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

由于 typescript 默认并不支持.vue 文件，我们需要在项目中创建一个 shim 文件:
告诉 typescript，当遇到以.vue 结尾的文件时，交给 vue 来处理，并且在引入文件时，我们不应该省略.vue 后缀

## 重写 vue 文件

使用 typescript 语法重写.vue 文件

```
<template>
    <div>{{msg}}</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component
    export default class Main extends Vue {
        // properties
    }
</script>

<style>
    //styles
</style>
```

## npm run start

# vue_typescript_todo

## [vue-class-component](https://github.com/vuejs/vue-class-component)

> vue-class-component 通过对 vue 进行封装，可以让开发者以一种扁平化的方式来进行开发

```
import Vue from 'vue'
import Component from 'vue-class-component'

// Component装饰器工厂 返回值为一个装饰器
@Component({
    props: {
        propMessage: String
    }
})
export default class App extends Vue{
    // data
    msg: 11,

    // lifecycle hook
    mounted() {}

    // computed
    get computedMsg() {
        return this.msg
    }

    // method
    greet() {
        console.log('methods')
    }
}

```

1. methods 可以直接通过 class 的成员方法来声明
2. computed 计算属性可以通过 accessors 访问器(getter)来声明
3. data 数据初始化可以通过 class 的属性来声明
4. data(function),render,lifecycle 都可以直接当做 class 的属性方法来声明，但是不能在实例上引用他们。当声明自定义方法时，应该避免这些保留字。

> 也可以使用[vue-property-decorators](https://github.com/kaorun343/vue-property-decorator)来支持@prop 和@watch 装饰器

### mixins

> vue-class-component 支持在 class 风格中使用 mixins 辅助函数。使用 mixins 赋值，typescript 可以推断 mixin 类型并且在组件中继承

```
// mixin.js
...
@Component
export default class Mixin extends Vue {
    minxinVale: 'hello'
}

// using
...
import myMixin from './mixin.js';

@Component
export default myComponent extends mixins(myMixin) {
    created() {
        console.log(this.mixinValue); // -> 'hello'
    }
}
```

### 创建自定义装饰器(Decorators)

> 可以通过创建自己的装饰器来扩展这个功能库，vue-class-component 支持 createDecorator 辅助函数来创建自定义装饰器.createDecorator 的第一个参数是一个具有如下参数的函数

1.options: vue 组件 options 对象，改变这个对象会影响提供的组件
2.key : 装饰器接受的属性或方法
3.parameterIndex: 当装饰器被使用时装饰器属性的 index 值

```
// decorators.js
import {createDecorator} from 'vue-class-component'

export const noCache = createDecorator((options, key) => {
    // 组件对象通过回调函数并且对属性的修改会影响到组件本身(类似与中间件)
    options.computed[key].cache = false
})

// using
...
import {noCache} from './decorators.js';

class myComponent extends Vue {
    @noCache
    get random() {
        return Math.random();
    }
}
```

### 添加自定义钩子函数

> 当使用类似 vue-router 一类的 vue 插件时，我们会希望 class components 也可以支持。而 Component.registerHooks 允许我们注册这些钩子

```
// class-component-hook.js
...
Component.registerHooks([
'beforeRouteEnter',
'beforeRouteLeave',
'beforeRouteUpdate'
])

// using
...
@Component
class myComponent extends Vue {
    beforeRouteEnter(to, from, next) {
        next();
    }
}
```

注意：必须在组件定义之前注册这些钩子函数

```
import './class-component-hook';

import Vue from 'vue';
import myComponent from './myComponent';
new Vue({
    el: '#app',
    components: {
        myComponent
    }
})
```

### 类属性警告

> vue-class-component 在我们不知道的地方实例化构造函数时收集类属性转换成 vue 实例数据。虽然我们可以像原生 class 用法一样定义实例数据，但是我们应该知道这是怎么工作的。

#### this 属性值

如果我们将一个箭头函数定义为类的属性，并且在其中使用 this，this 并不会如预期的工作.这是因为当 class 属性初始化时，this 只是 vue 实例的代理对象。

```
@Component
class myComponent extends Vue {
    foo = 123

    bar = () => {
        // 这并不会按我们预期的做
        // 因为这里this的值实际上并不是vue的实例对象
        this.foo = 456
    }
}
```

这种情况下我们可以简单的定义一个函数而不是 class 属性，这是因为 vue 会自动绑定实例

```
@Component
class myComponent extends Vue {
    foo = 123

    bar() {
        this.foo = 456
    }
}
```

#### undefined 不会响应式

为了保证在 Babel 和 Typescript 中装饰器的一致性，如果一个属性值初始化为 undefined，vue-class-component 不会创建成一个响应式的属性。我们应该使用 null 作为初始值，或者用 data 钩子去初始化 undefined

```
@Component
class myComponent extends Vue {
    // will not be reactive
    foo = undefined

    // will be reactive
    bar = null

    // will be reactive
    data() {
        return {
            baz: undefined
        }
    }
}
```

## [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

依赖于 vue-class-component，在其基础上提供了更多的修饰器来支持 vue 的语法

1. @Emit
2. @Inject
3. @Provide
4. @Prop
5. @Watch
6. @Model
7. @Component(从 vue-class-component 继承)
