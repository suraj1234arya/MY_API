// const fs = require('fs');
// const pdf = require('pdf-parse');
// let dataBuffer = fs.readFileSync('./uploads/A.pdf');
// pdf(dataBuffer).then(function(data) {
//     console.log(data.numpages);
//     console.log(data.numrender);
//     console.log(data.info);
//     console.log("version",data.version);
//     console.log("text data",data.text); 
        
// });

const v8 = require('v8');
// Get heap statistics
const heapStats = v8.getHeapStatistics();
console.log(heapStats);
const arr=[1,2,3,4,5,6,7];
var e =arr.forEach((value,index,arr)=>{
    console.log(value,index,arr);
})
console.log(e);
