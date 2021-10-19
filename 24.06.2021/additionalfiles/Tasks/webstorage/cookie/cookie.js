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
        // let key = 'score';
        let value = encodeURIComponent('2344950050$%^');
        let days = 60 * 60 * 24 * 30;

        document.cookie = `${key}=${value};path=/; max-age=${days};`;
    });

    document.getElementById('btndel').addEventListener('click', (e) => {
        let key = 'theme';
        document.cookie = `${key}=;path=/;expires= Thu, 01 Jul 2021T00:00:00Z;`;
    });



});