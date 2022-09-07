import React, {useState, useCallback, CSSProperties, useEffect, } from 'react';
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web';
import {Link, useLoaderData} from "@remix-run/react";
import LineSeriesMouseOver from "~/components/LineSeriesMouseOver";
import ArticleCarousel from "~/components/ArticleCarousel";
import LevelAnxiety from "~/components/LevelAnxiety";
import axios from "axios";
import type {LoaderFunction} from "@remix-run/server-runtime";
import {json} from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    const date = new Date()
    const formattedDate = date.toISOString().split('T')[0]
    const { status, data } = await axios.get(`http://localhost:8000/news/${formattedDate}/${formattedDate}`)
    if(status === 200){
        return json(data)
    }
    throw new Error(`Error! status: ${status}`)
};
import France from "~/components/france";

export default function Graph() {
    const loadedData = useLoaderData()

    const data1 = [...Array(10).keys()].map(x => ({x, y : Math.random() *50}));
    const data2 = [...Array(10).keys()].map(x => ({x, y : Math.random() *-40}));
    const data3 = [...Array(10).keys()].map(x => ({x, y : Math.random() *20}));

    const data1raw = [data1, "tmpMax Montsouris"];
    const data2raw = [data2, "tpmMin"];
    const data3raw = [data3, "tmpAvg"];

    const lineDataRaw = [data1raw, data2raw, data3raw];
    const yAxis = "°C";

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
                              <LevelAnxiety score={loadedData.averageEmotionScore}/>
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
                              <LineSeriesMouseOver lineDataRaw={lineDataRaw} yAxis={yAxis}/>
                          </div>
                          <div className='h-2/5 w-full'>
                              <LineSeriesMouseOver lineDataRaw={lineDataRaw} yAxis={yAxis}/>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      </div>
    );
}