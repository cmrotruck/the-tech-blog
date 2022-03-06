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
  event.preventDefault();
  const postTitle = document.querySelector("#post-title").value.trim();
  const postContent = document.querySelector("#post-content").value.trim();

  const response = await fetch("/api/post/", {
    method: "post",
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.href = "/user-dashboard";
  } else {
    alert(response.statusText);
  }
}

async function updatePostHandler(event) {
  event.preventDefault();
  console.log("update clicked");
  const postTitle = document.querySelector("#post-title").value.trim();
  const postContent = document
    .querySelector("#post-content")
    .textContent.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(postContent);
  const response = await fetch("/api/post/" + post_id, {
    method: "put",
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.href = "/user-dashboard";
  } else {
    alert(response.statusText);
  }
}

async function deletePostHandler(event) {
  event.preventDefault();
  console.log("delete clicked");
}

$("#submitPasswordButton").on("click", loginButtonHandler);
$("#submitSignUpButton").on("click", signupButtonHandler);
$("#submitComment").on("click", submitCommentHandler);
$("#logout").on("click", logOutHandler);
$("#createButton").on("click", addPostHandler);
$("#updatePost").on("click", updatePostHandler);
$("#deletePost").on("click", deletePostHandler);
