import { preloadImages } from "../../libs/utils.js";

("use strict");
$ = jQuery;

// setup lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// end lenis

// dropdown

function customDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown-custom");

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");

    // Toggle dropdown on button click
    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    // Handle item selection
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        // Store current values from the button
        const currentImg = valueSelect.querySelector("img").src;
        const currentText = valueSelect.querySelector("span").textContent;
        const currentHtml = valueSelect.innerHTML;

        // Store clicked item values
        const clickedHtml = item.innerHTML;

        // Update the button with clicked item values
        valueSelect.innerHTML = clickedHtml;

        // Update the clicked item with the previous button values
        item.innerHTML = `<img src="${currentImg}" alt="" /><span>${currentText}</span>`;

        closeAllDropdowns();
      });
    });

    // Close dropdown on scroll
    window.addEventListener("scroll", function () {
      closeAllDropdowns();
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}
// end dropdown
// booking
function bookingForm() {
  if (!document.querySelector(".banner-booking")) return;

  var lightPick = new Lightpick({
    field: document.getElementById("check-in"),
    secondField: document.getElementById("check-out"),
    singleDate: false,
    minDate: moment().startOf("now"),
    numberOfMonths: 2,
    onOpen: function () {
      var input = lightPick._opts.field;
      var rect = input.getBoundingClientRect();
      var calendar = lightPick.el;
      if (rect.top >= window.innerHeight / 2) {
        calendar.style.top =
          rect.top + window.scrollY - calendar.offsetHeight + "px";
        calendar.style.left = rect.left + window.scrollX + "px";
      } else {
        calendar.style.top = rect.bottom + window.scrollY + "px";
        calendar.style.left = rect.left + window.scrollX + "px";
      }
    }
  });

  // Counter functionality
  document.querySelectorAll(".people, .child").forEach((section) => {
    const minus = section.querySelector(".min");
    const plus = section.querySelector(".plus");
    const val = section.querySelector(".val");

    plus.onclick = () => {
      const current = parseInt(val.textContent);
      val.textContent = Math.min(current + 1, 10);
      minus.style.opacity = val.textContent > 0 ? "1" : "0.5";
    };

    minus.onclick = () => {
      const current = parseInt(val.textContent);
      const newVal = Math.max(current - 1, 0);
      val.textContent = newVal;
      minus.style.opacity = newVal > 0 ? "1" : "0.5";
    };
  });
}
// end booking

function sectionAccommodation() {
  if ($("section.accommodation").length < 1) return;

  $("section.accommodation").each(function () {
    const $section = $(this);
    const $slider = $section.find(".accommodation-slider__main");
    const $pagination = $section.find(".swiper-pagination");
    const $prev = $section.find(".swiper-button-prev");
    const $next = $section.find(".swiper-button-next");

    const isOffer = $slider.hasClass("offer-slider");

    let slidePerView = $(window).width() > 767 ? (isOffer ? 2.5 : 3.3) : 1.2;

    new Swiper($slider[0], {
      spaceBetween: 40,
      slidesPerView: slidePerView,
      speed: 1000,
      slidesOffsetAfter: 80,
      pagination: {
        el: $pagination[0],
        type: "progressbar"
      },
      navigation: {
        prevEl: $prev[0],
        nextEl: $next[0]
      }
    });
  });
}
function swiperFacility() {
  let interleaveOffset = 0.9;
  const swiperFacility = new Swiper(".swiper-facility", {
    slidesPerView: 1,
    watchSlidesProgress: true,

    speed: 1500,
    loop: true,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: ".swiper-facility .swiper-pagination"
    },
    on: {
      progress(swiper) {
        swiper.slides.forEach((slide) => {
          const slideProgress = slide.progress || 0;
          const innerOffset = swiper.width * interleaveOffset;
          const innerTranslate = slideProgress * innerOffset;

          if (!isNaN(innerTranslate)) {
            const slideInner = slide.querySelector(".box-img");
            if (slideInner) {
              slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
            }
          }
        });
      },
      touchStart(swiper) {
        swiper.slides.forEach((slide) => {
          slide.style.transition = "";
        });
      },
      setTransition(swiper, speed) {
        const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach((slide) => {
          slide.style.transition = `${speed}ms ${easing}`;
          const slideInner = slide.querySelector(".box-img");
          if (slideInner) {
            slideInner.style.transition = `${speed}ms ${easing}`;
          }
        });
      }
    }
  });
}

function swiperAccommodation() {
  const $sliders = $(".swiper-accomodation");

  if ($sliders.length < 1) return;

  $sliders.each(function () {
    const $slider = $(this);
    const $section = $slider.closest("section.accommodation-detail");

    const $pagination = $section.find(".swiper-pagination");
    const $prev = $section.find(".swiper-button-prev");
    const $next = $section.find(".swiper-button-next");

    new Swiper($slider[0], {
      slidesPerView: 2.5,
      spaceBetween: 16,
      slidesOffsetAfter: 80,
      speed: 1000,
      parallax: true,
      pagination: {
        el: $pagination[0],
        type: "progressbar"
      },
      navigation: {
        prevEl: $prev[0],
        nextEl: $next[0]
      }
    });
  });
}

function ctaMess() {
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    paused: true,
    onUpdate: (self) => {
      self.direction === 1
        ? $("#cta-mess").addClass("hide")
        : $("#cta-mess").removeClass("hide");
    }
  });
}
function distortionImg() {
  document.querySelectorAll(".distortion-img").forEach((wrapper) => {
    const imgElement = wrapper.querySelector("img");

    if (imgElement) {
      const imageSrc = imgElement.src;

      imgElement.style.display = "none";

      new hoverEffect({
        parent: wrapper,
        intensity: 0.1,
        angle: 0,
        image1: imageSrc,
        image2: imageSrc,
        displacementImage: "./assets/images/distortion/ripple.jpg"
      });
    }
  });
}
function loadingBanner() {
  let classesRemoved = false; // Biến để đảm bảo class chỉ xóa một lần
  if ($(".banner-hero-clip").length < 1) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner-hero-clip",
      start: "top top",
      scrub: true,
      pin: true,
      // markers: true,
      once: true,
      onUpdate: (self) => {
        if (self.progress === 1 && !classesRemoved) {
          document
            .querySelector(".banner-hero-clip")
            ?.classList.remove("banner-hero-clip");
          document.querySelectorAll(".anim-clip-circle").forEach((el) => {
            el.classList.remove("anim-clip-circle");
          });
          document.querySelector(".banner-title").classList.add("d-none");
          document.getElementById("header").classList.remove("hide-header");
          classesRemoved = true;
        }
      },
      onLeave: (self) => {
        let start = self.start;
        console.log(start);

        self.scroll(self.start);
        self.disable();

        // add true
        self.animation.progress(1, true);
        ScrollTrigger.refresh();
        window.scrollTo(0, start);
      }
    }
  });

  tl.to(".anim-clip-circle", {
    clipPath: "circle(70.7% at 50% 50%)"
  }).to(
    ".banner-container img",
    {
      scale: 1
    },
    0
  );
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  bookingForm();
  sectionAccommodation();
  swiperFacility();
  ctaMess();
  distortionImg();
  swiperAccommodation();
  loadingBanner();
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});

let isLinkClicked = false;
$("a").on("click", function (e) {
  if (this.href && !this.href.match(/^#/) && !this.href.match(/^javascript:/)) {
    isLinkClicked = true;
  }
});

$(window).on("beforeunload", function () {
  if (!isLinkClicked) {
    $(window).scrollTop(0);
  }
  isLinkClicked = false;
});
