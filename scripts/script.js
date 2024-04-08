const servicesList = document.querySelector(".services-list")
const servicesItems = document.querySelectorAll(".services-item")
const servicesScreens = document.querySelectorAll(".services-screen")

const prevButton = document.querySelector(".slider-control-prev");
const nextButton = document.querySelector(".slider-control-next");
const bulletsBlock = document.querySelector('.bullets');
const sliderList = document.querySelector('.slider-list');
const bulletsTags = document.querySelectorAll('.bullets-button');
const bullets = Array.from(bulletsTags);
const screensTags = document.querySelectorAll('.slider-item');
const screens = Array.from(screensTags);

const infoHeaderLink = document.querySelector(".info-header-link");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-button-close");

infoHeaderLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.remove("modal-close");
});

modalClose.addEventListener("click", function () {
  modal.classList.add("modal-close");
})

const services = Array.from(servicesItems)
const serviceScreen = Array.from(servicesScreens)

servicesList.addEventListener("click", function (evt) {
  if (evt.target.closest(".services-button")) {
    document.querySelector(".services-button-active").classList.remove("services-button-active")
    evt.target.closest(".services-button").classList.add("services-button-active")
    const index = services.indexOf(evt.target.closest(".services-item"))
    console.log(index)
    document.querySelector(".services-screen-active").classList.remove("services-screen-active")
    serviceScreen[index].classList.add("services-screen-active")
  }
})

if (sliderList) {
  const model = [true, false, false];
  const getCurrentActiveSlide = () => model.findIndex((item) => item);
  renderSlider();
  function renderSlider() {
    const active = getCurrentActiveSlide();
    screens.forEach((element, index) => {
      element.querySelectorAll('a').forEach((link) => {
        link.tabIndex = (index === active) ? '0' : '-1'
      })
    })
    sliderList.style.transform = `translateX(-${active * 1160}px)`
  }

  const renderBullet = () => {
    const active = getCurrentActiveSlide();
    document.querySelector('.bullets-button-active').classList.remove('bullets-button-active');
    bullets[active].classList.add('bullets-button-active');
  }

  const setCurrentActiveSlide = (index) => {
    model.forEach((element, i) => {
      model[i] = i === index
    })
    renderSlider();
    renderBullet();
  }

  prevButton.addEventListener('click', () => {
    const currentActive = getCurrentActiveSlide()
    const newActive = (currentActive > 0) ? currentActive - 1 : currentActive;
    setCurrentActiveSlide(newActive);
  });

  nextButton.addEventListener('click', () => {
    const currentActive = getCurrentActiveSlide()
    const newActive = (currentActive < model.length - 1) ? currentActive + 1 : currentActive;
    setCurrentActiveSlide(newActive);
  });

  bulletsBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('bullets-button')) {
      const index = bullets.indexOf(evt.target)
      setCurrentActiveSlide(index);
    }
  });
}