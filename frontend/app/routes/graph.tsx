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

const begin = "1980-01-01";
const end = "2021-12-01";

export const loader: LoaderFunction = async () => {
    const date = new Date()
    const formattedDate = date.toISOString().split('T')[0]
    const articlesAxios = await axios.get(`http://localhost:8000/news/2022-09-01/2022-09-01`)
    const meteoAxios = await axios.get(`http://localhost:8000/monthlymeteostat/07156/${begin}/${end}`)
    if(articlesAxios.status === 200 && meteoAxios.status === 200){
        return json({meteo: meteoAxios.data, articles: articlesAxios.data})
    }
    throw new Error(`Error! status`)
};

function getShortDate(dateString : string, period: string){
    const parsedDateString = new Date(dateString);
    let constructedString;
    if(period == "month"){
        constructedString = parsedDateString.getMonth() + 1 + "/" + parsedDateString.getFullYear();
    }
    else if(period == "year"){
        constructedString = parsedDateString.getFullYear().toString();
    }

    return constructedString;
}

function copyArray( array: string | any[] ){
    let returnValue = Array();
    for(let i=0; i<array.length;i++){
        returnValue.push(array[i]);
    }
    return returnValue
}

function  emptyArray(array: void[]){
    while(array.length >0){
        array.pop();
    }
}


export default function Graph() {

    const {meteo, articles} = useLoaderData();

    const avgTemperatureData = Array();
    const prcpData =  Array();

    let previousShortDate;
    let shortDate;
    let avgTempYearArray= Array();
    let avgPrcpYearArray= Array();

    for (let i =0; i < meteo.length; i++) {
        shortDate = getShortDate(meteo[i].date, "year");

        //INIT previous short pour premier tour
        if(i == 0 ){
            previousShortDate = shortDate;
        }

        // SI toujours la meme anne on push dans le sous tableau de l'annéee
        if(previousShortDate == shortDate){
            if (meteo[i].tavg !== null) {
                avgTempYearArray.push({y: meteo[i].tavg, x: new Date(meteo[i].date).getMonth()});
            }
            if (meteo[i].prcp !== null) {
                avgPrcpYearArray.push({y: meteo[i].prcp, x:  new Date(meteo[i].date).getMonth()});
            }
        }
        //Si on viens de recup la premiere data d'une nouvelle année

         if(previousShortDate != shortDate || i == meteo.length-1){
            // on push le tuple année/ data par mois pour cette année
            avgTemperatureData.push([copyArray(avgTempYearArray), previousShortDate]);
            prcpData.push([avgPrcpYearArray.slice(), previousShortDate]);

            // on renouvelle les array
            emptyArray(avgTempYearArray);
            emptyArray(avgPrcpYearArray);

            // on push la premiere data de cette nouvelle année
            if (meteo[i].tavg !== null) {
                avgTempYearArray.push({y: meteo[i].tavg, x: new Date(meteo[i].date).getMonth()});
            }
            if (meteo[i].prcp !== null) {
                avgPrcpYearArray.push({y: meteo[i].prcp, x:  new Date(meteo[i].date).getMonth()});
            }
        }
            previousShortDate=shortDate;
        console.log(avgTempYearArray);
    }

    console.log(avgTemperatureData);



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
                              <LineSeriesMouseOver lineDataRaw={avgTemperatureData}   begin={begin} end={end}/>
                          </div>
                          <div className='h-2/5 w-full'>
                              <LineSeriesMouseOverMM lineDataRaw={prcpData}  begin={begin} end={end}/>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      </div>
    );
}