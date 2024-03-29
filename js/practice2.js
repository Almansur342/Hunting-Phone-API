const loadPhone = async(id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${id}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
}

const displayPhones = (phones) =>{
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
  const showAllContainer = document.getElementById('show-all-container');
  if(phone.length > 12){
    showAllContainer.classList.remove('hidden');
  }
  phones.forEach(phone => {
    // console.log(phone);
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes"/></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
    `
    phoneContainer.appendChild(phoneCard);
  });
}
 const handleSearch = () =>{
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   loadPhone(searchText);
 }

 
