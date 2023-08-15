import { Historial, Libro, Miembro, Autor, sequelize } from "./modelo.js";
import { QueryTypes } from "sequelize";

// Sincronizar modelos con la base de datos
sequelize.sync({ force: true }).then(async () => {
  console.log("Tablas creadas");

  // Insertar registros

  //SOCIOS
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
    {
      rut: "3333333-3",
      nombre: "Sandra",
      apellido: "Aguilar",
      direccion: "avenida 2, Santiago",
      telefono: "933333333",
    },
    {
      rut: "4444444-4",
      nombre: "Esteban",
      apellido: "Jerez",
      direccion: "avenida 3, Santiago",
      telefono: "944444444",
    },
    {
      rut: "5555555-5",
      nombre: "Silvana",
      apellido: "Muñoz",
      direccion: "pasaje 3, Santiago",
      telefono: "955555555",
    },
    // ... Puedes agregar más registros aquí
  ]);
  // LIBROS
  await Libro.bulkCreate([
    {
      isbn: "111-1111111-111",
      titulo: "CUENTOS DE TERROR",
      paginas: 344,
      diasPrestamo: 7,
    },
    {
      isbn: "222-2222222-222",
      titulo: "POESÍAS CONTEMPORANEAS",
      paginas: 167,
      diasPrestamo: 7,
    },
    {
      isbn: "333-3333333-333",
      titulo: "HISTORIA DE ASIA",
      paginas: 511,
      diasPrestamo: 14,
    },
    {
      isbn: "444-4444444-444",
      titulo: "MANUAL DE MECÁNICA",
      paginas: 29,
      diasPrestamo: 14,
    },

    // ... Puedes agregar más registros aquí
  ]);

  //HISTORIAL

  await Historial.bulkCreate([
    {
      fechaPrestamo: new Date("2020-01-20"),
      fechaDevolucion: new Date("2020-01-27"),
      MiembroRut: "1111111-1", // Aquí agregamos el rut del miembro
      LibroIsbn: "111-1111111-111", // Aquí agregamos el isbn del libro
    },
    {
      fechaPrestamo: new Date("2020-01-20"),
      fechaDevolucion: new Date("2020-01-30"),
      MiembroRut: "5555555-5",
      LibroIsbn: "222-2222222-222",
    },
    {
      fechaPrestamo: new Date("2020-01-22"),
      fechaDevolucion: new Date("2020-01-30"),
      MiembroRut: "3333333-3",
      LibroIsbn: "333-3333333-333",
    },
    {
      fechaPrestamo: new Date("2020-01-23"),
      fechaDevolucion: new Date("2020-01-30"),
      MiembroRut: "4444444-4",
      LibroIsbn: "444-4444444-444",
    },
    {
      fechaPrestamo: new Date("2020-01-27"),
      fechaDevolucion: new Date("2020-02-04"),
      MiembroRut: "2222222-2",
      LibroIsbn: "111-1111111-111",
    },
    {
      fechaPrestamo: new Date("2020-01-31"),
      fechaDevolucion: new Date("2020-02-12"),
      MiembroRut: "1111111-1",
      LibroIsbn: "444-4444444-444",
    },
    {
      fechaPrestamo: new Date("2020-01-31"),
      fechaDevolucion: new Date("2020-02-12"),
      MiembroRut: "3333333-3",
      LibroIsbn: "222-2222222-222",
    },
    // ... Puedes agregar más registros aquí
  ]);

  await Autor.bulkCreate([
    {
      codigoAutor: 3,
      nombreAutor: "JOSE",
      apellidoAutor: "SALGADO",
      fechaNacimientoAutor: "1968",
      fechaMuerteAutor: "2020",
      tipoAutor: "PRINCIPAL",
      isbn: "111-1111111-111",
    },
    {
      codigoAutor: 4,
      nombreAutor: "ANA",
      apellidoAutor: "SALGADO",
      fechaNacimientoAutor: "1972",
      fechaMuerteAutor: null,
      tipoAutor: "COAUTOR",
      isbn: "111-1111111-111",
    },
    {
      codigoAutor: 5,
      nombreAutor: "MARTIN",
      apellidoAutor: "PORTA",
      fechaNacimientoAutor: "1976",
      fechaMuerteAutor: null,
      tipoAutor: "PRINCIPAL",
      isbn: "444-4444444-444",
    },
    {
      codigoAutor: 2,
      nombreAutor: "SERGIO",
      apellidoAutor: "MARDONES",
      fechaNacimientoAutor: "1950",
      fechaMuerteAutor: "2012",
      tipoAutor: "PRINCIPAL",
      isbn: "333-3333333-333",
    },
    {
      codigoAutor: 1,
      nombreAutor: "ANDRÉS",
      apellidoAutor: "ULLOA",
      fechaNacimientoAutor: "1982",
      fechaMuerteAutor: null,
      tipoAutor: "PRINCIPAL",
      isbn: "222-2222222-222",
    },
  ]);

  // Consultas
  // ...

  // Consulta para mostrar libros con menos de 300 páginas
  sequelize
    .query(
      "select l.titulo, l.paginas from libros l  join autors a on l.isbn = a.isbn where l.paginas < 300; ",
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((libros) => {
      libros.forEach((libro) => {
        console.log(`${libro.titulo} - ${libro.paginas} pag`);
      });
    });

  sequelize
    .query(
      "select nombreAutor, apellidoAutor, YEAR(fechaNacimientoAutor) as anos from autors where YEAR(fechaNacimientoAutor) > 1970; ",
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((autors) => {
      autors.forEach((autor) => {
        console.log(
          `${autor.nombreAutor} - ${autor.apellidoAutor} - ${autor.anos} `
        );
      });
    });

  sequelize
    .query(
      "SELECT h.LibroIsbn, l.titulo, COUNT(*) AS totalSolicitudes FROM Historials h JOIN Libros l ON h.LibroIsbn = l.isbn GROUP BY h.LibroIsbn, l.titulo ORDER BY totalSolicitudes DESC LIMIT 1",
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((historials) => {
      if (historials.length > 0) {
        const mostRequestedBook = historials[0];
        console.log(`El libro más solicitado es: ${mostRequestedBook.titulo}`);
        console.log(
          `Total de solicitudes: ${mostRequestedBook.totalSolicitudes}`
        );
      } else {
        console.log("No hay registros de historial de préstamos.");
      }
    })
    .catch((error) => {
      console.error("Error al buscar el libro más solicitado:", error);
    });

    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    sequelize
      .query(
        `SELECT m.rut, m.nombre, m.apellido, h.fechaDevolucion, h.fechaPrestamo,
      DATEDIFF(h.fechaDevolucion, h.fechaPrestamo) AS diasRetraso,
      DATEDIFF(h.fechaDevolucion, h.fechaPrestamo) * 100 AS multa
    FROM Historials h
    INNER JOIN Miembros m ON h.MiembroRut = m.rut
    WHERE h.fechaDevolucion > h.fechaPrestamo + INTERVAL 7 DAY`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((lateReturns) => {
        lateReturns.forEach((lateReturn) => {
          console.log(
            `Usuario: ${lateReturn.nombre} ${lateReturn.apellido} (${lateReturn.rut})`
          );
          console.log(`Fecha de préstamo: ${lateReturn.fechaPrestamo}`);
          console.log(`Fecha de devolución: ${lateReturn.fechaDevolucion}`);
          console.log(`Días de retraso: ${lateReturn.diasRetraso}`);
          console.log(`Multa a pagar: $${lateReturn.multa}`);
          console.log("----------------------");
        });
      })
      .catch((error) => {
        console.error("Error al calcular multas:", error);
      });

/////////////////// Versión con await //////////////////////

      async function mostrarLibrosMenosDe300Paginas() {
        try {
          const libros = await sequelize.query(
            "SELECT l.titulo, l.paginas FROM libros l JOIN autors a ON l.isbn = a.isbn WHERE l.paginas < 300;",
            {
              type: QueryTypes.SELECT,
            }
          );
      
          libros.forEach((libro) => {
            console.log(`${libro.titulo} - ${libro.paginas} páginas`);
          });
        } catch (error) {
          console.error("Error al buscar libros:", error);
        }
      }
      
      async function mostrarAutoresNacidosDespuesDe1970() {
        try {
          const autors = await sequelize.query(
            "SELECT nombreAutor, apellidoAutor, YEAR(fechaNacimientoAutor) as anos FROM autors WHERE YEAR(fechaNacimientoAutor) > 1970;",
            {
              type: QueryTypes.SELECT,
            }
          );
      
          autors.forEach((autor) => {
            console.log(`${autor.nombreAutor} - ${autor.apellidoAutor} - ${autor.anos}`);
          });
        } catch (error) {
          console.error("Error al buscar autores:", error);
        }
      }
      
      async function mostrarLibroMasSolicitado() {
        try {
          const historials = await sequelize.query(
            "SELECT h.LibroIsbn, l.titulo, COUNT(*) AS totalSolicitudes FROM Historials h JOIN Libros l ON h.LibroIsbn = l.isbn GROUP BY h.LibroIsbn, l.titulo ORDER BY totalSolicitudes DESC LIMIT 1;",
            {
              type: QueryTypes.SELECT,
            }
          );
      
          if (historials.length > 0) {
            const libroMasSolicitado = historials[0];
            console.log(`El libro más solicitado es: ${libroMasSolicitado.titulo}`);
            console.log(`Total de solicitudes: ${libroMasSolicitado.totalSolicitudes}`);
          } else {
            console.log("No hay registros de historial de préstamos.");
          } 
        } catch (error) {
          console.error("Error al buscar el libro más solicitado:", error);
        }
      }
      
      async function mostrarMultaPorRetraso() {
        try {
          const lateReturns = await sequelize.query(
            `SELECT m.rut, m.nombre, m.apellido, h.fechaDevolucion, h.fechaPrestamo,
            DATEDIFF(h.fechaDevolucion, h.fechaPrestamo) AS diasRetraso,
            DATEDIFF(h.fechaDevolucion, h.fechaPrestamo) * 100 AS multa
            FROM Historials h
            INNER JOIN Miembros m ON h.MiembroRut = m.rut
            WHERE h.fechaDevolucion > h.fechaPrestamo + INTERVAL 7 DAY;`,
            {
              type: QueryTypes.SELECT,
            }
          );
      
          lateReturns.forEach((lateReturn) => {
            console.log(`Usuario: ${lateReturn.nombre} ${lateReturn.apellido} (${lateReturn.rut})`);
            console.log(`Fecha de préstamo: ${lateReturn.fechaPrestamo}`);
            console.log(`Fecha de devolución: ${lateReturn.fechaDevolucion}`);
            console.log(`Días de retraso: ${lateReturn.diasRetraso}`);
            console.log(`Multa a pagar: $${lateReturn.multa}`);
            console.log("----------------------");
          });
        } catch (error) {
          console.error("Error al calcular multas:", error);
        }
      }
      
      // Llamar a las funciones asincrónicas con await
      (async () => {
        await mostrarLibrosMenosDe300Paginas();
        await mostrarAutoresNacidosDespuesDe1970();
        await mostrarLibroMasSolicitado();
        await mostrarMultaPorRetraso();
      })();
      



});


