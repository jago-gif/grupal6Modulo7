import { Historial, Libro, Miembro, sequelize } from "./modelo.js";

// Sincronizar modelos con la base de datos
sequelize.sync({ force: true }).then(async () => {
  console.log("Tablas creadas");

  // Insertar registros
  await Miembro.bulkCreate([
    {
      rut: "1111111-1",
      nombre: "Juan",
      apellido: "Soto",
      direccion: "avenida 1, Santiago",
      telefono: "911111111",
    },
    {
      rut: "2222222-2",
      nombre: "Ana",
      apellido: "Pérez",
      direccion: "pasaje 2, Santiago",
      telefono: "922222222",
    },
    // ... Puedes agregar más registros aquí
  ]);

  // Consultas
  // ...
});
