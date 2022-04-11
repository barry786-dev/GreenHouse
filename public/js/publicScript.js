const logoutUser = () => {
  console.log('logoutUser');
  fetch('/user/logout', {
    method: 'post',
  }).then((res) => {
    res.json();
    window.location.href = '/';
  });
};
