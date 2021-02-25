<template>
  <div class="input-prepend input-append">
    <span class="add-on win_text">{{ name }} won</span>
    <strong id="o_win" class="win_times add-on">{{ score }}</strong>
    <span class="add-on">time(s)</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    score: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.input-prepend {
  margin-bottom: 10px;
  span.pre_text {
    width: 55px;
  }
  .span1 {
    width: 93px;
  }
}

.input-append {
  .win_times {
    background: #fff;
    width: 101px;
  }
  .win_text {
    width: 52px;
  }
}
</style>