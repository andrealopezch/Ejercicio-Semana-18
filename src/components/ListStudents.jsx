import { useState, useEffect } from "react";
import { BiSolidTrash, BiSave } from "react-icons/bi";

function ListStudents() {
  const [students, setStudents] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    lastname: "",
    notes: "",
  });

  useEffect(() => {
    fetch("https://demobootcamp-vercel-api-node-postgress.vercel.app/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, [reloadFlag]);

  const allStudents = () => {
    fetch("https://demobootcamp-vercel-api-node-postgress.vercel.app/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  };

  const searchStudent = () => {
    fetch(
      `https://demobootcamp-vercel-api-node-postgress.vercel.app/students/${students}`
    )
      .then((response) => response.json())
      .then((data) => setStudents(data));
  };

  const saveStudent = () => {
    fetch(
      "https://demobootcamp-vercel-api-node-postgress.vercel.app/students",
      {
        method: "POST",
        body: JSON.stringify(newStudent),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setReloadFlag((prevFlag) => !prevFlag);
        setNewStudent({ id: "", name: "", lastname: "", notes: "" }); // Reset input fields after saving
      });
  };

  const deleteStudent = (id) => {
    fetch(
      `https://demobootcamp-vercel-api-node-postgress.vercel.app/students/${id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      setReloadFlag((prevFlag) => !prevFlag);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h1>Agregar Estudiante</h1>
      <div className="mb-4"></div>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="ID"
            name="id"
            value={newStudent.id}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Apellido"
            name="lastname"
            value={newStudent.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nota"
            name="notes"
            value={newStudent.notes}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-success m-1"
          onClick={saveStudent}
        >
          <BiSave /> Guardar
        </button>
      </form>
      <hr />
      <h1>Lista de Estudiantes</h1>
      <div className="mb-4"></div>
      {students &&
        students.map((item) => (
          <div key={item.id} className="mb-3">
            <button
              className="btn btn-danger m-1"
              onClick={() => deleteStudent(item.id)}
            >
              <BiSolidTrash /> Eliminar
            </button>
            <span>
              <strong>Id:</strong> {item.id},
            </span>
            <span>
              {" "}
              <strong>Nombre:</strong> {item.name} {item.lastname},
            </span>
            <span>
              {" "}
              <strong>Nota:</strong> {item.notes}
            </span>
          </div>
        ))}
    </div>
  );
}

export default ListStudents;
