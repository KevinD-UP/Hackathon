
import React, {useState, useCallback, CSSProperties, useEffect, } from 'react';
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web';
import { Link } from "@remix-run/react";
import LineSeriesMouseOver from "~/components/LineSeriesMouseOver";

export default function Graph() {

    const [markHoverIndex, setHoverIndex] = useState(-1);
    const data1 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
    const data2 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
    const data3 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));

    const data1raw = [data1, "tmpMax"];
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

                    <div className=' w-5/12 flex-col -mt-8 '>
                        <h2 className="text-6xl font-bold text-white text-center -mb-6">Anxiété population</h2>
                        <div className='bg-slate-800 h-full min-h-full rounded-xl'>
                            <div className='bg-white'>
                            <div id="default-carousel" className="relative" data-carousel="static">
                                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                        <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                                        <img src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                                    </div>
                                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                        <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                                    </div>
                                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                        <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                                    </div>
                                </div>
                                <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                                </div>
                                <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                        <span className="sr-only">Previous</span>
                                    </span>
                                </button>
                                <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                        <span className="sr-only">Next</span>
                                    </span>
                                </button>
                            </div></div>
                        </div>
                    </div>

                    <div className=' w-5/12 flex-col -mt-8 '>
                        <h2 className="text-6xl font-bold text-white text-center -mb-6">Météorologie</h2>
                        <div className='bg-slate-800 h-full min-h-full rounded-xl flex justify-center items-center '>
                            <div className='bg-white rounded-xl center h-fit'>
                                <LineSeriesMouseOver lineDataRaw={lineDataRaw} yAxis={yAxis}/>
                               
                            </div>

                        </div>
                    </div>


                </div>

            </main>
        </div>
    );
}