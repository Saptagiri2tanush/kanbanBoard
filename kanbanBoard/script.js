// 1 .show and hide modal on click of button
//figure out where to add event listener and what is the event
// add event listener on plus button and event is click

//2. On click of delete btn make it red , if again clicked make it black

let addBtn=document.querySelector('.add-btn');//selecting the add button
let modalCont=document.querySelector('.modal-cont');//selecting the modal
let isModalHidden= true;

let deleteBtn=document.querySelector('.remove-btn');// select the remove button
let isDeleteBtnActive=false;// maintain state for delete button

let textArea=document.querySelector('.textarea-cont');
let mainCont=document.querySelector('.main-cont');

addBtn.addEventListener('click',function(){
  if(isModalHidden){
    modalCont.style.display ="flex"; //show the modal
    isModalHidden= false;
  }
  else{
    modalCont.style.display ="none"; //hide the modal
    isModalHidden= true;
  }
})

deleteBtn.addEventListener('click',function(){
    if(isDeleteBtnActive){
        // make it black
        deleteBtn.style.color='black';
        isDeleteBtnActive= false;// update it for next click
    }
    else{
        //make it red
        deleteBtn.style.color='red';// update it for next click
        isDeleteBtnActive=true;
    }
})

textArea.addEventListener('keydown',function(e){
  //console.log(e);
  let key=e.key;
 // console.log(key);

 if(key == "Enter"){
  //generate a ticket
  createTicket();
 }

})

function createTicket(){
  //create the below structure with js and add it to main container
 // <div class="ticket-cont">
  //  <div class="ticket-color"></div>
   // <div class="ticket-id">5gf832</div>
   // <div class="ticket-area">Some task</div>
  // </div>
  let ticketCont = document.createElement('div'); //<div></div>
  
  ticketCont.className='ticket-cont'; // <div class="ticket-cont"></div>

  ticketCont.innerHTML = '<div class="ticket-color"></div><div class="ticket-id">5gf832</div><div class="ticket-area">Some task</div>';

  //console.log(ticketCont);

  mainCont.appendChild(ticketCont);
} 