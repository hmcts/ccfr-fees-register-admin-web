"use strict";

let keywordClass;

let type = 'fixed';

function formatDecimals(event) {

  event.target.value = parseFloat(event.target.value).toFixed(2);

  if (event.target.value.endsWith(".00")) {
    event.target.value = parseInt(event.target.value);
  }
}

function enableFlatOrVolumeAmount() {
  document.getElementById("amount").removeAttribute("disabled");
  document.getElementById("percentage").setAttribute("disabled", "disabled");
}

function enablePercentageAmount() {
  document.getElementById("percentage").removeAttribute("disabled");
  document.getElementById("amount").setAttribute("disabled", "disabled");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("amountTypepercentage")
    .addEventListener("click", enablePercentageAmount);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("amountTypeflat")
    .addEventListener("click", enableFlatOrVolumeAmount);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("amountTypevolume")
    .addEventListener("click", enableFlatOrVolumeAmount);
});


function showKeywordError() {
  document.getElementById("keyword-error").hidden = false;
  document.getElementById("keyword").className = keywordClass + "form-control-error";
  document.getElementById("submit").disabled = true;
}

function hideKeywordError() {
  document.getElementById("keyword-error").hidden = true;
  document.getElementById("keyword").className = keywordClass;
  document.getElementById("submit").disabled = false;
}

function getValidateKeywordUrl() {

  const service = document.getElementById("service").value;

  const jurisdiction1 = document.getElementById("jurisdiction1").value;

  const jurisdiction2 = document.getElementById("jurisdiction2").value;

  const channel = document.getElementById("channel").value;

  const event = document.getElementById("event").value;

  const keyword = document.getElementById("keyword").value;

  let url = `/admin/v2/prevalidate?event=${event}&channel=${channel}&service=${service}&jurisdiction1=${jurisdiction1}&jurisdiction2=${jurisdiction2}&keyword=${keyword}`;

  const rangeFrom = document.getElementById("fromRange").value;

  const rangeTo = document.getElementById("toRange").value;

  if (type === 'ranged') {
    if (rangeFrom) {
      url += `&rangeFrom=${rangeFrom}`;
    }

    if (rangeTo) {
      url += `&rangeTo=${rangeTo}`;
    }
  }

  return url;
}

/* eslint-disable */
function onKeywordChanged() {

  const service = document.getElementById("service").value;

  const jurisdiction1 = document.getElementById("jurisdiction1").value;

  const jurisdiction2 = document.getElementById("jurisdiction2").value;

  const channel = document.getElementById("channel").value;

  const event = document.getElementById("event").value;

  const keyword = document.getElementById("keyword").value;

  if (!service || service === ""
    || !jurisdiction1 || jurisdiction1 === ""
    || !jurisdiction2 || jurisdiction2 === ""
    || !channel || channel === ""
    || !event || event === ""
    || !keyword || keyword === ""
  ) {
    hideKeywordError();
    return;
  }

  setTimeout(
    () => {

      const newKeyword = document.getElementById("keyword").value;

      if (!newKeyword || newKeyword === "" || keyword !== newKeyword) {
        hideKeywordError();
        return;
      }

      const xhttp = new XMLHttpRequest();

      xhttp.withCredentials = true;

      xhttp.onreadystatechange = function () {

        if (this.readyState !== 4) {
          return;
        }

        if (this.status === 200) {
          return hideKeywordError();
        }

        showKeywordError();

      };

      xhttp.open("GET", encodeURI(getValidateKeywordUrl()), true);

      xhttp.send();

    }, 250
  );
}

/* eslint-enable */

function enableRangedFees() {
  document.getElementById("rangeUnit").removeAttribute("disabled");
  document.getElementById("fromRange").removeAttribute("disabled");
  document.getElementById("toRange").removeAttribute("disabled");

  type = 'ranged';

  onKeywordChanged();
}

function disabledRangedFees() {
  document.getElementById("rangeUnit").setAttribute("disabled", "disabled");
  document.getElementById("fromRange").setAttribute("disabled", "disabled");
  document.getElementById("toRange").setAttribute("disabled", "disabled");

  type = 'fixed';

  onKeywordChanged();
}

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("typefixed")
    .addEventListener("click", disabledRangedFees);
  document.getElementById("typeranged")
    .addEventListener("click", enableRangedFees);

  document.getElementById("amount").onchange = formatDecimals;
  document.getElementById("fromRange").onchange = formatDecimals;
  document.getElementById("toRange").onchange = formatDecimals;

  document.getElementById("keyword")
    .addEventListener("keydown", onKeywordChanged);
  document.getElementById("keyword")
    .addEventListener("input", onKeywordChanged);
  document.getElementById("keyword")
    .addEventListener("change", onKeywordChanged);
  document.getElementById("service")
    .addEventListener("change", onKeywordChanged);
  document.getElementById("jurisdiction1")
    .addEventListener("change", onKeywordChanged);
  document.getElementById("jurisdiction2")
    .addEventListener("change", onKeywordChanged);
  document.getElementById("channel")
    .addEventListener("change", onKeywordChanged);
  document.getElementById("event")
    .addEventListener("change", onKeywordChanged);

  document.getElementById("fromRange")
    .addEventListener("input", onKeywordChanged);
  document.getElementById("toRange")
    .addEventListener("input", onKeywordChanged);

  keywordClass = document.getElementById("keyword").className;

});
