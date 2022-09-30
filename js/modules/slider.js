function slider() {
  const sliderWrap = document.querySelector('.offer__slider'),
    prevSlide = sliderWrap.querySelector('.offer__slider-prev'),
    nextSlide = sliderWrap.querySelector('.offer__slider-next'),
    totalSlide = sliderWrap.querySelector('#total'),
    slideItems = sliderWrap.querySelectorAll('.offer__slide'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,
    currentSlide = sliderWrap.querySelector('#current');

  let slideIndex = 1,
    offset = 0;

  if (slideItems.length < 10) {
    totalSlide.textContent = `0${slideItems.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    totalSlide.textContent = `${slideItems.length}`;
    currentSlide.textContent = `${slideIndex}`;
  }

  slidesField.style.width = 100 * slideItems.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';


  slideItems.forEach(slide => {
    slide.style.width = width;
  });

  sliderWrap.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');
  sliderWrap.append(indicators);

  for (let i = 0; i < slideItems.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function addZero(items, currentItem, i) {
    if (items.length < 10) {
      return currentItem.textContent = `0${i}`;
    } else {
      return currentItem.textContent = i;
    }
  }


  nextSlide.addEventListener('click', () => {
    if (offset === +width.slice(0, width.length - 2) * (slideItems.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slideItems.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addZero(slideItems, currentSlide, slideIndex);

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });

  prevSlide.addEventListener('click', () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slideItems.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slideItems.length;
    } else {
      slideIndex--;
    }

    addZero(slideItems, currentSlide, slideIndex);

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;

      addZero(slideItems, currentSlide, slideIndex);
    });
  });
}

export default slider;