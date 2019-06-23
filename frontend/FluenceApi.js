import * as fluence from 'fluence';

const privateKey = "569ae4fed4b0485848d3cf9bbe3723f5783aadd0d5f6fd83e18b45ac22496859"; // Authorization private key
const contract = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";                         // Fluence contract address
const appId = 257;                                                                      // Deployed database id
const ethereumUrl = "http://geth.fluence.one:8545";                                    // Ethereum light node URL

export default {

    isConnected: false,
    session: null,
    async connect() {
        return await fluence.connect(contract, appId, ethereumUrl, privateKey).then((s) => {
            this.session = s;
        });
    },
    async execute(s) {
        if(!this.isConnected) {
            await this.connect();
        }
        return (lines => {
            if(lines[0].toLowerCase().startsWith('[error]')) {
                throw new Error('Error executing query ['+s+'] '+lines[0]);
            }
            const names = lines.shift().split(',').map(x => x.trim());
            if(!lines.length) {
                return [];
            }
            return lines.map(line => line.split(', ').map(x => x.trim()).reduce((val, curr, i) => ({...val,[names[i]]:curr}), {}));
            
        })((await (await this.session.request(s)).result()).asString().trim().split('\n'));
    },

    async getTasks() {
        return await this.execute(`SELECT * FROM tasks`);
    },

    async getUserData(id) {
        return await this.execute(`SELECT * FROM students WHERE id=${id}`);
    },

    async getUserTokens(id) {
        return await this.execute(`SELECT * FROM check_tasks WHERE sid=${id} AND status=0`);
    },

    async addToken(tid) {
        const token = new Array(50).fill(0).map(x => String.fromCharCode(Math.ceil(Math.random() * 25 + 65))).join('').toLowerCase();
        return await this.execute(`INSERT INTO check_tasks VALUES ('${token}', ${tid}, 0)`); // todo implement
    },
    
    async getStudentTasks(id) {
        const tasks = await this.execute(`SELECT * FROM tasks`);
        const sent_tasks = await this.execute(`SELECT * FROM sent_tasks WHERE sid=${id}`);

        const result = tasks.map(task => {
            const st = (sent_tasks.find(st => st.tid === task.id) || {status: '0'})
            return {
                ...task,
                status: st.status,
                score: st.score,
            }
        })
        return result;
        
    },

    async getTasksForCheck() {
        const tasks = await this.getTasks();
        const connections = await this.execute(`SELECT * FROM sent_tasks WHERE status=1`);

        const result = connections.map(connection => {
            return {
                ...connection,
                task: tasks.find(t => t.id == connection.tid)
            }
        })
        return result;
    },

    async sendTaskForCheck(sid, tid, text) {
        // todo decrease one token
        const tokens = await this.getUserTokens(sid);
        if(!tokens.length) {
            throw new Error('Not enough tokens to do the action!');
        }
        const token = tokens[0];
        await this.execute(`UPDATE check_tasks SET status=1 WHERE id='${token.id}'`);
        const SENT = 1;
        return await this.execute(`INSERT INTO sent_tasks (sid, tid, submission, status, sent_at) VALUES (${sid}, ${tid}, '${text}', ${SENT}, '${Date.now()}')`);
    },

    async releaseCertificate(sid) {
        const data = await this.execute(`SELECT * FROM sent_tasks WHERE sid=${sid}`);
        const mark = data.reduce((prev, curr) => prev + +curr.score/data.length, 0);
        // todo count avg by student
        // todo send to arweave new file
        return mark;
    },

    async sendMark(cid, mark) {
        return await this.execute(`UPDATE sent_tasks SET status=2, score=${mark} WHERE sid=${cid.s} AND tid = ${cid.t}`)
    },

    async saveCertificate(sid, url){
        return await this.execute(`UPDATE students SET cert_link='${url}' WHERE id=${sid}`);
    }
}