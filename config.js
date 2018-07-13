module.exports = {
  mongoose: {
    server : 'localhost',
    db     : 'lingvoric'
  },
  rootVideoDir: process.cwd() + '/../PUBLIC/video-data/',
  reCaptchaUrl: 'https://www.google.com/recaptcha/api/siteverify',
  gulp: {
    src: {
      pug           : 'views/*.pug', 
      js            : 'scripts/frontend/*.js',   
      stylesCompile : 'scss/styles/*.scss',
      stylesWatch   : 'scss/*/*.scss'
    },
    build: 'dist/'
  }
};