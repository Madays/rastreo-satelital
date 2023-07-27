const url = 'https://api.tinygs.com/v1/satellite/FossaSat-FX14'
export async function getTle(){
    const response = await fetch(url)
    const data = await response.json()
    return data.tle
}
