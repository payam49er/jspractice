//init
const github = new Github();
const ui = new UI();

// search input
const searchUser = document.getElementById('searchUser');

// search input event listener
searchUser.addEventListener('keyup',(e) =>{
    const userText = e.target.value;

    if(userText !== ''){
        //Make http call
        github.getUser(userText)
            .then(data => {
                if(data.profile.message === 'Not Found'){
                    //show alert
                }else{
                    //show profile
                    ui.showProfile(data.profile);
                }
            })
    }else {
        //clear profile
    }
});