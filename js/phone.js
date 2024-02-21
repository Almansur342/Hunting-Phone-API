const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {

  const phoneContainer = document.getElementById('phone-container');
  // clear phone container
  phoneContainer.textContent = '';
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  } else{
    showAllContainer.classList.add('hidden')
  }
  // display only 12 phones if not showAll
  if(!isShowAll){
    phones = phones.slice(0,12);
  }
  
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoading(false);
}

 const handleShowDetail = async(id) => {
  const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
 }
 

 const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="">
 

  `
  

// show the modal
  show_detail_modal.showModal();
 }

// handle search button
 const handleSearch = (isShowAll) =>{
  toggleLoading(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
  // searchField.value = ''
 }

 const toggleLoading = isLoading => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  } else{
    loadingSpinner.classList.add('hidden');
  }
 }
//  handle show all
 const handleShowAll = () => {
 handleSearch(true);
}


