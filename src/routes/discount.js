import '../styles/discount/main-discount.scss';
import $ from 'jquery';

// url
// const queryUrl = location.search;
// const decodedUrl = atob(queryUrl.slice(3));

const counter1 = document.getElementById('timer-1');
const counter2 = document.getElementById('timer-2');
// const layer = document.querySelector('.overlay');
// const popUp = document.querySelector('.popup');
const button = document.querySelector('.discount__button-1');
const hiddenForm = document.querySelector('.discount__hidden-form');
const closeButton = document.querySelector('.popup__close');

let mouseX;
let mouseY;
let formValid = false;
let hiddenFormValid = false;
let freePromo = false;
let time = 15 * 60;
let modifier = counter1;
let windowWidth = window.innerWidth;

const timer = setInterval(() => {
  let min = parseInt(time / 60, 10);
  let sec = parseInt(time % 60, 10);
  sec = sec < 10 ? '0' + sec : sec;
  if (time >= 0) {
    time--;
    modifier.innerHTML = `${min}:${sec}`;
  } else {
    modifier.innerHTML = `Promocja wygasła!`;
    layer.style.display = 'block';
    popUp.classList.add('popup--active');
    clearInterval(timer);
  }
}, 1000);

// const mouseMove = e => {
//   mouseY = e.clientY;
//   windowWidth = window.innerWidth;
//   if (mouseY === 0 && !formValid && windowWidth >= 768) {
//     layer.style.display = 'block';
//     popUp.classList.add('popup--active');
//   }
// };

window.onload = () => {
  timer;
};

// document.addEventListener('mousemove', mouseMove);

// closeButton.addEventListener('click', () => {
//   layer.style.display = 'none';
//   popUp.classList.remove('popup--active');
// });
///////////////////////////////////// FORM VALIDATION

const form1 = document.querySelector('.discount__form');
const phone1 = document.querySelector('.form__phone');
const name1 = document.querySelector('.form__name');
const surname1 = document.querySelector('.form__surname');
let form1Value = {};

const form2 = document.querySelector('.discount__hidden-form');
const street = document.querySelector('.form__street');
const postal = document.querySelector('.form__postal');
const city = document.querySelector('.form__city');
const comments = document.querySelector('.form__comments');
const email2 = document.querySelector('.form__email-2');
let form2Value = {};

const form3 = document.querySelector('.popup__form');
const phone2 = document.querySelector('.form__phone-2');
let form3Value = {};

const inputPhone1 = document.querySelectorAll('.form__phone');

const checkPhone = phone => {
  const phoneValue = phone.trim();
  if (validatePhone(phoneValue)) {
    return true;
  }
  return false;
};

const checkInputs = (phone, name, surname, err) => {
  const phoneValue = phone.value.trim();
  const nameValue = name.value.trim();
  const surnameValue = surname.value.trim();

  if (phoneValue === '' || !validatePhone(phoneValue)) {
    setError(phone, err);
  } else {
    setSuccess(phone, err);
  }
  if (nameValue === '' || !nameCheck(nameValue)) {
    setError(name, err);
  } else {
    setSuccess(name, err);
  }
  if (surnameValue === '' || !surnameCheck(surnameValue)) {
    setError(surname, err);
  } else {
    setSuccess(surname, err);
  }
};

const checkHiddenInputs = (street, post, city, email2, err) => {
  const streetValue = street.value.trim();
  const postalCodeValue = post.value.trim();
  const cityValue = city.value.trim();
  const email2Value = email2.value.trim();

  if (streetValue === '' || !adressCheck(streetValue)) {
    setError(street, err);
  } else {
    setSuccess(street, err);
  }
  if (postalCodeValue === '' || !validatePost(postalCodeValue)) {
    setError(post, err);
  } else {
    setSuccess(post, err);
  }
  if (cityValue === '' || !cityCheck(cityValue)) {
    setError(city, err);
  } else {
    setSuccess(city, err);
  }
  if (email2Value !== '' && !isEmail(email2Value)) {
    setError(email2, err);
  } else {
    setSuccess(email2, err);
  }
};

