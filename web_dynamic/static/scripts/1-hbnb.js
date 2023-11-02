$(document).ready(function () {
    let selectedAmenities = {};
    $(document).on('change', 'input[type=checkbox]', function () {
      if (this.checked) {
        selectedAmenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete selectedAmenities[$(this).data('id')];
      }
      console.log(this.checked);
      let lst = Object.values(selectedAmenities);
      if (lst.length > 0) {
        $('div.amenities > h4').text(lst.join(', '));
      }
      console.log(lst);
    });
  });