/* onclick function to fetch data */
const searchPhone = () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${input.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
}
/* function for displaying found data on UI  */
const displayPhone = phones => {
    const display = document.getElementById('display');
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
    });
}
const phoneDetails = phoneIdentity => {
    console.log(phoneIdentity);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneIdentity}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}
const displayPhoneDetails = displayDetails => {
    // console.log(displayDetails.mainFeatures.chipSet);
    const phoneDetails = document.getElementById('details');
    const foundDetails = document.createElement('div');
    foundDetails.innerHTML = `
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
}


