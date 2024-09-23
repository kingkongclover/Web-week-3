async function fetchData() {
    try {
        const response = await fetch('https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff');
        const data = await response.json();

        console.log(data);

        const municipalities = data.dataset.dimension.Alue.category.label;
        const populationValues = data.dataset.value;

        console.log(municipalities);
        console.log(populationValues);

        const tbody = document.querySelector('#data tbody');

        Object.entries(municipalities).forEach(([key, municipality], index) => {
            const population = populationValues[index];
            const row = document.createElement('tr');
            row.innerHTML = `<td>${municipality}</td><td>${population}</td>`;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;