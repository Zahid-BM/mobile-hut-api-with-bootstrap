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
        const foundPhones = document.createElement('div');
        foundPhones.innerHTML = `
         <div class="col h-100">
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-white fw-bolder">${phone.brand}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${phone.phone_name}</h6>
                     <button onclick = "phoneDetails()" class="btn btn-warning text-white fw-bold" > Details</button>
                </div>
            </div>
  </div> 
        `
        display.appendChild(foundPhones);
    });
}