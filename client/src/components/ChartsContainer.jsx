import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';



const ChartsContainer = ({data}) => {
    const [barChart, setBarChart] = useState(true);
    return (
        <Wrapper>
            <h4>Monthly applications</h4>
            <button type='button' onClick={() => setBarChart(!barChart)}>
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
        </Wrapper>
    );
}



export default ChartsContainer;