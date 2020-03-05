//storage controller 
const storageCtrl = (function(){
    
    
     //public methods
    return {
        storeItem: function(item){
            let items = [];
            //check to see if there is any item in the local storage
            if(localStorage.getItem('items') === null){
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);

                localStorage.setItem('items',JSON.stringify(items));
            }
        },
        getItemsFromStorage:function () {
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
          },
        updateItemStorage:function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item,index){
                if(updatedItem.id === item.id){
                    items.splice(index,1,updatedItem);
                }
            });
            localStorage.setItem('items',JSON.stringify(items));
        },
        deleteItemFromStorage:function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item,index){
                if(id === item.id){
                    items.splice(index,1);
                }
            });
            localStorage.setItem('items',JSON.stringify(items));
        },
        clearFromStorage:function(){
            if(localStorage.getItem('items') !== null){
                localStorage.removeItem('items');
            }
        }
    }
})();
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
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem:function(){
            return data.currentItem;
        },
        updatedItem: function(name,calories){
            //turn calories to number
            calories = parseInt(calories);

            let found = null;
            data.items.forEach(function(item){
                if (item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
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
        backBtn: '.back-btn',
        listItems: '#item-list li'
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
        },
        showEditState:function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        addItemToForm:function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
        },
        updateListItem : function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn node list into array
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemId = listItem.getAttribute('id');
                if(itemId === `item-${item.id}`){
                    document.querySelector(`#${itemId}`).innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="fas fa-pencil-alt"></i>
                    </a>`; ;
                }
            });
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

        //disable submit on enter
        document.addEventListener('keypress',function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });

        //edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

        //update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
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

    const itemEditClick = function (e) {
        if(e.target.classList.contains('fa-pencil-alt')){
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;

            //break into an array
            const listIdArray = listId.split('-');

            //get the actual id
            const id = parseInt(listIdArray[1]);
            
            //Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            //set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm();

            UICtrl.showEditState();
        }
        e.preventDefault();
      }

      //item update submit

      const itemUpdateSubmit = function(e){
          // get item input
          const input = UICtrl.getItemInput();

          //Update item
          const updatedItem = ItemCtrl.updatedItem(input.name,input.calories);

          //Update UI
          UICtrl.updateListItem(updatedItem);

          const totalCalories = ItemCtrl.getTotalCalories();
          UICtrl.showTotalCalories(totalCalories);
          UICtrl.clearEditState();

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