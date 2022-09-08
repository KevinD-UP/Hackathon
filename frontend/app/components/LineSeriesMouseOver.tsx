import React, {Component} from "react";
import {
    DiscreteColorLegend, Hint,
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries, MarkSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from "react-vis";

import moment from "moment";
import { monthNames } from "~/routes/meteo/$stationId";

interface IProps {
    lineDataRaw : any;
    begin : string;
    end : string;
    key: number;
    yAxis : string;
    normals : any;
}

interface IState {
    index: Number;
    items: any;
    value : any;
    valueSecondSerie : any;
    hints : boolean;
    hintLineValues : {x: null | string, y: null | number} [];
}

export default  class LineSeriesMouseOver extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const items = [];
        const hintLinesValues = [];
        items.push({title: this.props.normals[1], disabled: false, color: "red", selected : false});
        hintLinesValues.push({x: null, y: null});
        for(let i in props.lineDataRaw){
            items.push({title : props.lineDataRaw[i][1], disabled : false, selected : false})
            hintLinesValues.push({x: null, y: null});
        }
        this.state = {
            index : -1 ,
            items : items,
            value : {x:0, y:0},
            valueSecondSerie : {x:0, y:0},
            hints :false,
            hintLineValues: hintLinesValues,
        };
    }

    remindValue = (value : any) => {
        const {hintLineValues} =  this.state;
        if(this.state.hints){
            hintLineValues[0].x = value.x;
            hintLineValues[0].y = value.y;
            this.setState({hintLineValues : hintLineValues});
        }
    }

    remindValueSecondSerie = (value : any, i : number) => {
        const {hintLineValues} =  this.state;
        if(this.state.hints){
            if(!this.state.items[i+1].selected){
                hintLineValues[i+1].x = null;
                hintLineValues[i+1].y = null;
            }
            else{
                hintLineValues[i+1].x = value.x;
                hintLineValues[i+1].y = value.y;
            }

            this.setState({ hintLineValues : hintLineValues});
        }
    }

    legendClickHandler = (item: any) => {
        const {items} =  this.state;
        if(this.state.hints && !item.disabled){
            if(item.selected){
                item.color= "";
            }
            else{
                item.color = "red";

            }
            item.selected = !item.selected;

        }
        else{
            item.disabled = !item.disabled;
        }
        this.setState({items});
    }

    buttonClickHandler = () => {
        this.setState({hints : !this.state.hints, value : {x:0, y:0} , valueSecondSerie : {x:0, y:0}});

    }


    render(){
        const lineData = [];
        for(let i in this.props.lineDataRaw){
            lineData.push(this.props.lineDataRaw[i][0]);
        }
        const {index} = this.state;
        const {items} = this.state;
        const {value} =  this.state;
        const {hintLineValues} =  this.state;
        const {valueSecondSerie} = this.state;

        const yAxis = this.props.yAxis;

        const YMAX = 15;

        const  tickValuesXAxis = monthNames;
        const tickDomainXAxis = tickValuesXAxis;


        return(

            <div className='flex bg-slate-300 max-h-full rounded-xl '>

                <div className=' overflow-auto max-h-full overflow-auto w-32'>
                    <DiscreteColorLegend
                               items={items} onItemClick={this.legendClickHandler} orientation={"vertical"}  />
                    <button onClick={this.buttonClickHandler}
                            className={`bg-blue-500 ${this.state.hints ? "opacity-50" : "" }
                            hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full center`}>
                        {this.state.hints ? "Desactiver hints" : "Activer Hints"}
                    </button>
                </div>

                <div className=' rounded-xl  bg-white min-w-fit flex-1 mr-0 flex justify-center overflow-hidden'>

                    <XYPlot height={300} width={800} margin={{top:20}} xDomain={tickDomainXAxis}
                            yType='linear'  xType='ordinal'
                            onMouseLeave={() => this.setState({index: -1})}>

                        <VerticalGridLines  style={{strokeWidth: 2, stroke: "lightgrey"}}/>
                        <HorizontalGridLines style={{strokeWidth: 2, stroke: "lightgrey"}} innerWidth={770}
                                             />

                        <XAxis
                            style={{line: {stroke: "black"}, ticks: {color: '#000', fontSize: '12px'}}} title="Temps"
                               innerWidth={800} tickSizeInner={0} tickValues={tickValuesXAxis} />
                        <YAxis

                            style={{line: {stroke: "black"} , title: {fontSize: '16px', color:'#000'}}}
                            title={yAxis} tickSizeInner={0}/>

                        {lineData.map((d, i) => (<LineSeries
                            getNull={(d) => d.y !== null}
                            data={d} key={`${i+1}`}
                            onNearestX={(value, {index} )=> this.remindValueSecondSerie(value, i)}
                            style={{strokeWidth: `${this.state.items[i+1].selected  ? "3" : "2"}`}}
                            opacity={items[i+1].disabled ? 0 : 1} stroke={this.state.items[i+1].selected ? "red" : i+1 === index ? "orange" : undefined}
                            />))}

                        {lineData.map((d, i) => (<LineSeries
                            getNull={(d) => d.y !== null}
                            data={d} key={`${i+1}-mouseover`}
                            onSeriesMouseOut={() => this.setState({index: -1})}
                            onSeriesMouseOver={() => this.setState({index: i+1})}
                            stroke="transparent"
                            style={{strokeWidth: 15}}/>))}

                        <LineSeries key={"normals"} opacity={items[0].disabled ? 0 : 1}
                            getNull={(d) => d.y !== null} stroke={"red"}
                            data={this.props.normals[0]}  style={{strokeWidth: 3}}
                                    onNearestX={this.remindValue}
                            />

                        <LineMarkSeries
                            data={hintLineValues}
                            getNull={(d) => d.y !== null}
                            stroke={!this.state.hints ? "transparent" : "black"}
                            markStyle={{stroke: `${this.state.hints ? "black" : "transparent"}`, strokeWidth: 3 ,
                                fill: `${this.state.hints ? "black" : "transparent"}`}} />

                        <Hint
                            value={{x: value.x, y: (value.x+valueSecondSerie.x)/2 }}
                            align={{horizontal: 'auto', vertical: 'top'}}>
                            <div
                                className={`rv-hint__content ${!this.state.hints ? "opacity-0" : ""}`}>{`(${value.x}, ${value.y})`}</div>
                        </Hint>



                    </XYPlot>

                </div>

            </div>
        );
    }
}

