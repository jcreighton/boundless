/* eslint-disable no-console */
/* eslint-disable no-fallthrough */

process.env.BABEL_ENV = 'development';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const _ = require('lodash');

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const base = __dirname + '/../packages/';
const packages = fs.readdirSync(path.resolve(base)).filter((name) => /^boundless-(?!utils)/.test(name));
const error = (err) => console.error(chalk.bold.red(err));

const baseExternals = {
    "classnames": {
        commonjs2: "classnames",
    },

    "react": {
        commonjs2: "react",
    },

    "react-dom": {
        commonjs2: "react-dom",
    },
};

const docgen = require('react-docgen');
const componentReadmeTemplate = `
THIS IS AN AUTOGENERATED FILE. EDIT INDEX.JS INSTEAD.

<%= description %>

## Props

_Note: only top-level props are in the README, for the full list check out the [website](http://boundless.js.org/<%= prettyName %>#props)._

### Required Props
<%
    const requiredProps = _.pickBy(props, {required: true});

    if (_.size(requiredProps)) {
        const requiredPropsSortedKeys = _.sortBy(_.keys(requiredProps), [_.identity]);
%>
<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
<% _.each(requiredPropsSortedKeys, function(propName) { %>
<tr>
<td><%= propName %></td>
<td><pre><code><%= typeParser(props[propName].type) %></code></pre></td>
<td><pre><code class="language-js"><%= props[propName].defaultValue.value %></code></pre></td>
<td><%= props[propName].description %></td>
</tr>
<% }) %>
</table>
<% } else { %>
There are no required props.
<% } %>

### Optional Props
<%
    const optionalProps = _.pickBy(props, {required: false});

    if (_.size(optionalProps)) {
        const optionalPropsSortedKeys = _.sortBy(_.keys(optionalProps), [_.identity]);
%>
<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
<% _.each(optionalPropsSortedKeys, function(propName) { %>
<tr>
<td><%= propName %></td>
<td><pre><code><%= typeParser(props[propName].type) %></code></pre></td>
<td><pre><code class="language-js"><%= props[propName].defaultValue.value %></code></pre></td>
<td><%= props[propName].description %></td>
</tr>
<% }) %>
</table>
<% } else { %>
There are no optional props.
<% } %>
`.trimLeft();
const componentReadmeGenerator = _.template(componentReadmeTemplate);

/*
    the boundless bundle needs some browser globals, so we'll just spawn a shared instance of jsdom
    and load the standalone version of boundless into it; we need the built version of boundless since
    node can't handle es6 module syntax yet ;_;
 */
require('jsdom').env('', [
    'http://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js',
    'http://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js',
    path.resolve(`${__dirname}/../public/boundless.standalone.min.js`),
], (err, window) => {
    if (err) {
        return error(err);
    }

    const formatPropType = (type = {}) => {
        switch (type.name) {
        case 'arrayOf':
            if (type.value.name !== 'custom') {
                return `${type.name}(${formatPropType(type.value)})`;
            }

            return 'array';

        case 'element':
            return 'ReactElement';

        case 'enum':
            if (type.computed === true) {
                return _.keys(
                    _.get(window.Boundless, type.value, {})
                ).map((key) => `${type.value}.${key}`).join(' or\n');
            } else if (Array.isArray(type.value)) {
                return _.map(type.value, 'value').join(' or\n');
            }

            return `oneOf(${type.value})`;

        case 'func':
            return 'function';

        case 'instanceOf':
           return type.value;

        case 'node':
            return 'any renderable';

        case 'shape':
            return 'object';

        case 'union':
            return type.value.map((v) => formatPropType(v)).join(' or ');
        }

        return type.name;
    };

    packages.forEach((name) => {
        const pascalName = _.pascalCase(name);
        const entryPath = path.resolve(base, name, 'index.js');
        const jsonPath = path.resolve(base, name, 'package.json');
        const readmePath = path.resolve(base, name, 'README.md');

        const seedDocgen = docgen.parse(fs.readFileSync(entryPath));

        // assembles the props from composed components all the way down the chain
        const coalesced = seedDocgen;
        const stack = seedDocgen.composes || [];

        while (stack.length) {
            if (stack[0].indexOf('boundless-') !== -1) {
                // comes back like "boundless-whatever"
                const componentDocgen = docgen.parse(
                    fs.readFileSync(
                        path.resolve(base, stack[0], 'index.js')
                    )
                );

                coalesced.props = _.merge({}, coalesced.props, componentDocgen.props);

                if (componentDocgen.composes) {
                    stack.push.apply(stack, componentDocgen.composes);
                }
            }

            stack.shift();
        }

        fs.writeFileSync(readmePath, componentReadmeGenerator(
            _.merge({}, coalesced, {
                prettyName: pascalName.replace('Boundless', ''),
                typeParser: formatPropType,
            })
        ));

        mkdirp.sync(path.join(base, name, 'build'));

        const webpack = require('webpack');
        const dependencies = Object.keys(require(jsonPath).dependencies || {});
        const externals = _.merge({}, baseExternals, dependencies.reduce((map, depName) => {
            return /boundless-utils/.test(depName) || (map[depName] = {commonjs2: depName}), map;
        }, {}));

        webpack({
            entry: entryPath,
            devtool: 'inline-source-map',
            externals: externals,
            module: {
                rules: [{
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                }],
            },
            output: {
                filename: 'index.js',
                libraryTarget: 'commonjs2',
                path: path.resolve(base, name, 'build'),
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    comments: false,
                    compress: true,
                    sourceMap: true,
                }),
            ],
            target: 'node',
        }, (err) => {
            if (err) {
                return error(err);
            }

            console.log(chalk.bold.green(`Built ${name}.`));
        });
    });
});
