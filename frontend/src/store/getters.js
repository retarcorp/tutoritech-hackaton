export default {
    balance: state => state.userData.balance || 0,

    availableTasksCount: (state, getters) => getters.availableTaskList.length,

    availableTaskList: state => state.tasks.filter(task => task.status === '0'),

    onCheckTasksCount: (state, getters) => getters.onCheckTaskList.length,

    onCheckTaskList: state => state.tasks.filter(task => task.status === '1'),

    checkedTasksCount: (state, getters) => getters.checkedTasksList.length,

    checkedTasksList: state => state.tasks.filter(task => task.status === '2'),

    certificateBlockVisible: (state, getters) => (getters.availableTasksCount + getters.onCheckTasksCount) === 0,

    certificate: state => state.userData.cert_link === 'null' ? null : state.userData.cert_link,

    userId: () => 3,

    user: state => state.userData,

}