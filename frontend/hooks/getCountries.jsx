import axios from "axios"
import { useEffect, useState } from "react"


export default function (){

    const [countries, setCountries] = useState([])
    useEffect(() => {
        async function fetchCountries(){
            try{
                const res = await axios.get('https://restcountries.com/v3.1/all')
                const countryList = res.data.map(country => ({
                    name: country.name.common,
                    code: country.cca2
                }))
                setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)))
            } catch(error){
                setError(error)
                console.error("Error fetching countries", error)
            }
        }

        fetchCountries()
    }, [])

    return countries
}