const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');

const amountEL_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateEl =  document.getElementById('rate');


// Fetch exchange rate abd update DOM
function calculate() {
 const currency_one = currencyEl_one.value;
 const currency_two = currencyEl_two.value;

fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
    const rate = data.rates[currency_two];

    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        // console.log(rate);

    amountEl_two.value = (amountEL_one.value *rate).toFixed(2);

    })

}

// Event Listeners

// When <select> list than it's a change event

currencyEl_one.addEventListener('change', calculate);

// Wnen <input> fiel then there is a input event listener

amountEL_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();