const checkFreePromoInputs = (phone, err) => {
  const phoneValue = phone.value.trim();

  if (phoneValue === '' || !validatePhone(phoneValue)) {
    setError(phone, err);
  } else {
    setSuccess(phone, err);
  }
};

const setError = (element, err) => {
  const formWrapper = element.parentElement;
  const errorFdb = formWrapper.querySelector('.error-feedback');

  formWrapper.classList.add(`${err}`);
  errorFdb.style.visibility = 'visible';
};

const setSuccess = (element, err) => {
  const formWrapper = element.parentElement;
  const errorFdb = formWrapper.querySelector('.error-feedback');
  formWrapper.classList.remove(`${err}`);
  errorFdb.style.visibility = 'hidden';
};

// ///////////////////////////////////// INPUT TEST

const nameCheck = name => {
  let value = /^[a-zA-Z]+$/;
  return value.test(name);
};

const surnameCheck = surname => {
  let value = /^[a-zA-Z]+$/;
  return value.test(surname);
};

const validatePhone = phone => {
  const isphone = /^[0-9]{9}$/g;
  return isphone.test(phone);
};

const adressCheck = adress => {
  let street = /^[a-zA-Z]*[\s/a-zA-Z]+[\s/0-9]+$/;
  return street.test(adress);
};

const validatePost = postal_code => {
  let post = /^\d{5}$|^\d{2}-\d{3}$/;
  return post.test(postal_code);
};

const cityCheck = city => {
  let value = /^[a-zA-Z]+$/;
  return value.test(city);
};

const isEmail = email => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
////////////////////////////////////// AJAX POST REQUEST

const submitData = (data, url) => {
  $.ajax({
    url: url,
    type: 'post',
    data: data,
    success: function (response) {
      if (response) {
        console.log('ok');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    },
  });
};

///////////////////////////////////// FORM SUBMIT

form1.addEventListener('submit', e => {
  e.preventDefault();
  e.stopPropagation();
  checkInputs(phone1, name1, surname1, 'error-1');
  if (document.querySelectorAll('.error-1').length === 0) {
    formValid = true;
    hiddenForm.style.display = 'block';
    let hiddenContainer = document.getElementById('hidden');
    let bottom = hiddenContainer.getBoundingClientRect().bottom;
    window.scrollTo({
      top: bottom,
      behavior: 'smooth',
    });
    button.parentElement.style.display = 'none';

    form1Value = {
      phone: phone1.value.trim(),
      name: name1.value.trim(),
      surname: surname1.value.trim(),
    };
    const jsonForm1 = JSON.stringify(form1Value);
    submitData(jsonForm1, 'send1.php');
  }
});

form2.addEventListener('submit', e => {
  e.preventDefault();
  e.stopPropagation();
  checkHiddenInputs(street, postal, city, email2, 'error-2');
  if (document.querySelectorAll('.error-2').length === 0) {
    form2Value = {
      phone: phone1.value.trim(),
      name: name1.value.trim(),
      surname: surname1.value.trim(),
      street: street.value.trim(),
      postalCode: postal.value.trim(),
      city: city.value.trim(),
      deliveryComments: comments.value.trim(),
      email: email2.value.trim(),
      price: 87,
      source: document.location.href,
      offer_type: decodedUrl,
    };
    console.log(form2Value);
    const jsonForm2 = JSON.stringify(form2Value);
    submitData(jsonForm2, 'send2.php');
  }
});

// form3.addEventListener('submit', e => {
//   e.preventDefault();
//   checkFreePromoInputs(phone2, 'error-3');
//   if (document.querySelectorAll('.error-3').length === 0) {
//     form3Value = {
//       phone: phone2.value.trim(),
//     };
//     const jsonForm3 = JSON.stringify(form3Value);
//     submitData(jsonForm3, 'send3.php');
//   }
// });

inputPhone1[0].addEventListener('blur', e => {
  let phoneNumberValue = {};
  if (checkPhone(e.target.value)) {
    phoneNumberValue = {
      number: e.target.value.trim(),
    };
    const jsonPhoneValue = JSON.stringify(phoneNumberValue);
    submitData(jsonPhoneValue, 'send4.php');
  }
});
