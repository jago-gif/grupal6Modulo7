import { Historial, Libro, Miembro, sequelize } from "./modelo.js";

// Sincronizar modelos con la base de datos
sequelize.sync({ force: true }).then(async () => {
  console.log("Tablas creadas");

  // Insertar registros
  const Miembro = await Miembro.create({
    rut: "123456789",
    nombre: "Juan",
    apellido: "Perez",
    direccion: "Calle 123",
    telefono: "555-1234",
  });

  // Consultas
  
});
