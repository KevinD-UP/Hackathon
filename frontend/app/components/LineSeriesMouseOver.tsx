import React, {Component} from "react";
import {
    DiscreteColorLegend,
    HorizontalGridLines,
    LineSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from "react-vis";
import { monthNames } from "~/routes/meteo/$stationId";

interface IProps {
    lineDataRaw : any;
    begin : string;
    end : string;
}

interface IState {
    index: Number;
    items: any;
}

export default  class LineSeriesMouseOver extends Component<IProps, IState> {

    constructor(props: IProps) {

        const items = [];
        for(let i in props.lineDataRaw){
            items.push({title : props.lineDataRaw[i][1], disabled : false})
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

        const lineData = [];
        for(let i in this.props.lineDataRaw){
            lineData.push(this.props.lineDataRaw[i][0]);
        }
        const {index} = this.state;
        const {items} = this.state;

        const yAxis = "°C";

        const  tickValuesXAxis = monthNames;
        const tickDomainXAxis = tickValuesXAxis;

       /*

        const tickValuesYAxis = [-20,-15,-10,-5, 0,5,10,15,20,25,30,35,40,45];
        const tickValuesXGrid = [-15,-10,-5,0,5,10,15,20,25,30,35,40];

        const tickValuesXAxis = Array();
        const tickDomainXAxis = Array();

        const maxTicksX = 12;

        let frequenceTicks = 1;

        const momentBegin = moment(new Date(this.props.begin));
        const momentEnd = moment(new Date(this.props.end));


        const numberMonth = momentEnd.diff(momentBegin,"months");
        frequenceTicks = Math.ceil(numberMonth/maxTicksX);

        let i=1;
        while(tickValuesXAxis.length <numberMonth && tickValuesXAxis.length < maxTicksX){
            const dateString = momentBegin.month()+1 + "/" + momentBegin.year();
            tickDomainXAxis.push(dateString);
            if(i==1){
                tickValuesXAxis.push(dateString);
            }
            i = i == frequenceTicks ? 1 : i+1 ;
            momentBegin.add(1,"month");
        }*/



        return(

            <div className='flex bg-slate-300 max-h-full rounded-xl '>

                <div className=' overflow-auto max-h-full overflow-auto w-32'>
                    <DiscreteColorLegend items={items} onItemClick={this.clickHandler} orientation={"vertical"}  />
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
                            data={d} key={`${i}`} style={{strokeWidth: 2}}
                            opacity={items[i].disabled ? 0 : 1}
                            stroke={i === index ? "orange" : undefined}/>))}

                        {lineData.map((d, i) => (<LineSeries
                            getNull={(d) => d.y !== null}
                            data={d} key={`${i}-mouseover`}
                            onSeriesMouseOut={() => this.setState({index: -1})}
                            onSeriesMouseOver={() => this.setState({index: i})}
                            onSeriesClick={() => {
                                const {items} = this.state;
                                items[i].disabled = !items[i].disabled;
                                this.setState({items});
                            }}
                            stroke="transparent"
                            style={{strokeWidth: 10}}/>))}

                    </XYPlot>

                </div>

            </div>
        );
    }
}