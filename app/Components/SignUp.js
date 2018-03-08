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

// Function to populate the office select options
(function () {
  const officeSelect = document.getElementById('office');

  OfficeData.forEach(element => {
    const opt = document.createElement('option');
    opt.value = element.value;
    opt.innerHTML = element.text;

    officeSelect.appendChild(opt);
  });
})();

// Function to catch the submit action from the signUp-form element
(function () {
  const form = document.getElementById('signUp-form');

  if (form.attachEvent) {
    form.attachEvent('submit', processSignUpForm);
  } else {
    form.addEventListener('submit', processSignUpForm);
  }
})();

// Function to process the signUp-form input and print it to console
function processSignUpForm(e) {
  if (e.preventDefault) e.preventDefault();

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

  // Return false to prevent the default form behavior
  return false;
}