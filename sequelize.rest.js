const express = require('express');
const Sequelize =  require('sequelize');
const { Route } =  require('express');

const pswd = 'secret', hostname = 6544;

const databaseUrl = `postgres://postgres:${pswd}@localhost:${hostname}/postgres`

const db = new Sequelize(databaseUrl);

const Movie = db.define('movie', {
    title: Sequelize.STRING,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.STRING
});

db.sync()
    .then(() => console.log('database synced'))
    .catch(console.error)