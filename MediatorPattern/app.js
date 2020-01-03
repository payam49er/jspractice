const User = function(name){
    this.name = name;
    this.chatroom = null;
}


User.prototype = {
    send: function(message,to){
        this.chatroom.send(message,this,to);
    },
    receive: function(message,from){
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
}


const Chatroom = function(){
    let users = {};

    return {
        register: function(user){
            users[user.name] = user;
            user.chatroom = this;
        },
        send:function(message,from,to){
            if(to){
                //single user message
                to.receive(message,from);
            }else{
                //Mass message
                for(key in users){
                    if(users[key] !== from){
                        users[key].receive(message,from);
                    }
                }
            }
        }
    }
}


const payam = new User('Payam');
const robin = new User('Robin');
const sara = new User('Sara');

const chatroom= new Chatroom();

chatroom.register(payam);
chatroom.register(robin);
chatroom.register(sara);

payam.send('Hello Robin',robin);
sara.send('Hello Payam',payam);
robin.send('Hello All');