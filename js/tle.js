const url = 'https://api.tinygs.com/v1/satellite/FossaSat-FX14'

export async function getTle(){
    /*try {
        const response = await fetch(url)
        const data = await response.json()
        const tle = data.tle
        return tle
    } catch (error) {
        console.error('Error:', error);
        const tle = ["FOSSASAT FEROX","1 88888U 24001FA  23163.94096086  .00000000  00000-0  10000-4 0  9999","2 88888  97.5077 280.5424 0008220 228.6198 130.8530 15.11803180  1009"]
        return tle
    }*/

    const tle = ["FOSSASAT FEROX","1 88888U 24001FA  23163.94096086  .00000000  00000-0  10000-4 0  9999","2 88888  97.5077 280.5424 0008220 228.6198 130.8530 15.11803180  1009"]
    return tle
}