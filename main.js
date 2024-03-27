const {elec} = require(`./core_node/electron/egg_utils`);


if (process.env.npm_lifecycle_event) {
    console.log('This script is running via npm.');
} else {
    console.log('This script is running directly with Node.js.');
    console.log(`Prepare the front-end environment.`)
    elec.preFrontendEnvironment()
    return
}
elec.getRunEnviromentInfo((info)=>console.log(info))
const { ElectronEgg } = require('ee-core');
new ElectronEgg("module");

// 在electron/preload/index.js loader provider。

// const {egg_electron} = require('../../core_node/practicals');
// const egg_addon = new egg_electron();
// egg_addon.start();
 