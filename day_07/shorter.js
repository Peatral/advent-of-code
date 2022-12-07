const {readInput, sum, filterInvalid, sortAsc} = require("../utility");

const getObject = (tree, path) => path.reduce((folder, nextFolder) => folder[nextFolder], tree);
const insertObject = (tree, path, name, value) => getObject(tree, path)[name] = value;
const lookupSizes = (tree, sizesCollector) => {
  const size = Object.keys(tree).map(name => typeof tree[name] === "object" ? lookupSizes(tree[name], sizesCollector) : tree[name]).reduce(sum, 0)
  sizesCollector.push(size);
  return size;
}

const executeCommand = (tree, path, cmd) => {
  if (cmd.name == "ls") {
    cmd.out.filter(text => !text.startsWith("dir")).forEach(text => insertObject(tree, path, text.split(" ")[1], parseInt(text.split(" ")[0])));
    return path;
  }
  // Case "cd"
  if (cmd.param == "/") {
    path = [];
    return path;
  }
  if (cmd.param == "..") {
    path = path.slice(0, -1);
    return path;
  }
  insertObject(tree, path, cmd.param, {});
  path.push(cmd.param);
  return path;
}


const root = {};
var parserPath = [];

const commands = readInput()
  .split("\$ ")
  .map(cmd => cmd.split("\n").filter(filterInvalid))
  .filter(cmd => cmd.length > 0)
  .map(cmd => ({
    name: cmd[0].split(/\ (.*)/s)[0],
    param: cmd[0].split(/\ (.*)/s)[1], 
    out: cmd.slice(1)
  }));

commands.forEach(cmd => {
  parserPath = executeCommand(root, parserPath, cmd);
});

const sizes = [];
const rootSize = lookupSizes(root, sizes);

console.log(sizes
  .filter(size => size <= 100000)
  .reduce(sum, 0));

console.log(sizes
  .filter(size => size >= rootSize - 40000000)
  .sort(sortAsc)[0]);