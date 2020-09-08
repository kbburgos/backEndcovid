const controller = {};
const pool = require("../database");

controller.getAll = (req, res) => {
  const zona = pool.query("SELECT * FROM Zona", (err, data) => {
    if (err) {
      res.status(404).json({ log: "No se pudo obtener las zonas." });
      return res;
    }
    res.status(200).json(data)
    return res;
  });
};

controller.getId = async (req, res) => {
  const { id } = req.params;
  const zona = await pool.query(
    "SELECT * FROM Zona WHERE id_zona = ?",
    [id],
    (err, data) => {
      if (err) {
        res.status(404).json({ log: "No existe la zona." });
        console.log(err);
      }
      res.status(202);
      res.data = data;
      console.log(res.data);
    }
  );
};

controller.add = async (req, res) => {
  const { puntos, nombre } = req.body;
  const zona = {
    puntos,
    nombres,
  };
  await pool.query("INSERT INTO Zona set ?", [zona], (err, data) => {
    if (err) {
      res.status(404).json({ log: "No se creo el zona." });
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
  const zona = await pool.query(
    "UPDATE Zona set ? where id_zona= ?",
    [newM, id],
    (err, data) => {
      if (err) {
        res.status(404).json({ log: "Erro al editar el zona." });
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
  const zona = await pool.query(
    "DELETE FROM Zona where id_zona= ?",
    [id],
    (err, data) => {
      if (err) {
        return res.status(404).json({ log: "Erro al eliminar zona." });
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
