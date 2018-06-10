const { join, basename } = require('path');
const fs = require('fs');

/*
 * function returns all subfolders of given folder
 */
function readDirectories(directory, cb) {
  if (!directory) {
    cb(err);
    return;
  }

  fs.readdir(directory, function (err, items) {
    if (err) {
      cb(err);
      return;
    }

    try {
      const directories = items.map( filename => join(directory, filename) )
        .filter( path => lstatSync(path).isDirectory() )
        .map( path => {
          return { name: basename(path) };
        });

      cb(err, directories);

    } catch (err) {
      cb(err);
    }
  })
};

/*
 * function creates directory by given path with given name
 * and returns all directories from "path" directory
 */

function createDirectory(path, name, cb) {
  const directoryPath = `${path}/${name}`;

  fs.mkdir(directoryPath, function (err) {
    if (err) {
        cb(err)
        return;
    }

    readDirectories(path, cb);
  });
}

function createEmptyDirectory(path, name) {
  return new Promise((resolve, reject) => {
    fs.mkdir(`${path}/${name}`, err => {
      if (err) {
        reject(err);
      } else {
        resolve('success');
      }
    });
  }); 
}

function writeFile(path, filename, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `${path}/${filename}`,
      Buffer(file, 'base64'),
      err => {
        if (err) {
          reject(err);
        } else {
          resolve('success');
        }
      }
    );
  });
}

module.exports.readDirectories = readDirectories;
module.exports.createDirectory = createDirectory;
module.exports.createEmptyDirectory = createEmptyDirectory;
module.exports.writeFile = writeFile;