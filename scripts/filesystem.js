const { join, basename } = require('path');
const { lstatSync, readdirSync, readdir, mkdir } = require('fs');

/*
 * function returns all subfolders of given folder
 */
function readDirectories(directory, cb) {
  if (!directory) {
    cb(err);
    return;
  }

  readdir(directory, function (err, items) {
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

  mkdir(directoryPath, function (err) {
    if (err) {
        cb(err)
        return;
    }

    readDirectories(path, cb);
  });
}

module.exports.readDirectories = readDirectories;
module.exports.createDirectory = createDirectory;