const router = require("express").Router();
const { User, Comment, Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    const allPosts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      allPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["name"] },
        {
          model: Comment,
          attributes: ["content", "date_created"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
