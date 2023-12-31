import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("biblioteca", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

const Miembro = sequelize.define("Miembro", {
  rut: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Libro = sequelize.define("Libro", {
  isbn: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paginas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diasPrestamo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Autor = sequelize.define("Autor", {
  codigoAutor: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nombreAutor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoAutor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaNacimientoAutor: {
    type: DataTypes.DATEONLY,
  },
  fechaMuerteAutor: {
    type: DataTypes.DATEONLY,
  },
  tipoAutor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Historial = sequelize.define("Historial", {
  fechaPrestamo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaDevolucion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Libro.belongsToMany(Autor, { through: "LibroAutor" });
Autor.belongsToMany(Libro, { through: "LibroAutor" });

Miembro.hasMany(Historial);
Historial.belongsTo(Miembro);

Libro.hasMany(Historial);
Historial.belongsTo(Libro);

export { Historial, Libro, Miembro, Autor, sequelize };
