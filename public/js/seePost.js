const post = document.querySelectorAll("#post-link");

const postRedirect = async (event) => {
  const id = event.target.getAttribute("data-id");

  const response = await fetch(`/post/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log(response);
  } else {
    alert("Could not load post!");
  }
};

post.addEventListener("click", postRedirect);
