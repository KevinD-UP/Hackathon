import React, {} from 'react';
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import LineSeriesMouseOver from "~/components/LineSeriesMouseOver";
import ArticleCarousel from "~/components/ArticleCarousel";
import LevelAnxiety from "~/components/LevelAnxiety";
import axios from "axios";
import type {LoaderFunction} from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import France from "~/components/france";

const begin = "1980-01-01";
const end = "2021-12-01";
const beginNormals = 1971;
const endNormals = 2000;
let decade =true;

export const monthNames= ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"];

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL (request.url);
    const begin = `${url.searchParams.get("start")}-01-01`;
    const end =  `${url.searchParams.get("end")}-01-01`;
    const normalsAxios =await axios.get(`http://localhost:8000/monthlymeteostat/normals/${params.stationId}/${beginNormals}/${endNormals}`)
    const articlesAxios = await axios.get(`http://localhost:8000/news/2022-09-01/2022-09-01`)
    const meteoAxios = await axios.get(`http://localhost:8000/monthlymeteostat/${params.stationId}/${begin}/${end}`)
    if(articlesAxios.status === 200 && meteoAxios.status === 200 && normalsAxios.status === 200 ){
        return json({ meteo: meteoAxios.data, articles: articlesAxios.data, normals: normalsAxios.data, stationId: params.stationId})
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
    let returnValue = [];
    for(let i=0; i<array.length;i++){
        returnValue.push(array[i]);
    }
    return returnValue
}

function  emptyArray(array: any[]) {
    while (array.length > 0) {
        array.pop();
    }
}


