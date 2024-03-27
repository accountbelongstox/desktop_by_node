const fs = require('fs').promises;
const path = require('path');

async function generateMissingFiles(directory, ext) {
    try {
        const files = await fs.readdir(directory, { withFileTypes: true });
        const baseNames = new Set();
        const filesToDelete = [];
        for (const file of files) {
            if (file.isDirectory()) {
                // 递归子目录
                await generateMissingFiles(path.join(directory, file.name), ext);
            } else if (file.isFile()) {
                const parsedPath = path.parse(file.name);
                if (!parsedPath.ext) {
                    // 如果文件没有扩展名，则加入待删除列表，并为其添加默认扩展名
                    filesToDelete.push(file.name);
                    parsedPath.ext = `.${ext}`;
                }
                if (parsedPath.ext !== '.txt') {
                    const base = parsedPath.name.endsWith('_interface') 
                        ? parsedPath.name.slice(0, -10)
                        : parsedPath.name;
                    baseNames.add(base);
                }
            }
        }
        for (const base of baseNames) {
            const mainFile = `${base}${path.extname(base) || `.${ext}`}`;
            const interfaceFile = `${base}_interface${path.extname(base) || `.${ext}`}`;
            const txtFile = `${base}_interface.txt`;

            if (!files.some(file => file.name === mainFile)) {
                await fs.writeFile(path.join(directory, mainFile), '');
                console.log(`Created: ${mainFile}`);
            }

            if (!files.some(file => file.name === interfaceFile)) {
                await fs.writeFile(path.join(directory, interfaceFile), '');
                console.log(`Created: ${interfaceFile}`);
            }

            if (!files.some(file => file.name === txtFile)) {
                await fs.writeFile(path.join(directory, txtFile), '');
                console.log(`Created: ${txtFile}`);
            }
        }

        // 删除没有任何扩展名的文件
        // for (const fileToDelete of filesToDelete) {
        //     await fs.unlink(path.join(directory, fileToDelete));
        //     console.log(`Deleted: ${fileToDelete}`);
        // }

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

const directory = './interface'; 
const defaultExtension = 'py';
generateMissingFiles(directory, defaultExtension);
