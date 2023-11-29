const router = require("express").Router();
const { User, Comment, Post } = require("../models");
const withAuth = require("../utils/auth");

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
          include: { model: User, as: "user", attributes: ["name"] },
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("post", post);
  } catch {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    const userPosts = userData.map((post) => post.get({ plain: true }));
    console.log(userPosts);

    res.render("dashboard", {
      userPosts,
      logged_in: true,
    });
  } catch {
    res.status(500).json({ error: err.message });
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

module.exports = router;
