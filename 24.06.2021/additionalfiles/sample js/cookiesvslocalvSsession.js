localStorage.setItem('name','Bob')
console.log(localStorage.getItem('name'));

sessionStorage.setItem('name','John')
console.log(sessionStorage.getItem('name'))
sessionStorage.removeItem('name')

document.cookie = 'name=kyle; expires=' + new Date(2022,0,1).toUTCString()

console.log(document.cookie)