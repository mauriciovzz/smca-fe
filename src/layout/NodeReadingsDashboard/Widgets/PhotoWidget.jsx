import { React } from 'react';

import { download, imageIcon } from 'src/assets';

const PhotoWidget = ({ dayPhotos, selectedDate }) => {
  const getPhotoPath = () => dayPhotos
    .find((photoReference) => photoReference.time === selectedDate.getHours())
    .photoPath;

  return (
    <div className="flex h-full w-full rounded-xl bg-white p-5 text-xl font-medium shadow">
      <div className="relative flex h-full w-full">
        {
          (getPhotoPath())
            ? (
              <>
                <img
                  className="h-full w-full rounded-lg object-none object-center"
                  src={getPhotoPath()}
                  alt="selected hour pic"
                />

                <a
                  className="absolute bottom-0 right-0 flex h-[35px] w-[35px] items-center justify-center rounded-br-lg rounded-tl-lg border bg-white"
                  href={getPhotoPath()}
                  download
                >
                  <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg hover:bg-graydetails">
                    <img
                      alt="download pic button"
                      src={download}
                      className="h-[20px] w-[20px]"
                    />
                  </div>
                </a>
              </>
            )
            : (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border">
                <img
                  alt="download pic button"
                  src={imageIcon}
                  className="h-[60px] w-[60px]"
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
