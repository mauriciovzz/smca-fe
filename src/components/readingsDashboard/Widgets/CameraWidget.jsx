import { React } from 'react';

import { downloadIcon, imageIcon, expandIcon } from 'src/assets';

const CameraWidget = ({ currentPhoto, photoName, setOpenCurrentPhoto }) => (
  <div className="flex size-full rounded-xl bg-white p-5 text-xl font-medium shadow">
    <div className="relative flex size-full rounded-xl border">
      {(currentPhoto !== null)
        ? (
          <>
            <img
              className="z-50 size-full rounded-xl object-none object-center"
              src={currentPhoto}
              alt="selected hour pic"
            />

            <div className="absolute right-0 top-0 z-[60] flex size-[35px] items-center justify-center rounded-bl-xl rounded-tr-xl bg-white">
              <button
                type="button"
                className="flex size-[25px] items-center justify-center rounded-lg hover:bg-graydetails"
                onClick={() => setOpenCurrentPhoto(true)}
              >
                <img
                  alt="expand pic button"
                  src={expandIcon}
                  className="size-[20px]"
                />
              </button>
            </div>

            <a
              className="absolute bottom-0 right-0 z-[60] flex size-[35px] items-center justify-center rounded-br-xl rounded-tl-xl bg-white"
              href={currentPhoto}
              download={photoName}
            >
              <div className="flex size-[25px] items-center justify-center rounded-lg hover:bg-graydetails">
                <img
                  alt="downloadIcon pic button"
                  src={downloadIcon}
                  className="size-[20px]"
                />
              </div>
            </a>
          </>
        )
        : (
          <div className="flex size-full flex-col items-center justify-center rounded-lg ">
            <img
              alt="downloadIcon pic button"
              src={imageIcon}
              className="size-[60px]"
            />
            <div className="text-sm text-[#5F6368]">No hay imagen</div>
          </div>
        )}
    </div>
  </div>
);

export default CameraWidget;
