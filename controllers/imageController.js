const Image = require("../models/imageModel");
const fs = require("fs");
const path = require("path");

const imageController = {
  getAllImages: (req, res) => {
    Image.getAllImages((err, data) => {
      if (err) res.status(500).send({ message: "An error occurred" });
      else res.status(200).send(data);
    });
  },

  getImageById: (req, res) => {
    const id = req.params.id;
    Image.getImageById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found")
          res.status(404).send({ message: `Image with id ${id} not found` });
        else res.status(500).send({ message: "An error occurred" });
      } else res.status(200).send(data);
    });
  },

  createImage: (req, res) => {
    const { title, description, filename } = req.body;
    Image.createImage({ title, description, filename }, (err, data) => {
      if (err) res.status(500).send({ message: "An error occurred" });
      else
        res
          .status(201)
          .send({ id: data.insertId, title, description, filename });
    });
  },

  updateImage: (req, res) => {
    const id = req.params.id;
    const { title, description, filename } = req.body;
    Image.updateImage(id, { title, description, filename }, (err, data) => {
      if (err) {
        if (err.kind === "not_found")
          res.status(404).send({ message: `Image with id ${id} not found` });
        else res.status(500).send({ message: "An error occurred" });
      } else res.status(200).send({ id, title, description, filename });
    });
  },

  deleteImage: (req, res) => {
    const id = req.params.id;
    Image.deleteImage(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found")
          res.status(404).send({ message: `Image with id ${id} not found` });
        else res.status(500).send({ message: "An error occurred" });
      } else res.status(204).send();
    });
  },

  uploadImage: (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: "No image file uploaded." });
    }

    const { title, description } = req.body;
    const filename = req.file.filename;
    const imagePath = path.join(filename);

    Image.createImage(
      { title, description, filename: imagePath },
      (err, data) => {
        if (err) {
          return res.status(500).send({
            message: "An error occurred while saving image metadata.",
          });
        }

        res
          .status(201)
          .send({ id: data.insertId, title, description, filename: imagePath });
      }
    );
  },
};

module.exports = imageController;
