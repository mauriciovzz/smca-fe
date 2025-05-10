import React from 'react';

import useScreenWidth from 'src/hooks/useScreenWidth';

const articles = [
  {
    name: 'Contaminación del aire ambiente y salud',
    author: 'Organizacion Mundial de la Salud',
    photo: 'https://cdn.who.int/media/images/default-source/air-pollution/air-pollution-in-urban-area.tmb-1366v.jpg?sfvrsn=4f0a3c36_7&quot',
    url: 'https://www.who.int/es/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health',
  },
  {
    name: 'Calidad del aire',
    author: 'Organizacion Panamericana de la Salud',
    photo: 'https://www.paho.org/sites/default/files/styles/top_hero/public/2022-08/cover-air-quality-1500x.jpg?h=e6f36a9c&itok=ecT1-mN_',
    url: 'https://www.paho.org/es/temas/calidad-aire',
  },
  {
    name: 'Conceptos básicos del Índice de Calidad del Aire',
    author: 'AirNow',
    photo: 'https://espanol.airnow.gov/sites/default/files/2020-04/hikers-801-305.png',
    url: 'https://espanol.airnow.gov/aqi/aqi-basics/',
  },
  {
    name: '¿Qué son los Objetivos de Desarrollo Sostenible?',
    author: 'Programa de las Naciones Unidas para el Desarrollo',
    photo: 'https://www.undp.org/sites/g/files/zskgke326/files/styles/full_hero_1392x940/public/2021-05/UNDP-South-Sudan-2018-solar-panels-DSCF4902-1920x1073px-3.jpg?h=029c4f0b&itok=xu6OOh4w',
    url: 'https://www.undp.org/es/sustainable-development-goals',
  },
  {
    name: 'Red de Monitoreo de Calidad del Aire de Bogotá',
    photo: 'https://www.ambientebogota.gov.co/documents/10184/397082/estaciones-monitoreo-20-agosto.jpg/21521005-605f-4795-ae72-f89832101dad?t=1630521130042',
    url: 'http://rmcab.ambientebogota.gov.co/home/map',
  },
  {
    name: 'Mapa de la calidad del aire de Washignton',
    photo: 'https://ecology.wa.gov/ecology/media/Images/COMMON/Banners/AirClimate-3.jpg?ext=.jpg',
    url: 'https://enviwa.ecology.wa.gov',
  },
];

const Articles = () => {
  const isScreenSmall = useScreenWidth();

  return (
    <div className="size-full">
      {
      (isScreenSmall)
        ? (
          <div className="hide-scrollbar flex w-full flex-col overflow-scroll scroll-smooth">
            <div className="inline-block space-y-4 px-5 pb-5 pt-1">
              {articles.map((article) => (
                <a
                  className="flex h-[250px] w-full flex-col overflow-hidden rounded-lg bg-blue-200 shadow hover:outline hover:outline-main"
                  href={article.url}
                >
                  <div className="relative h-3/4">
                    <img
                      className="absolute size-full object-cover"
                      src={article.photo}
                      alt="article accompaning graphic"
                    />
                  </div>
                  <div className="flex h-1/4 flex-col justify-center bg-white p-2.5">
                    <p className="text-sm font-semibold">{article.name}</p>
                    <p className="text-xs">{article.author}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )
        : (
          <div className="grid size-full grid-cols-3 grid-rows-2 gap-5 px-5 pb-5">
            {articles.map((article) => (
              <a
                className="flex size-full flex-col overflow-hidden rounded-lg bg-blue-200 shadow hover:outline hover:outline-main"
                href={article.url}
              >
                <div className="relative h-3/4">
                  <img
                    className="absolute size-full object-cover"
                    src={article.photo}
                    alt="article accompaning graphic"
                  />
                </div>
                <div className="flex h-1/4 flex-col justify-center bg-white p-2.5">
                  <p className="text-sm font-semibold">{article.name}</p>
                  <p className="text-xs">{article.author}</p>
                </div>
              </a>
            ))}
          </div>
        )
    }
    </div>
  );
};

export default Articles;
