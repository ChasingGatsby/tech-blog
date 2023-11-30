const newPostHandler = async (event) => {
  event.preventDefault();
  console.log(event)

  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#newpost-btn")
  .addEventListener("click", newPostHandler);
