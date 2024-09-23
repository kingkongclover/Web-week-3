async function fetchData() {
    try {
        const response = await fetch('https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff');
        const data = await response.json();

        const employmentResponse = await fetch('https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065');
        const employmentData = await employmentResponse.json();

        console.log(data);
        console.log(employmentData);

        const municipalities = data.dataset.dimension.Alue.category.label;
        const populationValues = data.dataset.value;
        const employmentValues = employmentData.dataset.value;

        console.log(municipalities);
        console.log(populationValues);

        const tbody = document.querySelector('#data tbody');

        Object.entries(municipalities).forEach(([key, municipality], index) => {
            const population = populationValues[index];
            const employment = employmentValues[index];
            const row = document.createElement('tr');
            row.innerHTML = `<td>${municipality}</td><td>${population}</td><td>${employment}</td><td>${(Math.round(employment/population * 100)/100).toFixed(2)}%</td>`;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;