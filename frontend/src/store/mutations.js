export default {
    
    init(state, {userData, tasks, tokens}) {
        state.userData = userData;
        state.tasks = tasks;
        state.tokens = tokens;
        state.userData.balance = tokens.length;
    }
}