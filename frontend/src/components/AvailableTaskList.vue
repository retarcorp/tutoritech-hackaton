<template>
    <div class="available-task-list">
        <div class='task-list'>
            <div class='task' v-for="task in taskList">
                <div class="description">
                    <h3>{{task.title}}</h3>
                    <p> To Do: {{ task.text }}</p>
                </div>
                <div class='tools'>
                    <button class="common-btn" @click="startWork(task.id)">Start work</button>
                </div>
            </div>
            <!-- <div class='task'>
                <div class="description">
                    <h3>Essay about Vue.js multicomponent development</h3>
                    <p> To Do: write an essay about how to develop a multicomponent frontend application via vue.js. You need to write at least 700 words. Send Google Doc link as a result of your task.</p>
                </div>
                <div class='tools'>
                    <button class="common-btn" @click="startWork(1)">Start work</button>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'AvailableTaskList',
    data() {
        return {}
    },
    computed: {
        taskList() {
            return this.$store.getters.availableTaskList;
        }
    },
    methods: {
        startWork(id) {
            const text = prompt('Put here link to your solution for this task: ');
            this.$store.dispatch('startWork', {id, text})
                .then(() => alert('Your solution was sent!'))
                .catch(err => alert(err));
        }
    }
}
</script>