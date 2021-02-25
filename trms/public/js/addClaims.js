let claimTemp = `
<section id="addClaim" class="container">
    <section class="row">
        <label name="description">Course description: </label> 
        <input type='text' name='description' id="description" />
    </section>
    <section class="row">
        <label name="coursetype">Course Type:</label>
        <select id="courseSelect">
            <option value='Uni'>University-level course</option>
            <option value='Sem'>Seminar</option>
            <option value='CertPrep'>Certification Preparation Class</option>
            <option value='Cert'>Certification</option>
            <option value='Tech'>Technical Training</option>
            <option value='Other'>Other</option>
        </select>
    </section>
    <section class="row">
        <label name="date">chef:</label>
        <input type="text" name="date" id="date" />
    </section>
    <section class="row">
        <label name="time">type:</label>
        <input type="text" name="time" id="time" />
    </section>
    <section class="row">
        <label name="location">type:</label>
        <input type="text" name="location" id="location" />
    </section>
    <section class="row">
        <label name="cost">type:</label>
        <input type="text" name="cost" id="cost" />
    </section>
    <section class="row">
        <label name="gradingFormat">type:</label>
        <input type="text" name="gradingFormat" id="gradingFormat" />
    </section>
    <section class="row">
        <label name="justification">img:</label>
        <input type="text" name="justification" id="justification" />
    </section>
    <button id="n-claim-submit">Add Claim</button>
</section>
`
function addClaimForm(){
    document.getElementById('claimForm').innerHTML=claimTemp;
    document.getElementById('n-claim-submit').onclick = addClaim;
    document.getElementById('addClaim').onkeydown = checkEnter;
}
function removeClaimForm(){
    document.getElementById('claimForm').innerHTML='';
    window.location.reload();
}
function checkEnter(event) {
    console.log(event);
    if(event.which === 13) {
        addClaim();
    }
}
function addClaim() {
    let data = {};
    data.description=document.getElementById('description').value;
    data.courseType=document.getElementById('courseType').value;
    data.date=document.getElementById('date').value;
    data.time=document.getElementById('time').value;
    data.location=document.getElementById('location').value;
    data.cost=document.getElementById('cost').value;
    data.gradingFormat=document.getElementById('gradingFormat').value;
    data.justification=document.getElementById('justification').value;
    console.log(data);
    fetch('/claims', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(data)}).then(()=>{removeClaimForm()})
}