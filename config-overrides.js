const {
    override,
    disableEsLint,
    fixBabelImports
} = require("customize-cra");
const path = require("path");
module.exports = {
    webpack: override(
        disableEsLint(),
        fixBabelImports('import', {        
            libraryName: 'antd',        
            libraryDirectory: 'es',       
            style: 'css'
        })
    )
};
