const {
    override,
    disableEsLint,
    fixBabelImports
} = require("customize-cra");
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
