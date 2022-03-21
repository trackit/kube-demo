document.querySelector('.form-signup').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const email = document.querySelector('#inputEmail').value;
  const password = document.querySelector('#inputPassword').value;
  const passwordConfirm = document.querySelector('#inputConfirmPassword').value;
  const license = document.querySelector('#license');

  if (password !== passwordConfirm) {
    alert('Password and confirm password does not match');
    return;
  }
  if (!license.checked) {
    alert('The license agreement hasn\'t been accepted');
    return;
  }

  fetch('/auth/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  })
    .then((resp) => {
      if (resp.status < 400) {
        window.location.href = '/auth/dashboard.html';
      } else if (resp.status === 409) {
        alert('An account already exist for this email');
      } else {
        alert('Could not sign-up on the API');
      }
    })
    .catch(() => {
      alert('Unable to sign-up on the API\n' + err.toString());
    })
});
