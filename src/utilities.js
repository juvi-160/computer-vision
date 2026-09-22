export const drawRect = ( detections, ctx) => {
    detections.forEach(prediction => {
        
        //get prediction results
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];


        //styling
        const color = 'green'
        ctx.strokeStyle = color
        ctx.font = '18px Arial';
        ctx.fillStyle = color;

        //draw rectangles and text
        ctx.beginPath();
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();


    });
}