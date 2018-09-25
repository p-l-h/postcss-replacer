var postcss = require('postcss');
module.exports = postcss.plugin('postcss-replace', function (opts) {
    opts = opts || {};
    var mappers = opts.mappers || [];

    // Work with options here

    return function (root) {
        if (!mappers.length) {
            return;
        }
        root.walkAtRules('font-face', function (rule) {
            rule.walkDecls('src', function (decl) {
                var value = decl.value;
                mappers.forEach(function (item) {
                    value = value.replace(item.source, item.target);
                });
                decl.value = value;
            });
        });
    };
});
