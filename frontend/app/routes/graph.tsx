import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
} from 'react-vis';

export default function Graph() {
    const data = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
    ];
    return (
    <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="Temps"/>
        <YAxis title="Température °C" left={-30}/>
        <LineSeries data={data} curve={'curveMonotoneX'} style={{ fill: 'none', strokeWidth: 4}}/>
    </XYPlot>
    )
}