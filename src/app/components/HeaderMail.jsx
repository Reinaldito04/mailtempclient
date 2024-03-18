"use client";
import styles from "./HeaderMail.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TableMail from "./TableMail";
import Modal from "react-modal";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
function HeaderMail() {
  const [login, setLogin] = useState("");
  const [domain, setDomain] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  const handlesubmitModal = () => {
    setModalIsOpen(true); // Abre el modal cuando se recibe una respuesta
  };

  useEffect(() => {
    if (!mounted) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1"
          );
          const emailString = response.data[0];
          const [loginPart, domainPart] = emailString.split("@");
          setLogin(loginPart);
          setDomain(domainPart);
        } catch (error) {
          console.error("Error al obtener el correo electrónico:", error);
        } finally {
          setLoading(false); // Cambiar el estado de carga una vez que se completa la solicitud
        }
      };

      fetchData();
      setMounted(true);
    }
  }, [mounted]);

  return (
    <>
      <div className="contenedor-principalHeader container-fluid">
        <div className="contenedor-titulo container">
          <h2 className="text-center">Temp Mail</h2>
        </div>

        <div className="contenedor-mail container">
          <p className="parrafMail">
            Tu dirección de correo electronico temporal
          </p>

          <div className="contenedor-input d-flex">
            <input
              type="text"
              readOnly
              value={`${login}@${domain}`}
              className="input"
              title="Tu dirección de correo temporal"
            />
            <button className="btn-qr btn" onClick={handlesubmitModal}>
              <img src="qr.png" className="qrimg" alt="" />
            </button>
          </div>
        </div>
        <div className="contenedor-info">
          <p>
            Olvídate del correo basura, correos de fraude electrónico, robo de
            cuentas y ladrones de información. Mantén limpio y seguro tu correo
            electrónico real. Temp Mail proporciona direcciones de correo
            electrónico temporales, seguras, anónimas y gratuitas.
          </p>
        </div>
      </div>

      {loading ? (
        <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtiene el correo electrónico
      ) : (
        <TableMail login={login} domain={domain} /> // Renderiza el componente TableMail una vez que el correo electrónico ha sido obtenido
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="QR"
        style={{
          content: {
            width: "50%", // Define el ancho del modal
            height: "50%",
            margin: "0 auto",
            borderRadius: 25, // Define la altura del modal
          },
        }}
      >
        <h2 className="text-center">Code QR</h2>
        <div>
          <QRCode style={{ width: "100%" }} value={`${login}@${domain}`} />
        </div>
        <div className="text-center pt-1">
          <CopyToClipboard text={`${login}@${domain}`}>
            <button className="btn" onClick={()=>alert("texto copiado")}>Copiar Email</button>
          </CopyToClipboard>
        </div>
      </Modal>
    </>
  );
}

export default HeaderMail;
