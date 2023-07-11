exports.get404Page = function (req, res) {
  res.status(404).render("404.ejs", {
    pageTitle: "error-page",
  });
};
