import { React, useState } from 'react';

const questions = [
  {
    question: '¿Cómo puedo crear una cuenta en el sistema?',
    answer: 'Puedes registrarte desde la pantalla de inicio de sesión haciendo clic en el botón “Regístrate”. Deberás ingresar tu nombre, apellido, correo electrónico y una contraseña. Luego recibirás un enlace de verificación en tu correo, el cual deberás confirmar para activar tu cuenta.',
  },
  {
    question: 'Olvidé mi contraseña, ¿cómo la recupero?',
    answer: 'En la pantalla de inicio de sesión, haz clic en “Olvidé mi contraseña”. Se te pedirá que ingreses el correo electrónico asociado a tu cuenta. Si el correo es válido, recibirás un enlace para restablecer tu contraseña.',
  },
  {
    question: '¿Puedo cambiar el correo electrónico de mi cuenta?',
    answer: 'Sí. Desde la sección de Cuenta, puedes ingresar un nuevo correo electrónico y tu contraseña actual. El sistema enviará un enlace de verificación al nuevo correo, el cual deberás confirmar para completar la actualización.',
  },
  {
    question: '¿Qué es un espacio y cómo puedo unirme a uno?',
    answer: 'Un espacio es un entorno colaborativo donde se agrupan nodos, ubicaciones, componentes, variables y usuarios. Puedes unirte si un administrador te envía una invitación, la cual aparecerá en la sección de notificaciones. También puedes crear tus propios espacios desde la sección de espacios haciendo clic en el botón “+”.',
  },
  {
    question: '¿Qué es un nodo?',
    answer: 'Un nodo es un dispositivo físico compuesto por un microcontrolador, sensores y otros componentes electrónicos. Está diseñado para medir variables del entorno y enviar los datos capturados al sistema.',
  },
  {
    question: '¿Cómo agrego un nodo al sistema?',
    answer: 'Solo los administradores de un espacio pueden agregar nodos. Para hacerlo, deben ir a la sección Nodos dentro del espacio y hacer clic en “Agregar nodo”. El sistema los guiará paso a paso hasta su configuración final.',
  },
  {
    question: '¿Por qué mi nodo aparece como inactivo?',
    answer: 'Los nodos recién registrados o modificados aparecen como inactivos por defecto, indicando que aún no han sido ensamblados o activados físicamente. Su estado puede cambiarse a activo desde su vista de gestión.',
  },
  {
    question: '¿Cómo descargo el archivo de configuración de un nodo?',
    answer: 'Desde la lista de nodos, haz clic sobre el nodo deseado. En su vista de gestión encontrarás el botón “Descargar configuración”, que genera un archivo ZIP con el código necesario para programar el microcontrolador.',
  },
  {
    question: '¿Qué variables se incluyen por defecto al crear un espacio?',
    answer: 'Al crear un nuevo espacio, el sistema incluye automáticamente las siguientes variables: Ambientales: CO, NO₂, O₃, PM10, PM2.5, SO₂. Meteorológicas: Humedad, Presión, Radiación solar, Temperatura, Precipitación.',
  },
  {
    question: '¿Cómo puedo descargar los datos recopilados por un nodo?',
    answer: 'Ve a la sección Reportes, selecciona la ubicación, el rango de fechas y las variables deseadas. Luego haz clic en “Generar Reporte” y finalmente en “Descargar Reporte” para obtener los datos en formato hoja de cálculo.',
  },
  {
    question: '¿Por qué algunas estaciones se muestran en color negro en el mapa?',
    answer: 'Las estaciones que se muestran en negro indican que no están enviando datos actualmente. Esto puede deberse a que el nodo está inactivo, desconectado o presenta fallas técnicas.',
  },
  {
    question: '¿Dónde puedo descargar el manual de usuario completo?',
    answer: 'Puedes descargar el Manual de Usuario haciendo clic aquí.',
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="size-full">
      <div className="hide-scrollbar flex w-full flex-col overflow-scroll scroll-smooth">
        <div className="inline-block space-y-4 px-5 pb-5 pt-1">
          {questions.map((question, index) => (
            <div
              key={question.question}
              className="mb-4 overflow-hidden rounded border shadow"
            >
              <button
                type="button"
                className="w-full cursor-pointer border-none p-4 text-left font-bold"
                style={{
                  backgroundColor: openIndex === index ? '#f0f0f0' : '#fff',
                }}
                onClick={() => toggleIndex(index)}
              >
                {question.question}
              </button>
              {openIndex === index && (
              <div className="bg-white p-4 text-justify">
                {question.answer}
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
