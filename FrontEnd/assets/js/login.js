async function apiLogin() {
    var my_email = document.getElementById("email").value;
    var my_password = document.getElementById("password").value;
    let user = {
        /* email: (my_email!="") ? my_email :"no-data",
        password: (my_password!="") ? my_password : "no-data" */
        /* email : "string",
        password : "string" */
        email:  my_email,
        password: my_password
    };

    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        response.json().then(function(myJson) {
            localStorage['token'] = myJson.token;
            window.location.href = "index.html";
          });
    } else {
        var my_error = document.getElementById("login-error");
        my_error.style.display = "block";
        setTimeout(() => {  my_error.style.display = "none";}, 2000);
    }
}

/* function init() {
    var loginButton = document.getElementById("login-button");
    loginButton.onclick = apiLogin;
} */

