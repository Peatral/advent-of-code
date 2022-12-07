const {readInput, sum, filterInvalid, sortAsc} = require("../utility");

class Folder {
  constructor(name) {
    this.name = name;
    this.contained = [];
  }

  getSize() {
    return this.contained.map(f => f.getSize()).reduce(sum, 0);
  }

  getFolder(path) {
    if (path.length <= 0)
      return this;
    return this.contained
      .filter(content => content instanceof Folder)
      .filter(folder => folder.name == path[0])[0]
      .getFolder(path.slice(1));
  }

  hasFolder(name) {
    return this.contained
      .filter(content => content instanceof Folder)
      .filter(folder => folder.name == name).length > 0;
  }

  hasFile(name) {
    return this.contained
      .filter(content => content instanceof File)
      .filter(file => file.name == name).length > 0;
  }

  addToFolder(content) {
    if (!this.canAddToFolder(content))
      return;
    this.contained.push(content);
  }

  canAddToFolder(content) {
    return content instanceof File ? !this.hasFile(content.name) : content instanceof Folder ? !this.hasFolder(content.name) : false;
  }

  getAllSubFolders() {
    return [this, ...this.contained
      .filter(content => content instanceof Folder)
      .flatMap(folder => folder.getAllSubFolders())];
  }
}

class File {
  constructor(size, name) {
    this.name = name;
    this.size = size - 0;
  }

  getSize() {
    return this.size;
  }
}

const createFileOrFolder = text => text.split(" ")[0] == "dir" ? new Folder(text.split(" ")[1]) : new File(...text.split(" "));
const executeCommand = (tree, path, cmd) => {
  switch(cmd.name) {
    case "cd":
      if (cmd.params[0] == "/") {
        path = [];
        return path;
      }
      if (cmd.params[0] == "..") {
        path = path.slice(0, -1);
        return path;
      }
      cmd.params.forEach(folder => {
        tree.getFolder(path).addToFolder(new Folder(folder));
        path.push(folder);
      });
      return path;
    case "ls":
      cmd.out.forEach(text => tree.getFolder(path).addToFolder(createFileOrFolder(text)));
      return path;
  }
}

const input = readInput();
const commands = input
  .split("\$ ")
  
  .map(cmd => cmd.split("\n").filter(filterInvalid))
  .filter(cmd => cmd.length > 0)
  .map(cmd => ({
    name: cmd[0].split(" ")[0],
    params: cmd[0].split(" ").slice(1), 
    out: cmd.slice(1)
  }));

const root = new Folder("/");
var parserPath = [];

commands.forEach(cmd => {
  parserPath = executeCommand(root, parserPath, cmd);
});

console.log(root
  .getAllSubFolders()
  .filter(folder => folder.getSize() <= 100000)
  .map(folder => folder.getSize())
  .reduce(sum, 0));

console.log(root
  .getAllSubFolders()
  .filter(folder => folder.getSize() >= root.getSize() - 40000000)
  .map(folder => folder.getSize())
  .sort(sortAsc)[0]);