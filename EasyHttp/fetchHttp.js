document.getElementById('button1').addEventListener('click',getText);

function getText(){
    fetch('test.txt').then(function(res){
        return res.text();
    }).then(data => {
        console.log(data);
        document.getElementById('output').innerHTML = data;
    }).catch( err => console.log(err));  
    
}


document.getElementById('button2').addEventListener('click',getLocalJson);

function getLocalJson(){
    fetch('post.json').then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        data.forEach(element => {
            document.getElementById('output').innerHTML += `<h3>${element.title}</h3>`;    
        });
        
    }).catch(err => console.log(err));
}


document.getElementById('button3').addEventListener('click',getExternal);
function getExternal(){
    fetch('https://api.github.com/users').then(res => {
        return res.json();
    }).then(data => {
        data.forEach(user => {
            document.getElementById('output').innerHTML += `<h5>${user.login}</h5><span><a href=${user.html_url}>${user.html_url}</a></span>`;
        })
    }).catch(err => console.log(err));
}