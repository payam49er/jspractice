async function sayHello() {
    const promise = new Promise((resolve,reject)=>{
        setTimeout(()=>resolve('Hello'),3000);
    });

    const res = await promise;
    return res;
}

async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
}

getUsers().then(x => x.forEach(x =>{
    console.log(x.name);
}));
