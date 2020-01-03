// const sym1 = new Symbol();
// const sym2 = new Symbol('sym2');


// //Create unique object keys
// const key1 = Symbol();
// const key2 = Symbol('sym2');

// const myObj = {};
// myObj[key1] = 'Prop1';
// myObj[key2] = 'Prop2';
// myObj.key3 = 'Prop3';
// myObj.key4 = 'Prop4';


// console.log(myObj);

// //Symbols are not enumerable in for ... in

// for (let i in myObj){
//     console.log(`${i}:${myObj[i]}`);
// }


// //symbols are ignored by JSON.stringify

// console.log(JSON.stringify({key:'prop'}));
// console.log(JSON.stringify({[Symbol('sym1')]:'prop1'}));


// const person = {
//     name : "Payam",
//     age : "38",
//     city : "New York",
//     gender : "M",
//     sayHello: function(){
//         console.log("Hello");
//     }
// }

// const {name,age,city,sayHello} = person;
// console.log(name,age,city);
// sayHello();


//Maps are key value pairs

const map1 = new Map();
const key1 = 'Some String',
      key2 = {},
      key3 = function(){};

//set map values by Key
map1.set(key1,'Value of key1');
map1.set(key2,'Value of key2');
map1.set(key3,'Value of key3');

console.log(map1.get(key1));