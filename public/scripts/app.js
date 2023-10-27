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

function getResourcesByLikedUser(id) {
  let url = `/profiles/${id}/liked`;
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const resources = data.resources;
      return resources;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function getResourcesByCategory(category, id) {
  let url = `/profiles/${id}/${category}`;
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const resources = data.resources;
      return resources;
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
    url: "/api/comments",
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

const getResourceByTitle = function (search) {
  let url = `/api/resources/results/${search}`;
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

const getProfile = function (id) {
  let url = `/api/profiles/${id}`;
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const profile = data.profile;
      return profile;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getResourcesBySearch = function (search) {
  let url = `/api/resources/search/${search}`;
  return $.ajax({
    url,
    dataType: "json",
  })
    .then((data) => {
      const resources = data.resources;
      return resources;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const submitLike = function (id, data) {
  return $.ajax({
    method: "POST",
    url: `/resources/${id}/like`,
    data,
  });
};

const submitUnlike = function (id, data) {
  return $.ajax({
    method: "POST",
    url: `/resources/${id}/unlike`,
    data,
  });
};

const submitRating = function (id, data) {
  return $.ajax({
    method: "POST",
    url: `/resources/${id}/rate`,
    data,
  });
};

$(() => {
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    const search = $("#search-text").val();
    window.location.href = `/resources/search/${search}`;
  });
});
