import React from 'react';

const Button = ({
  text, typeIsButton, onClick, form, color,
}) => {
  const selectColor = () => {
    switch (color) {
      case 'blue':
        return 'bg-sky-600 hover:bg-sky-700';
      case 'red':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return '';
    }
  };

  return (
    typeIsButton
      ? (
        <button
          type="button"
          onClick={() => onClick()}
          className={`${selectColor()} flex h-7 w-full items-center justify-center rounded-lg font-medium text-white shadow`}
        >
          {text}
        </button>
      )
      : (
        <button
          type="submit"
          form={form}
          className={`${selectColor()} flex h-7 w-full items-center justify-center rounded-lg font-medium text-white shadow`}
        >
          {text}
        </button>
      )
  );
};

export default Button;
