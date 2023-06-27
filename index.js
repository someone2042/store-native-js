import users from './list.json' assert{type: 'json'};

const shop = document.getElementById("shop");
let shoplist = new Array();
let blur=false;
if(blur)
{
    
}

for(let i=0;i<users.length;i++)
{
    // let radio =document.createElement("div");
    let div = document.createElement('div');
    div.innerHTML='<div class="image"><img src="'+users[i].img[0]+'" alt=""></div><div class="info"><p>'+users[i].titre+'</p><p>$'+users[i].price+'</p></div>'
    div.setAttribute('class','prod');
    div.setAttribute('onclick','show('+i+');')
    div.setAttribute('id',i)
    shop.appendChild(div);
}

export function show(i)
{
    let radio='';
    if(document.querySelector(".showpro")!=(null||undefined))
    {
        document.querySelector(".showpro").remove()
    }
    for(let j=0;j<users[i].img.length;j++)
    {
        radio+='<img onclick="change('+i+','+j+')" src="'+users[i].img[j]+'" alt=""></img>'
    }
    let div = document.getElementById(i);
    let a = document.createElement("div")
    a.innerHTML='<div class="photo"><div class="imageshow"><img src="'+users[i].img[0]+'" alt=""></div><div class="radio">'+radio+'</div></div><div class="more_info"><p>'+users[i].titre+'</p><p>'+users[i].info+'</p><h2>$ '+users[i].price+'</h2><center><button class=".button" onclick="add('+i+')">Add to Cart</button></center><center><h5 onclick="showless('+i+')">show less</h5></center></div>'
    a.setAttribute('class','showpro');
    a.classList.add("fade-in");
    div.parentNode.parentNode.appendChild(a);
    blur=true;
    a.setAttribute('id',i+'a');
    setTimeout(function() {
        document.getElementById("shop").classList.add("face-out");
        a.classList.remove("fade-in");
        a.classList.add("fade-out");
    }, 2);
}
export function showless(i)
{
    document.getElementById("shop").classList.remove("face-out");
    let div = document.getElementById(i+'a');
    div.parentNode.removeChild(div);
    blur=false;
    let timeoutID = setTimeout(()=>{div.setAttribute('onclick','show('+i+');');document.getElementById(i).scrollIntoView()}, 3);
}
export function change(i,j)
{
    let img = document.getElementById(i+"a").firstChild.firstChild.firstChild
    img.src=users[i].img[j];
}
export function add(j)
{
    console.log(shoplist)
    let pos=-1
    for(let i=0;i<shoplist.length;i++)
    {
        if(shoplist[i].id==j)
        {
            pos=i;
            break;
        }
    }
    if(pos==-1)
    {
        let k=
        {
            id:j,
            number:1
        };
        shoplist.push(k);
    }
    else
    {
        shoplist[pos].number++;
    }
}