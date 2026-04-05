// DOM ELEMENTS
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

       navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));

    } else if (e.target.classList.contains("hex-value")) {
        const hexValue = e.target.textContent;
        
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.nextElementSibling))
            .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.querySelector(".hex-value").textContent;

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.querySelector(".copy-btn")))
            .catch((err) => console.log(err));
    } 
});

function showCopySuccess(element) {
    element.classList.remove("copy-btn");
    element.classList.add("copy-success");
    
    setTimeout(() => {
        element.classList.remove("copy-success");
        element.classList.add("copy-btn");
        element.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = [];
    
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
    
    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789abcdef";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((colorBoxes, index) => {
        const color = colors[index];
        const colorDiv = colorBoxes.querySelector(".color");
        const hexValue = colorBoxes.querySelector(".hex-value");
        const colorInfo = colorBoxes.querySelector(".color-info");

        // Set the background
        colorDiv.style.backgroundColor = color;

        // Get the computed RGB string and extract numbers
        const rgbString = window.getComputedStyle(colorDiv).backgroundColor;
        const rgbValues = rgbString.match(/\d+/g).map(Number);
        const [r, g, b] = rgbValues;

       // CalCalculate brightness (YIQ formula)
        const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        
        // Set text color based on brightness threshold (128)
        colorInfo.style.color = (brightness < 128)
            ? "hsl(0 0% 95%)"   // Light text for dark backgrounds
            : "hsl(0 0% 7.5%)"; // Dark text for light backgrounds
        
        hexValue.textContent = color;
    });
}

// GENERATE PALETTE ON PAGE REFRESH
generatePalette();