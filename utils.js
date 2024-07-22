function lineIntersectsRectangle(
  line,
  rectLeft,
  rectTop,
  rectRight,
  rectBottom
) {
  let x1 = line.startX;
  let y1 = line.startY;
  let x2 = line.endX;
  let y2 = line.endY;

  let minX = Math.min(x1, x2);
  let maxX = Math.max(x1, x2);
  let minY = Math.min(y1, y2);
  let maxY = Math.max(y1, y2);

  // Check if the line is completely outside the rectangle
  if (
    maxX < rectLeft ||
    minX > rectRight ||
    maxY < rectTop ||
    minY > rectBottom
  ) {
    return null;
  }

  let intersectionPoints = [];

  // Handle vertical line case
  if (x1 === x2) {
    if (x1 >= rectLeft && x1 <= rectRight) {
      if (y1 < y2) {
        if (y1 <= rectBottom && y2 >= rectTop) {
          intersectionPoints.push({ x: x1, y: Math.max(y1, rectTop) });
          intersectionPoints.push({ x: x1, y: Math.min(y2, rectBottom) });
        }
      } else {
        if (y2 <= rectBottom && y1 >= rectTop) {
          intersectionPoints.push({ x: x1, y: Math.max(y2, rectTop) });
          intersectionPoints.push({ x: x1, y: Math.min(y1, rectBottom) });
        }
      }
    }
  } else {
    let m = (y2 - y1) / (x2 - x1);
    let c = y1 - m * x1;

    // Calculate intersection with each side of the rectangle
    let topIntersectionX = (rectTop - c) / m;
    let bottomIntersectionX = (rectBottom - c) / m;
    let leftIntersectionY = m * rectLeft + c;
    let rightIntersectionY = m * rectRight + c;

    // Check if the intersection points are within the bounds of the rectangle
    if (topIntersectionX >= rectLeft && topIntersectionX <= rectRight) {
      intersectionPoints.push({ x: topIntersectionX, y: rectTop });
    }
    if (bottomIntersectionX >= rectLeft && bottomIntersectionX <= rectRight) {
      intersectionPoints.push({ x: bottomIntersectionX, y: rectBottom });
    }
    if (leftIntersectionY >= rectTop && leftIntersectionY <= rectBottom) {
      intersectionPoints.push({ x: rectLeft, y: leftIntersectionY });
    }
    if (rightIntersectionY >= rectTop && rightIntersectionY <= rectBottom) {
      intersectionPoints.push({ x: rectRight, y: rightIntersectionY });
    }
  }

  return intersectionPoints.length > 0 ? intersectionPoints : null;
}
