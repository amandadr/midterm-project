function getAllResources() {
  let url = "/api/resources/load";
  return $.ajax({
    url,
  });
}

function getResourcePoster(id) {
  let url = `/api/resources/poster/${id}`;
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const name = data.poster.name;
      return name;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function getResourceRating() {
  let url = "/api/resources/rating";
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const rating = data.rating;
      return rating;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function getResourceLikes() {
  let url = "/api/resources/likes";
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const likes = data.likes;
      return likes;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

const submitResource = function (data) {
  return $.ajax({
    method: "POST",
    url: "/api/resources",
    data,
  });
};

$(() => {
  $("#login").submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.post("/users/login", formData)
      .done(function (response) {
        console.log(response);
      })
      .fail(function (error) {
        console.error(error);
      });
  });
});
