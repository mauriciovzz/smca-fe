import { React } from 'react';

import { errorIcon } from 'src/assets';
import { Heading } from 'src/components';

const VerificationError = ({ text, message }) => (
  <div className="flex h-fit w-full flex-col items-center divide-y rounded-lg bg-white p-5 shadow sm:h-fit sm:w-96">
    <Heading text={text} />

    <div className="flex w-full flex-col items-center space-y-5 pt-5">
      <img
        src={errorIcon}
        alt="error"
        className="h-[60px] w-[60px] self-center"
      />

      <div className="text-center font-bold">
        {message}
      </div>
    </div>
  </div>
);

export default VerificationError;
