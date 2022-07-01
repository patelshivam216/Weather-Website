console.log('client side!')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = '/weather?search='+encodeURIComponent(location);

    messageOne.textContent="Loading...";
    messageTwo.textContent=""

    fetch(url).then((responce) => {

        responce.json().then((data) => {
            console.log(data);
            if(data.error){
                messageOne.textContent=data.error;
            }else{
                messageOne.textContent=data.location;
                messageTwo.textContent=data.forecast;
                
            }
            
        })

    })

})

