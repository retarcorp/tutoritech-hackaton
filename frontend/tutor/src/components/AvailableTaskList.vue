<template>
    <div class="available-task-list">
        <div class='task-list'>
            <div class='task' v-for="task in $store.getters.tasks">
                <div class="description">
                    <h3> {{task.task.title}}</h3>
                    <p> Student: {{ task.sid }}.</p>
                    <div> 
                        <p>Student's result: </p>
                        <div class='result'>
                            {{ task.submission }}
                        </div>
                    </div>
                </div>
                <div class='tools'>
                    <button class="common-btn" @click="markWork(task)">Put mark</button>
                </div>
            </div>
        
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
        markWork(task) {
            const mark = Number(prompt('Enter student your mark for this solution of the task (0 - 100): '));
            if(!isNaN(mark)){
                this.$store.dispatch('markWork', {task, mark})
                    .catch(err => alert(err));
            }
        }
    }
}
</script>