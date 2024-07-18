/// Q-10 How do you access properties of an object?
/// Test Data :
// const obj = { key1: 'value1', key2: 'value2' };
// console.log(obj.key1, obj.key2);
// console.log(obj['key1'], obj['key2']);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Q-9 Write a JavaScript function that merges two arrays and removes all duplicate elements.
//Test data :
// var array1 = [1, 2, 3];
// var array2 = [2, 30, 1];
// var array3 = [...array1, ...array2];
// var unique=[...new Set(array3)];
// console.log(unique); 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Q-8 What is the difference between null and undefined in JavaScript? 
//exp-var arr=[1,2,null,3,undefined]
//remove null and undefined from array
// var arr = [1,2,null,3,undefined];
// var result=arr.filter((item)=>{
//     return item!==null && item!==undefined;
// })
// console.log(result);


//Q-8 What is the difference between null and undefined in JavaScript? 
// Answer ->1) Both of dataType represents the absence of value in JavaScript
//          2)undefine-> when any variable is declared is declare but not assigned in javascript then undefined occurs and type of undefine is undefine itself
// example ->
//  var e;
//  console.log(e);
 //output->undefined
 //3)null-> dataType of null if object , null means absese of  any object value 
//example-> 
// var e = null;
//  console.log(e);

 // camaprison between null and undefined
 //1) in first case camparison between null and undefined basis of value 
//  console.log(null==undefined);
 // 2) in second case camparison between null and undefined basis data type
//  console.log(null===undefined);


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Q-7 What is the difference between function declarations and function expressions?explin with example.
// function declarations
//1) function declarations means that the function will be named in function declarations
// 2)In  function expressions the function will hoisted 
// 3) In function expressions Hoisted means that the function called before the declaration 
// example 
// call();// function hoisted
// function call (){
//     console.log("function declaration");
// }

// function expression
//1) function expression means that the function will be named or without name .
// 2) In function expressions the function will assign in a variable 
// 3) In function expressions the function will not be hoisted.
//console.log(r()); // not hoisted throw err 
// var r = function (){
//     console.log("function expression");
// }
// console.log(r());


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Q-4 What is the purpose of the EventEmitter class in Node.js with example?
// 1)every action in node.js is event 
//2) event is a module in node.js which handle the events. ,
//3) EventEmitter class  create , emit or listion the events.
//4) EventEmitter handle the asynchronous OPERATION events.


// MAKE A EVENT HOW MANY TIME API HIT count EVENTS
// const express = require('express');
//  const app = express();
// const EventEmitter = require('events');
// var events = new EventEmitter();
// const count =0;
// events.on('eventAPi', () => {
//     count++;
//     console.log('an event occurred!', count);
// });
// app.get("/app",(req,res)=>{
//     res.send("hello world");
//     events.emit('eventAPi');
// })

// app.listen(4000,()=>{
//     console.log("server is running on port 4000");
// })


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Q-3 What is the difference between common js and ES modules in Node.js?
// 1)Both modules set of system whic  handle the code in javascript 
//Common js 
// In common javascript we import a module by require method 
// In ES modules exports of a module module.exports;
// example 
// import
//const module = require('/module');
// export
//module.exports =module;
// example 
// const math = require('./math');

// console.log(math.add(1,2));
// console.log(math.sub(4,2));

// ES module
//1) In Es module we import a module by import method
//2) In ES module we export by export method
// import
//import module from "module"
// export
// export module
// example 
// import {add,sub} from './math';
// console.log(add(1,2));
// console.log(sub(4,2));
//


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q-5 (a) What is Callback Hell. Explain and Write a Program Demonstrating CallBack Hell (b). Convert callback in 5(a) to Promises
// Answer
// callback -> callback means the function passed in a function as an argument , callback function handle the asynchronous operation
// callbackHell-> callback Hell means pyramid of doom , nested callbacks function create  a callbackhell in javascript thats which to read the code so hard and code exxecution go little slow .
 function fetchUser(callback){
    setTimeout(()=>{
        console.log("fetching user");
        callback({"id":1 ,"name":"suraj"});
    },2000)
 }
 function fetchPost(userId,callback){
    setTimeout(()=>{
        console.log("fetching post");
        callback({"id":1,"title":"post title"});
    },2000);
 }
 function fetchPostDetails(postId,callback){
    setTimeout(()=>{
        console.log("fetching post details");
        callback({"id":1,"title":"post title"});
    },2000)
 }

 // callback hell = > 
    fetchUser((user,err)=>{
        if(err){
            console.log(err);
            return;
        }
        fetchPost(user.id,(post,err)=>{
            if(err){
                console.log(err);
                return;
            }
            fetchPostDetails(post.id,(postDetails,err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log(postDetails);
            })
        })

    })

    // promises
    function fetchUser(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("fetching user");
                resolve({"id":1,"name":"suraj"});
            },2000)
        })
    }
    function fetchPost(userId){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                 console.log("fetching post");
                 resolve({"id":1,"title":"post title"});
            },2000)
        })
    }
    function fetchPostDetails(postId){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("fetching post details");
                resolve({"id":1,"title":"post title"});
            },2000);

        })
}


fetchUser().then((user)=>{
        return fetchPost(user.id);
}).then((post)=>{
        return fetchPostDetails(post.id);
}).then((postDetails)=>{
        console.log(postDetails);
}).catch((err)=>{
        console.log(err);
})




    

    

   