const updatePostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;
  const postId = document.getElementById("update-btn").getAttribute("data-id");

  if (title && content) {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.replace(`/post/${postId}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#update-btn")
  .addEventListener("click", updatePostHandler);
