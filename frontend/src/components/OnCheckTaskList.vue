<template>
    <div class="on-check-task-list">
        <div class='task-list'>
            <div class='task' v-for="task in taskList">
                <div class="description">
                    <h3>{{task.title}}</h3>
                    <p> To Do: {{ task.text }}</p>
                </div>
                <div class='tools'>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OnCheckTaskList',
    data() {
        return {}
    },
    computed: {
        taskList() {
            return this.$store.getters.onCheckTaskList;
        }
    },
    methods: {

    }
}
</script>