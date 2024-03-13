import React from 'react';

const Button = ({
  text, typeIsButton, onClick, form, color, disabled,
}) => {
  const selectColor = () => {
    switch (color) {
      case 'blue':
        return disabled ? 'bg-sky-700' : 'bg-sky-600 hover:bg-sky-700';
      case 'red':
        return disabled ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700';
      case 'gray':
        return disabled ? 'bg-gray-500' : 'bg-gray-400 hover:bg-gray-500';
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
          disabled={disabled}
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
