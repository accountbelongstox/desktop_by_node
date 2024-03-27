// const fs = require('fs');
// const path = require('path');
// const { exec } = require('child_process');
// class CreateVisualStudioFolders {
//     constructor() {
//         this.targetDirectory = 'D:\\applications_bak'; 
//     }
//     createFoldersAndSymlinks() {
//         const userRoamingDir = path.join(process.env.APPDATA, 'Microsoft', 'VisualStudio');
//         const foldersToCreate = [
//             'C:\\ProgramData\\Microsoft Visual Studio',
//             'C:\\Program Files (x86)\\Microsoft Visual Studio',
//             'C:\\Program Files\\Microsoft Visual Studio',
//             'C:\\Program Files (x86)\\MSBuild',
//             'C:\\ProgramData\\Microsoft\\VisualStudio',
//             'C:\\ProgramData\\regid.1991-06.com.microsoft',
//             userRoamingDir,
//             path.join(process.env.LOCALAPPDATA, 'Microsoft', 'VisualStudio'),
//         ];
//         foldersToCreate.forEach(folder => {
//             if (!fs.existsSync(folder)) {
//                 try {
//                     fs.symlinkSync(this.targetDirectory, folder, 'dir');
//                     console.log(`Created symlink for ${folder}`);
//                 } catch (err) {
//                     console.error(`Error creating symlink for ${folder}: ${err.message}`);
//                 }
//             } else {
//                 console.log(`Folder already exists: ${folder}`);
//             }
//         });
//         const installerPath = 'C:/Users/citop/Desktop/VisualStudioSetup.exe';
//         if (fs.existsSync(installerPath)) {
//             exec(`"${installerPath}"`, (error, stdout, stderr) => {
//                 if (error) {
//                     console.error(`Error running installer: ${error.message}`);
//                     return;
//                 }
//                 if (stderr) {
//                     console.error(`Installer stderr: ${stderr}`);
//                 }
//                 console.log(`Installer stdout: ${stdout}`);
//             });
//         } else {
//             console.error(`Installer not found at ${installerPath}`);
//         }
//     }
// }
// const vsFolderCreator = new CreateVisualStudioFolders();
// vsFolderCreator.createFoldersAndSymlinks();


const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class CreateVisualStudioFolders {
  constructor() {
    this.baseDirectory = 'D:\\applications';
    this.targetDirectory = path.join(this.baseDirectory, 'VisualStudio_2022');
  }

  // installByBasename(basename){
  //   switch(basename){
  //     case "VisualStudioSetup":
  //       this.createFoldersAndSymlinks()
  //       break;
  //   }
  // }

  createFoldersAndSymlinks() {

    const userRoamingDir = path.join(process.env.APPDATA, 'Microsoft', 'VisualStudio');

    const foldersToCreate = [
      'C:\\ProgramData\\Microsoft Visual Studio',
      'C:\\Program Files (x86)\\Microsoft Visual Studio',
      'C:\\Program Files\\Microsoft Visual Studio',
      'C:\\Program Files (x86)\\MSBuild',
      'C:\\ProgramData\\Microsoft\\VisualStudio',
      'C:\\ProgramData\\regid.1991-06.com.microsoft',
      'C:\\Program Files(x86)\\Reference Assemblies',
      'C:\\Program Files(x86)\\Windows Kits',
      'C:\\Program Files(x86)\\Application Verifier',
      'C:\\Program Files(x86)\\Microsoft SDKs',
      'C:\\Program Files(x86)\\HTML Help Workshop',
      'C:\\ProgramData\\Package Cache',
      'C:\\ProgramData\\Windows App Certification Kit',
      'C:\\Program Files\\Application Verifier',
      
      userRoamingDir,
      path.join(process.env.LOCALAPPDATA, 'Microsoft', 'VisualStudio'),
    ];

    if (!fs.existsSync(this.baseDirectory)) {
      fs.mkdirSync(this.baseDirectory, { recursive: true });
    }

    if (!fs.existsSync(this.targetDirectory)) {
      fs.mkdirSync(this.targetDirectory, { recursive: true });
    }

    foldersToCreate.forEach(folder => {
      if (!fs.existsSync(folder)) {
        try {
          fs.symlinkSync(this.targetDirectory, folder, 'dir');
          console.log(`Created symlink for ${folder}`);
        } catch (err) {
          console.error(`Error creating symlink for ${folder}: ${err.message}`);
        }
      } else {
        console.log(`Folder already exists: ${folder}`);
      }
    });

    const installerPath = 'C:/Users/citop/Desktop/VisualStudioSetup.exe';
    if (fs.existsSync(installerPath)) {
      exec(`"${installerPath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running installer: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Installer stderr: ${stderr}`);
        }
        console.log(`Installer stdout: ${stdout}`);
      });
    } else {
      console.error(`Installer not found at ${installerPath}`);
    }
  }
}

const vsFolderCreator = new CreateVisualStudioFolders();
vsFolderCreator.createFoldersAndSymlinks();
