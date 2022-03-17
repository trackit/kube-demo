document.querySelector('.form-signin').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const email = document.querySelector('#inputEmail').value;
  const password = document.querySelector('#inputPassword').value;

  fetch('/auth/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  })
    .then((rst) => {
      if (rst.status < 400) {
        console.log('ok');
        window.location.href = '/auth/dashboard.html';
      } else {
        alert('Invalid username or password');
      }
    })
    .catch((err) => {
      alert('Unable to sign-in on the API\n' + err.toString());
    })
});
