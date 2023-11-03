$(document).ready(function () {
  const ip = 'http://' + window.location.hostname;
  let selectedStates = {};
  let selectedCities = {};
  let selectedLocations = {};
  let selectedAmenities = {};
  $(document).on("change", ".amenities > .popover > ul > li > input[type=checkbox]", function () {
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
    console.log(selectedAmenities);
  });

  $(document).on("change", ".locations > .popover > ul > li > input[type=checkbox]", function () {
    if (this.checked) {
      selectedStates[$(this).data("id")] = $(this).data("name");
      selectedLocations[$(this).data("id")] = $(this).data("name");
    } else {
      delete selectedStates[$(this).data("id")];
      delete selectedLocations[$(this).data("id")];
    }
    let lst = Object.values(selectedLocations);
    if (lst.length > 0) {
      $("div.locations > h4").text(lst.join(", "));
    } else {
      $("div.locations > h4").html("&nbsp;");
    }
    console.log(selectedStates);
  });

  $(document).on("change", ".locations > .popover > ul > li > ul > li > input[type=checkbox]", function () {
    if (this.checked) {
      selectedCities[$(this).data("id")] = $(this).data("name");
      selectedLocations[$(this).data("id")] = $(this).data("name");
    } else {
      delete selectedCities[$(this).data("id")];
      delete selectedLocations[$(this).data("id")];
    }
    let lst = Object.values(selectedLocations);
    if (lst.length > 0) {
      $("div.locations > h4").text(lst.join(", "));
    } else {
      $("div.locations > h4").html("&nbsp;");
    }
    console.log(selectedCities);
  });

  $.get(ip + ":5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
  $.ajax({
    url: ip + ":5001/api/v1/places_search/",
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: searchPlaces
  });
  $('.filters button').click(function () {
    $.ajax({
      url: ip + ":5001/api/v1/places_search/",
      type: 'POST',
      data: JSON.stringify({'states': Object.keys(selectedStates), 'cities': Object.keys(selectedCities), 'amenities': Object.keys(selectedAmenities)}),
      contentType: 'application/json',
      dataType: 'json',
      success: searchPlaces
    });
  });
});

  function searchPlaces (data) {
    $("section.places").empty();
    for (const place of data) {
      $("section.places").append(
        `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guests
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedrooms
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathrooms
            </div>
          </div>
          <div class="description">${place.description}</div>
        </article>
      `
      );
    }
  }
