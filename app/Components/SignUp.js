$(function () {
    $('#signUp-form').on('submit', function (e) {
        e.preventDefault();

        var result = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            office: e.target.office.value,
            slackName: e.target.slackName.value,
            password: e.target.password.value,
            repeatPassword: e.target.repeatPassword.value,
        }

        console.log(result);
    });
});