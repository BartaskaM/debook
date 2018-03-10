
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

    const result = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

        console.log(result);

  
    // Return false to prevent the default form behavior
    return false;
  }