export default function Graph() {
    const {meteo, articles, normals, stationId} = useLoaderData();
    const [searchParams] = useSearchParams();

    const begin = `${searchParams.get("start")}-01-01`;
    const end = `${searchParams.get("end")}-01-01`;
    let decade = searchParams.get("decade") === "on";

    let avgTemperatureData = [];
    let prcpData =  [];

    let previousShortDate;
    let shortDate;
    let avgTempYearArray= [];
    let avgPrcpYearArray= [];

    for (let i =0; i < meteo.length; i++) {
        shortDate = getShortDate(meteo[i].date, "year");

        let monthDate = monthNames[new Date(meteo[i].date).getMonth()];

        //INIT previous short pour premier tour
        if(i == 0 ){
            previousShortDate = shortDate;
        }
        //Si on viens de recup la premiere data d'une nouvelle année

        if(previousShortDate != shortDate || i == meteo.length-1){
            // on push le tuple année/ data par mois pour cette année
            avgTemperatureData.push([copyArray(avgTempYearArray), previousShortDate]);
            prcpData.push([avgPrcpYearArray.slice(), previousShortDate]);

            // on renouvelle les array
            emptyArray(avgTempYearArray);
            emptyArray(avgPrcpYearArray);

        }

        // SI toujours la meme anne on push dans le sous tableau de l'annéee

        avgTempYearArray.push({y: meteo[i].tavg, x: monthDate});
        avgPrcpYearArray.push({y: meteo[i].prcp, x:  monthDate});

        previousShortDate=shortDate;
    }

    //ON veut juste une moyenne par décennie
    if(decade){
        //final result per decade
        let avgTempDecadeData = [];
        let prcpDecadeData = [];
        //première année de découpe
        let currentDecade = new Date(begin).getFullYear();
        let sumAvgTmp = [0,0,0,0,0,0,0,0,0,0,0,0];
        let divAvgTmp= [0,0,0,0,0,0,0,0,0,0,0,0];
        let sumAvgPrcp =[0,0,0,0,0,0,0,0,0,0,0,0];
        let divAvgPrcp = [0,0,0,0,0,0,0,0,0,0,0,0];
        let cptAnnees =0;
        //on parcours toutes les années concernées
        for(let i =0; i<avgTemperatureData.length;i++){

            //on viens de sauter une décénie
             if (Number(avgTemperatureData[i][1] ) >= currentDecade+10 || i == avgTemperatureData.length-1){

                let tmpDecadeWithMonth = [];
                let prcpDecadeWithMonth = [];

                //on divise les sommes pour avoir la moyenne
                for(let j=0; j<sumAvgPrcp.length; j++){
                    if(divAvgTmp[j] !=0 ){
                        sumAvgTmp[j]=sumAvgTmp[j]/divAvgTmp[j];
                        tmpDecadeWithMonth.push({x:monthNames[j],y: sumAvgTmp[j]});
                    }
                    else{
                        tmpDecadeWithMonth.push({x:monthNames[j],y: null});
                    }
                    if(divAvgPrcp[j] != 0){
                        sumAvgPrcp[j] = sumAvgPrcp[j]/divAvgPrcp[j];
                        prcpDecadeWithMonth.push({x:monthNames[j],y: sumAvgPrcp[j]});
                    }
                    else{
                        prcpDecadeWithMonth.push({x:monthNames[j],y: null});
                    }

                }

                //push des moyennes pour la décénnie
                avgTempDecadeData.push([tmpDecadeWithMonth, currentDecade + "-" + (currentDecade + cptAnnees)]);
                prcpDecadeData.push([prcpDecadeWithMonth, currentDecade + "-" + (currentDecade+cptAnnees)]);

                //clear des compteurs
                currentDecade=currentDecade+10;
                cptAnnees =0;
                //clear des tableaux
                emptyArray(sumAvgPrcp);
                emptyArray(sumAvgTmp);
                emptyArray(divAvgPrcp);
                emptyArray(divAvgTmp);
                //reinit des tableaux
                sumAvgTmp = [0,0,0,0,0,0,0,0,0,0,0,0];
                sumAvgPrcp =[0,0,0,0,0,0,0,0,0,0,0,0];
                divAvgTmp = [0,0,0,0,0,0,0,0,0,0,0,0];
                divAvgPrcp = [0,0,0,0,0,0,0,0,0,0,0,0];

            }


             //on ajoute a la somme pour la decenie temperature
            if( avgTemperatureData[i][0].length != 0){
                let curseurTmp =0;
                for(let j=0; j<sumAvgTmp.length; j++){
                    if(avgTemperatureData[i][0][curseurTmp].x == monthNames[j]){
                        if(avgTemperatureData[i][0][curseurTmp].y !== null){
                            sumAvgTmp[j]+=avgTemperatureData[i][0][curseurTmp].y;
                            divAvgTmp[j] +=1;
                        }
                        curseurTmp+=1;
                        if(curseurTmp >= avgTemperatureData[i][0].length){
                            break;
                        }
                    }
                    else{
                        j+=1;
                    }
                }
            }
            //on ajoute a la somme pour la decenie précipitation
            if(prcpData[i][0].length !=0){
                let curseurPrcp =0;
                for(let j=0; j<sumAvgPrcp.length; j++){
                    //si il y a une
                    if(prcpData[i][0][curseurPrcp].x == monthNames[j]){
                        if(prcpData[i][0][curseurPrcp].y !== null){
                            sumAvgPrcp[j]+=prcpData[i][0][curseurPrcp].y;
                            divAvgPrcp[j]+=1;
                        }
                        curseurPrcp+=1;
                        if(curseurPrcp >= prcpData[i][0].length){
                            break;
                        }
                    }
                    else{
                        j+=1;
                    }
                }
            }
            //une anne de plus additionnee
            cptAnnees +=1;
        }

        prcpData= prcpDecadeData;
        avgTemperatureData= avgTempDecadeData;
    }

    let avgTempNormalsData = Array();
    let prcpNormalsData = Array();

    for(let i =0; i<normals.length; i++) {
        avgTempNormalsData.push({x: monthNames[i],y: normals[i].tavg});
        prcpNormalsData.push({x:monthNames[i], y: normals[i].prcp});
    }

    let avgTempNormalsTuple =[avgTempNormalsData, "normales " + beginNormals + "-" + endNormals];
    let prcpNormalsTuple = [prcpNormalsData, "normales " + beginNormals + "-" + endNormals];


    return (
      <div className="flex h-full min-h-screen flex-col justify-between">
          <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
              <h1 className="text-3xl font-bold">
                  <Link to=".">Réchauffement Climatique</Link>
              </h1>
              <form action={`/meteo/${stationId}`} method="get">
                  <div className="flex justify-end">
                      <div className="mb-3 w-3/12 ">
                          <label htmlFor="startDate" className="form-label inline-block mb-2 text-white font-bold">Date de départ</label>
                          <input
                            type="number"
                            min="1950"
                            max="2020"
                            step="10"
                            defaultValue={!searchParams.get("start")?"1950":searchParams.get("start")!}
                            className="form-control block w-3/4 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="startDate"
                            placeholder="1950"
                            pattern="^[0-9]*$"
                            name = "start"
                          />
                      </div>
                      <div className="mb-3 w-3/12 ">
                          <label htmlFor="EndDate" className="form-label inline-block mb-2 text-white font-bold">Date de fin</label>
                          <input
                            type="number"
                            min="1950"
                            max="2020"
                            step="10"
                            defaultValue={!searchParams.get("end")?"2020":searchParams.get("end")!}
                            className="form-control block w-3/4 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="EndDate"
                            placeholder="2020"
                            name = "end"
                            pattern="^[0-9]*$"
                          />
                      </div>
                      <div className="mb-3 w-3/12 flex justify-center">
                          <input
                            name = "decade"
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox"
                            id="flexCheckChecked"
                            defaultChecked={!searchParams.get("decade") ? false : searchParams.get("decade") === "on"}
                          /> Décennie
                      </div>
                      <div>
                          <button type="submit"
                                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Valider
                          </button>
                      </div>
                  </div>
              </form>
          </header>

          <main className="flex  h-full w-full bg-slate-500 justify-center items-center">
              <div className="flex  h-4/5 w-11/12  justify-around ">

                  <div className='flex-col w-3/12 space-y-14'>
                      <div className='  flex-col -mt-8 h-1/2 '>
                          <h2 className="text-4xl font-bold text-white text-center -mb-4">Anxiété population</h2>
                          <div className='bg-slate-800 h-full min-h-full rounded-xl'>
                                <LevelAnxiety score={articles.averageEmotionScore}/>
                              <ArticleCarousel articles={articles.articlesWithAnalysis}/>
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
                      <div className='bg-slate-800 h-full max-h-full rounded-xl flex flex-col  justify-around  '>
                          <div className='max-h-1/2  w-full'>
                              <LineSeriesMouseOver lineDataRaw={avgTemperatureData}   normals={avgTempNormalsTuple} yAxis={"°C"} key={1} begin={begin} end={end}/>
                          </div>
                          <div className='max-h-1/2 w-full'>
                              <LineSeriesMouseOver lineDataRaw={prcpData} yAxis={"mm"} normals={prcpNormalsTuple} key={2} begin={begin} end={end}/>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      </div>
    );
}