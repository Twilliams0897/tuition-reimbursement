window.onload = () => {
    document.getElementById('submit').onclick = login;
                                   //.addEventListenter('click', login);
}

function login() {
    let user = document.getElementById('username').value;
    console.log(user);
    let pass = document.getElementById('password').value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=> {
        console.log(xhttp.readyState);
        console.log(xhttp.status);
        if(xhttp.readyState===4 && xhttp.status===200) {
            document.getElementById('user').innerHTML=xhttp.response;
        }
    }
    xhttp.open('POST', '/users');
    
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({username:user, password:pass}));
}