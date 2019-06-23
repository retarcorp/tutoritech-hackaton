import FluenceApi from "../../../FluenceApi";

export default {

    async init(ctx) {
        const tasks = await FluenceApi.getTasksForCheck();
        
        ctx.commit('init', {tasks})
    },

    addCheck(){
        return 0;
    },

    async markWork(ctx, {task, mark}) {
        await FluenceApi.sendMark({t: task.tid, s: task.sid}, mark);
        return await ctx.dispatch('init');
    },
}