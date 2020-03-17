import { http } from './http';
import { ui } from './ui';

//get posts on DOM load

document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
	http.get('http://localhost:3000/posts')
		.then((data) => ui.showPosts(data))
		.catch((err) => console.log(err));
}

// Listen for add post

document.querySelector('.post-submit').addEventListener('click', addPost);

function addPost() {
	const title = document.querySelector('#title').value;
	const body = document.querySelector('#body').value;
	const id = document.querySelector('#id').value;
  

	if (id === '') {
		if (title === '' || body === '') {
			ui.showAlert('Please fill in all fields', 'alert alert-danger');
		} else {
      const data = {
        title,
        body
      };
		
			http.post('http://localhost:3000/posts', data)
				.then((data) => {
					ui.showAlert('Post added', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch((err) => console.log(err));
		}
	} else {
    const data = {
      title,
      body,
      id
    };
		http.put(`http://localhost:3000/posts/${id}`, data)
			.then((data) => {
				ui.showAlert('Post updated', 'alert alert-success');
				ui.changeFormState('add');
				getPosts();
			})
			.catch((err) => console.log(err));
	}
}

//listen for delete

document.querySelector('#posts').addEventListener('click', deletePost);

function deletePost(e) {
	if (e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id;
		if (confirm('Are you sure?')) {
			http.delete(`http://localhost:3000/posts/${id}`)
				.then((data) => {
					ui.showAlert(`Post ${id} is removed`, 'alert alert-success');
					getPosts();
				})
				.catch((err) => console.log(err));
		}
	}

	e.preventDefault();
}

//listen for edit state

document.querySelector('#posts').addEventListener('click', enableEdit);

function enableEdit(e) {
	if (e.target.parentElement.classList.contains('edit')) {
		const id = e.target.parentElement.dataset.id;
		const body = e.target.parentElement.previousElementSibling.textContent;
		const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

		const data = {
			id,
			title,
			body
		};

		//fill the form with the current post
		ui.fillForm(data);
	}

	e.preventDefault();
}

//listen for cancel state

document.querySelector('.card-form').addEventListener('click', cancelEdit);

function cancelEdit(e) {
	if (e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}

	e.preventDefault();
}

// const getData = async (url) => {
// 	const response = await fetch(url);
// 	const result = await response.json();
// 	console.log(result);
// };

// getData('https://jsonplaceholder.typicode.com/posts');
