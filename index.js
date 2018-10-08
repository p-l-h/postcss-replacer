var postcss = require('postcss');

module.exports = postcss.plugin('postcss-replace', function (opts) {
    opts = opts || {};
    var mappers = opts.mappers || [];

    var replacer = function (rule, key) {
        var value = rule[key];
        if (!value) {
            return;
        }
        mappers.forEach(function (item) {
            rule[key] = value.replace(item.source, item.target);
            value = rule[key];
        });
    };

    return function (root) {
        if (!Object.keys(mappers).length) {
            return false;
        }
        root.walk(function (rule) {
            if (rule.type === 'atrule') {
                replacer(rule, 'params');
            } else if (rule.type === 'decl') {
                replacer(rule, 'value');
            }
        });
        return true;
    };
});
