import { useState, useEffect } from "react";

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
        setNewStudent({ id: "", name: "", lastname: "", notes: "" });
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
    <div>
      <h1>Agregar Estudiante</h1>
      <div></div>
      <form>
        <div>
          <input
            type="text"
            placeholder="ID"
            name="id"
            value={newStudent.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Apellido"
            name="lastname"
            value={newStudent.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Nota"
            name="notes"
            value={newStudent.notes}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={saveStudent}>
          Guardar
        </button>
      </form>
      <hr />
      <h1>Lista de Estudiantes</h1>
      <div></div>
      {students &&
        students.map((item) => (
          <div key={item.id}>
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
