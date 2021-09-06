const guid = require('uuid').v4;
const fs = require('fs');
const path = require('path');

const repoPath = process.argv[2];
const version = process.argv[3];

const extensionJsonPath = path.join(repoPath, 'vsts-extension-google-play.json');
const extensionJson = JSON.parse(fs.readFileSync(extensionJsonPath, 'utf-8'));
extensionJson.id = 'ds-google-play';
extensionJson.publisher = 'v-dshmelev';
extensionJson.name = 'Daniil Shmelevs Google Play';
extensionJson.public = false;
extensionJson.version = version;
fs.writeFileSync(extensionJsonPath, JSON.stringify(extensionJson, null, 4));

const tasksFolders = fs.readdirSync(path.join(repoPath, 'Tasks'));
tasksFolders.forEach((taskFolder) => {
  const fullTaskJsonPath = path.join(repoPath, 'Tasks', taskFolder, 'task.json');
  const taskJson = JSON.parse(fs.readFileSync(fullTaskJsonPath));
  
  taskJson.id = guid();
  taskJson.name = `DS${taskJson.name}`;
  taskJson.friendlyName = `DSs ${taskJson.friendlyName}`;
  taskJson.description = `DANIIL SHMELEVS TASK DON'T TOUCH`;
  taskJson.version.Patch = version;

  fs.writeFileSync(fullTaskJsonPath, JSON.stringify(taskJson, null, 4));
});
