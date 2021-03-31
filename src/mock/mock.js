const titles = ['one', 'o12ne', 'two', 'three', 'four', '5test', '5test', '4test', '3test', '2test', '1test'];
const generateMain = () => Math.random() < 0.5;

const generateData = (title, id) => ({id, title, main: generateMain()})

const mock = titles.map((title, i) => generateData(title, i))

export {mock};