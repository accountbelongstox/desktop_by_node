const fs = require('fs');
const filePath = 'C:\\Users\\citop\\Desktop\\adddir.log.log'; 
const outputPath = 'D:\\applications_bak\\folderPaths.txt'; 
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('无法读取文件:', err);
    return;
  }
  const lines = data.trim().split('\n');
  const folderPaths = new Set(); 

  lines.forEach((line) => {
   
    const match = line.match(/C:[^ ]+/);
    if (match && match[0]) {
      folderPaths.add(match[0]); 
    }
  });


  const outputPath = 'D:\\applications_bak\\folderPaths.txt';
  fs.writeFile(outputPath, [...folderPaths].join('\n'), (writeErr) => {
    if (writeErr) {
      console.error('无法写入文件:', writeErr);
    } else {
      console.log('文件夹路径已写入:', outputPath);
    }
  });
});

