const createResourceElement = function (resourcesObject) {
  return Promise.all([
    getResourcePoster(resourcesObject.user_id),
    getResourceRating(resourcesObject.id),
    getResourceLikes(resourcesObject.id),
    getProfile(resourcesObject.user_id),
  ])
    .then(([name, rating, likes, profile]) => {
      let $resource = $(`
        <section class="vr-left">
        <a href="/resources/${resourcesObject.id}"><img class="resource-img" src="${resourcesObject.img_url}"></img></a>
          <section class="r-i-footer">
            <section class="r-i-f-rate">
              <div class="resource-rating">Rating: ${rating}⭐</div>
              <form class="rate" action="/resources/${resourcesObject.id}/rate" method="POST" id="rate-resource">
                <select id="rate-menu" >
                <option value="1">1⭐</option>
                <option value="2">2⭐</option>
                <option value="3">3⭐</option>
                <option value="4">4⭐</option>
                <option value="5">5⭐</option>
              </select>
              <button id="rate-btn" type="submit">Rate</button>
              </form>
            </section>
            <section class="r-i-f-like">
              <div class="likes">Likes: ${likes}</div>
              <form class="like" action="/resources/${resourcesObject.id}/like" method="POST" id="like-resource">
                <button id="like-btn" type="submit">Like</button>
              </form>
            </section>
          </section>
        </section>

        <section class="vr-right">
          <section class="resource-info">
            <div class="resource-title">${resourcesObject.title}</div>
            <a class="resource-url" href="${resourcesObject.url}">${resourcesObject.url}</a>
          </section>

          <section class="resource-body">
            <div class="resource-description-header">Description</div>
            <p class="resource-description">${resourcesObject.description}</p>
          </section>

          <section class="resource-user-info">
            <a href="/profiles/${resourcesObject.user_id}">
          <img class="resource-user-pfp" src="${profile[0].pfp_url}"></img>
          <div class="resource-user-name">${name}</div>
            </a>
          </section>
        </section>
      `);

      return $resource;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const renderResources = function (resourcesArray) {
  const $resourcesContainer = $("#resource-container");
  $resourcesContainer.empty();

  const resourcePromises = resourcesArray.map((resource) =>
    createResourceElement(resource)
  );

  Promise.all(resourcePromises)
    .then(($resources) => {
      $resourcesContainer.append($resources);
    })
    .catch((error) => {
      console.error(error);
    });
};

$(() => {
  console.log(window.liked);
  if (window.liked) {
    $("#like-btn").text("Unlike");
    $("#like-resource").attr("id", "unlike-resource");
  } else {
    $("#like-btn").text("Like");
    $("#unlike-resource").attr("id", "like-resource");
  }

  $("#resources").on("submit", function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    submitResource(formData)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });
  });

  $(document).on("submit", "#like-resource", function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    submitLike(window.resourceId, window.userId, formData)
      .then(() => {
        console.log("success");
        window.liked = true;
        $("#like-btn").text("Unlike");
        $("#like-resource").attr("id", "unlike-resource");
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  });

  $(document).on("submit", "#unlike-resource", function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    submitUnlike(window.resourceId, formData)
      .then(() => {
        console.log("success");
        window.liked = false;
        $("#like-btn").text("Like");
        $("#unlike-resource").attr("id", "like-resource");
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  });

  $(document).on("submit", "#rate-resource", function (event) {
    event.preventDefault();
    const selectedRating = $("#rate-menu").val();
    const formData = $(this).serialize() + `&rating=${selectedRating}`;
    submitRating(window.resourceId, formData)
      .then(() => {
        console.log("success");
        location.reload();
      })
      .catch((error) => {
        alert("You have already rated this resource");
        console.error(error);
      });
  });

  const loadResources = function () {
    $.get(`/api/resources/${window.resourceId}`)
      .done((resources) => {
        console.log(resources);
        renderResources([resources.resource]);
      })
      .fail((error) => {
        console.log(error);
      });
  };

  loadResources();
});
