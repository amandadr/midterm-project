const loadProfileName = (id) => {
  return Promise.all([getProfile(id)])
    .then(([profile]) => {
      const name = profile[0].display_name;
      const username = document.querySelector("#user-name");
      username.textContent = `@${name}`;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

$(() => {
  if (window.userId) {
    loadProfileName(window.userId);
  }
});
