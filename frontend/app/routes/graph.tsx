
import React, {useState, useCallback, CSSProperties, useEffect, } from 'react';
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web';
import { Link } from "@remix-run/react";
import LineSeriesMouseOver from "~/components/LineSeriesMouseOver";
import ArticleCarousel from "~/components/ArticleCarousel";

export default function Graph() {

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

                    <div className=' w-3/12 flex-col -mt-8 '>
                        <h2 className="text-4xl font-bold text-white text-center -mb-4">Anxiété population</h2>
                        <div className='bg-slate-800 h-full min-h-full rounded-xl'>
                            <ArticleCarousel />
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