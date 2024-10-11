(async () => {
    try {
        let response = await fetch('https://dummyjson.com/recipes')
        if (response.ok) {
            let json = await response.json()
            console.log(json['recipes'].map(r => r.name))
        }
        else {
            console.log("HTTP Error: " + response.status)
        }
    } catch (e) {
        console.error(e)
    }
})()
