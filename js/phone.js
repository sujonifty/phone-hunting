const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
 }
//step-1: get the card container 
const displayPhone = (phones,isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
  // show the button if phone length is greater than 12 
  const showAllBtn = document.getElementById('show-all-btn');
  if (phones.length > 12 && !isShowAll){
    showAllBtn.classList.remove('hidden');
  }
  else{
    showAllBtn.classList.add('hidden');
  }
  //display 12 phones by slice if not clicked show all button
  if(!isShowAll){
    phones = phones.slice(0,12);

  }
  

    phones.forEach(phone => {
        // console.log(phone);
        // step-2: create a div for phone card 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        //step-3: set inner html
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions">
          <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-rose-200">Show Details</button>
        </div>
      </div>`
      //step-4: set append child
      phoneContainer.appendChild(phoneCard);
    });
    //remove loading spinner
    loadingSpinner(false);
}
const handleSearch = (isShowAll) =>{
  loadingSpinner(true);
  const  searchField = document.getElementById('search-field');
searchText = searchField.value;
// searchField.value ='';
// console.log(searchText);
loadPhone(searchText, isShowAll);
}

//display loading spinner 
const loadingSpinner =(isSpinner) => {
  const showSpinner = document.getElementById('loading-spinner');
  if (isSpinner){
    showSpinner.classList.remove('hidden');
  }
  else{
    showSpinner.classList.add('hidden');
  }
}

//Show details of individual phone
const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data);
}

// show all if clicked show all button. this is not proper way to show all
const handleShowAll = () =>{
  handleSearch(true);
}
// loadPhone();