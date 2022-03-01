/* onclick function to fetch data */
const searchPhone = () => {
    if (input.value.length == '') {
        alert('Wrong or empty input !!! Please, input correctly and try again.')
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
                <div class="card-body">
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
                <div class="card-body">
                    <h5 class="card-title">${displayDetails.brand} ${displayDetails.name} </h5>
                        <p>${displayDetails.releaseDate}</p>
                        <p>
                        <b> <u>Specifications :</u></b> <br> <br>
                  <u>Chip set</u> - ${displayDetails.mainFeatures.chipSet}<br> 
                  <u>Display </u>- ${displayDetails.mainFeatures.displaySize}<br> 
                  <u>Memory</u> - ${displayDetails.mainFeatures.memory}<br> 
                  <u>Sensors</u> - ${displayDetails.mainFeatures.sensors}<br>
                <u>Others</u> - Bluetooth: ${displayDetails.others?.Bluetooth}, GPS: ${displayDetails.others?.GPS}, NFC: ${displayDetails.others?.Bluetooth}, Radio: ${displayDetails.others?.Radio}, USB: ${displayDetails.others?.USB}, WLAN: ${displayDetails.others?.WLAN}
 
                        </p>
                </div>
            </div>
  </div> 
    `;
    phoneDetails.appendChild(foundDetails);
}


