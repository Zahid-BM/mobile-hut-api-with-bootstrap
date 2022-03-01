/* onclick function to fetch data */
const searchPhone = () => {
    if (input.value.length == '') {
        alert('No input !!! Please, input correctly to find the desired phone.')
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${input.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.splice(0, 20))); /* set phpne qtty will be shown up to 20 */
        /*  clear input field  */
        input.value = '';
        /* clear previous searched phones that were in desplay */
        const display = document.getElementById('display');
        display.innerHTML = ''; /* this is preferable */
        /* clear previous phone details on UI */
        const phoneDetails = document.getElementById('details');
        phoneDetails.innerHTML = '';
    }
}
/* function for displaying found data on UI  */
const displayPhone = phones => {
    console.log(phones);
    const display = document.getElementById('display');
    if (phones.length == 0) {
        const div = document.createElement('div');
        div.classList.add('mx-auto', 'w-100', 'h-50');
        div.innerHTML = `
   <div class="col">
            <div class="card h-100">
                <div class="card-body bg-danger">
                    <h5 class="card-title text-center text-white fw-bolder"> Oppss ! Searched Phone is Unavailable !!!</h5>
                </div>
            </div>
  </div>
    
    `;
        display.appendChild(div);

    }
    else {
        phones.forEach(phone => {
            // console.log(phone);
            const foundPhones = document.createElement('div');
            foundPhones.innerHTML = `
         <div class="col h-100">
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body bg-light">
                    <h5 class="card-title">${phone.brand}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${phone.phone_name}</h6>
                     <button onclick = "phoneDetails('${phone.slug}')" class="btn btn-warning text-white fw-bold" > Details</button>
                </div>
            </div>
  </div> 
        `
            display.appendChild(foundPhones);
        })
    }


}
const phoneDetails = phoneIdentity => {
    console.log(phoneIdentity);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneIdentity}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
    /* clear previous data of phone details */
    const phoneDetails = document.getElementById('details');
    phoneDetails.innerHTML = '';
}
const displayPhoneDetails = displayDetails => {
    console.log(displayDetails);
    const phoneDetails = document.getElementById('details');
    const foundDetails = document.createElement('div');
    foundDetails.innerHTML = `
    <div class="col h-100">
            <div class="card h-100">
                <img src="${displayDetails.image}" class="card-img-top" alt="...">
                <div class="card-body bg-warning">
                    <h3 class="card-title">${displayDetails.brand} ${displayDetails.name} </h3>
                        <p>${displayDetails?.releaseDate ?? "Release Date is unavailable"}</p>
     <ul>
                         <u><h5 class = "fw-bolder text-secondary ">Main Features</h5></u>
        <li>  <b>Chip set : </b>${displayDetails.mainFeatures.chipSet}</li>
        <li> <b>Display :</b> ${displayDetails.mainFeatures.displaySize}</li>
        <li>  <b>Memory :</b> ${displayDetails.mainFeatures.memory}</li>
    </ul>

    <ul>
                       <u> <h5 class = "fw-bolder text-secondary">Sensors</h5></u>
        <li>${displayDetails.mainFeatures.sensors}</li>
    </ul>

 <ul>
                         <u><h5 class = "fw-bolder text-secondary">Others</h5></u>
        <li><b>Bluetooth: </b> ${displayDetails.others?.Bluetooth ?? "No"}</li>
        <li><b>GPS: </b> ${displayDetails.others?.GPS ?? "No"}</li>
        <li><b>NFC: </b> ${displayDetails.others?.NFC ?? "No"}</li>
        <li> <b>Radio: </b> ${displayDetails.others?.Radio ?? "No"}</li>
        <li><b>USB: </b> ${displayDetails.others?.USB ?? "No"}</li>
        <li><b>WLAN: </b> ${displayDetails.others?.WLAN ?? "No"}</li>
   <ul>
                </div>
            </div>
  </div> 
 
    `;
    phoneDetails.appendChild(foundDetails);
}


