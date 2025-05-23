$(document).ready(function () {
  "use strict";

  $(".mobMenuIcon i.fa-bars").click(function () {
    $(".navmenu").toggleClass("show");
  });

  $("li.smooth-menu a,a.contactCTABtn,a.topBtn").bind(
    "click",
    function (event) {
      event.preventDefault();
      var anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top - 0,
          },
          1200,
          "easeInOutExpo"
        );
      $(".navmenu").removeClass("show");
    }
  );

  $(".contactForm").submit(function (event) {
    event.preventDefault();
    //console.log("Prevented");

    var valid;
    valid = validateContact();
    if (valid) {
      var datastream =
        "name=" +
        $("#name").val() +
        "&company=" +
        $("#company").val() +
        "&email=" +
        $("#email_address").val() +
        "&phone=" +
        $("#phone").val() +
        "&startDate=" +
        $("#estimated_start_date").val() +
        "&project=" +
        $("#tell_us_about_your_project").val();
      jQuery.ajax({
        url: "contact_mail.php",
        data: datastream,
        type: "POST",
        success: function (data) {
          $("#mail-status").html(data);
          if (data.indexOf("success") != -1) {
            $("#name").val("");
            $("#company").val("");
            $("#email_address").val("");
            $("#phone").val("");
            $("#estimated_start_date").val("Not selected");
            $("#tell_us_about_your_project").val("");
          }
          setTimeout(function () {
            $("#mail-status").html("");
          }, 5000);
        },
        error: function () {},
      });
      //console.log(datastream);
    }
  });

  function validateContact() {
    var valid = true;
    $(".info").html("");

    if (!$("#name").val()) {
      $("#name-info").html("(required)");
      valid = false;
    }
    if (!$("#company").val()) {
      $("#company-info").html("(required)");
      valid = false;
    }
    if (!$("#email_address").val()) {
      $("#email-info").html("(required)");
      valid = false;
    }
    if (
      !$("#email_address")
        .val()
        .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
    ) {
      $("#email-info").html("(invalid)");
      valid = false;
    }
    if (!$("#tell_us_about_your_project").val()) {
      $("#project-info").html("(required)");
      valid = false;
    }

    return valid;
  }

  //  $(window).load(function() {
  //     //$(".heroImage img").attr('src',$(".heroImage img").attr('src').replace("hero-1", "thumbnails"));
  //    setTimeout(function() {$(".heroImage img").attr('src',$(".heroImage img").attr('src').replace("thumbnails-1x", "thumbnails"));}, 5000);
  // });
});
