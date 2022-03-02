/* function for spinner page loading */
const loading = (remove, add) => {
    const load = document.getElementById('loading');
    load.classList.remove(remove);
    load.classList.add(add);
}

/* onclick function to fetch data */
const searchPhone = () => {
    if (input.value.length == '') {
        alert('No input !!! Please, input correctly to find the desired phone.')
    }
    else {
        /* loading enabled after clicking the search button*/
        loading('d-none', 'd-block');
        const input = document.getElementById('input');
        const url = `https://openapi.programming-hero.com/api/phones?search=${input.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data?.data.splice(0, 20))); /* set phone qtty will be shown up to 20 */
        /*  clear input field  */
        input.value = '';
        /* clear previous searched phones that were on UI display */
        const display = document.getElementById('display');
        display.innerHTML = '';
        /* clear previous phone details on UI */
        const phoneDetails = document.getElementById('details');
        phoneDetails.innerHTML = '';
    }

}
/* function for displaying found data on UI  */
const displayPhone = phones => {
    const display = document.getElementById('display');
    /* when searched item is unavailable */
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
        /* loading disabled after appearing message on UI */
        loading('d-block', 'd-none');

    }
    /* when searched item is available */
    else {
        phones?.forEach(phone => {
            const foundPhones = document.createElement('div');
            foundPhones.innerHTML = `
         <div class="col h-100">
            <div class="card h-100">
                <img src="${phone?.image ?? "Official image not published"}" class="card-img-top" alt="...">
                <div class="card-body bg-light">
                    <h5 class="card-title">${phone?.brand}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${phone?.phone_name}</h6>
                     <button onclick = "phoneDetails('${phone?.slug}')" class="btn btn-warning text-white fw-bold" > Details</button>
                </div>
            </div>
  </div> 
        `;
            display.appendChild(foundPhones);
            /* loading disabled after appearing found phones on UI */
            loading('d-block', 'd-none');
        })
    }
}
/* function for on click fetching phone data */
const phoneDetails = phoneIdentity => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneIdentity}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data?.data));
    /* clear previous data of phone details */
    const phoneDetails = document.getElementById('details');
    phoneDetails.innerHTML = '';
}
/* fucntion  for showing phone data on UI */
const displayPhoneDetails = displayDetails => {
    const phoneDetails = document.getElementById('details');
    const foundDetails = document.createElement('div');
    foundDetails.innerHTML = `
    <div class="col h-100">
            <div class="card h-100">
                <img src="${displayDetails?.image ?? "Official image not published"}" class="card-img-top" alt="...">
                <div class="card-body bg-warning">
                    <h3 class="card-title">${displayDetails?.brand} ${displayDetails?.name} </h3>
                        <p>${displayDetails?.releaseDate ?? "Official release date is unavailable"}</p>
     <ul>
                         <u><h5 class = "fw-bolder text-secondary ">Main Features</h5></u>
        <li>  <b>Chip set : </b>${displayDetails.mainFeatures?.chipSet ?? "No"}</li>
        <li> <b>Display :</b> ${displayDetails.mainFeatures?.displaySize ?? "No Official information"}</li>
        <li>  <b>Memory :</b> ${displayDetails.mainFeatures?.memory ?? "No"}</li>
    </ul>

    <ul>
                       <u> <h5 class = "fw-bolder text-secondary">Sensors</h5></u>
        <li>${displayDetails.mainFeatures?.sensors ?? "No"}</li>
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


