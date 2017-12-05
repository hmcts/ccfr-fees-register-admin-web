'use strict'

function enableRangedFees() {
  document.getElementById("fromRange").removeAttribute("disabled")
  document.getElementById("toRange").removeAttribute("disabled")
}

function disabledRangedFees() {

  document.getElementById("fromRange").setAttribute("disabled", "")
  document.getElementById("toRange").setAttribute("disabled", "")
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('typefixed')
    .addEventListener('click', disabledRangedFees);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('typeranged')
    .addEventListener('click', enableRangedFees);
});

function enableFlatAmount() {
  document.getElementById("amount").removeAttribute("disabled")
  document.getElementById("percentage").setAttribute("disabled", "")
}

function enablePercentageAmount() {
  document.getElementById("percentage").removeAttribute("disabled")
  document.getElementById("amount").setAttribute("disabled", "")
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('amountTypepercentage')
    .addEventListener('click', enablePercentageAmount);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('amountTypeflat')
    .addEventListener('click', enableFlatAmount);
});
