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
  }
}
</script>

<style lang="scss">
  @import './assets/style.scss';
</style>
