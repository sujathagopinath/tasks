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
console.log(ddd);

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
console.log(wrap.nodeName);
console.log(wrap.nodeType);
console.log(wrap.hasChildNodes);

const cloned = wrap.cloneNode(true);
console.log(cloned);

//parent child

const booklist = document.querySelector('#book-list');
console.log(booklist.parentNode);
console.log(booklist.parentElement.parentElement);

console.log(booklist.childNodes);
console.log(booklist.children);

//sibilings

console.log(booklist.nextSibling);
console.log(booklist.nextElementSibling);

console.log(booklist.previousSibling);
console.log(booklist.previousElementSibling);

booklist.previousElementSibling.querySelector('h1').innerHTML += '<br/>To find new books'

var details = ['a', 'k', 'h', 's', 'h', 'y'];

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
console.log(comment);

//forms 

console.log(document.forms);

console.log(document.forms[0]);

console.log(document.forms['add-book'])

const list1 = document.querySelector('#book-list ul');
console.log(list1);
//get the value from placeholder

const addform = document.forms['add-book'];
addform.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = addform.querySelector('input[type="text"]').value;
    // console.log(value);
    // document.write(value);

    //create element

    const li = document.createElement('li');
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');

    //add content

    deleteBtn.textContent = 'delete';
    bookName.textContent = value;

    //append

    li.appendChild(bookName);
    li.appendChild(deleBtn);
    list1.appendChild(li);

});

//Attributes

var book1 = document.querySelector('li:first-child .name');
console.log(book1);

var data = book1.getAttribute('class');
console.log(data);

var data = book1.setAttribute('class', 'name1');
console.log(data);
console.log(data);

