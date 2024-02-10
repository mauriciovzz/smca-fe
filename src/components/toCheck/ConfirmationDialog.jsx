import React from 'react';

const ConfirmationDialog = ({
  title, description, onConfirm, onDecline,
}) => (
  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/25 backdrop-blur-sm">

    <div className="h-fit w-[75%] space-y-4 rounded-lg bg-white p-4 shadow">
      <h1 className="font-bold">
        {title}
      </h1>
      <div>
        {description}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="rounded-lg bg-slate-200 p-1.5 font-semibold hover:bg-slate-300"
          onClick={onDecline}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="rounded-lg bg-red-600 p-1.5 font-semibold text-white hover:bg-red-500"
          onClick={onConfirm}
        >
          Eliminar
        </button>
      </div>
    </div>

  </div>
);

export default ConfirmationDialog;
