function onChange(event) {
  const { value } = event.target;

  const nonDigitReg = /\D/g;

  if (value.search(nonDigitReg) !== -1) {
    error("please only type numbers");
    return;
  } else {
    error("");
  }

  const imageEl = document.querySelector("#credit-card");

  if (value.length >= 13 && value.length <= 16) {
    let cardType = "invalid";

    if (checksum(value)) {
      const test = value.slice(2);

      if (test === "34" || test === "37") {
        cardType = "american-express";
      }

      if (["51", "52", "53", "54", "55"].some((value) => value === test)) {
        cardType = "master-card";
      }

      if (value[0] === "4") {
        cardType = "visa";
      }
    }

    imageEl.src = `assets/${cardType}.svg`;

    return;
  }

  imageEl.src = "";
}

function checksum(cardNumber) {
  let sum = 0;

  for (let i = cardNumber.length - 2; i >= 0; i -= 2) {
    const x = (Number(cardNumber[i]) * 2).toString();
    sum += x.split("").reduce((acc, curr) => acc + Number(curr), 0);
  }

  for (let i = cardNumber.length - 1; i >= 0; i -= 2) {
    sum += Number(cardNumber[i]);
  }

  return sum % 10 === 0;
}

function error(message) {
  document.querySelector("#error").textContent = message;
}

function main() {
  const inputEl = document.querySelector(".control-group input");
  inputEl.addEventListener("keyup", onChange);
}

main();
