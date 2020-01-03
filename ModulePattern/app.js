//Basic structure of a module pattern

// (function(){
//     //Declare private variables and functions

//     return{
//         //Declare public variables and functions
//     }
// })();

const UICtrl = (function() {
	let text = 'Hello World';

	const changeText = function() {
		const element = document.querySelector('h1');
		element.textContent = text;
	};

	return {
		callChangeText: function() {
			changeText();
			console.log(text);
		}
	};
})();

UICtrl.callChangeText();

//Revealing Module Pattern

const ItemCtrl = (function() {
	let data = [];

	function add(item) {
		data.push(item);
		console.log('Item added...');
    }

    function get(id){
        return data.find(item => {
            return item.id === id;
        });
    }

    return {
        add:add,
        get:get
    }

})();

ItemCtrl.add({id:1,name:'John'});
console.log(ItemCtrl.get(1));

