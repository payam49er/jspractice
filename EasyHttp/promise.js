const posts = [{
    "title":"Post One",
    "body":"this is post one"
},{
    "title":"Post Two",
    "body":"This is post two"
}];


function getPosts() {
    setTimeout(function () {
        let output = '';
        posts.forEach(function (post) {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    },1000);
}



function createPost(post) {
    return new Promise(function (resolve,reject) {
        //resolve when we are done with what we want to do
        setTimeout(function(){
            posts.push(post);

            //Just some code to simulate an error
            const error = true;
            if(!error){
                resolve();
            }else{
                reject('Error:Something went wrong');
            }

        },2000);
    })
}

createPost({
    "title":"Post three",
    "body":"This is post three"
}).then(getPosts).catch(function(err){
    console.log(err);
});


