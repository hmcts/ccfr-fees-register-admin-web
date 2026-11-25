$(document).ready(function () {
  // Trigger a link styled to look like a button, with role="button",
  // when the space key is pressed (replaces GOV.UK toolkit shim-links-with-button-role.js).
  $(document).on('keydown', 'a[role="button"]', function (event) {
    if (event.which === 32) {
      event.preventDefault()
      this.click()
    }
  })
})
