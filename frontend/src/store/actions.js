import FluenceApi from "../../FluenceApi";
import ArweaveApi from "../../ArweaveApi";
import Vue from 'vue';

export default {

    async addCheck(ctx){
        await FluenceApi.addToken(ctx.getters.userId);
        return ctx.dispatch('init');  
    },

    async startWork(ctx, {id, text}) {
        if(ctx.getters.balance < 1) {
            throw new Error('You don\'t have enough tokens to represent this action!');
        }
        await FluenceApi.sendTaskForCheck(ctx.getters.userId, id, text);
        await ctx.dispatch('init');
    },

    async init(ctx) {
        const data = await FluenceApi.getUserData(ctx.getters.userId);
        const userData = data[0];
        const tasks = await FluenceApi.getStudentTasks(ctx.getters.userId);
        const tokens = await FluenceApi.getUserTokens(ctx.getters.userId);

        ctx.commit('init', {userData, tasks, tokens});
    },

    async releaseCertificate(ctx) {
        const mark = await FluenceApi.releaseCertificate(ctx.getters.userId);
        const certificate = 
        `
        <center>
            <div style="width: 900px; border: 30px solid blue; display: flex; flex-direction: column; align-items: center; font-family: Open Sans, Arial, sans-serif; padding: 30px; box-sizing: border-box">
                <h2>Certificate of Completion</h2>
                <p>This certificate claims that student ${ctx.getters.user.username} has successfully finished course "The essenses of web-development". All the tasks by the course were passed.</p>
                <p style="margin-bottom: 0">Final result is</p>
                <h1 style="margin: 0; color: green">${Math.round(mark)}%</h1>
            </div>
        </center>
        
        `.replace(/\n/gm, '');
        const url = await ArweaveApi.saveItem(certificate);
        await FluenceApi.saveCertificate(ctx.getters.userId, url);
        Vue.set(ctx.state.userData, 'cert_link', url);
        return url;
    }
}