const createResourceElement = function (resourcesObject) {
  return Promise.all([
    getResourcePoster(resourcesObject.user_id),
    getResourceRating(resourcesObject.id),
    getResourceLikes(resourcesObject.id),
    getProfile(resourcesObject.user_id),
  ])
    .then(([name, rating, likes, profile]) => {
      let $resource = $(`
        <div class="resources-container">
        <div class="resources">
          <a href="/resources/${resourcesObject.id}"><img class="resource-img" src="${resourcesObject.img_url}"></img></a>
          <section class="resource-info">
            <div class="resource-title">
            <a class="resource-url" href="${resourcesObject.url}">${resourcesObject.title}</a>
            </div>

            <section class="resource-user-info">
              <img class="resource-user-pfp" src="${profile[0].pfp_url}"></img>
              <div class="resource-user-name">${name}</div>
            </section>

            <p class="resource-description">${resourcesObject.description}</p>

            <section class="r-i-footer">
              <div class="resource-rating">Rating: ${rating}⭐</div>
              <div class="likes">Likes: ${likes}</div>
            </section>
          </section>
          </div>
        </div>
      `);

      return $resource;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const renderResources = function (resourcesArray) {
  const $resourcesContainer = $(".resources-container");
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
