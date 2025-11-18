let menu = document.getElementById('menu');
let items = menu.getElementsByClassName('item');
console.log("ITEMS: ",items);
//call the getElementsByClassName method on the menu element 

//convert the HTMLCollection to an array and extract the textContent of each item
let data = [].map.call(items, (item) => item.textContent);
console.log("DATA: ",data);


//another way to convert the HTMLCollection to an array using Array.of and spread operator
const items2 = document.getElementsByClassName('secondary');
console.log("ITEMS 2: ",items2);
const data2 = Array.of(...items).map((item) => item.textContent);

console.log("DATA 2: ",data2);

//using Array.from to convert the HTMLCollection to an array

//how to access data and items with the getElementsByName method?
const items3 = document.getElementsByName('items');
console.log("Items 3: ",items3);

//access to a list inside of a list
for (let i=0;i<items3.length;i++) {
    let item = items3[i];
    console.log("Item: ",item.childNodes);
}