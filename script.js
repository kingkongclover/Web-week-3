async function fetchData() {
    try {
        // Haetaan tideot data muuttujaan
        const response = await fetch('https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff');
        const data = await response.json();
        // Haetaan tehtävän 4 tiedot employment data muuttujaan
        const employmentResponse = await fetch('https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065');
        const employmentData = await employmentResponse.json();

        // tarkastetaan että muuttuja sisältävät tietoa
        console.log(data);
        console.log(employmentData);

        // halutun tiedon paikat
        const municipalities = data.dataset.dimension.Alue.category.label;
        const populationValues = data.dataset.value;
        const employmentValues = employmentData.dataset.value;
        // testataan taas onko data olemassa
        console.log(municipalities);
        console.log(populationValues);
        console.log(employmentValues)
        
        const tbody = document.querySelector('#data tbody');
        // käydään läpi kaikki objectin alkiot ja luodaan jokaisesta oma rivi
        Object.entries(municipalities).forEach(([key, municipality], index) => {
            const population = populationValues[index];
            const employment = employmentValues[index];
            const row = document.createElement('tr');
            const emplouPercent = (employment/population * 100).toFixed(2);
            if (emplouPercent > 45) {
                row.innerHTML = `<td style="background-color: #abffbd;">${municipality}</td><td style="background-color: #abffbd;">${population}</td><td style="background-color: #abffbd;">${employment}</td><td style="background-color: #abffbd;">${emplouPercent}%</td>`;
            } else if (emplouPercent < 25) {
                row.innerHTML = `<td style="background-color: #ff9e9e;">${municipality}</td><td style="background-color: #ff9e9e;">${population}</td><td style="background-color: #ff9e9e;">${employment}</td><td style="background-color: #ff9e9e;">${emplouPercent}%</td>`;
            } else {
                row.innerHTML = `<td>${municipality}</td><td>${population}</td><td>${employment}</td><td>${emplouPercent}%</td>`;
            }
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;