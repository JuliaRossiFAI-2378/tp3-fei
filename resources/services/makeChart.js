const makeChart = async(data) =>{
    let values = '';
    let days = '';
    const dataLength = Object.keys(data).length;
    let i = 1;
    for(const key in data){
        if(dataLength === i){
            values = values.concat(data[key]);
            days = days.concat(key);
        }else{
            values = values.concat(data[key], ',');
            days = days.concat(key, '|');
        }
        i++;
    }
    
    try{
        const chart = await fetch(`https://image-charts.com/chart?cht=p&chs=700x400&chd=t:${values}&chl=${days}&chf=bg,s,00000000`);
        return chart;
    }catch(error){
        console.log(error);
        return null;
    }
}
export default makeChart;