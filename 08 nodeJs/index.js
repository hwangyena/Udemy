//jshint esversion:6

const superheroes = require('superheroes');
const supervillains = require('supervillains');


let mySuperhero = superheroes.random();
let mySupervillains = supervillains.random();

console.log("Superhero : "+mySuperhero);
console.log("Supervillain : "+mySupervillains);
