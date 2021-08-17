"use strict";

let keywordClass;

let type = "fixed";

function formatDecimals(event) {

  event.target.value = parseFloat(event.target.value).toFixed(2);

  if (event.target.value.endsWith(".00")) {
    event.target.value = parseInt(event.target.value);
  }
}

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

  const service = document.querySelector('input[name="service"]:checked').value;

  const jurisdiction1 = document.querySelector('input[name="jurisdiction1"]:checked').value;

  const jurisdiction2 = document.querySelector('input[name="jurisdiction2"]:checked').value;

  const channel = document.querySelector('input[name="channel"]:checked').value;

  const event = document.querySelector('input[name="event"]:checked').value;

  const keyword = document.getElementById("keyword").value;

  let url = `/admin/v2/prevalidate?event=${event}&channel=${channel}&service=${service}&jurisdiction1=${jurisdiction1}&jurisdiction2=${jurisdiction2}&keyword=${keyword}`;

  const rangeFrom = document.getElementById("fromRange").value;

  const rangeTo = document.getElementById("toRange").value;

  if (type === "ranged") {
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

  const service = document.querySelector('input[name="service"]:checked').value;

  const jurisdiction1 = document.querySelector('input[name="jurisdiction1"]:checked').value;

  const jurisdiction2 = document.querySelector('input[name="jurisdiction2"]:checked').value;

  const channel = document.querySelector('input[name="channel"]:checked').value;

  const event = document.querySelector('input[name="event"]:checked').value;

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

  setTimeout(() => {
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

function displayRangeFeesSection() {
  document.getElementById("ranged-container").style.display="block";
  type = "ranged";

  onKeywordChanged();
}

function hideRangeFeesSection() {
  document.getElementById("ranged-container").style.display="none";
  document.getElementById("ranged-container").classList.remove("disply-section")
  type = "fixed";

  onKeywordChanged();
}

function showFlatAmountSection() {
  document.getElementById("flatAmount").style.display="block";
  document.getElementById("percentageAmount").style.display="none";
  document.getElementById("percentageAmount").classList.remove("disply-section")
  document.getElementById("volumeAmount").style.display="none";
  document.getElementById("volumeAmount").classList.remove("disply-section")
}

function showPercentageSection() {
  document.getElementById("volumeAmount").style.display="none";
  document.getElementById("volumeAmount").classList.remove("disply-section")
  document.getElementById("flatAmount").style.display="none";
  document.getElementById("flatAmount").classList.remove("disply-section")
  document.getElementById("percentageAmount").style.display="block";
}

function showVolumeAmountSection() {
  document.getElementById("volumeAmount").style.display="block";
  document.getElementById("percentageAmount").style.display="none";
  document.getElementById("percentageAmount").classList.remove("disply-section")
  document.getElementById("flatAmount").style.display="none";
  document.getElementById("flatAmount").classList.remove("disply-section")
}

document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("typefixed") && document.getElementById("typeranged")) {
  document.getElementById("typefixed")
    .addEventListener("click", hideRangeFeesSection);
  document.getElementById("typeranged")
    .addEventListener("click", displayRangeFeesSection);
  }

  if (document.getElementById("flat") && document.getElementById("percentage") && document.getElementById("volume")) {
    document.getElementById("flat")
      .addEventListener("click", showFlatAmountSection);
    document.getElementById("percentage")
      .addEventListener("click", showPercentageSection);
      document.getElementById("volume")
      .addEventListener("click", showVolumeAmountSection);
    }

  if (document.getElementById("amount")) {
    document.getElementById("amount").onchange = formatDecimals;
  }
  if(document.getElementById("fromRange") && document.getElementById("toRange")) {
    document.getElementById("fromRange").onchange = formatDecimals;
    document.getElementById("toRange").onchange = formatDecimals;
  }

  if (document.getElementById('keyword')) {
    document.getElementById('keyword').addEventListener('keydown', onKeywordChanged)
  }
  if (document.getElementById('keyword')) {
    document.getElementById('keyword').addEventListener('input', onKeywordChanged)
  }
  if (document.getElementById('keyword')) {
    document.getElementById('keyword').addEventListener('change', onKeywordChanged)
  }
  if (document.getElementById('service')) {
    document.getElementById('service').addEventListener('change', onKeywordChanged)
  }
  if (document.getElementById('jurisdiction1')) {
    document.getElementById('jurisdiction1').addEventListener('change', onKeywordChanged)
  }
  if (document.getElementById('jurisdiction2')) {
    document.getElementById('jurisdiction2').addEventListener('change', onKeywordChanged)
  }
  if (document.getElementById('channel')) {
    document.getElementById('channel').addEventListener('change', onKeywordChanged)
  }
  if (document.getElementById('event')) {
    document.getElementById('event').addEventListener('change', onKeywordChanged)
  }

  if (document.getElementById('fromRange')) {
    document.getElementById('fromRange').addEventListener('input', onKeywordChanged)
  }
  if (document.getElementById('toRange')) {
    document.getElementById('toRange').addEventListener('input', onKeywordChanged)
  }

  if (document.getElementById('keyword')) {
    keywordClass = document.getElementById('keyword').className
  }
});
