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
    lineDataRaw : any;
    yAxis : string;
}

interface IState {
    yAxis: string;
    index: Number;
    items: any;
}

const data1 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
const data2 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));
const data3 = [...Array(10).keys()].map(x => ({x, y : Math.random() *10}));


export default  class LineSeriesMouseOver extends Component<IProps, IState> {

    constructor(props: IProps) {

        const items = Array();
        for(let i in props.lineDataRaw){
            items.push({title : props.lineDataRaw[i][1], disabled : false})
        }

        super(props);
        this.state = {
            yAxis : props.yAxis,
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
        const lineData = [data1, data2, data3];
        const {index} = this.state;
        const {items} = this.state;

        console.log(items);

        return(


            <>

            <DiscreteColorLegend items={items} onItemClick={this.clickHandler}/>

                <XYPlot height={500} width={570} yType='linear' yDomain={[-20,50]} xType={"ordinal"}
                      onMouseLeave={() => this.setState({index: -1})}>

                <VerticalGridLines style={{strokeWidth: 2, stroke: "lightgrey"}} />
                <HorizontalGridLines style={{strokeWidth: 2, stroke: "lightgrey"}} left={65} innerWidth={500}/>

                <XAxis style={{line: {stroke: "black"}}} title="Temps" on0={true} innerWidth={500} left={65} tickSizeInner={0}    />
                <YAxis style={{line: {stroke: "black"}}} on0={true}
                       tickFormat={v  => `${v} ${this.state.yAxis}`}  tickSizeOuter={0}/>

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