var myArgs = require('optimist')
  .usage('Usage: $0 path/to/files --templates=path/to/templates --output=path/to/output/folder')
  .demand(1)
  .argv;

var filePath = myArgs._[0];
var setup = require('./lib/default-setup');

// Doc rendering
var docRendererFactory = require('../lib/doc-renderer');
var renderDoc = docRendererFactory(myArgs.templates, myArgs.output);

// Extra data
var git = {
  // TODO: Get this from somewhere
  tag: "v1.2.6-build.1989+sha.b0474cb"
};

// Main work
console.log('Reading files from ', filePath);
setup.readFiles(filePath).then(function(docs) {
  console.log('Read', docs.length, 'docs');
  docs = setup.processDocs(docs);
  docs.forEach(function(doc) {
    var renderedFilePath = renderDoc({ doc: doc, git: git});
    console.log('Rendered doc', renderedFilePath);
  });
}).done();