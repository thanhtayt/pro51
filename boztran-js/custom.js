$(window).on("load", function () {
  "use strict";
  $("#preloader").delay(350).fadeOut("slow");
  var isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (!isChrome) {
    document.getElementsByClassName("infinityChrome")[0].style.display = "none";
    document.getElementsByClassName("infinity")[0].style.display = "block";
  }
  setTimeout(function () {
    new WOW().init();
  }, 0);
  var dynamicDelay = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  var fallbackValue = "200ms";
  $(".blog-item.wow").each(function (index) {
    $(this).attr(
      "data-wow-delay",
      typeof dynamicDelay[index] === "undefined"
        ? fallbackValue
        : dynamicDelay[index] + "ms"
    );
  });
  $(".portfolio-filter").on("click", "li", function () {
    var filterValue = $(this).attr("data-filter");
    $container.isotope({ filter: filterValue });
  });
  $(".portfolio-filter").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "li", function () {
      $buttonGroup.find(".current").removeClass("current");
      $(this).addClass("current");
    });
  });
  var $container = $(".portfolio-wrapper");
  $container.imagesLoaded(function () {
    $(".portfolio-wrapper").isotope({
      itemSelector: '[class*="col-"]',
      percentPosition: true,
      masonry: {
        columnWidth: '[class*="col-"]',
      },
    });
  });
  var bolbyPopup = function () {
    $(".work-image").magnificPopup({
      type: "image",
      closeBtnInside: false,
      mainClass: "my-mfp-zoom-in",
    });
    $(".work-content").magnificPopup({
      type: "inline",
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: "auto",
      closeBtnInside: false,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: "my-mfp-zoom-in",
    });
    $(".work-video").magnificPopup({
      type: "iframe",
      closeBtnInside: false,
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          "</div>",
        patterns: {
          youtube: {
            index: "youtube.com/",
            id: "v=",
            src: "https://www.youtube.com/embed/%id%?autoplay=1",
          },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1",
          },
          gmaps: {
            index: "//maps.google.",
            src: "%id%&output=embed",
          },
        },
        srcAction: "iframe_src",
      },
    });
    $(".gallery-link").on("click", function () {
      $(this).next().magnificPopup("open");
    });
    $(".gallery").each(function () {
      $(this).magnificPopup({
        delegate: "a",
        type: "image",
        closeBtnInside: false,
        gallery: {
          enabled: true,
          navigateByImgClick: true,
        },
        fixedContentPos: false,
        mainClass: "my-mfp-zoom-in",
      });
    });
  };
  bolbyPopup();
  var curPage = 1;
  var pagesNum = $(".portfolio-pagination").find("li a:last").text();
  $container.infinitescroll(
    {
      itemSelector: ".grid-item",
      nextSelector: ".portfolio-pagination li a",
      navSelector: ".portfolio-pagination",
      extraScrollPx: 0,
      bufferPx: 0,
      maxPage: 6,
      loading: {
        finishedMsg: "No more works",
        msgText: "",
        speed: "slow",
        selector: ".load-more",
      },
    },
    function (newElements) {
      var $newElems = $(newElements);
      $newElems.imagesLoaded(function () {
        $newElems.animate({ opacity: 1 });
        $container.isotope("appended", $newElems);
      });
      bolbyPopup();
      curPage++;
      if (curPage == pagesNum) {
        $(".load-more").remove();
      }
    }
  );
  $container.infinitescroll("unbind");
  $(".load-more .btn").on("click", function () {
    $container.infinitescroll("retrieve");
    $(".load-more .btn i").css("display", "inline-block");
    $(".load-more .btn i").addClass("fa-spin");
    $(document).ajaxStop(function () {
      setTimeout(function () {
        $(".load-more .btn i").hide();
      }, 1000);
    });
    return false;
  });
  $(".portfolio-filter-mobile").on("change", function () {
    var filterValue = this.value;
    filterValue = filterFns[filterValue] || filterValue;
    $container.isotope({ filter: filterValue });
  });
  var filterFns = {
    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },
    ium: function () {
      var name = $(this).find(".name").text();
      return name.match(/ium$/);
    },
  };
});
$(document).on("ready", function () {
  "use strict";
  $(".testimonials-wrapper").slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  });
});
$(function () {
  "use strict";
  $(".menu-icon button").on("click", function () {
    $(
      "header.desktop-header-1, main.content, header.mobile-header-1"
    ).toggleClass("open");
  });
  $("main.content").on("click", function () {
    $(
      "header.desktop-header-1, main.content, header.mobile-header-1"
    ).removeClass("open");
  });
  $(".vertical-menu li a").on("click", function () {
    $(
      "header.desktop-header-1, main.content, header.mobile-header-1"
    ).removeClass("open");
  });
  $(".menu-icon button").on("click", function () {
    $(
      "header.desktop-header-2, main.content-2, header.mobile-header-2"
    ).toggleClass("open");
  });
  $("main.content-2").on("click", function () {
    $(
      "header.desktop-header-2, main.content-2, header.mobile-header-2"
    ).removeClass("open");
  });
  $(".vertical-menu li a").on("click", function () {
    $(
      "header.desktop-header-2, main.content-2, header.mobile-header-2"
    ).removeClass("open");
  });
  $('a[href^="#"]:not([href="#"]').on("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        800,
        "easeInOutQuad"
      );
    event.preventDefault();
  });
  if ($(".parallax").length > 0) {
    var scene = $(".parallax").get(0);
    var parallax = new Parallax(scene, {
      relativeInput: true,
    });
  }
  $(".text-rotating").Morphext({
    animation: "bounceIn",
    separator: ",",
    speed: 4000,
    complete: function () {},
  });
  $(".vertical-menu li a").addClass("nav-link");
  $("body").scrollspy({ target: ".scrollspy" });
  $(".count").counterUp({
    delay: 10,
    time: 2000,
  });
  if ($(".skill-item").length > 0) {
    var waypoint = new Waypoint({
      element: document.getElementsByClassName("skill-item"),
      handler: function (direction) {
        $(".progress-bar").each(function () {
          var bar_value = $(this).attr("aria-valuenow") + "%";
          $(this).animate({ width: bar_value }, { easing: "linear" });
        });
        this.destroy();
      },
      offset: "50%",
    });
  }
  var list = document.getElementsByClassName("spacer");
  for (var i = 0; i < list.length; i++) {
    var size = list[i].getAttribute("data-height");
    list[i].style.height = "" + size + "px";
  }
  var list = document.getElementsByClassName("data-background");
  for (var i = 0; i < list.length; i++) {
    var color = list[i].getAttribute("data-color");
    list[i].style.backgroundColor = "" + color + "";
  }
  $(".submenu").before('<i class="ion-md-add switch"></i>');
  $(".vertical-menu li i.switch").on("click", function () {
    var $submenu = $(this).next(".submenu");
    $submenu.slideToggle(300);
    $submenu.parent().toggleClass("openmenu");
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 350) {
      $("#return-to-top").fadeIn(200);
    } else {
      $("#return-to-top").fadeOut(200);
    }
  });
  $("#return-to-top").on("click", function (event) {
    event.preventDefault();
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      400
    );
  });
});
