const fs = require('fs');
const path = require('path');

const ignoredExtensions = ['.log',`.woff2`,`.24`,`.26`,`.10`,`.txt`,`.txt`,`.txt`,`.txt`,`.pb`,`.bin`,`.TXT`,`.rsp`,`.ch`,`.LZO`,`.FAQ`,`.md`,`.dll`,`.h`,`.c`,`.pl`,`.lib`,`.ash`,`.sub`,`.m4`,`.ac`,`.S`,`.asm`,`.def`,`.pak`,`.sig`,`.png`,`.obj`,`.o`];  // 例如：跳过.log文件
const ignoredDirectories = ['node_modules',`build`,`autoconf`,`B`,`libs`,`build`,`.git`,`.vscode`,`doc`];

function scanDirectory(dir, prefix = '', includeFiles = false) {
    let output = '';
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const isLast = i === entries.length - 1;

        if (entry.isDirectory() && !ignoredDirectories.includes(entry.name)) {
            output += `${prefix}${isLast ? '└──' : '├──'} ${entry.name}\n`;
            output += scanDirectory(
                path.join(dir, entry.name),
                `${prefix}${isLast ? '    ' : '│   '}`,
                includeFiles
            );
        } else if (includeFiles && entry.isFile() && !ignoredExtensions.includes(path.extname(entry.name))) {
            output += `${prefix}${isLast ? '└──' : '├──'} ${entry.name}\n`;
        }
    }
    return output;
}


  const projectPath = path.join(__dirname, './');
  const outputFilePath = path.join(projectPath, 'project_file_tree.txt');
  const outputDirPath = path.join(projectPath, 'project_dir_tree.txt');
  fs.writeFileSync(outputDirPath, scanDirectory(projectPath));
  fs.writeFileSync(outputFilePath, scanDirectory(projectPath, '', true));
  
  
  console.log(`目录树已保存到文件：${outputFilePath}`);
  console.log(`目录树已保存到文件：${outputDirPath}`);
  