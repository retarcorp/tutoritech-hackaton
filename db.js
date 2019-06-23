// import * as fluence from "fluence";
const fluence = require("fluence")

let privateKey = "569ae4fed4b0485848d3cf9bbe3723f5783aadd0d5f6fd83e18b45ac22496859"; // Authorization private key
let contract = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";                         // Fluence contract address
let appId = 257;                                                                      // Deployed database id
let ethereumUrl = "http://geth.fluence.one:8545";                                    // Ethereum light node URL
                                  // Ethereum light node URL

fluence.connect(contract, appId, ethereumUrl, privateKey).then((s) => {
    console.log("Session created");
    window.session = s;

    create_tasks_db(s)
    drop_table(s, 'tasks')

    create_student_db(s)
    drop_table(s, 'student')

    create_sent_tasks_db(s)
    drop_table(s, 'sent_tasks')

    create_teacher_db(s)
    // session.request("INSERT INTO teachers VALUES(1, 'Bob')");
    // select_all(session, 'teachers')

    drop_table(s, 'teacher')

    create_check_tasks_db(s)
    drop_table(s, 'check_tasks')

    create_transactions_db(s)
    drop_table(s, 'transactions')
    

});

function create_tasks_db (session) {
    session.request("CREATE TABLE tasks(id int, title varchar(128), text varchar(300))").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function create_student_db (session) {
    session.request("CREATE TABLE student(id int, username varchar(128), cert_link varchar(128))").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function create_sent_tasks_db (session) {
    session.request("CREATE TABLE sent_tasks(id int, sid int, tid int, submission varchar(300), status int, sent_at varchar(128), checked_at varchar(128))").result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function create_teacher_db (session) {
    session.request("CREATE TABLE teacher(id int, username varchar(128))");
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

function drop_table (session, name) {
    session.request(`DROP TABLE ${name}`).result().then((r) => {
        console.log("Result: " + r.asString());
    });
}

function select_all (session, table) {
    session.request(`SELECT * FROM ${table}`).result().then((r) => {
        console.log("Result: " + r.asString());
    });
}