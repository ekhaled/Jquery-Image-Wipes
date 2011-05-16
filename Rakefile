require 'rake'
require 'rake/packagetask'

_VERSION  = "0.3"

ROOT     = File.expand_path(File.dirname(__FILE__))
SRC_DIR  = File.join(ROOT, 'src')
DIST_DIR = File.join(ROOT, 'build')
PKG_DIR  = File.join(ROOT, 'pkg')

CORE_FILES    = [
  File.join(SRC_DIR,'core.js'),
  File.join(SRC_DIR,'wipeFactory.js'),
  File.join(SRC_DIR,'basicWipes.js'),
]

EXTRA_FILES    = [
  File.join(SRC_DIR,'extendedWipes_intro.js'),
  File.join(SRC_DIR,'extendedWipes_helpers.js'),
  File.join(SRC_DIR,'extendedWipes.js'),
  File.join(SRC_DIR,'extendedWipes_outro.js'),
]

task :default => [:clean, :concat, :dist]

desc "Clean the distribution directory."
task :clean do
  rm_rf DIST_DIR
  mkdir DIST_DIR
end

def normalize_whitespace(filename)
  contents = File.readlines(filename)
  contents.each { |line| line.sub!(/\s+$/, "") }
  File.open(filename, "w") do |file|
    file.write contents.join("\n").sub(/(\n+)?\Z/m, "\n")
  end
end

desc "Strip trailing whitespace and ensure each file ends with a newline"
task :whitespace do
  Dir["src/**/*"].each do |filename|
    normalize_whitespace(filename) if File.file?(filename)
  end
end

desc "Concatenate to build a distributable files"
task :concat => :whitespace do
  File.open(File.join(DIST_DIR,'_jquery.imagewipes.js'),"w") do |f|
    f.puts CORE_FILES.map{ |s| IO.read(s) }
  end
  File.open(File.join(DIST_DIR,'_extendedWipes.js'),"w") do |f|
    f.puts EXTRA_FILES.map{ |s| IO.read(s) }
  end
end

def google_compiler(src, target)
  puts "Minifying #{src} with Google Closure Compiler..."
  `java -jar vendor/google-compiler/compiler.jar --js #{src} --summary_detail_level 3 --js_output_file #{target}`
end

def yui_compressor(src, target)
  puts "Minifying #{src} with YUI Compressor..."
  `java -jar vendor/yuicompressor/yuicompressor-2.4.2.jar #{src} -o #{target}`
end

def uglifyjs(src, target)
  begin
    require 'uglifier'
  rescue LoadError => e
    if verbose
      puts "\nYou'll need the 'uglifier' gem for minification. Just run:\n\n"
      puts "  $ gem install uglifier"
      puts "\nand you should be all set.\n\n"
      exit
    end
    return false
  end
  puts "Minifying #{src} with UglifyJS..."
  File.open(target, "w"){|f| f.puts Uglifier.new.compile(File.read(src))}
end

def process_minified(src, target)
  cp target, File.join(DIST_DIR,'temp.js')
  msize = File.size(File.join(DIST_DIR,'temp.js'))
  `gzip -9 #{File.join(DIST_DIR,'temp.js')}`

  osize = File.size(src)
  dsize = File.size(File.join(DIST_DIR,'temp.js.gz'))
  rm_rf File.join(DIST_DIR,'temp.js.gz')

  puts "Original version: %.3fk" % (osize/1024.0)
  puts "Minified: %.3fk" % (msize/1024.0)
  puts "Minified and gzipped: %.3fk, compression factor %.3f" % [dsize/1024.0, osize/dsize.to_f]
end

desc "Generates a minified version for distribution, using UglifyJS."
task :dist do
  src, target = File.join(DIST_DIR,'_jquery.imagewipes.js'), File.join(DIST_DIR,'jquery.imagewipes.js')
  uglifyjs src, target
  process_minified src, target
  rm_rf File.join(DIST_DIR,'_jquery.imagewipes.js')
  src, target = File.join(DIST_DIR,'_extendedWipes.js'), File.join(DIST_DIR,'extendedWipes.js')
  uglifyjs src, target
  process_minified src, target
  rm_rf File.join(DIST_DIR,'_extendedWipes.js')
end


Rake::PackageTask.new('Jquery_Image_Wipes', _VERSION) do |package|
  package.need_tar_gz = true
  package.need_zip = true
  package.package_dir = PKG_DIR
  package.package_files.include(
    'README',
    'MIT-LICENSE',
    'build/**/*',
    'src/**/*',
    'demo/**/*'
  )
end
