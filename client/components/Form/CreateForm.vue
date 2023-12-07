<script setup lang="ts">
import VueQueryBuilder from "vue-query-builder";
import VueSlideBar from "vue-slide-bar";

</script>
<template>
    <div id="app">
      <vue-query-builder :rules="rules" v-model="query"></vue-query-builder>
      <h1>Generated output:</h1>
      <pre>{{ JSON.stringify(this.query, null, 2) }}</pre>
    </div>
</template>
  
<script>
  
  export default {
    name: "App",
    components: { VueQueryBuilder },
  
    data() {
      return {
        rules: [
          {
            type: "custom-component",
            id: "percentage",
            label: "Cost of Living",
            operators: ["="],
            component: VueSlideBar,
            default: 50
          },
          {
            type: "custom-component",
            id: "percentage",
            label: "Utility Prices",
            operators: ["="],
            component: VueSlideBar,
            default: 50
          }
        ],
  
        query: {
          logicalOperator: "any",
          children: [
            {
              type: "query-builder-rule",
              query: {
                rule: "percentage",
                operator: "=",
                operand: "Percentage",
                value: 55
              }
            }
          ]
        }
      };
    }
  };
</script>
<style>
.vqb-custom-component-wrap {
flex-grow: 1;
padding-right: 15px;
}
</style>