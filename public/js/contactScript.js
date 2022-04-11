/*loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  //const email = formData.get('email');
  //const password = formData.get('password');
  //Create an object from the form data entries
  //The FormData.entries() method returns an iterator allowing to go through all key/value pairs contained in this object.
  //The Object.fromEntries() method transforms a list of key-value pairs into an object.
  const formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  const formDataJsonString = JSON.stringify(formDataObject);
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: formDataJsonString,
    });
    const result = await response.json();
    console.log(result);
    if (result === 'done') {
      //window.location = '/admin';
    } else {
      //alert('wrong username or password , try again');
    }
  } catch (error) {
    console.log(error);
  }
}; */
const registerBtn = document.getElementById('contact-btn');
registerBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const pristine = new Pristine(contacts_form);
  const valid = pristine.validate();
  if (valid) {
    /**
     * The FormData interface represents a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method.
     */
    const formData = new FormData(contacts_form);
    /**
     * create an object from the form data entries
     * The FormData.entries() method returns an iterator allowing to go through all key/value pairs contained in this object.
     * The Object.fromEntries() method transforms a list of key-value pairs into an object.
     */
    const formDataObject = Object.fromEntries(formData.entries());
    /**
     * Format the plain formData as JSON
     */
    const formDataJsonString = JSON.stringify(formDataObject);
    const captchaResponse = formData.get('g-recaptcha-response');
    try {
      const response = await fetch(
        `/contact-us${
          captchaResponse
            ? '/' + encodeURI(captchaResponse)
            : '/' + encodeURI('123')
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formDataJsonString,
        }
      );
      grecaptcha.reset(); // rest captcha after submitting the form
      const result = await response.json();
      if (result.success === true) {
        contacts_form.reset();
        document.getElementById('contacts_form').style.display = 'none'; // Hide contacts_form
        document.getElementById('received').style.display = 'block'; // Show received message element
      } else if (result.errorNu === 6) {
        document.getElementById('contacts_form').style.display = 'none'; // Hide contacts_form
        document.getElementById('failed').style.display = 'block'; // Show failed message element
      } else if (result.errorNu === 11) {
        document.getElementById('contacts_form').style.display = 'none'; // Hide contacts_form
        document.getElementById('captcha').style.display = 'block'; // Show captcha message element
      } else if (result.errorNu === 3) {
        document.body.innerHTML = JSON.stringify(result.err);
      } else {
        document.body.innerHTML =
          'something going wrong , may you refresh the page and try again, or contact our technical support +4915784446611 or by email at mbrsyr@yahoo.com';
      }
    } catch (error) {
      console.log(error);
    }
  }
});
/**
 * @description this function is used to send the user back to contact-us form , and make captcha hidden input field enquired again after showing the error message and click on the button
 */
const backToContactUsForm = () => {
  document.getElementById('contacts_form').style.display = 'block'; // Show contacts_form
  document.getElementById('received').style.display = 'none'; // Hide received message element
  document.getElementById('failed').style.display = 'none'; // Hide failed message element
  document.getElementById('captcha').style.display = 'none'; // Hide captcha message element
  document.getElementById('recaptcha_check_empty').checked = false;
};
/**
 * @description this function is used to cancel th required of the hidden input field behinds the captcha after captcha is solved
 */
function recaptchaCallback() {
  document.getElementById('recaptcha_check_empty').checked = true;
  const pristine = new Pristine(contacts_form);
  pristine.validate();
}
/* const coco = {light: {
        minValue: { type: Number, default: 0 },
        startOn: [
          {
            hours: {
              type: Number,
              required: true,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
            seconds: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
          },
        ],
        startOff: [
          {
            hours: {
              type: Number,
              required: true,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
            seconds: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
          },
        ],
      }};

function timeToString(h, m, s) {
  if (h < 10) h = '0' + h;
  if (m < 10) h = '0' + h;
  if (s < 10) h = '0' + h;
  return h + ':' + m + ':' + s;
} */

// time: {
//     type: String,
//     validate: {
//       isAsync: true,
//       validator: function(v, cb) {
//         setTimeout(function() {
//           var timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
//           var msg = v + ' is not a valid time format!';

//           cb(timeRegex.test(v), msg);
//         }, 5);
//       },

//       message: 'Default error message'
//     },
//     required: [true, 'Time is required']
//   }
/*  <script src='./pristine/dist/pristine.js' type='text/javascript'></script>;
const form = document.getElementById('register-form');
const pristine = new Pristine(form);
const valid = pristine.validate();
        if (valid) {} */

/*   <script>
      function submitForm(e) {
        e.preventDefault();
        let form = $(e.target);
        console.log(form.serialize());
        // show loader
        $('#loader').show();
        $.ajax({
          url: form.attr('action'),
          method: form.attr('method'),
          data: form.serialize(),
          success: (response) => {
            if (response.success) {
              $('#message').modal('show');
              $('.modal-title').html('success');
              $('#messageText').html(response.success);
              $("#loader").hide()
                console.log("REsponse====>", response)
            } else {
              $('#message').modal('show');
              $('.modal-title').html('Error');
              $('#messageText').html(response.error);
              $('#loader').hide();
            }
          },
          error: (xhr, status, error) => {
            console.log(error);
          },
        });
      }
    </script> */
