module.exports = {
    'core-css': {
        route: new RegExp('/static/css/core.css'),
        path: './public/css/',
        dataType: 'css',
        files: [
            'lib/yui-reset.css',
            'lib/bootstrap.css',
            'core.css'
        ]
    },

    'core-js': {
        route: new RegExp('/static/js/core.js'),
        path: './public/js/',
        dataType: 'javascript',
        files: [
            'lib/mootools_core_more_bootstrap.js'
        ]
    }
}