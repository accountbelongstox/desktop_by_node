const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { promisify } = require('util');
// const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const dependsJson = {
    "git_repository": {
        "node_provider": "https://github.com/accountbelongstox/node_provider.git",
        "node_spider": "https://github.com/accountbelongstox/node_spider.git"
    },
    "include_git_dir": [
        {
            "./dd_electron": [
                "node_provider",
                "node_spider"
            ]
        }
    ]
}
class Env { mainEnvFile = null; annotationSymbol = "#"; constructor(rootDir = null, envName = ".env", delimiter = "=") { rootDir = this.getCwd(); this.setRootDir(rootDir, envName, delimiter); } getCwd() { return path.dirname(__filename); } setDelimiter(delimiter = "=") { this.delimiter = delimiter; } async exampleTo(examplePath) { const envFile = examplePath.replace("-example", "").replace("_example", "").replace(".example", ""); await this.mergeEnv(envFile, examplePath); } async setRootDir(rootDir, envName = ".env", delimiter = "=") { this.setDelimiter(delimiter); this.rootDir = rootDir; this.localEnvFile = path.join(this.rootDir, envName); this.exampleEnvFile = path.join(this.rootDir, `${envName}_example`); if (!fs.existsSync(this.exampleEnvFile)) { this.exampleEnvFile = path.join(this.rootDir, `${envName}-example`); } if (!fs.existsSync(this.exampleEnvFile)) { this.exampleEnvFile = path.join(this.rootDir, `${envName}.example`); } await this.getLocalEnvFile(); } async load(rootDir, envName = ".env", delimiter = "=") { return new Env(rootDir, envName, delimiter); } async getLocalEnvFile() { if (!fs.existsSync(this.localEnvFile)) { fs.writeFileSync(this.localEnvFile, ""); } await this.mergeEnv(this.localEnvFile, this.exampleEnvFile); return this.localEnvFile; } getEnvFile() { return this.localEnvFile; } arrToDict(array) { const result = {}; for (const item of array) { if (Array.isArray(item) && item.length > 1) { const [key, val] = item; result[key] = val; } } return result; } dictToArr(dictionary) { const result = []; for (const [key, value] of Object.entries(dictionary)) { result.push([key, value]); } return result; } async mergeEnv(envFile, exampleEnvFile) { if (!fs.existsSync(exampleEnvFile)) { return; } const exampleArr = this.readEnv(exampleEnvFile); const localArr = this.readEnv(envFile); const addedKeys = []; const exampleDict = this.arrToDict(exampleArr); const localDict = this.arrToDict(localArr); for (const [key, value] of Object.entries(exampleDict)) { if (!(key in localDict)) { localDict[key] = value; addedKeys.push(key); } } if (addedKeys.length > 0) { console.log(`Env-Update env: ${envFile}`); const updatedArr = this.dictToArr(localDict); await this.saveEnv(updatedArr, envFile); } for (const addedKey of addedKeys) { console.log(`Env-Added key: ${addedKey}`); } } readKey(key) { const content = fs.readFileSync(this.mainEnvFile, 'utf8'); const lines = content.split('\n'); for (const line of lines) { const [k, v] = line.split(this.delimiter); if (k.trim() === key) { return v.trim(); } } return null; } replaceOrAddKey(key, val) { let updated = false; const lines = []; const content = fs.readFileSync(this.mainEnvFile, 'utf8'); const fileLines = content.split('\n'); for (const line of fileLines) { const [k, v] = line.split(this.delimiter); if (k.trim() === key) { lines.push(`${key}${this.delimiter}${val}`); updated = true; } else { lines.push(line); } } if (!updated) { lines.push(`${key}${this.delimiter}${val}`); } const updatedContent = lines.join('\n'); fs.writeFileSync(this.mainEnvFile, updatedContent); } readEnv(filePath = null) { if (filePath === null) { filePath = this.localEnvFile; } const content = fs.readFileSync(filePath, 'utf8'); const lines = content.split('\n'); const result = lines.map(line => line.split(this.delimiter).map(value => value.trim())); return result; } getEnvs(filePath = null) { return this.readEnv(filePath); } async saveEnv(envArr, filePath = null) { if (filePath === null) { filePath = this.localEnvFile; } const filteredEnvArr = envArr.filter(subArr => subArr.length === 2); const formattedLines = filteredEnvArr.map(subArr => `${subArr[0]}${this.delimiter}${subArr[1]}`); const resultString = formattedLines.join('\n'); await this.saveFile(filePath, resultString, true); } async setEnv(key, value, filePath = null) { if (filePath === null) { filePath = this.localEnvFile; } const envArr = this.readEnv(filePath); let keyExists = false; for (const subArr of envArr) { if (subArr[0] === key) { subArr[1] = value; keyExists = true; break; } } if (!keyExists) { envArr.push([key, value]); } await this.saveEnv(envArr, filePath); } isEnv(key, filePath = null) { const isArg = process.argv.includes("is_env"); const val = this.getEnv(key, filePath); if (val === "") { if (isArg) { console.log("False"); } return false; } if (isArg) { console.log("True"); } return true; } getEnv(key, filePath = null) { if (filePath === null) { filePath = this.localEnvFile; } const envArr = this.readEnv(filePath); for (const subArr of envArr) { if (subArr[0] === key) { return subArr[1]; } } return ""; } async saveFile(filePath, content, overwrite) { if (!fs.existsSync(filePath) || overwrite) { await writeFileAsync(filePath, content); } } }
const env = new Env()
class AutoInstaller {
    projects = ['.'];
    projectsFullDirs = ['.'];
    public_skip_dirs = ['node_modules'];
    dependesPaths = [];
    currentDirectory = path.dirname(__filename);
    constructor() {
        // this.scanFrontends()
        // this.projects.push(env.getEnv(`FRONTEND`))
    }
    checkGitDirectories() {
        const includeGitDir = dependsJson.include_git_dir;
        const gitRepository = dependsJson.git_repository;
        includeGitDir.forEach((item) => {
            for (const directoryPath in item) {
                const gitDependencies = item[directoryPath];
                const fullPath = path.join(this.currentDirectory, directoryPath);
                gitDependencies.forEach((gitDependency) => {
                    const dependencyPath = path.join(fullPath, gitDependency);
                    if(this.isGitDirectoryEmpty(dependencyPath)){
                        console.log(`${dependencyPath} is empty.`);
                        this.delete(dependencyPath)
                    }
                    if (!fs.existsSync(dependencyPath)) {
                        console.log(`${dependencyPath} does not exist.`);
                        const gitUrl = gitRepository[gitDependency];
                        if (gitUrl) {
                            const cloneCommand = `${this.git} clone ${gitUrl}`
                            console.log(cloneCommand);
                            this.execCommand(cloneCommand,fullPath)
                        }
                    }
                });
            }
        });
    }
    delete(filePath) {
        if (!fs.existsSync(filePath)) {
            return;
        }
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            fs.unlinkSync(filePath);
        }
        else if (stats.isDirectory()) {
            const files = fs.readdirSync(filePath);
            files.forEach((file) => {
                const fullPath = path.join(filePath, file);
                this.delete(fullPath);
            });
            fs.rmdirSync(filePath);
        }
    }
    isGitDirectoryEmpty(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            return true;
        }
        const files = fs.readdirSync(directoryPath);
        return files.length === 0 || (files.length === 1 && files[0] === '.gitkeep');
    }
    scanFrontends() {
        const frontend = env.getEnv(`FRONTEND`)
        if (!frontend.startsWith(`http`)) {
            this.projects.push(frontend)
        }
    }
    getArgName(name, default_val = null) {
        const arg = this.getArgumentValue(name);
        if (arg) {
            if (typeof arg == "string") {
                return path.normalize(arg);
            }
            return arg;
        } else {
            return default_val;
        }
    }
    isStartedWith(nodeCommand) {
        const args = process.argv;
        const nodeExecutable = args[0].replace(/\.[^.]+$/, '');
        return nodeExecutable.endsWith(nodeCommand);
    }
    isNodeModulesNotEmpty(directory) {
        const nodeModulesPath = path.join(directory, 'node_modules');
        if (!fs.existsSync(nodeModulesPath)) {
            return false;
        }
        return !this.isEmptyDir(nodeModulesPath);
    }
    isPackageJson(directory) {
        const filePath = path.join(directory, 'package.json');
        if (fs.existsSync(filePath)) {
            return true;
        }
        return false;
    }
    isEmptyDir(directory) {
        if (!fs.existsSync(directory)) {
            return true;
        }
        const contents = fs.readdirSync(directory);
        return contents.length == 0;
    }
    getSystemArguments() {
        const args = process.argv;
        return args;
    }
    getArgumentValue(arg_name) {
        const args = this.getSystemArguments();
        for (const arg of args) {
            if (arg == arg_name) {
                return true;
            }
            const [name, value] = arg.split(/=/);
            if (name === arg_name) {
                return value;
            }
        }
        return null;
    }
    deleteDirectory(directory) {
        if (fs.existsSync(directory)) {
            const files = fs.readdirSync(directory);
            for (const file of files) {
                const filePath = path.join(directory, file);
                if (fs.lstatSync(filePath).isDirectory()) {
                    deleteDirectory(filePath);
                } else {
                    fs.unlinkSync(filePath);
                }
            }
            fs.rmdirSync(directory);
        }
    }
    setCommand() {
        const yarn = this.getArgName("yarn", "yarn");
        const npm = this.getArgName("npm", `npm`)
        const git = this.getArgName("git", "git");
        this.yarn = yarn
        this.npm = npm
        this.git = git
    }
    runInstallInDirectories() {
        const projects = this.projectsFullDirs;
        for (const directory of projects) {
		    if (!this.isNodeModulesNotEmpty(directory) && this.isPackageJson(directory)) {
                const cmd = `${this.yarn} install`
				console.log(`directory-cmd ${cmd}`,!this.isNodeModulesNotEmpty(directory),this.isPackageJson(directory))
        
                this.execCommand(cmd, directory);
            }
        }
    }
    startByYarn(start_command) {
        const startCmd = `${this.yarn} ${start_command} yarn:${this.yarn}`
        console.log(`Start command: ${startCmd}`);
        this.execCommand(startCmd, this.currentDirectory);
    }
    setStartExe(start_exec) {
        this.start_exec = start_exec
    }
    setStartCommand(start_command) {
        this.start_command = start_command
    }
    setStartFile(start_file) {
        if (start_file) {
            if (!path.isAbsolute(start_file)) {
                start_file = path.join(this.currentDirectory, start_file)
            }
        }
        this.start_file = start_file
    }
    setStartParameter(start_parameter) {
        this.start_parameter = start_parameter
    }
    execCommand(cmd, cwd = null) {
        if (cwd) {
            process.chdir(cwd)
        }
		console.log(`start-cmd ${cmd}`)
        execSync(cmd, { shell: true, stdio: 'inherit' });
        if (cwd) {
            process.chdir(this.currentDirectory)
        }
    }
    startBy() {
        if (!this.start_command) {
            if (this.start_file) {
                this.start_command = this.start_file
            }
        }
        const startCmd = `${this.start_exec} ${this.start_command} ${this.start_parameter}`
        console.log(`Start-Command: ${startCmd}`);
        this.execCommand(startCmd, this.currentDirectory);
    }
}
const autoInstaller = new AutoInstaller()
if (autoInstaller.isStartedWith("node")) {
    autoInstaller.setCommand()
    autoInstaller.checkGitDirectories()
    autoInstaller.runInstallInDirectories()
    const start_command = `reload`
    autoInstaller.startByYarn(start_command)
    return
}
//** ----------- Yarn Start ----------- */
const { ElectronEgg } = require('ee-core');
new ElectronEgg("module");