$(document).ready(function($) {
  //bootstrap modal centered
  $(function() {
    function reposition() {
      var modal = $(this),
        dialog = modal.find('.modal-dialog');
      modal.css('display', 'block');

      // Dividing by two centers the modal exactly, but dividing by three
      // or four works better for larger screens.
      dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
      $('.modal:visible').each(reposition);
    });
  });


  //lightbox gallery
  $(".lightbox").lightGallery({
    download: false,
    selector: '.lightbox__image'
  });

  //smooth scroll
  $('a.smooth-scroll').on("click touchstart", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 0
        }, 1000);
        return false;
      }
    }
  });

  $('.gallery__link--video').on('click', function(event) {
    var videoLink = $(this).data('video');

    $('#modal-gamevideo .embed-responsive').append('<iframe class="embed-responsive-item" src="'+videoLink+'" allowfullscreen></iframe>');
  });

  $('#modal-gamevideo').on('hidden.bs.modal', function () {
    $(this).find('.embed-responsive-item').remove();
  });



  /*form submit*/
  function validate(field, type) {
    var pp = '';

    if (type === 'email') {
      pp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    }

    if (type === 'onlyNumber') {
      pp = /^([0-9()\/+ -]+)$/;
    }

    if (type == 'phone') {
      pp = /^\+?[\d()\-\s]*\d+\s*$/;
    }

    if (type === 'notEmpty') {
      pp = /^[A-Za-zА-Яа-я0-9 _]*[A-Za-zА-Яа-я0-9][A-Za-zА-Яа-я0-9 _#()$@8%№;'":,.+?!#*-/\n]*$/;
    }

    if (!field.match(pp)) {
      return false;
    }
    return true;
  }

  var required = 0;
  var validated = 0;

  //проверяем валидность при изменение текста в инпутах
  $('body').on('input', '.required', function() {
    var fieldType = $(this).data('validate');

    if (!validate($(this).val(), fieldType)) {
      $(this).parent().removeClass('has-success').addClass('has-error');

    } else {
      $(this).parent().removeClass('has-error').addClass('has-success');
    }

    required = $(this).parents('form').find('.required').length;
    validated = $(this).parents('form').find('.has-success').length;
  });

  //проверяем валидность когда нажимается конпка
  $('form').on("submit", function(event) {
    var $form = $(this);

    //проверяем обязательные поля на валидность
    $form.find('.required').each(function() {
      var fieldType = $(this).data('validate');
      if (!validate($(this).val(), fieldType)) {
        $(this).parent().removeClass('has-success').addClass('has-error');
      } else {
        $(this).parent().removeClass('has-error').addClass('has-success');
      }
    });


    required = $form.find('.required').length;
    validated = $form.find('.has-success').length;

    //если нет ошибок
    if (required === validated) {
      $(this).find('.has-success').removeClass('has-success');
      return true;
    } else {
      return false;
    }
  });
});
