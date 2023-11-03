$(document).ready(function () {
  const ip = 'http://' + window.location.hostname;
  let selectedAmenities = {};
  $(document).on("change", "input[type=checkbox]", function () {
    if (this.checked) {
      selectedAmenities[$(this).data("id")] = $(this).data("name");
    } else {
      delete selectedAmenities[$(this).data("id")];
    }
    let lst = Object.values(selectedAmenities);
    if (lst.length > 0) {
      $("div.amenities > h4").text(lst.join(", "));
    } else {
      $("div.amenities > h4").html("&nbsp;");
    }
  });

  $.get(ip + ":5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
