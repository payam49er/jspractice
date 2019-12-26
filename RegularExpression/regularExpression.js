let re;
re = /hello/i; // i makes the regExpression case insensetive


//Meta character symbols

re = /^h/i; //^ means it must start with h, i means case insensetive
re = /world$/i;  //$ means it must end with d
re = /^hello$/i; //this means that it has to start and end with the word hello
re = /^h.llo/i; //. means that it matches any one character
re = /h*llo/i; //* means that as many characters 
re = /gre?a?y/i //? means the character before it is optional
re = /gre?a?y\?/i // \ means that it escapes the character after it. in this case the ? is part of the string not a reg expression sign

//character sets

// Brackets [] - Character sets
re = /gr[ae]y/i // whatever character in the brackets is acceptable
re = /[GF]ray/;
re = /[^GF]ray/;  // ^ in [] means it matches anything except the characters inside [], similar to Not, 
// if ^ (caret) moves outside of the [], then it means that the string must start with the characters inside []
re = /[A-Z]ray/; //[A-Z] means matches the range of character inside of the brackets. 
re = /[A-Za-z]ray/ // means any upper and lower character within the range inside of the brackets is ok
re = /[0-9]ray/  //match any digit inside of the []


//braces {} - Quantifires

re = /Hel{2}o/i;  // {number} means the number of repeating a character before the {}
re = /Hel{2,4}o/i; // {range} means the number of repeating characters within the range indicated in {}
re = /Hel{2,}o/i; // no upper bound

//Parenthesis () - Grouping

re = /([0-9]x){3}/; // () groups what needs to be considered as regex

//Short hand character classes

re = /\w/; // word character - alphanumeric character or _ 

re = /\w+/; // + means one or more 

re = /\W+/; // upper case w (W) means non word characters

re = /\d/; // d matches any digit

re = /\d+/;  // match any digit

re = /\D/; // matches none digits 
re = /\s/; //matches white space character
re = /\S/; //matches none white space character
re = /Hell\b/i;  // \b means word boundry


//Assertions

re = /x(?=y)/; // match x only if it is followed by y
re = /x(?!y)/; // match x if it is not followed by y





const str = 'xty';


//log result
const result = re.exec(str);
console.log(result);



function reTest(regExpr,str){
    if(re.test(str)){
        console.log(`${str} matches ${regExpr.source}`);
    }else{
        console.log(`${str} Does Not match ${regExpr.source}`)
    }
}

reTest(re,str);