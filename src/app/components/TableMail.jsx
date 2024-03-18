"use client";
import styles from "./tableMail.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
function TableMail({ login, domain }) {
  const [message, setMessage] = useState([]);
  const [modalMessage, setModalMessage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`
      );
      setMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }
  };

  const handleSubmitDirect = async (id) => {
    try {
      const response = await axios.get(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`
      );
      setModalMessage(response.data)
      setModalIsOpen(true); // Abre el modal cuando se recibe una respuesta
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <div className="container contenedor-tabla">
        <div className="container text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Cargar
          </button>
        </div>

        <table className="table table-hover ">
          <thead className="bg-dark">
            <tr>
              <th>Remitente</th>
              <th>Asunto</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {message.map((message, index) => (
              <tr key={index}>
                <td>{message.from}</td>
                <td>{message.subject}</td>
                <td>{message.date}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSubmitDirect(message.id)}
                    
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}

           
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mensaje"
      >
        <h2 className="text-center">Mensaje</h2>
        {modalMessage && (
          <div>
            <p className="text-center"><strong>Remitente:</strong> {modalMessage.from}</p>
            <p className="text-center"><strong> Asunto:</strong> {modalMessage.subject}</p>
            <p className="text-center"><strong>Contenido:</strong>  {modalMessage.textBody}</p>
          </div>
        )}
        <div className="text-center">
    <button className="text-center btn btn-outline-primary"  onClick={() => setModalIsOpen(false)}>Cerrar</button>
        </div>
        
      </Modal>
    </>
  );
}

export default TableMail;
