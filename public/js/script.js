loginForm.onsubmit = async (e) => {
  e.preventDefault();
  //const formData = new FormData(loginForm);
  //const email = formData.get('email');
  //const password = formData.get('password');

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: new FormData(loginForm),
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
};


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