class UI{
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts){
        let output = '';
        posts.forEach((post) =>{
            output += `
                <div class = "card mb-3">
                 <div class="card-body">
                      <h4 class="card-title">${post.title}</h4>
                      <p class="card-text">${post.body}</p>
                      <a href="#" class= "edit card-link" data-id="${post.id}"><i class="fas fa-pencil-alt"></i></a>
                      <a href="#" class= "delete card-link" data-id="${post.id}"><i class="fas fa-trash-alt"></i></a>
                 </div>
                </div>
            `
        });
        this.post.innerHTML = output;
    }

    clearFields(){
          this.titleInput.value = '';
          this.bodyInput.value = ''; 
    }

    showAlert(message,styleName){
        this.clearAlert();

        const div = document.createElement('div');
        div.className = styleName;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.postContainer');

        const posts = document.querySelector('#posts');

        container.insertBefore(div,posts);

        setTimeout(() => {
            this.clearAlert();
        },3000);
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    clearIdInput(){
        this.idInput.value = '';
    }

    changeFormState(state){
        if (state === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            //create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            //Get parent
            const cardForm = document.querySelector('.card-form');
            //Get element to insert before

            const formEnd = document.querySelector('.form-end');
            cardForm.insertBefore(button,formEnd);
        }else{
            this.postSubmit.textContent = 'Post';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';
            // remove cancel button
            if (document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }

            //Clear ID from hidden field
            this.clearIdInput();
            this.clearFields();
        }
    }

}


export const ui = new UI();