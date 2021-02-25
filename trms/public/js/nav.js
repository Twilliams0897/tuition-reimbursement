const navTemplate = `<ul id="navList">
</ul>`

const basicNav = `<li><a href="#">About</a></li>
<li><a href="#">Contact</a></li>
<li><a href="/users/login">Login</a></li>`

const unauthenticated = `<li><a href="/users/login">Login</a></li>`;
const authenticated = `<li id="appView"></li>
                        <li id="userInfo"></li>
                        <li><a href="/users/logout">Logout</a></li>`;

function createNavBar() {
    document.getElementById('nav').innerHTML = navTemplate;
    document.getElementById('navList').innerHTML = basicNav;
}

function authenticate() {
    fetch('/users').then(user=> {
        console.log(user);
        return user.json()
    }).then(data => {
        console.log(data);
        addUser(data);
    });
}

function addUser(u) {
    console.log(u);
    console.log(u.name)
    if(u.name) {
        console.log('authenticated');
        console.log(authenticated);
        console.log(document.getElementById('login'));
        document.getElementById('navList').innerHTML = basicNav + authenticated;
        document.getElementById('userInfo').innerHTML = `Welcome ${u.role}, ${u.name}.`;
        if(u.role === 'Employee'){
            console.log(`Role: ${u.role}`);
            document.getElementById('appView').innerHTML = 'Submit Application';
        } else{
            console.log(`Role: ${u.role}`);
            document.getElementById('appView').innerHTML = 'View Applications';
        }
    } else {
        console.log('Unauthenticated!')
        document.getElementById('navList').innerHTML = basicNav + unauthenticated;
    }
}
