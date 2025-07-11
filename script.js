//let mainnumber = JSON.parse(localStorage.getItem("mainnumber")) || 0;
// let array = [
//     {
//         id:0,
//         title:'Cooking',
//         content:'Biriyani making'
//     },
//     {
//         id:1,
//         title:'Reading',
//         content:'Read Harry Potter'
//     }
// ];
let array = JSON.parse(localStorage.getItem('datas'));
if(array === null){
    array = [];
}
function createDetails(){
    const enterButton = document.querySelector('.enter-btn');
    enterButton.addEventListener('click',()=>{
        let newId = getNewId();
        let titleValue = document.querySelector('.task-title').value;
        let contentValue = document.querySelector('.task-content').value;
        if(titleValue && contentValue){
            let dict = {
                id: newId,
                title : titleValue,
                content : contentValue,
                "status" : 'notCompleted',
                "timeAdded":timeAdded()
            };
            array.push(dict);
            localStorage.setItem("datas",JSON.stringify(array));
            renderCards();
        }
        else{
            alert('Enter Some Values for Both. Do not Leave blank');
        }
    });
}

createDetails();

function getNewId(){
    let mainnumber = JSON.parse(localStorage.getItem("mainnumber")) || 0;
    const no = mainnumber;
    localStorage.setItem('mainnumber',JSON.stringify(mainnumber+1));
    return no;
}

function renderCards(){
    let mainSite = '';
    array.forEach((value)=>{
        let eachCard = `
            <div class="card cardId${value.id}" data-card-id = "${value.id}">
  <div class="card-header">
     <h3 class="card-title titleId${value.id} ${value.status}">${value.title} <span id="${value.status}" class="added-time">${value.timeAdded}</span></h3>
  </div>
  <div class="card-body">
    <p class="card-text contentId${value.id} ${value.status}">${value.content}</p>
    <button type="button" id="${value.status}" class="completed-btn btn btn-success FinishId${value.id}" data-card-id = "${value.id}">Finish</button>
    <button type="button" class="btn btn-danger delete-btn DeleteId${value.id}" data-card-id = "${value.id}">Delete</button>
  </div>
</div>
        `
    mainSite = mainSite + eachCard;
    });
    
    document.querySelector('.todolist-cards').innerHTML = mainSite;
}
renderCards();

//this is for finishing
document.querySelector('.todolist-cards').addEventListener('click', (event) => {
    if (event.target.classList.contains('completed-btn')) {
        const btnId = event.target.dataset.cardId;
        array.forEach((item) => {
            if (item.id === Number(btnId)) {
                item.status = 'finished';
            }
        });
        localStorage.setItem("datas", JSON.stringify(array));
        document.querySelector('.added-time').classList.add('displaynone');
        renderCards();
    }
});

document.querySelector('.todolist-cards').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
    const btnId = event.target.dataset.cardId;
    array = array.filter(item => item.id !== Number(btnId));
    localStorage.setItem("datas", JSON.stringify(array));
    renderCards();
}
});

function showTime(){
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let ampm = 'AM';
    if(hour>12){
        hour = hour - 12;
        ampm = 'PM';
    }
    hour = hour < 10 ? "0"+hour:hour;
    min = min < 10 ? "0"+min:min;
    sec = sec < 10 ? "0"+sec:sec;
    console.log(hour,min,sec,ampm);   
    let time = hour+":"+min+":"+sec+" "+ampm;
    document.querySelector(".clock").innerText = time;   
}
setInterval(()=>{
    showTime();
},1000);

function timeAdded(){
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let ampm = 'AM';
    if(hour>12){
        hour = hour - 12;
        ampm = 'PM';
    }
    hour = hour < 10 ? "0"+hour:hour;
    min = min < 10 ? "0"+min:min;
    sec = sec < 10 ? "0"+sec:sec;
    console.log(hour,min,sec,ampm);   
    let time = hour+":"+min+":"+sec+" "+ampm;
    // document.querySelector(".added-time").innerText = time;
    return time
}