$(document).ready(function () {
  const ip = 'http://' + window.location.hostname;
  const selectedAmenities = {};
  $(document).on('change', 'input[type=checkbox]', function () {
    if (this.checked) {
      selectedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete selectedAmenities[$(this).data('id')];
    }
    const lst = Object.values(selectedAmenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(lst.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  $.get(ip + ':5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: ip + ':5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $('section.places').append(
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
  });
});
