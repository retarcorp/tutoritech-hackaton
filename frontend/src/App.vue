<template>
  <div id="app">
    <AppHeader />
    <MainContainer ref="main"/>
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
    this.$refs.main.loaderVisible = false;
  }
}
</script>

<style lang="scss">
  @import './assets/style.scss';
</style>
