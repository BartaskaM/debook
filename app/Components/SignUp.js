const OfficeData = [
  {
    text: 'Kaunas',
    value: 'kaunas',
  },
  {
    text: 'Vilnius',
    value: 'vilnius',
  },
  {
    text: 'Chicago',
    value: 'shicago',
  },
  {
    text: 'toronto',
    value: 'toronto',
  },
  {
    text: 'London',
    value: 'london',
  },
];

(function populateOfficeSelect() {
  const officeSelect = document.getElementById('office');

  OfficeData.forEach(element => {
    const opt = document.createElement('option');
    opt.value = element.value;
    opt.innerHTML = element.text;

    officeSelect.appendChild(opt);
  });
})();

(function bindSignUpFormSubmit() {
  const form = document.getElementById('signUp-form');

  if (form.attachEvent) {
    form.attachEvent('submit', processSignUpForm);
  } else {
    form.addEventListener('submit', processSignUpForm);
  }
})();

function processSignUpForm(e) {
  e.preventDefault();

  if (emailValidate() && repeatPasswordValidate()) {
    const result = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      office: e.target.office.value,
      slackName: e.target.slackName.value,
      password: e.target.password.value,
      repeatPassword: e.target.repeatPassword.value,
    };

    console.log(result);
  }
  else {
    alert('Please fix form errors');
  }

  // Return false to prevent the default form behavior
  return false;
}

function emailValidate() {
  const signUpForm = document.getElementById('signUp-form');

  if (signUpForm.email.value === 'email@email.com') {
    signUpForm.email.nextElementSibling.innerHTML = 'Email already in use';
  }
  else {
    signUpForm.email.nextElementSibling.innerHTML = '';

    return true;
  }
}

function repeatPasswordValidate() {
  const signUpForm = document.getElementById('signUp-form');

  if (signUpForm.password.value !== signUpForm.repeatPassword.value) {
    signUpForm.repeatPassword.nextElementSibling.innerHTML = 'Passwords do not match';
  }
  else {
    signUpForm.repeatPassword.nextElementSibling.innerHTML = '';

    return true;
  }
}