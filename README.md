# Gulp + Webpack example for sass and javascript

Includes VueJs-loader for single-file components and works well with Laravel Elixir php helper: 

`{{ elixir('app.css') }}`

## Compiles & Bundles

- sass to css
- ES6 to ES5 with babel

## Includes

- vuejs with component loader
- eslint (works with vue components and babel)
- sourcemaps
- versioning (cache-busting)
- notifications
- node env detection

## Usage

`gulp` will compile assets into the `public` directory

`gulp watch` will watch for the file changes

`gulp --production` will minify js and css, no notifications will be displayed nor sourcemaps generated

## Todo

- ~~How the hell do we get javascript syntax errors checked ???~~