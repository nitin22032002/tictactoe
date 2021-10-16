let name={'X':prompt("Enter X Name "),'O':prompt("Enter O Name ")}
let alertTag=document.querySelector('.alert')
let alertAudio=new Audio('alert.mp3')
let moveAudio=new Audio('move.mp3')
let winAudio=new Audio('win.mp3')
let turnTag=document.getElementById('turn')
let column=Array.from(document.getElementsByClassName('cols'))
let btn=Array.from(document.getElementsByClassName('btn'))
let table=document.querySelector('.toe-table')
let chance=0
let turn=true;
let row=3
let col=3
if(window.screen.width<900){
    table.style.width="100%"
    alertTag.style.height="20px";
}
const showAlert=(msg,color)=>{
alertTag.innerText=msg;
alertTag.style.backgroundColor=color;
alertTag.style.display='block';
setTimeout(()=>{
    alertTag.style.display='none'
},3000)
}
const readGrid=()=>{
    column.map((item)=>{
        item.addEventListener('click',handleClick)
        item.setAttribute('status',true)
        if(col===4){
            item.style.width=`60px`
            
        }
        else if(col>3){
            table.style.width="50%"
            item.style.width=`140px`
        }
        else{
            table.style.width="30%"
            item.style.width=`40px`
        }
    })
    if(window.screen.width<900){
        table.style.width="100%"
        alertTag.style.height="20px";
    }
}
const handleBtnClick=(e)=>{
    showAlert("Now Tic Tac Toe Shifted on "+e.target.innerText+" Grid System",'lightgreen')
    let a=e.target.innerText.split('x')
    row=parseInt(a[0])
    col=parseInt(a[1])
    designBox(row,col)
}
// use to handle 0 and x represent on block
const handleClick=(e)=>{
    if(e.target.getAttribute('status')==="true"){
        moveAudio.play()
        e.target.setAttribute('status',false)
        if((chance%2==0 && turn) || (chance%2!==0 && !turn)){
        e.target.innerText="X"
        turnTag.innerText="O"
    }
    else if((chance%2==0 && !turn) || (chance%2!==0 && turn)){
        e.target.innerText="O"
        turnTag.innerText="X"
    }
    chance++;
checkWinnner()
}
    else{
        showAlert("Invalid Move This Block Already filled By player",'red')
        alertAudio.play()
    }
}
// used to generate winning position array
const generateWinningArray=(row,col)=>{
    let arr=[]
    for(let i=0,k=0;k<row;i+=(col),k++){
        arr.push(range(i,col+i));
    }
    for(let i=0;i<col;i++){
        arr.push(range(i,((row-1)*col)+i+1,col));
    }
    arr.push(range(0,row*col,col+1))
    arr.push(range(col-1,((row-1)*col)+1,col-1))
    return arr;
}
// range function to create array for given range

const range=(start,stop,gap=1)=>{
    let arr=[]
    for(let i=start;i<stop;i+=gap){
        arr.push(i)
    }
    return arr;
}

// winning array
let winningPosition=generateWinningArray(row,col)
//****************** */
readGrid()
btn.map((item)=>{
    item.addEventListener('click',handleBtnClick)
})
//******************************** */
// used tto compare user win or not
const getWinner=(arr)=>{
    let a=column[arr[0]]
    for(let i=1;i<arr.length;i++){
        b=column[arr[i]]
        if(!compare(a,b)){
            return false
        }
        a=b;
    }
    return true;
}
const compare=(a,b)=>{
    if(a.innerText===b.innerText  && a.getAttribute('status')!=="true" && b.getAttribute('status')!=="true")
        return true
    return false
}

// used to highlight grid by which player win

const highLight=(arr)=>{
    arr.map((item)=>{
        column[item].style.backgroundColor="red"
    })
}

// used to check game state (win , draw or more chance remain)

const checkWinnner=()=>{
        let isWinner=winningPosition.filter((item)=>{
            return getWinner(item)
        })
        if(isWinner.length!==0){
            isWinner.map((item)=>{
                highLight(item)
            })
            setTimeout(()=>{
                winAudio.play()
                turn=!turn
            showAlert(`${name[column[isWinner[0][0]].innerText]} win the game`,'lightgreen')
            designBox(row,col)},500)}
    else if(chance===row*col){
        setTimeout(()=>{
            turn=!turn
        showAlert("Match Is Draw",'orange')
        designBox(row,col)},50)
    }
}
const designBox=(row,col)=>{
    table.innerHTML=""
    s=""
    for(let i=0;i<row;i++){
        s+="<tr class='rows'>"
        for(let j=0;j<col;j++){
            s+=` <td class="cols"></td>`
        }
        s+="</tr>"
    }
    table.innerHTML=s;
    winningPosition=generateWinningArray(row,col);
    column=Array.from(document.getElementsByClassName('cols'))
    chance=0
    readGrid();
    if(turn)
        turnTag.innerText="X"
    else
        turnTag.innerText="O"
}