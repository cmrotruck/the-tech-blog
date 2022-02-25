function logIn(email, password) {
  //check to see if email and password is not blank
  if (email && password) {
    //check database for user
    const response = fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } else {
    alert("Email/Password is missing");
  }
}

async function loginButtonHandler(event) {
  event.preventDefault();

  //get email and passsword info from form
  var email = document.querySelector("#email-login").value.trim();
  var password = document.querySelector("#password-login").value.trim();

  console.log(email, password);

  const response = await logIn(email, password);

  if (response.ok) {
    document.location.replace("/");
    alert("You are now logged in!");
  } else {
    alert(response.statusText);
  }
}

async function logOutHandler(event) {
  event.preventDefault();

  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
}

async function signupButtonHandler(event) {
  event.preventDefault();

  //get email and passsword info from form
  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log(email, username, password);

  //check to see if email and password is not blank
  if (password && email && username) {
    //check database for user
    const response = await fetch("/api/users/signup", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const loginResponse = await logIn(email, password);

      if (loginResponse.ok) {
        document.location.replace("/");
        alert("Thank you for joining! You are now logged in!");
        document.location.replace("/");
        document.location.reload();
      } else {
        alert(loginResponse.statusText);
      }
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Email/Password/Username is missing");
  }
}

async function submitCommentHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-body").value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(comment_text, post_id);

  const response = await fetch("/api/comments", {
    method: "post",
    body: JSON.stringify({
      comment_text,
      post_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

async function addPostHandler(event) {
  console.log("Add post button clicked");
  const response = fetch("/add-post", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
}

$("#submitPasswordButton").on("click", loginButtonHandler);
$("#submitSignUpButton").on("click", signupButtonHandler);
$("#submitComment").on("click", submitCommentHandler);
$("#logout").on("click", logOutHandler);
// $("#addPost").on("click", addPostHandler);
