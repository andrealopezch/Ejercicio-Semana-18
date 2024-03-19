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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  return (
    <div>
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
