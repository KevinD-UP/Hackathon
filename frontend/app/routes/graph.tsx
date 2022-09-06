import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
} from 'react-vis';
import React, { useState, useCallback, CSSProperties, useEffect } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'
import {Form, Link} from "@remix-run/react";

const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = [
    ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>Article A</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>Article B</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>Article C</animated.div>,
]

const tickValues = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export default function Graph() {
    const data = [
        {
            x: "11/05",
            y: 5
        },
        {
            x: "18/05",
            y: 12
        },
        {
            x: "25/05",
            y: 16
        }
    ];
    const [index, set] = useState(0)
    const onClick = useCallback(() => set(state => (state + 1) % 3), [])
    const transRef = useSpringRef()
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)'},
    })
    useEffect(() => {
        transRef.start()
    }, [index])
    return (
        <div className="flex h-full min-h-screen flex-col">
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                <h1 className="text-3xl font-bold">
                    <Link to=".">Réchauffement Climatique</Link>
                </h1>
            </header>
            <main className="flex h-full bg-white">
                <div className='flex rows'>
                    <div className='flex fill articles' onClick={onClick}>
                        {transitions((style, i) => {
                            const Page1 = pages[i];
                            const Page2 = pages[i+1] !== undefined ? pages[i+1] : pages[0];
                            const Page3 = pages[i+2] !== undefined && pages[i+1] !== undefined ? pages[i+2] : pages[i+1] !== undefined ? pages[0] : pages[1];
                            return [<Page1 style={style} />, <Page2 style={style} />, <Page3 style={style} />];
                        })}
                    </div>
                    <div>
                        <XYPlot height={300} width={370} margin={{left: 70}} xType='ordinal'>
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis title="Temps"/>
                            <YAxis title="Température °C"  tickValues={tickValues} left={-30}/>
                            <LineSeries data={[{ x: 0, y: 0 }]} style={{ display: 'none' }} />
                            <LineSeries data={data} curve={'curveMonotoneX'} style={{fill: 'none', strokeWidth: 4}}/>
                        </XYPlot>
                    </div>
                </div>
            </main>
        </div>
    )
}