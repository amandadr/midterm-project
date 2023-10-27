const createCommentElement = function (commentsObject) {
  return Promise.all([getCommentsPoster(commentsObject.user_id)])
    .then(([name]) => {
      let $comment = $(`
      <section class="vr-comments" id="comments-container">
        <section class="vr-comments-top">
          <div class="vr-comments-header">Comments:</div>
        </section>

      <section class="vr-comments-bottom">
          <form id="vr-create-comment">
            <section class="vr-c-c-user">
              <img class="vr-c-c-user-pfp"
              src="https://t3.ftcdn.net/jpg/01/06/13/54/360_F_106135410_hai531zdSrXxSDDuXvtbLtpslpDgb1d9.jpg">
            <div class="vr-c-c-user-name">@duqname</div>
            </section>

            <section class="vr-c-c-bottom">
            <textarea class="vr-c-c-body" placeholder="What do you have to quack about?" rows="5" maxlength="240"></textarea>

            <button id="vr-c-c-btn" type="submit">Honk!</button>
            </section>
          </form>

          <section class="vr-comments-box">
            <section class="vr-comments-user">
              <div class="comments-user-name" id="user-name">${name}</div>
            </section>

            <div class="vr-comments-body">${commentsObject.body}</div>

            <div class="vr-comments-date">${commentsObject.created_at}</div>
          </section>
        </section>
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

module.exports = { createCommentElement, renderComments };
