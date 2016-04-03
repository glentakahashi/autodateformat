preferred_syntax = :scss
http_path = '/'
css_dir = (environment == :production) ? 'dist/stylesheets': 'dev/stylesheets'
sass_dir = 'src/stylesheets'
images_dir = 'images'
javascripts_dir = (environment == :production) ? 'dist/app': 'dev/app'
relative_assets = true
line_comments = true
output_style = (environment == :production) ? :compressed : :expanded
