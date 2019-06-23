<template>
  <div id="app">
    <AppHeader />
    <MainContainer />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MainContainer from './components/MainContainer';

export default {
  name: 'app',
  components: {
    AppHeader,
    MainContainer,
  },
  async mounted() {
    await this.$store.dispatch('init');
  }
}
</script>

<style lang="scss">
  @import './assets/style.scss';
</style>
