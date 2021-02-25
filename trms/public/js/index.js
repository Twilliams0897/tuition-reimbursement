// window <- An object representation of (essentially) the browser
window.onload = () => { // The onload event triggers after the webpage is finished loading.
    // document <- An object representation of the DOM.
    //ajaxGetRestaurants();
    //createRestaurantList(restaurants);
    createNavBar();
    document.getElementById('addClaimsLink').onclick= addClaimsForm;
    fetchGetClaims();
    authenticate();
}
function fetchGetClaims(){
    // Fetch is an API for sending requests to servers that utilizes promises.
    fetch('/claims').then(claim=> claim.json()).then(data => createClaimsList(data));
}
function ajaxGetClaims(){
    // Asynchronous Java and XML

    // Step 1: Create a new XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    // Step 2: set callback for onreadystatechange
    xhttp.onreadystatechange = () => {
        // closure to the xhttp object to handle our response
        /*
        ReadyStates of AJAX:
        0 - New
        1 - Open
        2 - Recieved
        3 - Processing
        4 - Ready
        */
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            console.log(xhttp.response);
            createClaimsList(JSON.parse(xhttp.response));
        }
    }
    // Step 3: open the connection
    xhttp.open('GET', '/claims');
    // Step 4: send the request
    xhttp.send(); // Because this is a get request, the send will be empty.

}
function createClaimsList(claimsList){
    let section = document.getElementById('claims');
    let row;
    for(let i = 0; i < claimsList.length; i++) {
        if(i%3 === 0) {
            row = document.createElement('section');
            row.className='row border';
            section.appendChild(row);
        }
        let div = createClaimsElement('div', '', 'col claim card', row);
        let img = document.createElement('img');
        img.src = restaurantList[i].img;
        img.className = 'card-img-top rest-logo';
        div.appendChild(img);
        let card = document.createElement('div');
        card.className="card-body";
        div.appendChild(card);
        //createClaimsElement('p', restaurantList[i].name, '', card);
        //createClaimsElement('p', restaurantList[i].eta, 'deliverytime', card);
        //createClaimsElement('p', restaurantList[i].rating, 'rating', card);
        //createClaimsElement('p', restaurantList[i].type, 'foodtype', card);
    }
}
function createClaimsElement(element, data, className, parent){
    let e = document.createElement(element);
    e.innerHTML = data;
    e.className = className;
    parent.appendChild(e);
    return e;
}
let createLiteral = (claim) => {
    return `<div class="restaurant">
    <p>${claim.name}</p>
    <img src="${claim.img}"/>
    <p class="deliverytime">${claim.eta}</p>
    <p class="rating">${claim.rating} stars</p>
    <p class="foodtype">${claim.type}</p>
    </div>`
}