export function removeTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

function twoDecimals(num: number) {
  return Math.round(num * 100) / 100;
}

export function heightColumnOffset(columns = 16) {
  if (typeof window === "undefined") {
    return 0;
  }

  // Clip paths need to be % based, but I want the y-size to match the width
  // So, what % of the window HEIGHT, is ONE COLUMN of the WIDTH?
  const { innerHeight, innerWidth } = window;
  const widthColumn = innerWidth / columns;
  const heightMinusColumn = innerHeight - widthColumn;
  const heightPerc = (heightMinusColumn / innerHeight) * 100;

  return twoDecimals(heightPerc);
}

export function clipPathInset(
  columns: number,
  left: number,
  right: number,
  y: number
) {
  const heightPerc = y ? heightColumnOffset(columns) : 100;

  const corners = [
    `${(100 / columns) * left}% ${twoDecimals(100 - heightPerc)}%`,
    `${(100 / columns) * right}% ${twoDecimals(100 - heightPerc)}%`,
    `${(100 / columns) * right}% ${heightPerc}%`,
    `${(100 / columns) * left}% ${heightPerc}%`,
  ];

  return corners.join(",");
}
