const {
  getResourcePoster,
  getResourceLikes,
  getResourceRating,
} = require("../../db/queries/resources");

const createResourceElement = function (resourcesObject) {
  let $resource = $(`
  <div class="resource">
    <img id="resource-image" src="${resourcesObject.img_url}"></img>
    <section class="resource-info">
      <h2>${resourcesObject.title}</h2>
      <h4>${resourcesObject.url}</h4>
      <h3>${getResourcePoster(resourcesObject.user_id)}</h3>
      <p>${resourcesObject.description}</p>
      <section>
        <label for="rating">Rating: ${getResourceRating(
          resourceObject.id
        )}</label>
        <label for="likes">Likes: ${getResourceLikes(
          resourcesObject.id
        )}</label>
      </section>
    </section>
  </div>`);

  return $resource;
};

const renderResources = function (resourcesArray) {
  const $resourcesContainer = $("#resources-container");
  $resourcesContainer.empty();
  for (const resource of resourcesArray) {
    const $resource = createResourceElement(resource);
    $resourcesContainer.append($resource);
  }
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
        renderResources(resources);
      })
      .fail((error) => {
        console.log(error);
      });
  };

  loadResources();
});

module.exports = { resources };
