window.onload = () => {

  const btnRegister = document.getElementById('btnRegister');
  const firstName = document.getElementById('firstNameInput');
  const lastName = document.getElementById('lastNameInput');
  const email = document.getElementById('emailInput');
  const pwd = document.getElementById('pwdInput');
  const confirmPwd = document.getElementById('confirmPwdInput');

  btnRegister.addEventListener('click', async e => {
    e.preventDefault();

    register();
  })

  const register = async () => {
    let data = {
      acceptTerms: true,
      title: 'user',
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: pwd.value,
      confirmPassword: confirmPwd.value
    }

    try {
      let res = await fetch('http://localhost:4000/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': ' application/json'
        },
        body: JSON.stringify(data)
      });

      console.log(data)

      if (res.status == 200) {
        let response = await res.json();

        location.href = "http://localhost:5500/frontend/public/views/index.html";
      }

    } catch (err) {
      console.log(err);
    }
  }
}