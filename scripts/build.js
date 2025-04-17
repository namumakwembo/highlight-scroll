buildPlugin({
  entryPoints: ['builds/cdn.js'],
  outfile: 'dist/highlight-scroll.min.js',
})

buildPlugin({
  entryPoints: ['builds/module.js'],
  outfile: 'dist/highlight-scroll.esm.js',
  platform: 'neutral',
  mainFields: ['main', 'module'],
})

buildPlugin({
  entryPoints: ['builds/module.js'],
  outfile: 'dist/highlight-scroll.cjs.js',
  format: 'cjs',
  platform: 'node',
});


function buildPlugin(buildOptions) {
  return require('esbuild').buildSync({
    ...buildOptions,
    minify: true,
    bundle: true,
  })
}
