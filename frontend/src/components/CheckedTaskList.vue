<template>
    <div class="checked-task-list">
        <div class='task-list'>
            <div class='task' v-for="task in taskList">
                <div class="description">
                    <h3>{{task.title}}</h3>
                    <p> To Do: {{ task.text }}</p>
                </div>
                <div class='tools'>
                    <div class='tools'>
                        <p class="result"><b>{{ task.score }}%</b><span>Result</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="certificate" v-if="$store.getters.certificateBlockVisible">
            <button class="common-btn" v-if="!$store.getters.certificate" @click="releaseCertificate">Release certificate</button>
            <a :href="$store.getters.certificate" target="_blank" v-else>Certificate permanent link</a>
        </div>

    </div>
</template>

<script>
export default {
    name: 'CheckedTaskList',
    data() {
        return {}
    },
    computed: {
        taskList() {
            return this.$store.getters.checkedTasksList;
        }
    },
    methods: {
        releaseCertificate(){
            this.$store.dispatch('releaseCertificate');
        }
    }
}
</script>