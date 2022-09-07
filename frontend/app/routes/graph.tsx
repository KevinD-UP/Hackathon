import React, {useState, useCallback, CSSProperties, useEffect, } from 'react';
import {Link, useLoaderData} from "@remix-run/react";
import LineSeriesMouseOver from "~/components/LineSeriesMouseOver";
import LineSeriesMouseOverMM from "~/components/LineSeriesMouseOverMM";
import ArticleCarousel from "~/components/ArticleCarousel";
import LevelAnxiety from "~/components/LevelAnxiety";
import axios from "axios";
import type {LoaderFunction} from "@remix-run/server-runtime";
import {json} from "@remix-run/node";
import France from "~/components/france";

const begin = "2000-03-01";
const end = "2022-03-01";
const period ="month";

export const loader: LoaderFunction = async () => {
    const date = new Date()
    const formattedDate = date.toISOString().split('T')[0]
    const articlesAxios = await axios.get(`http://localhost:8000/news/${formattedDate}/${formattedDate}`)
    const meteoAxios = await axios.get(`http://localhost:8000/monthlymeteostat/07156/${begin}/${end}`)
    if(articlesAxios.status === 200 && meteoAxios.status === 200){
        return json({meteo: meteoAxios.data, articles: articlesAxios.data})
    }
    throw new Error(`Error! status`)
};

function getMonthDate(dateString : string){
    const parsedDateString = new Date(dateString);
    const constructedString = parsedDateString.getMonth() + 1 + "/" + parsedDateString.getFullYear();
    return constructedString;
}


export default function Graph() {

    const {meteo, articles} = useLoaderData();

    const avgTemperatureData = Array();
    const minTemperatureData =  Array();
    const maxTemperatureData = Array();
    const prcpData =  Array();
    const snowData= Array();

    for (let i in meteo){
        if(meteo[i].tavg !== null){
            avgTemperatureData.push({y: meteo[i].tavg , x: getMonthDate(meteo[i].date)});
        }
        if(meteo[i].tmin !== null){
            minTemperatureData.push({y: meteo[i].tmin , x: getMonthDate(meteo[i].date)});
        }
        if(meteo[i].tmax !== null){
            maxTemperatureData.push({y: meteo[i].tmax , x: getMonthDate(meteo[i].date)});
        }
        if(meteo[i].prcp !==null){
            prcpData.push({y: meteo[i].prcp , x: getMonthDate(meteo[i].date)});
        }
        if(meteo[i].snow !==null){
            snowData.push({y: meteo[i].snow , x: getMonthDate(meteo[i].date)});
        }

    }

    const avgTempTuple = [avgTemperatureData, "tmp moyenne Paris"];
    const minTempTuple = [minTemperatureData, "tmp min Paris"];
    const maxTempTuple = [maxTemperatureData, "tmp max Paris"];

    const prcpTuple = [prcpData, "prcp Paris"];
    const snowTuple = [snowData, "snow Paris"];

    const lineDataRaw = [avgTempTuple, minTempTuple, maxTempTuple];
    const lineDataRawMM = [prcpTuple, snowTuple];


    return (
      <div className="flex h-full min-h-screen flex-col justify-between">
          <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
              <h1 className="text-3xl font-bold">
                  <Link to=".">Réchauffement Climatique</Link>
              </h1>
          </header>

          <main className="flex  h-full w-full bg-slate-500 justify-center items-center">
              <div className="flex  h-4/5 w-11/12  justify-around ">

                  <div className='flex-col w-3/12 space-y-14'>
                      <div className='  flex-col -mt-8 h-1/2 '>
                          <h2 className="text-4xl font-bold text-white text-center -mb-4">Anxiété population</h2>
                          <div className='bg-slate-800 h-full min-h-full rounded-xl'>
                              <LevelAnxiety score={articles.averageEmotionScore}/>
                              <ArticleCarousel />
                          </div>
                      </div>
                      <div className=' flex-col -mt-8 h-1/2'>
                          <div className='bg-white h-full min-h-full rounded-xl'>
                            <France />
                          </div>
                      </div>

                  </div>

                  <div className=' w-7/12 flex-col -mt-8 '>
                      <h2 className="text-4xl font-bold text-white text-center -mb-4">Météorologie</h2>
                      <div className='bg-slate-800 h-full  rounded-xl flex flex-col  justify-around  '>
                          <div className='h-2/5  w-full'>
                              <LineSeriesMouseOver lineDataRaw={lineDataRaw}  begin={begin} end={end}/>
                          </div>
                          <div className='h-2/5 w-full'>
                              <LineSeriesMouseOverMM lineDataRaw={lineDataRawMM}  begin={begin} end={end}/>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      </div>
    );
}