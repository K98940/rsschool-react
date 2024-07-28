export const cg = (label: string) => {
  console.group(label);
  return (text: string) => console.info(text);
};
export const cge = () => {
  console.groupEnd();
};
export const ct = (arr: [] | object) => {
  console.table(arr);
};

const commonStyle = 'padding: 5px; font-size: 1.1em';
export enum Colors {
  green = `background-color: black; color: #00FF00; ${commonStyle}`,
  red = `background-color: black; color: #FF5555; ${commonStyle}`,
  blue = `background-color: black; color: #5555FF; ${commonStyle}`,
  yellow = `background-color: black; color: #FFFF77; ${commonStyle}`,
  pink = `background-color: black; color: #66FFFF; ${commonStyle}`,
  white = `background-color: black; color: #FFFFFF; ${commonStyle}`,
  orange = `background-color: black; color: #ED4E4C; ${commonStyle}`,
  black = `background-color: white; color: #000000; ${commonStyle}`,
}
export const cl = (title: string, color: Colors = Colors.white, log: unknown = '') => {
  console.log('%c' + title, color, log);
};
