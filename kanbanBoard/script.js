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

let color = ['red','blue','green','pink'];

//Storing data of each ticket in the form of an object
 let ticketArr=[];
 if(localStorage.getItem('TaskArr')){
  let ticketArrStr=localStorage.getItem("TaskArr");
  ticketArr=JSON.parse(ticketArrStr);
  for(let i=0;i<ticketArr.length;i++){
    let ticket=ticketArr[i];
    createTicket(ticket.value,ticket.color,ticket.id);
  }
 }

let lockUnlockBtn=document.querySelector('.lock-unlock-btn i');
console.log(lockUnlockBtn);

let allPriorityColor=document.querySelectorAll('.priority-color');
let priorityColor='red';

for(let i=0;i<allPriorityColor.length;i++){
  allPriorityColor[i].addEventListener('click',function(){
    console.log(allPriorityColor[i].classList);

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
  
  //console.log(e.target.value);
  createTicket(textArea.value,priorityColor);
  // hiding the modal
  modalCont.style.display ="none";
  isModalHidden= true;
  //empty the textarea.value
  e.target.value="";

 }

})

function createTicket(task,priorityColor,ticketId){
  //create the below structure with js and add it to main container
 // <div class="ticket-cont">
  //  <div class="ticket-color"></div>
   // <div class="ticket-id">5gf832</div>
   // <div class="ticket-area">Some task</div>
  // </div>

  let id;
  if(ticketId){//id is there it means we are creating from local storage
    id=ticketId;
  }else{//
  id=uid.rnd();
  }
  let ticketCont = document.createElement('div'); //<div></div>
  
  ticketCont.className='ticket-cont'; // <div class="ticket-cont"></div>

  ticketCont.innerHTML = `<div class="ticket-color ${priorityColor}">
                         </div><div class="ticket-id">#${id}</div>
                          <div class="ticket-area">${task}</div>
                        <div class='lock-unlock-btn'>
                           <i class="fa-solid fa-lock"></i>
                           </div>`;

  //console.log(ticketCont);
  if(!ticketId){// only make changes in the array when ticketId is not passed. or 
    // we can say it is created with UI and not from the localStorage.
    ticketArr.push({id:id,color:priorityColor,value:task});
    console.log(ticketArr);
    updateLocalStorage();
  }
  mainCont.appendChild(ticketCont);
  
  // deleting the ticket
  ticketCont.addEventListener('click',function(){
    // deleting ticket button only when red appeard on delete
    if(isDeleteBtnActive){
    ticketCont.remove();
    let ticketIndex = ticketArr.findIndex(function(ticketObj){
      return ticketObj.id == id;
  })
    ticketArr.splice(ticketIndex,1);
    updateLocalStorage();
    console.log(ticketArr);
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
      let ticketIndex = ticketArr.findIndex(function(ticketObj){
        return ticketObj.id==id;
      })
      ticketArr[ticketIndex].value = ticketArea.innerText;
     updateLocalStorage();
      //console.log(ticketArr);
  })
  //handling priority change or cylcic change of priority
  let ticketColor=ticketCont.querySelector('.ticket-color');
  ticketColor.addEventListener('click',function(){
    console.log(ticketColor);
    let currentColor=ticketColor.classList[1];
    let idx;
    for(let i=0;i<color.length;i++){
      if(currentColor ==color[i]){
        idx=i;
        break;
      }
    }
    let nextIdx=(idx+1)%color.length;
    let nextColor= color[nextIdx];
    console.log(nextColor);
    ticketColor.classList.remove(currentColor);
    ticketColor.classList.add(nextColor);
    let ticketIndex = ticketArr.findIndex(function(ticketObj){
      return ticketObj.id == id;
  })
  ticketArr[ticketIndex].color = nextColor;
  updateLocalStorage();
  })
}

  function updateLocalStorage(){
    let ticketArrStr = JSON.stringify(ticketArr);
    localStorage.setItem("TaskArr",ticketArrStr);
  }