const createResourceElement = function (resourcesObject) {
  return Promise.all([
    getResourcePoster(resourcesObject.user_id),
    getResourceRating(resourcesObject.id),
    getResourceLikes(resourcesObject.id),
  ])
    .then(([name, rating, likes]) => {
      let $resource = $(`
        <div class="resource">
          <img id="resource-image" src="${resourcesObject.img_url}"></img>
          <section class="resource-info">
            <h2>${resourcesObject.title}</h2>
            <h4>${resourcesObject.url}</h4>
            <h3>${name}</h3>
            <p>${resourcesObject.description}</p>
            <section>
              <label for="rating">Rating: ${rating}</label>
              <label for="likes">Likes: ${likes}</label>
            </section>
          </section>
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
  const $resourcesContainer = $("#resources-container");
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
  $("#resources").on("click", function (event) {
    event.preventDefault();
    const formData = this.serialize();
    $.ajax({
      method: "POST",
      url: "/api/resources",
      data: formData,
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
