import { city_data } from './area.data';

export const getProvinces = () => {
    let provinces = [] ;
    for (const p in city_data ) {
    //    provinces.push(p) 
    provinces = [...provinces,p]
    }
    console.log("provinces:"+provinces);
    return provinces;
}

export const getCityByProvince = (province:string) => {
    if(!province){
        return [];
    }
    const val  = city_data[province];
    let cities = [];
    for (const c in val ) {
        cities = [...cities,c] 
     }
     return cities;
}

export const getAreaByCity = (province:string,city:string) => {
    if(!province || !city_data[province] || !city_data[province][city]){
        return [];
    }
    return city_data[province][city];
}