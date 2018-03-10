const LoginData = [
  {
    email: 'test@test.com',
    password: '123',
  },
  {
    email: 'email@email.com',
    password: '123',
  }];

(function bindSignUpFormSubmit()
{
  const form = document.getElementById('logIn-form');
  if (form.attachEvent)
  {
    form.attachEvent('submit', processLogInForm);
  } else
  {
    form.addEventListener('submit', processLogInForm);
  }
})();
  
function processLogInForm(e)
{
  e.preventDefault();
  if (confirmLoginData())
  {
    const result = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(result);
  }
  
  // Return false to prevent the default form behavior
  return false;
}

function confirmLoginData()
{
  const logInForm = document.getElementById('logIn-form');
  for (let i = 0; i < LoginData.length; i++)
  {
    if (logInForm.email.value === LoginData[i].email && logInForm.password.value === LoginData[i].password)
    {
      logInForm.password.nextElementSibling.innerHTML = '';
      return true;
    }
  }
  logInForm.password.value = '';
  logInForm.password.nextElementSibling.innerHTML = 'Please enter correct E-mail adress and password';
  return false;
}