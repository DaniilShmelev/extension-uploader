const guid = require('uuid-by-string');
const fs = require('fs');
const path = require('path');

const repoPath = process.argv[2];
const minor = process.argv[3];
const patch = process.argv[4];

const extensionJsonPath = path.join(repoPath, 'vsts-extension-google-play.json');
const extensionJson = JSON.parse(fs.readFileSync(extensionJsonPath, 'utf-8'));
extensionJson.id = 'DS-google-play-2';
extensionJson.publisher = 'v-dshmelev';
extensionJson.name = 'Daniil Shmelevs Google Play 2';
extensionJson.public = false;
extensionJson.version = `3.${minor}.${patch}`;
console.log(JSON.stringify(extensionJson, null, 4));
fs.writeFileSync(extensionJsonPath, JSON.stringify(extensionJson, null, 4));

const tasksFolders = fs.readdirSync(path.join(repoPath, 'Tasks'));
tasksFolders.forEach((taskFolder) => {
  const fullTaskJsonPath = path.join(repoPath, 'Tasks', taskFolder, 'task.json');
  const taskJson = JSON.parse(fs.readFileSync(fullTaskJsonPath));
  
  taskJson.name = `DS${taskJson.name}`;
  taskJson.id = guid(taskJson.name);
  taskJson.friendlyName = `DSs ${taskJson.friendlyName}`;
  taskJson.description = `DANIIL SHMELEVS TASK DON'T TOUCH`;
  taskJson.version.Minor = minor;
  taskJson.version.Patch = patch;

  fs.writeFileSync(fullTaskJsonPath, JSON.stringify(taskJson, null, 4));
});
