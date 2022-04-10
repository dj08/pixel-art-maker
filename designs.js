// Attaching to start of event to avoid trouble loading functions
document.addEventListener("DOMContentLoaded", () => {
    // Get grid parameters -- h, w, color
    const gridParameters = getGridParameters();

    // Create initial pixel grid based using the values
    createPixelGrid(gridParameters.height, gridParameters.width);

    // Add event listeners on the submit button to update
    // grid as needed
    const submitBtn = document.querySelector(
        "#sizePicker input[type=submit]");
  
    submitBtn.addEventListener("click", e => {
        e.preventDefault();
        const params = getGridParameters();
        createPixelGrid(params.height, params.width);

        // Add event listeners to individual cells
        document.querySelectorAll(".pixel-cell").forEach(cell =>
            cell.addEventListener("click", () => cell.style
                .backgroundColor = gridParameters
                .pickedColor));
    })

    // Rubric requires that we add event listeners on individual cells.
    // Not the table. Hence commenting this out.    
    // Add event listener on canvas to update cell color
    //    document.querySelector("#pixelCanvas").addEventListener("click", e =>
    //        e.target.style.backgroundColor = gridParameters.pickedColor);

    // Add event listener on color picker to update cell view
    document.querySelector("#colorPicker").addEventListener("input",
        e => {
            gridParameters.pickedColor = e.target.value;
            console.log("Updated color!");
        });

});

// Function to get parameter values for the grid
const getGridParameters = () =>
    ({
        height: document.querySelector("#inputHeight").value,
        width: document.querySelector("#inputWidth").value,
        pickedColor: document.querySelector("#colorPicker").value
    });

// Main function to create the pixel grid
const createPixelGrid = (height, width) => {
    const pixelCanvas = document.querySelector("#pixelCanvas");

    // Refresh canvas
    pixelCanvas.innerHTML = "";

    // Rebuild pixel grid
    for (let x = 0; x < height; x++) {
        let pixelColumn = `<tr class="pixel-row" id="${"r"+x}">`;

        for (let y = 0; y < width; y++) {
            pixelColumn +=
                `<td class="pixel-cell" id="${"r"+x+"-c"+y}"></td>`;
        }

        document.querySelector("#pixelCanvas").innerHTML += pixelColumn;
    }
}
