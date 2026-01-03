window.isAdminActive = function () {
  const session = localStorage.getItem("adminSession");
  if (!session) return false;

  const data = JSON.parse(session);

  if (!data.loggedIn || Date.now() > data.expiresAt) {
    localStorage.removeItem("adminSession");
    return false;
  }

  return true;
};

// Optional: auto-expire check every 30 seconds
setInterval(() => {
  if (!window.isAdminActive()) {
    localStorage.removeItem("adminSession");
  }
}, 30000);
