const path = require('path')
const fs = require('fs')

class HtmlCompile {
	compileHtml() {
		let basedir_html_row = path.dirname(this.getHTMLDir(this.raw_dir))
		let compile_dir = path.join(path.dirname(basedir_html_row), this.compile_dir)
		this.compileHTMLFiles(basedir_html_row, compile_dir)
		let compile_loadindex = this.getHTMLDir(this.compile_dir)
		return compile_loadindex
	}


	getHTMLDir(html_dir) {
		let html_file = `../../static/${html_dir}/${this.load_index}`
		html_file = path.join(__dirname, html_file)
		console.log(`html_file`, html_file)
		return html_file
	}

	compileHTMLFiles(srcDir, destDir) {
		if (!fs.existsSync(destDir)) {
			fs.mkdirSync(destDir, { recursive: true });
		}
		const files = fs.readdirSync(srcDir);
		let isUpdata = false
		let updatFiles = []
		files.forEach(file => {
			const filePath = path.join(srcDir, file);
			const destFilePath = path.join(destDir, file);
			const fileStat = fs.statSync(filePath);
			if (fileStat.isFile() && path.extname(file) === '.html') {
				if (!fs.existsSync(destFilePath) || (fileStat.mtime > fs.statSync(destFilePath).mtime)) {
					isUpdata = true
				}
				updatFiles.push(
					[destFilePath, filePath]
				)
			}
		});
		if (isUpdata) {
			updatFiles.forEach((file) => {
				let [destFilePath, filePath] = file
				let content = fs.readFileSync(filePath, 'utf8');
				content = this.replaceIncludes(content, srcDir);
				fs.writeFileSync(destFilePath, content, 'utf8');
			})
		}
	}
    

	replaceIncludes(content, basePath) {
		const includeRegex = /\{include:"(.*?\.html)"\}/g;
		return content.replace(includeRegex, (match, includePath) => {
			const absoluteIncludePath = path.join(basePath, includePath);

			if (fs.existsSync(absoluteIncludePath)) {
				const fileContent = fs.readFileSync(absoluteIncludePath, 'utf8');
				return this.replaceIncludes(fileContent, path.dirname(absoluteIncludePath));  // 递归替换
			} else {
				console.error(`File not found: ${absoluteIncludePath}`);
				return '';
			}
		});
	}
	
	processIncludeTags(content, basePath) {
		const includePattern = /\{include:"(.*?)"\}/g;
		const processedContent = content.replace(includePattern, (match, includePath) => {
			const fullIncludePath = path.join(basePath, includePath);
			if (fs.existsSync(fullIncludePath)) {
				return fs.readFileSync(fullIncludePath, 'utf-8');
			} else {
				return `<!-- Include file not found: ${fullIncludePath} -->`;
			}
		});
		return processedContent;
	}
}

module.exports = HtmlCompile