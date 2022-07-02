const btn = document.querySelector('#btn');
const input = document.querySelector("#input");
const p1 = document.querySelector('#p1');
const p2 = document.querySelector("#p2");
let address = ''

btn.addEventListener("click", function (e) {
  e.preventDefault();
  address = input.value.trim();
  console.log(address);

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        p1.textContent = data.error;
      } else {
        console.log(`location: ${data.location}`);
        p2.innerHTML = '<strong>Location: </strong>' + data.location
        console.log(`forecast: ${data.forecast}`);
        p1.innerHTML = "<strong>Forecast: </strong>" + data.forecast;
      }
    });
  });
});


