<template>
    <div class="main-container">

        <AvailableTaskList />
    </div>
</template>

<script>
import AvailableTaskList from './AvailableTaskList'

export default {

    name: 'MainContainer',
    data() {
        return {
            activeTab: 'available',
        }
    },
    components: {
        AvailableTaskList,
    },
    computed: {
    
    }
}
</script>