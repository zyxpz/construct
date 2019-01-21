<template>
  <div id="app">
    <Header v-bind:num="num"></Header>
    <Main v-bind:num="num" @addNum="addNum" @reduceNum="reduceNum"></Main>
  </div>
</template>;
<script>
import Header from './component/header';
import Main from './component/main';

export default {
  data() {
    return {
      num: 20,
    };
  },
  methods: {
    addNum(num) {
      this.num = num;
    },
    reduceNum(num) {
      this.num = num;
    },
  },
  components: {
    Header,
    Main,
  },
};
</script>;

<style lang="less">
#app {
  header {
    color: red;
  }
  .main {
    color: blue;
  }
}
</style>
