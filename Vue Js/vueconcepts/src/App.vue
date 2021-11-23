<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <hr />
    <h2>Directives</h2>
    <h4 v-bind:id="heading">v-bind Directive</h4>
    <h5 v-text="text"></h5>
    <h6 v-html="bold"></h6>
    <h6 v-html="link"></h6>
    <button v-bind:disabled="isDisabled">Bind here</button>
    <h4 v-bind:class="isSoldout ? 'sold-out' : 'data'">Sold/newdata</h4>
    <h4 :class="['data', 'sold-out']">Array binding</h4>
    <h4
      :class="{
        data: !isSoldout,
        'sold-out': isSoldout,
      }"
    >
      Object binding
    </h4>
    <hr />
    <h2>Events</h2>
    <h5>{{ human }}</h5>
    <button v-on:click="changeName($event), decrement(1, $event)">
      Change here
    </button>
    <h6>{{ count }}</h6>
    <button v-on:mouseover="count = count + 1">Increment</button>
    <button v-on:mouseover="decrement(2)">Decrement 2</button>
    <h2>Methods</h2>
    <h5>Addition = {{ add(2, 3, 1) }}</h5>
    <h5>Multiply = {{ multiply(3) }}</h5>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      message: "Vue Js",
      heading: "V-bind directive",
      isDisabled: false,
      text: "V-text directive",
      bold: "<i>V-HTML directive</i>",
      link: `<a href='#' onclick="alert('you have caught here !!')">Click here</a>`,
      isSell: false,
      isSoldout: false,
      human: "oldone",
      count: 0,
      basemultiplier: 2,
    };
  },
  methods: {
    changeName() {
      this.human = "newone";
      // console.log("Event", event);
    },
    decrement(num) {
      //Passing an arguments
      this.count -= num;
    },
    add(a, b, c) {
      return a + b + c;
    },
    multiply(num) {
      return num * this.basemultiplier;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.data {
  color: red;
}

.sold-out {
  color: burlywood;
}
</style>
