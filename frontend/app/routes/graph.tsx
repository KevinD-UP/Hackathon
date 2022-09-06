import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
} from 'react-vis';
import React, { useState, useCallback, CSSProperties, useEffect } from 'react';
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web';

import {timeFormatDefaultLocale} from 'd3-time-format';
timeFormatDefaultLocale({
    dateTime    : '%a %b %e %X %Y',
    date        : '%d/%m/%Y',
    time        : '%H : %M : %S',
    periods     : ['AM', 'PM'],
    days        : ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    shortDays   : ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    months      : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    shortMonths : ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']
});

const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = [
    ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>A</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>B</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>C</animated.div>,
];

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

const tickValues = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export default function Graph() {
    const [index, set] = useState(0);
    const onClick = useCallback(() => set(state => (state + 1) % 3), []);
    const transRef = useSpringRef();
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)', width: 200},
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' , width: 200},
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' , width: 200},
    });
    useEffect(() => {
        transRef.start()
    }, [index]);

    return (
        <div className='flex'>
            <div className={`flex fill articles`} onClick={onClick}>
                {transitions((style, i) => {
                    const Page = pages[i]
                    return <Page style={style} />
                })}
            </div>
            <div>
                <XYPlot height={300} width={370} margin={{left: 70}} xType={'ordinal'} yType={'time'}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis title="Temps"/>
                    <YAxis title="Température °C"  left={-30}/>
                   <LineSeries data={[{ x:0, y: 0 }]} style={{ display: 'none' }} />
                    <LineSeries data={data} curve={'curveMonotoneX'} style={{fill: 'none', strokeWidth: 4}}/>
                </XYPlot>
            </div>
        </div>
    );
}