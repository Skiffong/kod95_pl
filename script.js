document.addEventListener("DOMContentLoaded", () => {
  //burger
  let header__burger = document.querySelector(".header__burger");
  let header__menu = document.querySelector(".header__menu");
  let lock = document.querySelector("body");
  let header__list = document.querySelectorAll(".header__list");

  header__burger.onclick = function () {
    header__burger.classList.toggle("active");
    header__menu.classList.toggle("active");
    lock.classList.toggle("lock");
  };

  header__list.onclick = function () {
    header__burger.classList.remove("active");
    header__menu.classList.toggle("active");
    lock.classList.remove("lock");
  };

  document.addEventListener("click", (e) => {
    const outOfMenu = e.composedPath().includes(header__burger);

    if (!outOfMenu) {
      header__burger.classList.remove("active");
      header__menu.classList.remove("active");
      lock.classList.remove("lock");
    }
  });

  //spoiler

  const spoilerArray = document.querySelectorAll("[data-spoilers]");
  if (spoilerArray.length > 0) {
    const spoilerReg = Array.from(spoilerArray).filter(function (
      item,
      index,
      self
    ) {
      return !item.dataset.spoilers.split(",")[0];
    });

    if (spoilerReg.length > 0) {
      initSpoiler(spoilerReg);
    }
  }

  function initSpoiler(spoilerArray) {
    spoilerArray.forEach((spoilerBlock) => {
      initSpoilerBody(spoilerBlock);
      spoilerBlock.addEventListener("click", setSpoilerAction);
    });
  }

  function initSpoilerBody(spoilerBlock, hideSpoilerBody = true) {
    const spoilerTitle = document.querySelectorAll("[data-spoiler]");
    if (spoilerTitle.length > 0) {
      spoilerTitle.forEach((spoilerTitle) => {
        if (hideSpoilerBody) {
          spoilerTitle.removeAttribute("tabindex");
          if (!spoilerTitle.classList.contains("_active")) {
            spoilerTitle.nextElementSibling.hidden = true;
          } else {
            spoilerTitle.setAttribute("tabindex", "-1");
            spoilerTitle.nextElementSibling.hidden = false;
          }
        }
      });
    }
  }

  function setSpoilerAction(e) {
    const el = e.target;
    if (el.hasAttribute("data-spoiler") || el.closest("[data-spoiler]")) {
      const spoilerTitle = el.hasAttribute("data-spoiler")
        ? el
        : el.closest("[data-spoler]");
      const spoilerBlock = spoilerTitle.closest("[data-spoilers]");
      const oneSpoiler = spoilerBlock.hasAttribute("data-one-spoiler")
        ? true
        : false;
      if (!spoilerBlock.querySelectorAll("._slide").length) {
        if (oneSpoiler && !spoilerTitle.classList.contains("_active")) {
          hideSpoilerBody(spoilerBlock);
        }
        spoilerTitle.classList.toggle("_active");
        _slideToggle(spoilerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }

  function hideSpoilerBody(spoilerBlock) {
    const spoilerActiveTitle = spoilerBlock.querySelector(
      "[data-spoiler]._active"
    );
    if (spoilerActiveTitle) {
      spoilerActiveTitle.classList.remove("_active");
      _slideUp(spoilerActiveTitle.nextElementSibling, 500);
    }
  }

  let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, magrin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = target.offsetHeight + "px";
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };

  let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, magrin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };

  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };

  //slider
  const prev = document.querySelector(".slide__prev"),
    next = document.querySelector(".slide__next"),
    slides = document.querySelectorAll(".slide"),
    dots = document.querySelectorAll(".dot");

  let index = 0;

  const activeSlide = (n) => {
    for (let slide of slides) {
      slide.classList.remove("active");
    }
    slides[n].classList.add("active");
  };

  const activeDot = (n) => {
    for (let dot of dots) {
      dot.classList.remove("active");
    }
    dots[n].classList.add("active");
  };

  const currentSlide = (i) => {
    activeSlide(i);
    activeDot(i);
  };

  const nextSlide = () => {
    if (index == slides.length - 1) {
      index = 0;
      currentSlide(index);
    } else {
      index++;
      currentSlide(index);
    }
  };

  const prevSlide = () => {
    if (index == 0) {
      index = slides.length - 1;
      currentSlide(index);
    } else {
      index--;
      currentSlide(index);
    }
  };

  dots.forEach((el, indexDot) => {
    el.addEventListener("click", () => {
      index = indexDot;
      currentSlide(index);
    });
  });

  setInterval(nextSlide, 2500);

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  // send request
  const form = document.querySelector(".preview__form");
  form.addEventListener("submit", formSend);

  function formSend(e) {
    e.preventDefault();

    let formData = new FormData(form);
    formData.append("project_name", window.location.href);
    formData.append("admin_email", "test@test.com");
    formData.append("form_subject", "Форма записи на курсы код 95");

    fetch("https://avtoskola.by/mail/mail.php", {
      method: "POST",
      mode: "no-cors",

      // Adding body or contents to send
      body: JSON.stringify(Object.fromEntries(formData)),

      // Adding headers to the request
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    alert("Ваша заявка принята, скоро мы Вам перезвоним");
    form.reset();
  }
});
