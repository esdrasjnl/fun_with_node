//const { mostrarMenu, pause } = require("./hellpers/mensajes");
const { pause } = require("./hellpers/mensajes");
const {
  inquiererMenu,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./hellpers/inquierer");
const { guardaDB, leerDB } = require("./hellpers/guardarArchivo");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  const tareasDB = leerDB();

  //await pause();

  if (tareasDB) {
    //Establece tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquiererMenu();
    //console.log({ opt });
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción:");
        //console.log(desc);
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        //console.log(tareas.listadoArr);
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        //console.log({ ok });
        if (id !== "0") {
          const ok = await confirmar("Estás seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
      default:
        break;
    }

    guardaDB(tareas.listadoArr);

    await pause();
    /*
    if (opt !== "0") {
      await pause();
    }*/

    /*
    //----- Probar objetos de tarea y tareas
    const tarea = new Tarea("comer");
    //console.log(tarea);

    const tareas = new Tareas();
    tareas._listado[tarea.id] = tarea;
    console.log(tareas);

    await pause();
    */
  } while (opt !== "0");
};

main();
