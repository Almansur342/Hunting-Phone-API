const loadPhone =async (searchText, isShowAll) => {
 const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
 const data = await res.json();
 const phones = data.data
 displayPhone(phones, isShowAll);
}

 const displayPhone = (phones, isShowAll) =>{
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll ){
    showAllContainer.classList.remove('hidden');
  } else{
    showAllContainer.classList.add('hidden');
  }
  if(!isShowAll){
    phones = phones.slice(0,12);
  }else{
    phones = phones;
  }
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`
    phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>${phone.slug}</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>`
     phoneContainer.appendChild(phoneCard)
    //  console.log(phone);
  });
   toggleLoadingSpinner(false);
 }

 const handleShowDetail =async (id) =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   const phone = data.data
   showPhoneDetails(phone);
 }

 const showPhoneDetails = (phone) =>{
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" class="my-3">
  <h2 class="my-3">${phone.brand}</h2>
  `
  show_detail_modal.showModal();
 }

 const handleSearch = (isShowAll) =>{
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
 }

 const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  } else{
    loadingSpinner.classList.add('hidden')
  }
 }

 const handleShowAll = () =>{
 handleSearch(true)
 }