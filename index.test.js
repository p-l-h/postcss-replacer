var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('no input', function () {
    return run('', '', {});
});

it('replace abc to def',  function () {
    return run('@font-face { src: abc }', '@font-face { src: def }', {
        mappers: [
            {
                source: 'abc',
                target: 'def'
            }
        ]
    });
});

it('wont replace abc to def',  function () {
    return run('@font-face { src: abc }', '@font-face { src: abc }', {
        mappers: []
    });
});


it('replace abc to def, def to xyz',  function () {
    return run('@font-face { src: abc }', '@font-face { src: xyz }', {
        mappers: [
            {
                source: 'abc',
                target: 'def'
            },
            {
                source: 'def',
                target: 'xyz'
            }
        ]
    });
});

it('replace /\d+/ to abc',  function () {
    return run('@font-face { src: 1341234 }', '@font-face { src: abc }', {
        mappers: [
            {
                source: /\d+/,
                target: 'abc'
            }
        ]
    });
});

/* Write tests here

it('does something', () => {
    return run('a{ }', 'a{ }', { });
});

*/
