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

let lockUnlockBtn=document.querySelector('.lock-unlock-btn i');
console.log(lockUnlockBtn);

let allPriorityColor=document.querySelectorAll('.priority-color');
let priorityColor='red';

for(let i=0;i<allPriorityColor.length;i++){
  allPriorityColor[i].addEventListener('click',function(){
   // console.log(allPriorityColor[i].classList[1]);

   //before we add , we will remove border from all
   for(let j=0;j<allPriorityColor.length;j++){
    allPriorityColor[j].classList.remove('active');
   }

   allPriorityColor[i].classList.add('active');

   priorityColor=allPriorityColor[i].classList[1];

  })
}

// Instantiate
var uid = new ShortUniqueId();

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
 // console.log(e);
  let key=e.key;
 // console.log(key);

 if(key == "Enter"){
  //generate a ticket
  
  console.log(e.target.value);
  createTicket(e.target.value);
  // hiding the modal
  modalCont.style.display ="none";
  isModalHidden= true;
  //empty the textarea.value
  e.target.value="";

 }

})

function createTicket(task){
  //create the below structure with js and add it to main container
 // <div class="ticket-cont">
  //  <div class="ticket-color"></div>
   // <div class="ticket-id">5gf832</div>
   // <div class="ticket-area">Some task</div>
  // </div>

  let id=uid.rnd();
  let ticketCont = document.createElement('div'); //<div></div>
  
  ticketCont.className='ticket-cont'; // <div class="ticket-cont"></div>

  ticketCont.innerHTML = `<div class="ticket-color ${priorityColor}">
                         </div><div class="ticket-id">#${id}</div>
                          <div class="ticket-area">${task}</div>
                        <div class='lock-unlock-btn'>
                           <i class="fa-solid fa-lock"></i>
                           </div>`;

  //console.log(ticketCont);

  mainCont.appendChild(ticketCont);
  
  // deleting the ticket
  ticketCont.addEventListener('click',function(){
    // deleting ticket button only when red appeard on delete
    if(isDeleteBtnActive){
    ticketCont.remove();
    }
  })
  //handling lockunlock ticket
  let lockUnlockBtn=ticketCont.querySelector('.lock-unlock-btn i');
  let ticketArea=document.querySelector('.ticket-area');
  //console.log(lockUnlockBtn);
  lockUnlockBtn.addEventListener('click',function(){
      if (lockUnlockBtn.classList.contains('fa-lock')){
        lockUnlockBtn.classList.remove('fa-lock');
        lockUnlockBtn.classList.add('fa-lock-open');
        ticketArea.setAttribute('contenteditable',true);
      }else{
        lockUnlockBtn.classList.remove('fa-lock-open');
        lockUnlockBtn.classList.add('fa-lock');
        ticketArea.setAttribute('contenteditable',false);
      }
  })

} 