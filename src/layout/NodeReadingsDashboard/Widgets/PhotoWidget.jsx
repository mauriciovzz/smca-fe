import { React } from 'react';

import { download, imageIcon } from 'src/assets';

const PhotoWidget = ({ dayPhotos, selectedDate }) => {
  const getPhotoPath = () => dayPhotos
    .find((photoReference) => photoReference.time === selectedDate.getHours())
    .photoPath;

  return (
    <div className="flex size-full rounded-xl bg-white p-5 text-xl font-medium shadow">
      <div className="relative flex size-full">
        {
          (getPhotoPath())
            ? (
              <>
                <img
                  className="size-full rounded-lg object-none object-center"
                  src={getPhotoPath()}
                  alt="selected hour pic"
                />

                <a
                  className="absolute bottom-0 right-0 flex size-[35px] items-center justify-center rounded-br-lg rounded-tl-lg border bg-white"
                  href={getPhotoPath()}
                  download
                >
                  <div className="flex size-[25px] items-center justify-center rounded-lg hover:bg-graydetails">
                    <img
                      alt="download pic button"
                      src={download}
                      className="size-[20px]"
                    />
                  </div>
                </a>
              </>
            )
            : (
              <div className="flex size-full flex-col items-center justify-center rounded-lg border">
                <img
                  alt="download pic button"
                  src={imageIcon}
                  className="size-[60px]"
                />
                <div className="text-sm text-[#5F6368]">No hay imagen</div>
              </div>
            )
        }
      </div>
    </div>
  );
};

export default PhotoWidget;
