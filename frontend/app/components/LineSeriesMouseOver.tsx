import React, {Component} from "react";
import {HorizontalGridLines, LineMarkSeries, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";

interface IProps {
}

interface IState {
    index: number;
}

const data1 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
const data2 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
const data3 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));


const data1raw = [data1, "tmpMax"];
const data2raw = [data2, "tpmMin"];
const data3raw = [data3, "tmpAvg"];

const yAxis = "Température °C";

export default  class LineSeriesMouseOver extends Component<IProps, IState> {


    constructor(props: IProps) {
        super(props);
        this.state = {
            index : -1
        };
    }

    render(){

        const tickValues = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        const lineData = [data1, data2, data3];
        const {index} = this.state;

        return(

            <XYPlot height={500} width={570}  xType='ordinal'
            onMouseLeave={() => this.setState({index: -1})}>

                <VerticalGridLines style={{strokeWidth:2, stroke:"lightblue"}}/>
                <HorizontalGridLines style={{strokeWidth:2, stroke:"lightblue"}}/>

                <XAxis style={{line: {stroke:"black"}}} title="Temps"/>
                <YAxis style={{line: {stroke:"black"}}}  title={`${yAxis}`}  tickValues={tickValues} />

                {lineData.map((d,i) => (<LineSeries
                    data={d} key={`${i}`} stroke={i === index ? "orange" : undefined} /> ))}

                {lineData.map((d,i) => (<LineSeries
                    data={d} key={`${i}-mouseover`}
                    onSeriesMouseOut={() => this.setState({index: -1})}
                    onSeriesMouseOver={() => this.setState({index : i})}
                    stroke="transparent"
                    style={{strokeWidth: 10}}
                /> ))}

            </XYPlot>
        );
    }
}