import users from './list.json' assert{type: 'json'};

const shop = document.getElementById("shop");
let shoplist = new Array();
let cart_apear=false;
function check()
{
    if(cart_apear)
    {
        document.getElementById("cart").classList.remove("hide_cart");
        document.getElementById("shop").classList.add("face-out");
    }
    else
    {
        document.getElementById("cart").classList.add("hide_cart");
        document.getElementById("shop").classList.remove("face-out");
    }
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
    a.innerHTML='<div class="photo"><div class="imageshow"><img src="'+users[i].img[0]+'" alt=""></div><div class="radio">'+radio+'</div></div><div class="more_info"><p>'+users[i].titre+'</p><p>'+users[i].info+'</p><h2>$ '+users[i].price+'</h2><center><button class="button" onclick="add('+i+')">Add to Cart</button></center><center><h5 onclick="showless('+i+')">show less</h5></center></div>'
    a.setAttribute('class','showpro');
    a.classList.add("fade-in");
    div.parentNode.parentNode.appendChild(a);
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
    // let timeoutID = setTimeout(()=>{div.setAttribute('onclick','show('+i+');');document.getElementById(i).scrollIntoView()}, 3);
}
export function change(i,j)
{
    let img = document.getElementById(i+"a").firstChild.firstChild.firstChild
    img.src=users[i].img[j];
}
export function add(j)
{
    let pos=-1
    for(let i=0;i<shoplist.length;i++)
    {
        // if(shoplist[i]==undefined){break;}
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
        let cart = document.getElementById("cart");
        let div = document.createElement("div");
        div.innerHTML=`
        <div class="imageshow">
            <img src="`+users[k.id].img[0]+`" alt="erth">
        </div>
        <div class="cart_info">
            <table style="width: 100%;">
                <tr>
                    <td style="text-align: left;padding-left: 10px;">price:</td>
                    <td style="text-align: right;padding-right: 10px;">`+users[k.id].price+`$</td>
                </tr>
            </table>
            <div class="price_confige">
                <button onclick="move(`+k.id+`,0);" style="background-color: red;">-</button>
                <p id="`+k.id+`shop" >(`+k.number+`)</p>
                <button onclick="move(`+k.id+`,1);" style="background-color: green;">+</button>
            </div>
        </div>`
        div.setAttribute("class","prod_cart");
        div.setAttribute("id",k.id+"div");
        cart.appendChild(div);
    }
    else
    {

        shoplist[pos].number++;
        document.getElementById(shoplist[pos].id+"shop").innerText="("+shoplist[pos].number+")";
    }
    document.getElementById("number").style.display="grid"
    document.getElementById("empty").style.display="none"
    document.getElementById("number").innerText=shoplist.length;
    total();
}
export function cart()
{
    if(shoplist.length==0)
    {
        document.getElementById("cart").style.display="block"
    }
    else
    {
        document.getElementById("cart").style.display="grid"
    }
    
    if(!cart_apear)
    {
        cart_apear=true;
    }
    else
    {
        cart_apear=false;
    }
    check();
}
export function move(i,k)
{
    let pos=-1
    for(let j=0;j<shoplist.length;j++)
    {
        if(shoplist[j].id==i)
        {
            pos=j;
            break;
        }
    }
    if(k==1)
    {
        shoplist[pos].number++;
        document.getElementById(i+"shop").innerText="("+shoplist[pos].number+")";
    }
    else
    {
        shoplist[pos].number--;
        document.getElementById(i+"shop").innerText="("+shoplist[pos].number+")";
        if(shoplist[pos].number==0)
        {
            delete shoplist[pos];
            shoplist.length--;
            document.getElementById(i+"shop").parentNode.parentNode.parentNode.remove();
            document.getElementById("number").innerText=shoplist.length;
        }
    }
    if(shoplist.length==0)
    {
        document.getElementById("cart").style.display="block"
        document.getElementById("number").style.display="none"
        document.getElementById("empty").style.display="grid"
    }
    total();
}
function total()
{
    let some=0.00;
    if (!shoplist.length==0)
    {
        for(let i=0;i<shoplist.length;i++)
        {
            some+=shoplist[i].number*users[shoplist[i].id].price;
        }
    }
    document.getElementById("total").innerText="total:   "+some.toFixed(2)+"$";
}