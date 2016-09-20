SystemJS.config({
    // tell SystemJS which transpiler to use

    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': './bower_components/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './bower_components/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script
        'main': './scripts/index.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'cryptojs': './bower_components/crypto-js/crypto-js.js',
        'login-screen': './scripts/screens/login-screen.js',
        'tickets-screen': './scripts/screens/tickets-screen.js',        
        'event-manager': './scripts/events/event-manager.js',
        'api-requests': './scripts/events/api-requests.js'
    },
    transpiler: 'plugin-babel'
});