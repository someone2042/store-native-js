import users from './list.json' assert{type: 'json'};

const shop = document.getElementById("shop");

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
    for(let j=0;j<users[i].img.length;j++)
    {
        radio+='<img src="'+users[i].img[j]+'" alt=""></img>'
    }
    let div = document.getElementById(i);
    div.innerHTML='<div class="photo"><div class="imageshow"><img src="'+users[i].img[0]+'" alt=""></div><div class="radio">'+radio+'</div></div><div class="more_info"><p>'+users[i].titre+'</p><p>'+users[i].info+'</p><h2>$ '+users[i].price+'</h2><center><button onclick="add('+i+')">Add to Cart</button></center><center><h5 onclick="showless('+i+')">show less</h5></center></div>'
    div.setAttribute('class','showpro');
    div.setAttribute('onclick','');
    let timeoutID = setTimeout(()=>{document.getElementById(i).scrollIntoView()}, 10);
}
export function showless(i)
{
    let div = document.getElementById(i);
    div.innerHTML='<div class="image"><img src="'+users[i].img[0]+'" alt=""></div><div class="info"><p>'+users[i].titre+'</p><p>$'+users[i].price+'</p></div>';
    div.setAttribute('class','prod');
    div.setAttribute('id',i);
    let timeoutID = setTimeout(()=>{div.setAttribute('onclick','show('+i+');');document.getElementById(i).scrollIntoView()}, 300);
}