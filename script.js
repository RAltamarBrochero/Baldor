
const url = 'baldor.pdf'; // Asegúrate de que el PDF esté en la misma carpeta  

let pdfDoc = null,  
    pageNum = 1,  
    canvas = document.getElementById('pdf-canvas'),  
    ctx = canvas.getContext('2d');  

// Función para renderizar una página del PDF  
function renderPage(num) {  
    pdfDoc.getPage(num).then(page => {  
        let viewport = page.getViewport({ scale: 0.9 }); // Escalamos el PDF a 3.0  
        canvas.height = viewport.height;  
        canvas.width = viewport.width;  

        // Asegúrate de que el canvas no cubra otros elementos  
        canvas.style.marginBottom = '20px'; // Añadir margen para el espacio  
        let renderContext = {  
            canvasContext: ctx,  
            viewport: viewport  
        };  
        page.render(renderContext);  
    });  
}  

// Cargando el PDF  
pdfjsLib.getDocument(url).promise.then(function(pdf) {  
    pdfDoc = pdf;  
    renderPage(pageNum); // Renderiza la primer página al cargar  
});  

// Eventos para los botones de navegación  
document.getElementById('prev').addEventListener('click', () => {  
    if (pageNum <= 1) return;  
    pageNum--;  
    renderPage(pageNum);  
});  

document.getElementById('next').addEventListener('click', () => {  
    if (pageNum >= pdfDoc.numPages) return;  
    pageNum++;  
    renderPage(pageNum);  
});