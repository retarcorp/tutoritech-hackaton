<template>
    <div class="main-container">
        <div class="tabs">
            <div class="tab" :class="{active: activeTab === 'available'}" @click="activeTab = 'available'"> <span>Available</span> <i>{{ $store.getters.availableTasksCount}}</i></div>
            <div class="tab" :class="{active: activeTab === 'on-check'}" @click="activeTab = 'on-check'"> <span>On check</span> <i>{{ $store.getters.onCheckTasksCount}}</i></div>
            <div class="tab" :class="{active: activeTab === 'checked'}" @click="activeTab = 'checked'"> <span>Checked</span> <i>{{ $store.getters.checkedTasksCount}}</i></div>
        </div>

        <div class="component-container">
            <component :is="currentComponent" />
        </div>
    </div>
</template>

<script>
import AvailableTaskList from './AvailableTaskList'
import OnCheckTaskList from './OnCheckTaskList';
import CheckedTaskList from './CheckedTaskList';

export default {

    name: 'MainContainer',
    data() {
        return {
            activeTab: 'available',
        }
    },
    components: {
        AvailableTaskList,
        OnCheckTaskList,
        CheckedTaskList,
    },
    computed: {
        currentComponent() {
            return {
                'available': 'AvailableTaskList',
                'on-check': 'OnCheckTaskList',
                'checked': 'CheckedTaskList',
            }[this.activeTab];
        }
    }
}
</script>