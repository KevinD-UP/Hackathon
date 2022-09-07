import React, {Component} from "react";
import {
    DiscreteColorLegend,
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries, MarkSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from "react-vis";

import moment from "moment";

interface IProps {
    lineDataRaw : any;
    yAxis : string;
    begin : string;
    end : string;
}

interface IState {
    period : string;
    yAxis: string;
    index: Number;
    items: any;
}

export default  class LineSeriesMouseOver extends Component<IProps, IState> {

    constructor(props: IProps) {

        const items = Array();
        for(let i in props.lineDataRaw){
            items.push({title : props.lineDataRaw[i][1], disabled : false})
        }

        super(props);
        this.state = {
            period : "month",
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

        const lineData = Array();
        for(let i in this.props.lineDataRaw){
            lineData.push(this.props.lineDataRaw[i][0]);
        }
        const {index} = this.state;
        const {items} = this.state;

        const maxTicksX = 10;

        const tickValuesYAxis = [-30,-25,-20,-15,-10,-5, 5,10,15,20,25,30,35,40,45,50];
        const tickValuesXGrid = [-25,-20,-15,-10,-5,0,5,10,15,20,25,30,35,40,45,50];

        const tickValuesXAxis = Array();
        const tickDomainXAxis = Array();

        let frequenceTicks = 1;

        const momentBegin = moment(new Date(this.props.begin));
        const momentEnd = moment(new Date(this.props.end));

        if(this.state.period === "month"){
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

            }


        }

        return(

            <div className='flex bg-slate-300 max-h-full rounded-xl '>

                <div className=' overflow-auto max-h-full overflow-auto w-2/12'>
                    <DiscreteColorLegend items={items} onItemClick={this.clickHandler} orientation={"vertical"}  />
                </div>

                <div className=' rounded-xl  bg-white min-w-fit flex-1 mr-0 flex justify-center overflow-hidden'>

                    <XYPlot height={300} width={800} margin={{top:20}} xDomain={tickDomainXAxis}
                            yType='linear' yDomain={[-30, 55]} xType='ordinal'
                            onMouseLeave={() => this.setState({index: -1})}>

                        <VerticalGridLines  style={{strokeWidth: 2, stroke: "lightgrey"}}/>
                        <HorizontalGridLines style={{strokeWidth: 2, stroke: "lightgrey"}} innerWidth={770} left={35}
                                             tickValues={tickValuesXGrid}/>

                        <XAxis style={{line: {stroke: "black"}}} title="Temps" on0={true}
                               innerWidth={800} tickSizeInner={0} tickValues={tickValuesXAxis}/>
                        <YAxis style={{line: {stroke: "black"}}}  tickValues={tickValuesYAxis}
                               tickFormat={v => `${v} ${this.state.yAxis}`} tickSizeInner={0}/>

                        {lineData.map((d, i) => (<LineSeries
                            data={d} key={`${i}`} style={{strokeWidth: 4}}
                            opacity={items[i].disabled ? 0 : 1}
                            stroke={i === index ? "orange" : undefined}/>))}

                        {lineData.map((d, i) => (<LineSeries
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