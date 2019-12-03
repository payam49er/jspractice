document.getElementById("button1").addEventListener('click',getText);

function getText() {
    fetch('test.txt')
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            document.getElementById('output').innerHTML = data;
        })
        .then(function (err) {
            console.log(err);
        })
}


function getJson() {
    fetch('posts.json')
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data);
            let output = '';
            data.forEach(function(post){
                output += `<li>${post.title}</li>`;
            });
            document.getElementById('output').innerHTML = output;
        })
        .catch(function (err) {
            console.log(err);
        })
}