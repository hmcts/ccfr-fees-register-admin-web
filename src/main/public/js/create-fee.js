'use strict'

function enableRangedFees() {
  document.getElementById("rangeUnit").removeAttribute("disabled")
  document.getElementById("fromRange").removeAttribute("disabled")
  document.getElementById("toRange").removeAttribute("disabled")
}

function disabledRangedFees() {
  document.getElementById("rangeUnit").setAttribute("disabled", "disabled")
  document.getElementById("fromRange").setAttribute("disabled", "disabled")
  document.getElementById("toRange").setAttribute("disabled", "disabled")
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('typefixed')
    .addEventListener('click', disabledRangedFees);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('typeranged')
    .addEventListener('click', enableRangedFees);
});

function enableFlatOrVolumeAmount() {
  document.getElementById("amount").removeAttribute("disabled")
  document.getElementById("percentage").setAttribute("disabled", "disabled")
}

function enablePercentageAmount() {
  document.getElementById("percentage").removeAttribute("disabled")
  document.getElementById("amount").setAttribute("disabled", "disabled")
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('amountTypepercentage')
    .addEventListener('click', enablePercentageAmount);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('amountTypeflat')
    .addEventListener('click', enableFlatOrVolumeAmount);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('amountTypevolume')
    .addEventListener('click', enableFlatOrVolumeAmount);
});
