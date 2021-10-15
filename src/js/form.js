import $ from 'jquery';
///////////////////////////////////// FORM VALIDATION
export let formValid = false;
// const queryUrl = location.search;
// const decodedUrl = atob(queryUrl.slice(3));

const inputs = document.querySelectorAll(".form__input");

inputs.forEach((e) => {
    e.addEventListener("input", () => {
      formValid = true;
    });
});

const hiddenForm = document.querySelector('.hidden-form');
const overlay = document.querySelector('.overlay');

const form1 = document.querySelector('.form-1');
const phone1 = document.querySelector('.input__phone-1');
const name1 = document.querySelector('.input__name-1');
const surname1 = document.querySelector('.input__surname-1');
let form1Value = {};

const form2 = document.querySelector('.form-2');
const phone2 = document.querySelector('.input__phone-2');
const name2 = document.querySelector('.input__name-2');
const surname2 = document.querySelector('.input__surname-2');
let form2Value = {};

const form3 = document.querySelector('.hidden-form');
const street = document.querySelector('.form__street');
const postal = document.querySelector('.form__postal');
const city = document.querySelector('.form__city');
const comments = document.querySelector('.form__comments');
const email = document.querySelector('.form__email');
let form3Value = {};

const close = document.querySelector('.form__close');
close.addEventListener('click', () => {
  if (formValid) {
    overlay.style.display = 'none';
    hiddenForm.classList.remove('hidden-form--active');
    formValid = false;
  }
});

overlay.addEventListener('click', () => {
  if (formValid) {
    overlay.style.display = 'none';
    hiddenForm.classList.remove('hidden-form--active');
    formValid = false;
  }
});
///////////////////////////////////// FORM SUBMIT

form1.addEventListener('submit', e => {
  e.preventDefault();
  checkInputs(phone1, name1, surname1, 'error-1');
  if (document.querySelectorAll('.error-1').length === 0) {
    formValid = true;
    overlay.style.display = 'block';
    hiddenForm.classList.add('hidden-form--active');
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
  checkInputs(phone2, name2, surname2, 'error-2');
  if (document.querySelectorAll('.error-2').length === 0) {
    formValid = true;
    overlay.style.display = 'block';
    hiddenForm.classList.add('hidden-form--active');
    form2Value = {
      phone: phone2.value.trim(),
      name: name2.value.trim(),
      surname: surname2.value.trim(),
    };
    const jsonForm2 = JSON.stringify(form2Value);
    submitData(jsonForm2, 'send3.php');
  }
});

form3.addEventListener('submit', e => {
  e.preventDefault();
  checkHiddenInputs(street, postal, city, email, 'error-3');
  if (document.querySelectorAll('.error-3').length === 0) {
    form3Value = {
      phone: phone1.value !== '' ? phone1.value.trim() : phone2.value.trim(),
      name: name1.value !== '' ? name1.value.trim() : name2.value.trim(),
      surname:
        surname1.value !== '' ? surname1.value.trim() : surname2.value.trim(),
      street: street.value.trim(),
      postalCode: postal.value.trim(),
      city: city.value.trim(),
      deliveryComments: comments.value.trim(),
      email: email.value.trim(),
      price: 137,
      source: document.location.href,
      offer_type: decodedUrl,
    };
    console.log(form3Value);
    const jsonForm3 = JSON.stringify(form3Value);
    submitData(jsonForm3, 'send2.php');
    overlay.style.display = 'none';
    hiddenForm.classList.remove('hidden-form--active');
  }
});

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

const checkHiddenInputs = (street, post, city, email, err) => {
  const streetValue = street.value.trim();
  const postalCodeValue = post.value.trim();
  const cityValue = city.value.trim();
  const emailValue = email.value.trim();

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
  if (!isEmail(emailValue) && emailValue !== '') {
    setError(email, err);
  } else {
    setSuccess(email, err);
  }
};

///////////////////////////////////// INPUT TEST

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

////////////////////////////////////// POST REQUEST

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

const inputPhone1 = document.querySelector('.input__phone-1');
const inputPhone2 = document.querySelector('.input__phone-2');

inputPhone1.addEventListener('blur', e => {
  let phoneNumberValue = {};
  if (checkPhone(e.target.value)) {
    phoneNumberValue = {
      number: e.target.value.trim(),
    };
    const jsonPhoneValue = JSON.stringify(phoneNumberValue);
    submitData(jsonPhoneValue, 'send4.php');
  }
});

inputPhone2.addEventListener('blur', e => {
  let phoneNumberValue = {};
  if (checkPhone(e.target.value)) {
    phoneNumberValue = {
      number: e.target.value.trim(),
    };
    const jsonPhoneValue = JSON.stringify(phoneNumberValue);
    submitData(jsonPhoneValue, 'send4.php');
  }
});

const checkPhone = phone => {
  const phoneValue = phone.trim();
  if (validatePhone(phoneValue)) {
    return true;
  }
  return false;
};
