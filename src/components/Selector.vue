<template>
  <div>
    <div class="panel-options">
      <div class="heading">
        <h4 v-html="typeSelector"></h4>
      </div>
      <ul>
        <li
          v-for="(element, index) in elements"
          :key="index"
          @click="itemCliked(element)"
          :class="{ isActive: element == value }"
          v-html="element"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
    };
  },
  props: {
    elements: {
      type: [Object, Array],
    },
    typeSelector: {
      type: String,
      default: "Undefined",
    },
    value: {
      type: String,
    }
  },
  methods: {
    itemCliked(element) {
      this.$emit("input", element);
    },
  },
};
</script>

<style lang="scss">
.isActive {
  background-color: #c7a733;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bold;
}

.panel-options {
  .heading {
    padding: 10px;
    h4 {
        margin: 0;
        padding: 0;
        color: #c7a733;
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
    li {
      padding: 15px 10px;
      border-bottom: dotted 1px #2b2b2b;
      color: #ffffff;
    }
  }
}
</style>