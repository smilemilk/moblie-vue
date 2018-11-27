module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import',
      { libraryName: 'wm', libraryDirectory: 'es', style: true },
      'wm'
    ]
  ]
};
