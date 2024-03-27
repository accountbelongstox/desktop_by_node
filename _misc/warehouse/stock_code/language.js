class Main{


    
    getLanguageVersion(language, callback) {
        let command = '';
        switch (language.toLowerCase()) {
            case 'python':
                command = 'python --version';
                break;
            case 'java':
                command = 'java -version';
                break;
            case 'node': 
                command = 'node -v';
                break;
            case 'rust':
                command = 'rustc --version';
                break;
            case 'go':
                command = 'go version';
                break;
            case 'ruby':
                command = 'ruby -v';
                break;
            case 'groovy':
                command = 'groovy --version';
                break;
            default:
                callback(null);
                return;
        }
        exec(command, (error, stdout, stderr) => {
            if (error) {
                callback(null);
                return;
            } 

            const output = stdout || stderr;
            callback(output.trim());
        });
    }
}



module.exports = Main

