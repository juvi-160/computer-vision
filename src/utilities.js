// Assign a consistent color per class name instead of randomizing every frame
const classColors = {};

const getColorForClass = (className) => {
  if (!classColors[className]) {
    let hash = 0;
    for (let i = 0; i < className.length; i++) {
      hash = className.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    classColors[className] = `hsl(${hue}, 85%, 60%)`;
  }
  return classColors[className];
};

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
};

export const drawRect = (detections, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];
    const score = (prediction["score"] * 100).toFixed(0);
    const color = getColorForClass(text);

    // Bounding box
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    drawRoundedRect(ctx, x, y, width, height, 6);
    ctx.stroke();

    // Label background
    const label = `${text} ${score}%`;
    ctx.font = "600 14px -apple-system, sans-serif";
    const textWidth = ctx.measureText(label).width;
    const labelHeight = 22;
    const labelY = y > labelHeight ? y - labelHeight : y;

    ctx.fillStyle = color;
    drawRoundedRect(ctx, x, labelY, textWidth + 16, labelHeight, 4);
    ctx.fill();

    // Label text
    ctx.fillStyle = "#0f172a";
    ctx.fillText(label, x + 8, labelY + 16);
  });
};