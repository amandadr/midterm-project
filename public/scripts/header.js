const loadProfileName = (id) => {
  return Promise.all([getProfile(id)])
    .then(([profile]) => {
      const name = profile[0].display_name;
      const pfp = profile[0].pfp_url;
      const username = document.querySelector("#user-name");
      const pfpDisplay = document.querySelector("#user-pfp");
      pfpDisplay.src = pfp;
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
