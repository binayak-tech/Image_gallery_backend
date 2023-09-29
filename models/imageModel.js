const db = require("../config/database");

const Image = {
  getAllImages: (result) => {
    db.query("SELECT * FROM images", (err, res) => {
      if (err) throw err;
      result(null, res);
    });
  },

  getImageById: (id, result) => {
    db.query("SELECT * FROM images WHERE id = ?", id, (err, res) => {
      if (err) {
        if (err.kind === "not_found") result({ kind: "not_found" }, null);
        else throw err;
      } else result(null, res[0]);
    });
  },

  createImage: (image, result) => {
    db.query("INSERT INTO images SET ?", image, (err, res) => {
      if (err) throw err;
      result(null, res);
    });
  },

  updateImage: (id, image, result) => {
    db.query("UPDATE images SET ? WHERE id = ?", [image, id], (err, res) => {
      if (err) {
        if (err.kind === "not_found") result({ kind: "not_found" }, null);
        else throw err;
      } else result(null, res);
    });
  },

  deleteImage: (id, result) => {
    db.query("DELETE FROM images WHERE id = ?", id, (err, res) => {
      if (err) {
        if (err.kind === "not_found") result({ kind: "not_found" }, null);
        else throw err;
      } else result(null, res);
    });
  },
};

module.exports = Image;
