const createCommentElement = function (commentsObject) {
  return Promise.all([getCommentsPoster(commentsObject.user_id)])
    .then(([name]) => {
      let $comment = $(`
        <section class="vr-comments-box" id="comments-container">
          <section class="vr-comments-user">
            <div class="comments-user-name" id="user-name">${name}</div>
          </section>

          <div class="vr-comments-body">${commentsObject.body}</div>

          <div class="vr-comments-date">${commentsObject.created_at}</div>
        </section>
      `);

      return $comment;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const renderComments = function (commentsArray) {
  const $commentsContainer = $("#comments-container");
  $commentsContainer.empty();

  const commentPromises = commentsArray.map((resource) =>
    createCommentElement(resource)
  );

  Promise.all(commentPromises)
    .then(($comments) => {
      $commentsContainer.append($comments);
    })
    .catch((error) => {
      console.error(error);
    });
};

$(() => {
  $("#vr-create-comment").on("submit", function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    submitComment(formData)
      .then(() => {
        console.log("success");
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const loadComments = function () {
    $.get(`/api/comments/${window.resourceId}`)
      .done((comments) => {
        renderComments(comments.comments);
      })
      .fail((error) => {
        console.log(error);
      });
  };

  loadComments();
});
