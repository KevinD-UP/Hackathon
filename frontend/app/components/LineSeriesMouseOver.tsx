import React, {Component} from "react";
import {
    DiscreteColorLegend,
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from "react-vis";

interface IProps {
}

interface IState {
    index: Number;
    items: any;
}

const data1 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
const data2 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
const data3 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));


const data1raw = [data1, "tmpMax"];
const data2raw = [data2, "tpmMin"];
const data3raw = [data3, "tmpAvg"];

const lineDataRaw = [data1raw, data2raw, data3raw]

const yAxis = "Température °C";





export default  class LineSeriesMouseOver extends Component<IProps, IState> {

    constructor(props: IProps) {

        const items = Array();
        for(let i in lineDataRaw){
            items.push({title : lineDataRaw[i][1], disabled : false})
        }

        super(props);
        this.state = {
            index : -1 ,
            items : items
        };
    }

    clickHandler = (item: any) => {
        const {items} =  this.state;
        item.disabled = !item.disabled;
        this.setState({items});
    }


    render(){

        console.log(this.state.items);
        const tickValues = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        const lineData = [data1, data2, data3];
        const {index} = this.state;
        const {items} = this.state;

        console.log(items);

        return(


            <>

            <DiscreteColorLegend items={items} onItemClick={this.clickHandler}/>

                <XYPlot height={500} width={570} xType='ordinal'
                      onMouseLeave={() => this.setState({index: -1})}>

                <VerticalGridLines style={{strokeWidth: 2, stroke: "lightblue"}}/>
                <HorizontalGridLines style={{strokeWidth: 2, stroke: "lightblue"}}/>

                <XAxis style={{line: {stroke: "black"}}} title="Temps"/>
                <YAxis style={{line: {stroke: "black"}}} title={`${yAxis}`} tickValues={tickValues}/>

                {lineData.map((d, i) => (<LineSeries
                    data={d} key={`${i}`} style={{strokeWidth: 4}}
                    opacity={items[i].disabled ? 0 : 1}
                    stroke={i === index ? "orange" : undefined}/>))}

                {lineData.map((d, i) => (<LineSeries
                    data={d} key={`${i}-mouseover`}
                    onSeriesMouseOut={() => this.setState({index: -1})}
                    onSeriesMouseOver={() => this.setState({index: i})}
                    onSeriesClick={() => {
                        const {items} =  this.state;
                        items[i].disabled = !items[i].disabled;
                        this.setState({items});
                    }
                }
                    stroke="transparent"
                    style={{strokeWidth: 10}}/>))}

            </XYPlot></>
        );
    }
}