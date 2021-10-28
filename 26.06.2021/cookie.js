document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (document.cookie) {
            document.getElementById("output").textContent = document.cookie;
        }
        else {
            document.getElementById("output").textContent = "No cookies currently";
        }
        console.log(document.cookie.split(';'));
    })

    document.getElementById("btnadd").addEventListener('click', (e) => {
        let key = 'theme';
        //let key ='score';
        let value = encodeURIComponent('pink');

        document.cookie = `${key}=${value};path=/;`;
    });

    document.getElementById('btndel').addEventListener('click', (e) => {
        let key = 'theme';
        document.cookie = `${key}=;path=/;`;
    })

});