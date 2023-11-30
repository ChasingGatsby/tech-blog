const newCommentHandler = async (event) => {
  event.preventDefault();
  const postId = document.getElementById("post").getAttribute("data-id");
  const content = document.getElementById("comment-content").value;

  if (content) {
    const response = await fetch(`/api/post/${postId}`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#newcomment-btn")
  .addEventListener("click", newCommentHandler);
