/**
 * triggered when the user click logout button to route to the logout where server will kill the session
 */
const logoutUser = () => {
  console.log('logoutUser');
  fetch('/user/logout', {
    method: 'post',
  }).then((res) => {
    res.json();
    window.location.href = '/';
  });
};
/**
 * 
 * @param {element tag coming from global this inside HTML tag, we use it here to compar the two passwords for validation inside the registered form} input 
 */
function check(input) {
  if (input.value != document.getElementById('password-input').value) {
    input.setCustomValidity('Password Must be Matching.');
  } else {
    // input is valid -- reset the error message
    input.setCustomValidity('');
  }
}
/**
 * this function used when the user clicked in model alert button to close the model alert
 */
function modelClose() {
  document.getElementById('model').style.display = 'none';
}