// const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
console.log(toCurr.value,"hii")
const msg = document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
});

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText =currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected"
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
})

updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // console.log(URL)
    // let response = await fetch(URL);
    // console.log(response)
    // let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];

    const url = 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '61ae4b0b5fmshc7ab76e6a1218ddp10306ajsnc402baa202e5',
            'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com'
        }
    };
    
    
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    
     const rate = result.rates[toCurr.value];
     console.log(rate)

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
} 