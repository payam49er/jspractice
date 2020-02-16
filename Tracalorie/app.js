//storage controller 

//item controller

const ItemCtrl = (function(){
    //Item Constructor
    const Item = function (id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data structure / State

    //state
    const data = {
        items:[
        // {
        //     id:0, name: 'Steak Dinner',calories:1200
        // },
        // {
        //     id:1, name: 'Cookie',calories:400
        // },
        // {
        //     id:2, name: 'Eggs',calories:300
        // }
    ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function(){
            return data.items;
        },
        addItem:function(name,calories){
            //Create the id
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id+1;
            }else{
                ID = 0;
            }
            //calories to number
            calories = parseInt(calories);
            //create new item
            newItem = new Item(ID,name,calories);
            data.items.push(newItem);
            return newItem;
        },
        logData: function(){
            return data;
        },
        getTotalCalories:function(){

            let totalCalories = 0;
            data.items.forEach(function(item){
                totalCalories += item.calories;
            });

            data.totalCalories = totalCalories;
            return data.totalCalories;
        },
        getItemById:function(id){
            let found = null;
            //loop through items
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;

        }
    }

})();


//UI controller

const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn'
    }


    return{
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                html += ` <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="fas fa-pencil-alt"></i>
                </a>

            </li>`;
            });
            //insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            //Create li element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            //add html
            li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="fas fa-pencil-alt"></i>
            </a>`;

            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'block';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState:function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        }
    }
})();


//App controller

const App = (function(ItemCtrl,UICtrl){

    //load event listeners
    const eventListeners = function(){
        const UISelectors = UICtrl.getSelectors();
        //Add Item event
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

        //edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click',itemUpdateSubmit);
    }

    //add Item submit
    const itemAddSubmit = function(e){
        //get form input from UI Ctrl
        const input = UICtrl.getItemInput();
        if (input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // add item to the UI list
            UICtrl.showList();
            UICtrl.addListItem(newItem);
            
            //Update total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            UICtrl.showTotalCalories(totalCalories);
           
            //clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    const itemUpdateSubmit = function (e) {
        if(e.target.classList.contains('edit-item')){
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;

            console.log(listId);
            //break into an array
            const listIdArray = listId.split('-');

            //get the actual id
            const id = parseInt(listIdArray[1]);
            
            //Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            console.log(itemToEdit);

        }
        e.preventDefault();
      }


    return {
        init: function(){
            //clear edit state / set initial state
            UICtrl.clearEditState();


            //fetch items from data structure
            const items = ItemCtrl.getItems();

            //check if any items 
            if(items.length === 0){
                UICtrl.hideList();
            }else{
            //populate list with items
              
                UICtrl.populateItemList(items);
            }
            
         

            //load event listeners
            eventListeners();
        }
        
       
    }

})(ItemCtrl,UICtrl);

App.init();