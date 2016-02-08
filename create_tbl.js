/**
 * Shows how to use chaining rather than the `serialize` method.
 */
"use strict";

var sqlite3 = require('sqlite3').verbose();
var db;

function createDb() {
    console.log("create db.");
    db = new sqlite3.Database('ScrapingDB.sqlite', createTable);
}


function createTable() {
    console.log("create table.");
    db.run("CREATE TABLE IF NOT EXISTS config (id TEXT, flg INTEGER, type TEXT, url TEXT, target TEXT, pubDateName TEXT, contentName TEXT, period INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS site (id TEXT, title TEXT, link TEXT, updateDate DATE)");
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function runChainExample() {
    createDb();
    closeDb();
}

runChainExample();