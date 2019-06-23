<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/img/logo.png" />
        </div>

        <div class="balance">
            <p>User: {{$store.getters.user.username}} | </p>
            <p> Balance: {{ $store.getters.balance }} checks. </p>
            <p> <button class="common-btn" @click="addCheck">Add checks</button></p>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return {

        }
    },

    methods: {
        addCheck() {
            this.$parent.$refs.main.loaderVisible = true;
            this.$store.dispatch('addCheck').then(() => this.$parent.$refs.main.loaderVisible = false);
        }
    }
}
</script>
