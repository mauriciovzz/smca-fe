import React from 'react';

const ConfirmationDialog = ({
  title, description, onConfirm, onDecline,
}) => (
  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-white/25 backdrop-blur-sm">

    <div className="h-fit w-[75%] space-y-4 rounded-lg bg-white p-4 shadow">
      <h1 className="font-bold">
        {title}
      </h1>
      <div className="text-justify text-sm">
        {description}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="h-[28px] w-[80px] rounded-lg bg-slate-200 font-medium hover:bg-slate-300"
          onClick={onDecline}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="h-[28px] w-[80px] rounded-lg bg-red-600 font-medium text-white hover:bg-red-500"
          onClick={onConfirm}
        >
          Eliminar
        </button>
      </div>
    </div>

  </div>
);

export default ConfirmationDialog;
