<template>
  <li :class="['btn', 'span1', selected && `disable btn-${selected.color}`].join(' ')" @click="$emit('onClick')">{{ selected ? selected.label : '+' }}</li>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '+'
    },
    selected: {
      type: Object,
      default: null
    }
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.disable {
  text-transform: uppercase;
  // font-size: 30px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

li {
  float: left;
  padding: 0;
  list-style: none;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  color: #ccc;

  &.disable {
    color: #fff;
  }

  &::-moz-selection {
    background: none;
    color: #000;
  }
  &::-webkit-selection {
    background: none;
    color: #000;
  }
}
</style>