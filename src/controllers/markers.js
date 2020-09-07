const controller = {};
const pool = require("../database");

controller.getAll = (req, res) => {
  const marcadores = pool.query("SELECT * FROM Markers", (err, data) => {
    if (err) {
      res.status(404).json({ log: "No se pudo crear el marcador." });
      return res;
    }
    res.status(200).json(data)
    return res;
  });
};

controller.getId = async (req, res) => {
  const { id } = req.params;
  const marcadores = await pool.query(
    "SELECT * FROM Markers WHERE id_makers = ?",
    [id],
    (err, data) => {
      if (err) {
        res.status(404).json({ log: "No existe el marcador." });
        console.log(err);
      }
      res.status(202);
      res.data = data;
      console.log(res.data);
    }
  );
};

controller.add = async (req, res) => {
  const { id_zona, name, address, lat, lng, type } = req.body;
  const marcador = {
    id_zona,
    name,
    address,
    lat,
    lng,
    type,
  };
  await pool.query("INSERT INTO Markers set ?", [marcador], (err, data) => {
    if (err) {
      res.status(404).json({ log: "No se creo el marcador." });
      console.log(err);
    }
    res.status(202);
    res.data = data;
    console.log(res.data);
  });
};

controller.update = async (req, res) => {
  const { id } = req.params;
  const newM = req.body;
  const marcadores = await pool.query(
    "UPDATE Markers set ? where id_makers= ?",
    [newM, id],
    (err, data) => {
      if (err) {
        res.status(404).json({ log: "Erro al editar el marcador." });
        console.log(err);
      }
      res.status(202);
      res.data = data;
      console.log(res.data);
    }
  );
};

controller.delete = async (req, res) => {
  const { id } = req.params;
  const marcadores = await pool.query(
    "DELETE FROM Markers where id_makers= ?",
    [id],
    (err, data) => {
      if (err) {
        return res.status(404).json({ log: "Erro al eliminar marcador." });
        console.log(err);
      }
      res.status(202);
      res.data = data;
      return res;
      console.log(res.data);
    }
  );
};

module.exports = controller;
