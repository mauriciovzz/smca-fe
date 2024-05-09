import { React } from 'react';

import { download } from 'src/assets';

const PhotoWidget = () => {
  const photoPath = '';

  return (
    <div className="flex h-full w-full rounded-xl bg-white p-5 text-xl font-medium shadow">
      <div className="relative flex h-full w-full">
        <img
          className="h-full w-full rounded-lg object-none object-center "
          src={`/api/${(photoPath) ? photoPath[0].photo_path : 'images/example.jpg'}`}
          alt="selected hour pic"
        />

        <a className="absolute bottom-0 right-0 flex h-[35px] w-[35px] items-center justify-center rounded-br-lg rounded-tl-lg border bg-white" href={`/api/${(photoPath) ? photoPath[0].photo_path : 'images/example.jpg'}`} download>
          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg hover:bg-graydetails">
            <img
              alt="download pic button"
              src={download}
              className="h-[20px] w-[20px]"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default PhotoWidget;
