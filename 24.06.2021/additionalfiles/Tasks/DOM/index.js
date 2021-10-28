//getElement by class or Id
var book = document.getElementsByClassName("title");
// console.log(book);
// console.log(book[0]);

for (i = 0; i <= book.length; i++) {
    console.log(book[i]);
}

var lists = document.getElementsByTagName('li');
console.log(lists);

for (i = 0; i <= lists.length; i++) {
    console.log(lists[i]);
}

//queryselector 

const ddd = document.querySelector('#book-list li:nth-child(2) .name');
console.log("display the childnode:", ddd);

const lis = document.querySelectorAll('li .name');
console.log(lis);

for (i = 0; i < lis.length; i++) {
    console.log(lis[i]);
    console.log(lis[i].textContent);
    lis[i].innerText = 'Two states';
    lis[i].innerText += ' (twostates)'
}

const inner = document.querySelector("#book-list");
console.log(inner.innerHTML);
// inner.innerHTML = "<h1>New Books</h1>"
inner.innerHTML += "<p>Books are yet to update</p>"

//Node type

const wrap = document.querySelector('#page');
console.log("NodeName:", wrap.nodeName);
console.log("NodeType:", wrap.nodeType);
console.log("checks the child node:", wrap.hasChildNodes);

const cloned = wrap.cloneNode(true);
console.log("whole div tag:", cloned);

//parent child

const booklist = document.querySelector('#book-list');
console.log("parent node:", booklist.parentNode);
console.log("Parent Element:", booklist.parentElement.parentElement);

console.log("child Nodes:", booklist.childNodes);
console.log("children:", booklist.children);

//sibilings

console.log("Nextsibling:", booklist.nextSibling);
console.log("NextElementSibling:", booklist.nextElementSibling);

console.log("previous:", booklist.previousSibling);
console.log("PreviousElementSibling:", booklist.previousElementSibling);

booklist.previousElementSibling.querySelector('h1').innerHTML += '<br/>To find new books'

var details = ['s', 'u', 'j', 'a'];

details.toString();
console.log(details.toString());
let comment = ''

// for (detail in details) {
//     comment += details[detail]

// }
for (i = 0; i < details.length; i++) {
    comment += details[i];

}
document.write(comment);
console.log("Name:", comment);

//forms 

console.log(document.forms);

console.log(document.forms[0]);

console.log("Addform:", document.forms['add-book'])

const list1 = document.querySelector('#book-list ul');
console.log("ul", list1);
//get the value from placeholder


//create element

const addform = document.forms['add-book'];

const addc = document.querySelector('.addcontent')

addform.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = addform.querySelector('input[type="text"]').value;
    const bookName = document.createElement('span').textContent = value;

    const li = document.createElement('li')
    li.textContent = bookName

    addc.appendChild(li)

});


//Attributes

var book1 = document.querySelector('li:first-child .name');
console.log(book1);

var data = book1.getAttribute('class');
console.log("getAttribute:", data);

var data = book1.setAttribute('class', 'name1');
console.log("SetAttribute:", data);


