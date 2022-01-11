const express = require("express");
const router = new express.Router();
const AlbumModel = require("./../model/Album");
const ArtistModel = require("./../model/Artist");
const LabelModel = require("./../model/Label");
const uploader = require("./../config/cloudinary");

// router.use(protectAdminRoute);
router.post("/update/:id", uploader.single("cover"), async (req, res, next) => {
  console.log(req.body)
  const updatedAlbum = { ...req.body };
  if (!req.file) updatedAlbum.cover = undefined;
  else updatedAlbum.cover = req.file.path;

  try {
    const updateOneAlbum = await AlbumModel.findByIdAndUpdate(req.params.id, updatedAlbum);
    res.redirect("/dashboard/album")
  } catch (err) {
    next(err);
  }
})
// GET - all albums
router.get("/", async (req, res, next) => {
  try {
    albums = await AlbumModel.find().populate("artist label");
    res.render("dashboard/albums", {
      albums,
    });
  } catch (err) {
    next(err);
  }
});

// GET - create one album (form)
router.get("/create", async (req, res, next) => {
  try {
    const artists = await ArtistModel.find();
    const labels = await LabelModel.find();
    const albums = await AlbumModel.find().populate("artist label");
    res.render("dashboard/albumCreate", { artists, labels });
  } catch (err) {
    next(err);
  }
});

// GET - update one album (form)
router.get("/update/:id", async (req, res, next) => {
  try {
    const album = await AlbumModel.findById(req.params.id).populate("artist label");
    const allArtists = await ArtistModel.find();
    const allLabels = await LabelModel.find();
    res.render("dashboard/albumUpdate", {
      album, allArtists, allLabels
    })
  } catch (err) {
    next(err);
  }
})
// GET - delete one album

// POST - create one album
router.post("/", uploader.single("cover"), async (req, res, next) => {
  const newAlbum = { ...req.body };
  if (!req.file) newAlbum.cover = undefined;
  else newAlbum.cover = req.file.path;
  console.log(newAlbum);
  try {
    await AlbumModel.create(newAlbum);
    res.redirect("/dashboard/album");
  } catch (err) {
    next(err);
  }
});

// POST - update one album

module.exports = router;
