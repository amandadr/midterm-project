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

function getCommentsPoster(id) {
  let url = `/api/comments/poster/${id}`;
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

function getResourceRating(id) {
  let url = `/api/resources/rating/${id}`;
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

function getResourceLikes(id) {
  let url = `/api/resources/likes/${id}`;
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

const submitComment = function (data) {
  return $.ajax({
    method: "POST",
    url: "/api/resources",
    data,
  });
};

const getResourceById = function (id) {
  let url = `/api/resources/${id}`;
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const resource = data.resource;
      return resource;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

$(() => {
  $("#login-form").submit(function (event) {
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

  $("#register-form").submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.post("/users/", formData)
      .done(function (response) {
        console.log("success");
      })
      .fail(function (error) {
        console.error(error);
      });
  });
});
