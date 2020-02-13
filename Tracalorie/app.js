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
        {
            id:0, name: 'Steak Dinner',calories:1200
        },
        {
            id:1, name: 'Cookie',calories:400
        },
        {
            id:2, name: 'Eggs',calories:300
        }
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
        }
    }

})();


//UI controller

const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
    }

    //add Item submit
    const itemAddSubmit = function(e){
        //get form input from UI Ctrl
        const input = UICtrl.getItemInput();
        if (input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        }
        e.preventDefault();
    }


    return {
        init: function(){
            //fetch items from data structure
            const items = ItemCtrl.getItems();
            
            //populate list with items
            UICtrl.populateItemList(items);

            //load event listeners
            eventListeners();
        }
    }

})(ItemCtrl,UICtrl);

App.init();