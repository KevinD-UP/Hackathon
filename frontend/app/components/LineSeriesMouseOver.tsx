import React, {Component} from "react";
import {
    Crosshair,
    DiscreteColorLegend, Highlight, Hint,
    HorizontalGridLines, LabelSeries,
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
    hints : boolean;
    hintLineValues : {x: null | string, y: null | number} [];
    lastDrawLocation :any ;
    hintLineValuesNoNull : {x: string, y: number} [];
}

export default  class LineSeriesMouseOver extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const items = [];
        const hintLinesValues = [];

        hintLinesValues.push({x: null, y: null});
        for(let i in props.lineDataRaw){
            items.push({title : props.lineDataRaw[i][1], disabled : false, selected : false, })
            hintLinesValues.push({x: null, y: null});
        }
        items.push({title: this.props.normals[1], disabled: false, color: "red", selected : false});
        this.state = {
            index : -1 ,
            items : items,
            hints :false,
            hintLineValues: hintLinesValues,
            hintLineValuesNoNull : [],
            lastDrawLocation : null
        };
    }

    remindValue = (value : any) => {
        const {hintLineValues} =  this.state;
        if(this.state.hints){
            hintLineValues[hintLineValues.length-1].x = value.x;
            hintLineValues[hintLineValues.length-1].y = value.y;
            const hintLineValuesNoNull = [];
            for(let i =0; i< hintLineValues.length; i++){
                if(hintLineValues[i].x !== null && hintLineValues[i].y !== null){
                    hintLineValuesNoNull.push(hintLineValues[i]);
                }
            }
            this.setState({hintLineValues : hintLineValues, hintLineValuesNoNull : hintLineValuesNoNull});
        }
    }

    remindValueSecondSerie = (value : any, i : number) => {
        const {hintLineValues} =  this.state;
        const hintLineValuesNoNull = [];
        if(this.state.hints){
            if(!this.state.items[i].selected){
                hintLineValues[i].x = null;
                hintLineValues[i].y = null;
                for(let i =0; i< hintLineValues.length; i++){
                    if(hintLineValues[i].x !== null && hintLineValues[i].y !== null){
                        hintLineValuesNoNull.push(hintLineValues[i]);
                    }
                }
            }
            else{
                hintLineValues[i].x = value.x;
                hintLineValues[i].y = value.y;const hintLineValuesNoNull = [];
                for(let i =0; i< hintLineValues.length; i++){
                    if(hintLineValues[i].x !== null && hintLineValues[i].y !== null){
                        hintLineValuesNoNull.push(hintLineValues[i]);
                    }
                }
            }

            this.setState({ hintLineValues : hintLineValues, hintLineValuesNoNull : hintLineValuesNoNull});
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
        if(this.state.hints){
            this.setState({hints : !this.state.hints,  hintLineValuesNoNull: []});
        }
        else{
            this.setState({hints : !this.state.hints});
        }

    }


    render(){

        const lineData = [];
        for(let i in this.props.lineDataRaw){
            lineData.push(this.props.lineDataRaw[i][0]);
        }
        const {index} = this.state;
        const {items} = this.state;
        const {lastDrawLocation} =  this.state;
        const yAxis = this.props.yAxis;


        const  tickValuesXAxis = monthNames;
        const tickDomainXAxis = tickValuesXAxis;

        return(

            <div className='flex bg-slate-300 max-h-full rounded-xl '>

                <div className=' overflow-auto max-h-full overflow-scroll-y w-32'>
                    <DiscreteColorLegend height={325}
                               items={items} onItemClick={this.legendClickHandler} orientation={"vertical"}  />
                    <button onClick={this.buttonClickHandler}
                            className={`${this.state.hints ? "bg-gradient-to-r from-pink-500 to-yellow-500" : "bg-gradient-to-r from-green-400 to-blue-500" }
                            hover:opacity-50 
                             text-white font-bold py-2 px-4 rounded-full center`}>
                        {this.state.hints ? "Cacher variations" : "Afficher variations"}
                    </button>
                </div>

                <div className=' rounded-xl  bg-white min-w-fit flex-1 mr-0 flex justify-center overflow-hidden'>

                    <XYPlot height={400} width={800} margin={{top:20}} xDomain={tickDomainXAxis}
                            yType='linear'  xType='ordinal'
                            animation
                            yDomain={
                                lastDrawLocation && [lastDrawLocation.bottom, lastDrawLocation.top]
                            }
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
                            data={d} key={`${i}`}
                            onNearestX={(value, {index} )=> this.remindValueSecondSerie(value, i)}
                            style={{strokeWidth: `${this.state.items[i].selected  ? "4" : "3"}`}}
                            opacity={items[i].disabled ? 0 : 1} stroke={this.state.items[i].selected ? "red" : (i === index ? "orange" : undefined)}
                            />))}

                        {lineData.map((d, i) => (<LineSeries
                            getNull={(d) => d.y !== null}
                            data={d} key={`${i}-mouseover`}
                            onSeriesMouseOut={() => this.setState({index: -1})}
                            onSeriesMouseOver={() => this.setState({index: i})}
                            stroke="transparent"
                            style={{strokeWidth: 15}}/>))}

                        <LineSeries key={"normals"} opacity={items[items.length-1].disabled ? 0 : 1}
                            getNull={(d) => d.y !== null} stroke={"red"}
                            data={this.props.normals[0]}  style={{strokeWidth: 4}}
                                    onNearestX={this.remindValue}
                            />



                        <LineMarkSeries
                            data={this.state.hintLineValuesNoNull}
                            stroke={this.state.hints ? "black" : "black"}
                            markStyle={{stroke: `${this.state.hints ? "black" : "transparent"}`, strokeWidth: 3 ,
                                fill: `${this.state.hints ? "black" : "transparent"}`}} />


                        {this.state.hintLineValuesNoNull.map((d, i) => (<Hint

                        value={{x: d.x, y : `${this.state.hintLineValuesNoNull.length > i+1 ? (this.state.hintLineValuesNoNull[i+1].y + d.y)/2 : null}` }}
                        key={`${i}-hint`} align={{horizontal: 'auto', vertical: 'auto'}}>
                            {this.state.hints && this.state.hintLineValuesNoNull.length > i+1 ?
                                <div
                                    className={` rv-hint__content`}>{`${Number(Math.abs(d.y - this.state.hintLineValuesNoNull[i+1].y )).toFixed(1)} ${yAxis}`}</div>
                                : null
                            }

                    </Hint>)) }



                        <Highlight
                            onBrushEnd={area => this.setState({lastDrawLocation : area})}
                            onDrag={area => {
                                this.setState({
                                    lastDrawLocation: `${area ? { 
                                        top : lastDrawLocation.top + (area.top - area.bottom),
                                        bottom : lastDrawLocation.bottom + (area.top - area.bottom)}: null}`
                                })
                            }}
                        />

                    </XYPlot>

                </div>
                <button className="showcase-button" onClick={() => this.setState({lastDrawLocation : null})}>
                    Reinit Zoom
                </button>
            </div>


        );
    }
}

