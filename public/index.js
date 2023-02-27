
let i=0;
let tArea=document.getElementById("tArea")

document.getElementById("tArea").addEventListener("keyup",getValue);


function getData(callback){
    let request=new XMLHttpRequest;
        request.open('POST','/getdata');
        request.send();
        request.addEventListener("load",function(){
            if(request.status===200){
                console.log(request.responseText)
                callback(request.responseText);
            }
        })
}
window.addEventListener("load",()=>{
   
    tArea.innerHTML=''
    //making an ajax request to get the data
    getData(function(data){
        console.log(typeof data);
        if(data!=undefined){
             data=JSON.parse(data);
    
            data.forEach(function(value){
                displayToDo(value)
            })
        }
    });
});
 
function getValue(event){
    if(event.keyCode==13){
       
        if(tArea.value.trim()!=''){
            saveToDo(tArea.value.trim(),function(val){
                 displayToDo(val);
                console.log("success");
            })
            
        tArea.value='' 
        
        tArea.blur();
        tArea.focus();
      }
}
}
function saveToDo(val,callback){
        let request=new XMLHttpRequest;
        request.open('POST','/savetodo');
        request.setRequestHeader("Content-Type","application/json");
        let obj={id:i,task:val,checked:false};
        console.log(obj);
        request.send(JSON.stringify(obj));


        request.addEventListener("load",function(){
            request.status===200 && callback(obj);
        })
}
function displayToDo(value){
    console.log(value);
    i++;
    let str=document.createElement("div");
      str.style.display="flex"
      str.setAttribute("id",`str${value.id}`)
      str.style.borderBottom="solid black 1px"
      str.style.justifyContent="space-between"
      if(value.checked==true){
         str.innerHTML=`<div style="text-decoration: line-through; flex-basis: 50%;" id=edit${value.id}>${value.task}</div>
         <div style:"display:flex ;flex-basis: 50%; min-width: 300px;">
         
         <input type="checkbox" onclick="checkIfSelect(${value.id})" Checked>
         <button type="button"  onclick="deleteThisItem(${value.id})">x</button>
         </div>`;
         // if(value.checked==true){
            
         //   str.style.textDecoration="line-through";
         // }
         //let myHr=document.createElement("hr");
         myDiv.appendChild(str)
        
      }
      else {
         str.innerHTML=`<div id=edit${value.id} style="flex-basis: 50%;">${value.task}</div>
         <div style:"display:flex; flex-basis: 50%; min-width: 300px;">
       
         <input type="checkbox"  onclick="checkIfSelect(${value.id})" id="check${value.id}">
         <button type="button"  onclick="deleteThisItem(${value.id})">x</button>
         </div>`;
         myDiv.appendChild(str)
      }
     //let myHr=document.createElement("hr");  
}
function checkIfSelect(value){
    
    updateData(value,function(parameter){
        console.log("Are you coming here");
        console.log(parameter)
        let checkBoxVal=document.getElementById("check"+value);
       
         console.log("Printing the value of checkBoxVal "+checkBoxVal)
         let element= document.getElementById(`edit${value}`);
         if(parameter.checked){
            element.style.textDecoration="line-through"
         }
         else {
           element.style.textDecoration="none";
         }
        
    })
}

function updateData(value,callback){
    console.log(value)
    let request=new XMLHttpRequest;
    request.open('POST','/update');
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({id:value}));
    console.log("prining after send function")

    request.addEventListener("load",function(){
        console.log("printing in the listener")
        console.log(request.status)
        request.status===200 && callback(JSON.parse(this.responseText));
        
    })
}
function deleteThisItem(value){
    deleteData(value,function(){
         let deleteElement=document.getElementById(`str${value}`);
         deleteElement.remove();
    })
}
function deleteData(value,callback){
    console.log(value)
    let request=new XMLHttpRequest;
    request.open('POST','/delete');
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({id:value}));
    console.log("prining after send function")

    request.addEventListener("load",function(){
        console.log("printing in the listener")
        console.log(request.status)
        request.status===200 && callback();
        
    })
}