<template>
  <v-app>
    <my-header app></my-header>
    <v-main class="grey lighten-3" style="top: 10%;height: 100%">
      <v-container class="py-0" style="height: 100%">
        <v-row class="my-0 my-0" style="height: 100%">
          <v-col class="pb-0 mb-0" style="height: 100%">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import myHeader from "./components/header";
export default {
  name: "Layout",
  data(){
    return{
      hei: 0
    }
  },
  created() {
    this.hei = document.documentElement.clientHeight;
  },
  components: {
    myHeader,
  },
};
</script>

<style scoped>
</style>
