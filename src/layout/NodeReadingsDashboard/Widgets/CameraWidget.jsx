import {
  React, useState, useEffect,
} from 'react';

import { download } from 'src/assets';
// import photosService from 'src/services/photos';

const CameraWidget = ({ selectedNode }) => {
  const [photoPath, setPhotoPath] = useState('');

  const photoDate = '2023-10-23';
  const photoHour = 14;

  useEffect(() => {
    // photosService
    //   .getDayPaths(selectedNode, photoDate, photoHour)
    //   .then((requestedPath) => {
    //     setPhotoPath(requestedPath);
    //     setLoad(!load);
    //   });
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white px-4 py-2 shadow">
      <div className="relative flex h-[120px] w-[160px] justify-end">
        <img
          className="self-center rounded-xl shadow"
          src={`/api/${(photoPath) ? photoPath[0].photo_path : 'images/no_image.png'}`}
          alt="From OUT-1"
          width="160"
        />

        <a className="absolute flex self-end p-1" href={`/api/${(photoPath) ? photoPath[0].photo_path : 'images/no_image.png'}`} download>
          <img
            alt="ImageName"
            src={download}
          />
        </a>
      </div>

    </div>
  );
};

export default CameraWidget;
