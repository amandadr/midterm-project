const createResourceElement = function (resourcesObject) {
  return Promise.all([
    getResourcePoster(resourcesObject.user_id),
    getResourceRating(resourcesObject.id),
    getResourceLikes(resourcesObject.id),
  ])
    .then(([name, rating, likes]) => {
      let $resource = $(`
        <div class="resources-container">
        <div class="resources">
          <img class="resource-img" src="${resourcesObject.img_url}"></img>
          <section class="resource-info">
            <div class="resource-title">${resourcesObject.title}</div>
            <div class="resource-url">${resourcesObject.url}</div>

            <section class="resource-user-info">
              <img class="resource-user-pfp"></img>
              <div class="resource-user-name">${name}</div>
            </section>

            <p class="resource-description">${resourcesObject.description}</p>

            <section class="r-i-footer">
              <div class="resource-rating">Rating: ${rating}</div>
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
      // Handle the error as needed
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
    $.get("/api/resources")
      .done((resources) => {
        renderResources(resources.resources);
      })
      .fail((error) => {
        console.log(error);
      });
  };

  loadResources();
});
