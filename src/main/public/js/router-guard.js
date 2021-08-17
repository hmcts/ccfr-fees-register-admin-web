"use strict";

document.addEventListener("DOMContentLoaded", function () {
  if(document.getElementById('userRole').value === 'Approver') {
    window.location.href = "/admin/V2/pending-approval";
  }
});
