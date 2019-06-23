// import * as fluence from "fluence";
const fluence = require("fluence")

let privateKey = "569ae4fed4b0485848d3cf9bbe3723f5783aadd0d5f6fd83e18b45ac22496859"; // Authorization private key
let contract = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";                         // Fluence contract address
let appId = 257;                                                                      // Deployed database id
let ethereumUrl = "http://geth.fluence.one:8545";                                    // Ethereum light node URL


fluence.connect(contract, appId, ethereumUrl, privateKey).then((s) => {
    console.log("Session created");
    // window.session = s;

    // drop_table(s, 'tasks')
    // create_tasks_db(s)
    // add_task(s, 'Chicken Soup', 'Where do u get chicken soup from?')
    // drop_table(s, 'tasks')

    // drop_table(s, 'students')
    // create_student_db(s)
    // add_student(s, 'Johnny', 'null')
    // drop_table(s, 'student')

    // drop_table(s, 'sent_tasks')
    // create_sent_tasks_db(s)
    // drop_table(s, 'sent_tasks')

    // drop_table(s, 'teachers')
    // create_teacher_db(s)
    // add_teacher(s, 'John')
    // s.request("INSERT INTO t
    // select_all(s, 'teachers')

    // drop_table(s, 'teacher')

    // drop_table(s, 'check_tasks')
    // create_check_tasks_db(s)
    // drop_table(s, 'check_tasks')

    // drop_table(s, 'transactions')
    // create_transactions_db(s)
    // drop_table(s, 'transactions')
    

});


function create_tasks_db (session) {
    session.request("CREATE TABLE tasks(id int, title varchar(128), text varchar(300))").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function create_student_db (session) {
    session.request("CREATE TABLE students(id int, username varchar(128), cert_link varchar(128))").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function create_sent_tasks_db (session) {
    session.request("CREATE TABLE sent_tasks(id int, sid int, tid int, submission varchar(300), status int, sent_at varchar(128), checked_at varchar(128))").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function create_teacher_db (session) {
    session.request("CREATE TABLE teachers(id int, username varchar(128))");
}

function create_check_tasks_db (session) {
    session.request("CREATE TABLE check_tasks(id int, sid int, status int)").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function create_transactions_db (session) {
    session.request("CREATE TABLE transactions(id int, type int, subject_id int, object_id int, tr_date varchar(128))").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}


// DROP
function drop_table (session, name) {
    session.request(`DROP TABLE ${name}`).result().then((r) => {
        console.log("Result: " + r.asString());
    });
}


// SELECT * FROM TABLE

function select_all (session, table) {
    session.request(`SELECT * FROM ${table}`).result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

// INSERTING

function add_teacher (session, username) {
    session.request(`SELECT id FROM teachers`).result().then((r) => {
        let response = r.asString()
        let highest = response.split("\n").slice(-1)[0]
        
        let new_id = 0

        if (highest) {
            new_id = parseInt(highest) + 1
        }else {
            new_id = 0
        }

        session.request(`INSERT INTO teachers (id, username) VALUES (${new_id}, '${username}');`).result().then((r) => {
            console.log(r.asString())
        });
    });
}

function add_student (session, username, cert_link) {
    session.request(`SELECT id FROM students`).result().then((r) => {
        let response = r.asString()
        let highest = response.split("\n").slice(-1)[0]
        
        let new_id = 0

        if (highest) {
            new_id = parseInt(highest) + 1
        }else {
            new_id = 0
        }

        session.request(`INSERT INTO students VALUES (${new_id}, '${username}', '${cert_link}');`).result().then((r) => {
            console.log(r.asString())
        });
    });
}


function add_task(session, title, text) {
    session.request(`SELECT id FROM tasks`).result().then((r) => {
        let response = r.asString()
        let highest = response.split("\n").slice(-1)[0]
        
        let new_id = 0

        if (highest) {
            new_id = parseInt(highest) + 1
        }else {
            new_id = 0
        }

        session.request(`INSERT INTO tasks VALUES (${new_id}, '${title}', '${text}');`).result().then((r) => {
            console.log(r.asString())
        });
    });
}

function submit_task (session, student_id, task_id, submission, status, sent_at, checked_at) {
    session.request(`SELECT id FROM sent_tasks`).result().then((r) => {
        let response = r.asString()
        let highest = response.split("\n").slice(-1)[0]
        
        let new_id = 0

        if (highest) {
            new_id = parseInt(highest) + 1
        }else {
            new_id = 0
        }

        session.request(`INSERT INTO sent_tasks VALUES (${new_id}, ${student_id}, ${task_id}, '${submission}', ${status}, '${sent_at}', '${checked_at}');`).result().then((r) => {
            console.log(r.asString())
        });
    });
}