angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app.html',
    "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <a href=\"#!/\" class=\"navbar-brand\">Blockchain Demo</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li ng-class=\"{active: $root.isActive('/hash')}\">\n" +
    "                    <a href=\"#!/hash\">Hash</a>\n" +
    "                </li>\n" +
    "                <li ng-class=\"{active: $root.isActive('/block')}\">\n" +
    "                    <a href=\"#!/block\">Block</a>\n" +
    "                </li>\n" +
    "                <li ng-class=\"{active: $root.isActive('/blockchain')}\">\n" +
    "                    <a href=\"#!/blockchain\">Blockchain</a>\n" +
    "                </li>\n" +       
    "\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "<div ng-class=\"$root.$route.current.containerClass\" ng-view>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('components/block/block.html',
    "<div class=\"well well-sm\" ng-class=\"{'well-success': vm.valid, 'well-error': !vm.valid}\">\n" +
    "    <form class=\"form-horizontal\">\n" +
    "        <!-- Block number -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"block{{vm.id}}number\" class=\"col-sm-2 control-label\">Block:</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">#</span>\n" +
    "                    <input id=\"block{{vm.id}}number\"\n" +
    "                           ng-model=\"vm.number\"\n" +
    "                           ng-change=\"vm.updateBlock()\"\n" +
    "                           class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Nonce -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"block{{vm.id}}nonce\" class=\"col-sm-2 control-label\">Nonce:</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <input id=\"block{{vm.id}}nonce\"\n" +
    "                       ng-model=\"vm.nonce\"\n" +
    "                       ng-change=\"vm.updateBlock()\"\n" +
    "                       class=\"form-control\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Coinbase -->\n" +
    "        <div class=\"form-group\" ng-if=\"vm.data.coinbase\">\n" +
    "            <label class=\"col-sm-2 control-label\"><a ng-click=\"vm.showData = !vm.showData\">Coinbase:</a></label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <div class=\"input-group-addon\">€</div>\n" +
    "                    <input ng-model=\"vm.data.coinbase.value\" class=\"form-control\">\n" +
    "                    <div class=\"input-group-addon\">-&gt;</div>\n" +
    "                    <input ng-model=\"vm.data.coinbase.to\" class=\"form-control\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Transactions -->\n" +
    "        <div class=\"form-group\" ng-if=\"vm.data.txs\">\n" +
    "            <label class=\"col-sm-2 control-label\"><a ng-click=\"vm.showData = !vm.showData\">Tx:</a></label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <div class=\"input-group\" ng-repeat=\"tx in vm.data.txs track by $index\">\n" +
    "                    <div class=\"input-group-addon\">€</div>\n" +
    "                    <input ng-model=\"tx.value\" class=\"form-control\">\n" +
    "                    <div class=\"input-group-addon\">From:</div>\n" +
    "                    <input ng-model=\"tx.from\" class=\"form-control\">\n" +
    "                    <div class=\"input-group-addon\">-&gt;</div>\n" +
    "                    <input ng-model=\"tx.to\" class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Data -->\n" +
    "        <div class=\"form-group\" ng-if=\"vm.showData || (!vm.data.coinbase && !vm.data.txs)\">\n" +
    "            <label for=\"block{{vm.id}}data\" class=\"col-sm-2 control-label\">Daten:</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <textarea id=\"block{{vm.id}}data\"\n" +
    "                          rows=\"10\"\n" +
    "                          ng-model=\"vm.dataString\"\n" +
    "                          ng-trim=\"false\"\n" +
    "                          ng-change=\"vm.updateBlock()\"\n" +
    "                          class=\"form-control\">\n" +
    "                </textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Prev -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"block{{vm.id}}prev\" class=\"col-sm-2 control-label\">Vorh. Hash</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <input id=\"block{{vm.id}}prev\"\n" +
    "                       ng-model=\"vm.prev\"\n" +
    "                       ng-readonly=\"true\"\n" +
    "                       class=\"form-control\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Hash -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"block{{vm.id}}hash\" class=\"col-sm-2 control-label\">Hash:</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <input id=\"block{{vm.id}}hash\"\n" +
    "                       ng-model=\"vm.hash\"\n" +
    "                       ng-readonly=\"true\"\n" +
    "                       class=\"form-control\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"col-sm-2\"><i class=\"icon-spinner icon-spin icon-large\"></i></div>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <button data-style=\"expand-right\" class=\"btn btn-primary ladda-button\" ng-click=\"vm.mine()\">\n" +
    "                    <span class=\"ladda-label\">Mine</span>\n" +
    "                </button>\n" +
    "                <span ng-if=\"vm.mined && $root.expertMode\">{{vm.miningStats}}</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('components/chain-info/chain-info.html',
    "(height: {{vm.blocks.length}} blocks, valid: {{vm.valid}})"
  );


  $templateCache.put('components/peer-info/peer-info.html',
    "(height: {{vm.blocks.length}} blocks, valid: {{vm.valid}}, consensus: {{vm.consensus}} other peers, last block hash: {{vm.lastBlockHash}})"
  );


  $templateCache.put('index.html',
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"UTF-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "\n" +
    "  <link rel=\"icon\" href=\"favicon.ico\">\n" +
    "\n" +
    "  <!-- fonts -->\n" +
    "  <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Raleway:300,400,700\">\n" +
    "  <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.8.1/css/all.css\" integrity=\"sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf\" crossorigin=\"anonymous\">\n" +
    "\n" +
    "  <!-- bootstrap and theme -->\n" +
    "  <link rel=\"stylesheet\" href=\"libs/css/bootstrap.min.css\">\n" +
    "  <link rel=\"stylesheet\" href=\"libs/css/bootstrap-theme.min.css\">\n" +
    "  <link rel=\"stylesheet\" href=\"libs/css/bootstrap-horizon.css\">\n" +
    "  <link rel=\"stylesheet\" href=\"libs/css/ladda-themeless.min.css\">\n" +
    "  <link rel=\"stylesheet\" href=\"libs/css/ie10-viewport-bug-workaround.css\">\n" +
    "  <link rel=\"stylesheet\" href=\"app.css\">\n" +
    "\n" +
    "  <!-- Latest jQuery, Angular and Bootstrap -->\n" +
    "  <script src=\"libs/js/jquery.min.js\"></script>\n" +
    "  <script src=\"libs/js/angular.min.js\"></script>\n" +
    "  <script src=\"libs/js/angular-route.js\"></script>\n" +
    "\n" +
    "  <!-- other libraries -->\n" +
    "  <script src=\"libs/js/bootstrap.min.js\"></script>\n" +
    "  <script src=\"libs/js/spin.min.js\"></script>\n" +
    "  <script src=\"libs/js/ladda.min.js\"></script>\n" +
    "  <script src=\"libs/js/ie10-viewport-bug-workaround.js\"></script>\n" +
    "  <script src=\"libs/js/ie10-viewport-bug-workaround.js\"></script>\n" +
    "  <script src=\"libs/js/sha256.js\"></script>\n" +
    "\n" +
    "  <!-- lodash.js -->\n" +
    "  <script src=\"libs/js/lodash.js\"></script>\n" +
    "\n" +
    "  <!-- App -->\n" +
    "  <script src=\"app.js\"></script>\n" +
    "\n" +
    "  <!-- HTML templates -->\n" +
    "  <script>\n" +
    "    // don't load HTML templates from pre-compiled file in development mode\n" +
    "    if (location.hostname !== \"localhost\" && location.hostname !== \"127.0.0.1\") {\n" +
    "      document.write('<scr' + 'ipt src=\"libs/templates.js\"></sc' + 'ript>');\n" +
    "    }\n" +
    "  </script>\n" +
    "\n" +
    "  <!-- Components -->\n" +
    "  <script src=\"components/block/block.js\"></script>\n" +
    "  <script src=\"components/chain-info/chain-info.js\"></script>\n" +
    "  <script src=\"components/peer-info/peer-info.js\"></script>\n" +
    "\n" +
    "  <!-- Pages -->\n" +
    "  <script src=\"pages/intro/intro.js\"></script>\n" +
    "  <script src=\"pages/hash/hash.js\"></script>\n" +
    "  <script src=\"pages/block/block.js\"></script>\n" +
    "  <script src=\"pages/blockchain/blockchain.js\"></script>\n" +
    "  <script src=\"pages/distributed/distributed.js\"></script>\n" +
    "  <script src=\"pages/coinbase/coinbase.js\"></script>\n" +
    "  <script src=\"pages/tokens/tokens.js\"></script>\n" +
    "\n" +
    "  <title>Blockchain Demo</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "<app></app>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/argparse/node_modules/sprintf-js/demo/angular.html',
    "<!doctype html>\n" +
    "<html ng-app=\"app\">\n" +
    "<head>\n" +
    "    <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.3/angular.min.js\"></script>\n" +
    "    <script src=\"../src/sprintf.js\"></script>\n" +
    "    <script src=\"../src/angular-sprintf.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "    <pre>{{ \"%+010d\"|sprintf:-123 }}</pre>\n" +
    "    <pre>{{ \"%+010d\"|vsprintf:[-123] }}</pre>\n" +
    "    <pre>{{ \"%+010d\"|fmt:-123 }}</pre>\n" +
    "    <pre>{{ \"%+010d\"|vfmt:[-123] }}</pre>\n" +
    "    <pre>{{ \"I've got %2$d apples and %1$d oranges.\"|fmt:4:2 }}</pre>\n" +
    "    <pre>{{ \"I've got %(apples)d apples and %(oranges)d oranges.\"|fmt:{apples: 2, oranges: 4} }}</pre>\n" +
    "\n" +
    "    <script>\n" +
    "        angular.module(\"app\", [\"sprintf\"])\n" +
    "    </script>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/expected/usemin.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "\n" +
    "    <script src=\"usemin/all.js\"></script>\n" +
    "\n" +
    "    <script src=\"duplicate/usemin/all.js\"></script>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"usemin/bar.css\">\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/expected/useminUgly.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "\n" +
    "    <script src=\"useminUgly/all.js\"></script>\n" +
    "\n" +
    "    <script src=\"duplicate/useminUgly/all.js\"></script>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"useminUgly/bar.css\">\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/empty.html',
    ""
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/html5.html',
    "<div>\n" +
    "    <span>\n" +
    "        Self-closing, sucka!\n" +
    "        <br>\n" +
    "        <img src='path/to/img'> Howdy\n" +
    "</div>\n" +
    "\n" +
    "<hr>\n" +
    "\n" +
    "<table>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            Howdy\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/linebreak.html',
    "<textarea placeholder=\"This is a carriage return.\r" +
    "\n" +
    "Also also a newline.\"></textarea>"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/one.html',
    "<h1>One</h1>\n" +
    "\n" +
    "<p class=\"\">I am one.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/regexp.html',
    "<h1>Regexp</h1>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  var reg = new RegExp(/^(((\\+[1-9][0-9])|(00[1-9][0-9]))[0-9]{7,11})|((((01|02|03|04|05|07|08)[0-9])|(06[1-9]))[0-9]{7})$/)\n" +
    "  var reg2 = new RegExp(/^\\+-\\\\--\\|)$/)\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/three/three_two.html',
    "<h2>Three Two</h2>\n" +
    "\n" +
    "<!-- Comment for three two -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are three two.</textarea>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/three/three.html',
    "<h2>Three</h2>\n" +
    "\n" +
    "<!-- Comment for three -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are three.</textarea>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/two/two.html',
    "<h2>Two</h2>\n" +
    "\n" +
    "<!-- Comment for two -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are two.</textarea>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/undefined.html',
    "<h1>Undefined</h1>\n" +
    "\n" +
    "<p class=\"\">I am undefined.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/level2/empty.html',
    ""
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/level2/html5.html',
    "<div>\n" +
    "    <span>\n" +
    "        Self-closing, sucka!\n" +
    "        <br>\n" +
    "        <img src='path/to/img'> Howdy\n" +
    "</div>\n" +
    "\n" +
    "<hr>\n" +
    "\n" +
    "<table>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            Howdy\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/level2/level3/one.html',
    "<h1>One</h1>\n" +
    "\n" +
    "<p class=\"\">I am one.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/undefined.html',
    "<h1>Undefined</h1>\n" +
    "\n" +
    "<p class=\"\">I am undefined.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/usemin.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <!-- build:js usemin/foo.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/bar.js -->\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js duplicate/usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:css usemin/bar.css -->\n" +
    "    <script src=\"usemin/bar.css\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/usemin.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <!-- build:js usemin/foo.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/bar.js -->\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js duplicate/usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:css usemin/bar.css -->\n" +
    "    <script src=\"usemin/bar.css\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/useminUgly.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <!-- build:js useminUgly/foo.js -->\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js useminUgly/bar.js -->\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js useminUgly/all.js -->\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js duplicate/useminUgly/all.js -->\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:css useminUgly/bar.css -->\n" +
    "    <script src=\"useminUgly/bar.css\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/uglify-js/tools/props.html',
    "<html>\n" +
    "  <head>\n" +
    "  </head>\n" +
    "  <body>\n" +
    "    <script>(function(){\n" +
    "      var props = {};\n" +
    "\n" +
    "      function addObject(obj) {\n" +
    "        if (obj == null) return;\n" +
    "        try {\n" +
    "          Object.getOwnPropertyNames(obj).forEach(add);\n" +
    "        } catch(ex) {}\n" +
    "        if (obj.prototype) {\n" +
    "          Object.getOwnPropertyNames(obj.prototype).forEach(add);\n" +
    "        }\n" +
    "        if (typeof obj == \"function\") {\n" +
    "          try {\n" +
    "            Object.getOwnPropertyNames(new obj).forEach(add);\n" +
    "          } catch(ex) {}\n" +
    "        }\n" +
    "      }\n" +
    "\n" +
    "      function add(name) {\n" +
    "        props[name] = true;\n" +
    "      }\n" +
    "\n" +
    "      Object.getOwnPropertyNames(window).forEach(function(thing){\n" +
    "        addObject(window[thing]);\n" +
    "      });\n" +
    "\n" +
    "      try {\n" +
    "        addObject(new Event(\"click\"));\n" +
    "        addObject(new Event(\"contextmenu\"));\n" +
    "        addObject(new Event(\"mouseup\"));\n" +
    "        addObject(new Event(\"mousedown\"));\n" +
    "        addObject(new Event(\"keydown\"));\n" +
    "        addObject(new Event(\"keypress\"));\n" +
    "        addObject(new Event(\"keyup\"));\n" +
    "      } catch(ex) {}\n" +
    "\n" +
    "      var ta = document.createElement(\"textarea\");\n" +
    "      ta.style.width = \"100%\";\n" +
    "      ta.style.height = \"20em\";\n" +
    "      ta.style.boxSizing = \"border-box\";\n" +
    "      <!-- ta.value = Object.keys(props).sort(cmp).map(function(name){ -->\n" +
    "      <!--   return JSON.stringify(name); -->\n" +
    "      <!-- }).join(\",\\n\"); -->\n" +
    "      ta.value = JSON.stringify({\n" +
    "        vars: [],\n" +
    "        props: Object.keys(props).sort(cmp)\n" +
    "      }, null, 2);\n" +
    "      document.body.appendChild(ta);\n" +
    "\n" +
    "      function cmp(a, b) {\n" +
    "        a = a.toLowerCase();\n" +
    "        b = b.toLowerCase();\n" +
    "        return a < b ? -1 : a > b ? 1 : 0;\n" +
    "      }\n" +
    "    })();</script>\n" +
    "  </body>\n" +
    "</html>\n"
  );


  $templateCache.put('pages/block/block.html',
    "<h1>Block</h1>\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <h4 class=\"panel-title\">\n" +
    "            <a ng-click=\"vm.showExplanation = !vm.showExplanation\">Erklärung</a>\n" +
    "        </h4>\n" +
    "    </div>\n" +
    "    <div class=\"panel-collapse collapse\" ng-class=\"{in: vm.showExplanation}\">\n" +
    "        <div class=\"panel-body\">\n" +
    "            Ein Block ist die kleinste Einheit einer Blockchain.<br/><br/>\n" +
    "            Für unser Beispiel besteht er aus nur 5 Elementen:\n" +
    "            <ul>\n" +
    "                <li>\n" +
    "                    <strong>Blocknummer:</strong> Die Nummer des Blocks in der Kette. Ganze Zahl, \ndie bei 1 beginnt und für jeden neuen Block um eins erhöht wird.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <strong>Nonce:</strong> Eine Zahl, die verwendet wird, um einen Block gültig zu machen.\n" +
    "                     Ihr einziger Zweck ist es, so lange angepasst zu werden, bis der Hash des gesamten Blocks bestimmte Eigenschaften aufweist, die ihn \"gültig\" machen.\n" +
    "                </li>\n" +
    "                <li><strong>Daten:</strong> Die eigentlichen Daten des Blocks (z.B. Verkaufsinformationen)</li>\n" +
    "                <li><strong>Der Hash des vorherigen Blocks:</strong> Für den ersten Block etwas Zufälliges, wie 00000\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <strong>Hash:</strong> Der Hash des aktuellen Blocks\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            Ein Block wird als gültig angesehen, wenn sein Hash eine bestimmte Form hat. Für unser Beispiel wollen wir, dass der Hash mit einer bestimmten Anzahl von Nullen beginnt. \nKlicke auf Mine um den Block in die Kette zu schreiben. Diese Vorgang dauert ein paar Sekunden, da er rechenintensiv ist.<br/>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<block number=\"vm.block.number\"\n" +
    "       nonce=\"vm.block.nonce\"\n" +
    "       prev=\"vm.block.prev\"\n" +
    "       data=\"vm.block.data\">\n" +
    "</block>"
  );


  $templateCache.put('pages/blockchain/blockchain.html',
    "<h1>Blockchain\n" +
    "    <chain-info ng-if=\"$root.expertMode\" blocks=\"vm.blocks\"></chain-info>\n" +
    "</h1>\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <h4 class=\"panel-title\">\n" +
    "            <a ng-click=\"vm.showExplanation = !vm.showExplanation\">Erklärung</a>\n" +
    "        </h4>\n" +
    "    </div>\n" +
    "    <div class=\"panel-collapse collapse\" ng-class=\"{in: vm.showExplanation}\">\n" +
    "        <div class=\"panel-body\">\n" +
    "            Jetzt können wir Blocks aneinanderketten.<br/>\n" +
    "            Jeder Block (außer der ersten) hat einen Hash des Vorgängers im jeweiligen Feld.<br/><br/>\n" +
    "            Wenn du nun nachträglich einen Block änderst, wird er ungültig und die ganze Kette wird ungültig.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row row-horizon\">\n" +
    "    <div class=\"col-xs-7 col-lg-5\" ng-repeat=\"block in vm.blocks\">\n" +
    "        <block number=\"block.number\"\n" +
    "               nonce=\"block.nonce\"\n" +
    "               data=\"block.data\"\n" +
    "               hash=\"block.hash\"\n" +
    "               valid=\"block.valid\"\n" +
    "               prev=\"!block.prev ? vm.blocks[$index-1].hash : block.prev\">\n" +
    "        </block>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('pages/coinbase/coinbase.html',
    "<h1>Coinbase Transactions</h1>\n" +
    "<div ng-repeat=\"peer in vm.peers\">\n" +
    "    <h3>{{peer.name}}\n" +
    "        <peer-info ng-if=\"$root.expertMode\" peers=\"vm.peers\" peer-index=\"$index\"></peer-info>\n" +
    "    </h3>\n" +
    "    <div class=\"row row-horizon\">\n" +
    "        <div class=\"col-xs-7\" ng-repeat=\"block in peer.blocks\">\n" +
    "            <block number=\"block.number\"\n" +
    "                   nonce=\"block.nonce\"\n" +
    "                   data=\"block.data\"\n" +
    "                   hash=\"block.hash\"\n" +
    "                   valid=\"block.valid\"\n" +
    "                   prev=\"!block.prev ? peer.blocks[$index-1].hash : block.prev\">\n" +
    "            </block>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('pages/distributed/distributed.html',
    "<h1>Distributed Blockchain</h1>\n" +
    "<div ng-repeat=\"peer in vm.peers\">\n" +
    "    <h3>{{peer.name}}\n" +
    "        <peer-info ng-if=\"$root.expertMode\" peers=\"vm.peers\" peer-index=\"$index\"></peer-info>\n" +
    "    </h3>\n" +
    "    <div class=\"row row-horizon\">\n" +
    "        <div class=\"col-xs-7 col-lg-5\" ng-repeat=\"block in peer.blocks\">\n" +
    "            <block number=\"block.number\"\n" +
    "                   nonce=\"block.nonce\"\n" +
    "                   data=\"block.data\"\n" +
    "                   hash=\"block.hash\"\n" +
    "                   valid=\"block.valid\"\n" +
    "                   prev=\"!block.prev ? peer.blocks[$index-1].hash : block.prev\">\n" +
    "            </block>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('pages/hash/hash.html',
    "<h1>SHA256 Hash</h1>\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <h4 class=\"panel-title\">\n" +
    "            <a ng-click=\"vm.showExplanation = !vm.showExplanation\">Erklärung</a>\n" +
    "        </h4>\n" +
    "    </div>\n" +
    "    <div class=\"panel-collapse collapse\" ng-class=\"{in: vm.showExplanation}\">\n" +
    "        <div class=\"panel-body\">\n" +
    "            Von <a href=\"https://www.bitpanda.com/academy/de/lektionen/was-ist-eine-hash-funktion-in-einer-blockchain-transaktion\">Bitpanda</a>:\n" +
    "            Kryptographische Hash-Funktionen generieren aus Datensätzen beliebiger Länge eine Zeichenfolge mit fester Länge. Ein Datensatz kann durch ein Wort, einen Satz, einen längeren Text oder eine ganze Datei gebildet werden. Ein Hash macht Folgendes:\n" +
    "            <ul>\n" +
    "                <li>Eine kryptographische Hash-Funktion wird zu Sicherheitszwecken verwendet und bildet sozusagen den Kern der kryptographischen Sicherheit.</li>\n" +
    "                <li>Eine Hash-Funktion wandelt eine beliebige Eingabe von Daten (“keys”) in eine Folge von Bytes mit fester Länge und Struktur (“Hash-Wert”) um.</li>\n" +
    "                <li>Der Hash einer Transaktion erleichtert die Identifikation von Transaktionen in der Blockchain.</li>\n" +
    "            </ul>\n" +
    "            In diesem Beispiel nutzen wir SHA256 (Secure Hash Algorithm 2, 256 bit), der Hash, der auch im Bitcoin-Netzwerk verwendet wird. Tippe ein beliebiges Wort oder mehrere Worte ein (die Daten) und schaue, wie sich der Hash verändert.<br/>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"well\">\n" +
    "    <form class=\"form-horizontal\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"data\" class=\"col-sm-2 control-label\">Input:</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <textarea id=\"data\"\n" +
    "                          rows=\"10\"\n" +
    "                          ng-model=\"vm.data\"\n" +
    "                          ng-change=\"vm.hash = $root.sha256(vm.data)\"\n" +
    "                          class=\"form-control\">\n" +
    "                </textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"hash\" class=\"col-sm-2 control-label\">Hash:</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <input id=\"hash\"\n" +
    "                       ng-readonly=\"true\"\n" +
    "                       ng-model=\"vm.hash\"\n" +
    "                       class=\"form-control\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('pages/intro/intro.html',
    "<h1>Blockchain Demo</h1>\n" +
    "\n" +
    "A web-based demonstration of blockchain concepts.<br/><br/>\n" +
    "This is a complete rewrite of <a href=\"https://github.com/anders94/blockchain-demo\">Anders Brownworth's\n" +
    "  Blockchain Demo</a> with lots of additional features.<br/>\n" +
    "Basically only the idea shown in his <a href=\"https://www.youtube.com/watch?v=_160oMzblY8\">excellent Demo\n" +
    "  Video</a> remains, the code is completely different.\n" +
    "<br/><br/>\n" +
    "\n" +
    "If you are looking for the cryptographic tools that were found behind the\n" +
    "&quot;Advanced&quot; menu, <a href=\"https://guggero.github.io/cryptography-toolkit\">they have been moved\n" +
    "  to their own project]</a>.\n" +
    "<br/><br/>\n" +
    "\n" +
    "Changes in detail:\n" +
    "<ul>\n" +
    "  <li>Static HTML/JS, so it can be served with GitHub Pages</li>\n" +
    "  <li>Use AngularJS for rendering the page</li>\n" +
    "  <li>Add explanations to most pages</li>\n" +
    "  <li>Expert Mode that shows many details</li>\n" +
    "  <li>Show/implement concept of mining difficulty (in Expert Mode)</li>\n" +
    "  <li>Show duration and speed of mining process (in Expert Mode)</li>\n" +
    "  <li>Toggle between TX/Coinbase and Data view</li>\n" +
    "</ul>\n" +
    "\n" +
    "<p class=\"pull-right\">\n" +
    "  by <a href=\"https://github.com/guggero\">Oliver Gugger</a><br>\n" +
    "  BTC tip address: bc1qfgua5vhwm6myajak9p4crhwmwm2k6mczf789eh<br/><br/>\n" +
    "  original idea by <a href=\"http://andersbrownworth.com/\">Anders Brownworth </a><br/>\n" +
    "  BTC: 1K3NvcuZzVTueHW1qhkG2Cm3viRkh2EXJp<br/>\n" +
    "  ETH: 0x84a90e21d9d02e30ddcea56d618aa75ba90331ff\n" +
    "</p>\n"
  );


  $templateCache.put('pages/tokens/tokens.html',
    "<h1>Tokens</h1>\n" +
    "<div ng-repeat=\"peer in vm.peers\">\n" +
    "    <h3>{{peer.name}}\n" +
    "        <peer-info ng-if=\"$root.expertMode\" peers=\"vm.peers\" peer-index=\"$index\"></peer-info>\n" +
    "    </h3>\n" +
    "    <div class=\"row row-horizon\">\n" +
    "        <div class=\"col-xs-7\" ng-repeat=\"block in peer.blocks\">\n" +
    "            <block number=\"block.number\"\n" +
    "                   nonce=\"block.nonce\"\n" +
    "                   data=\"block.data\"\n" +
    "                   hash=\"block.hash\"\n" +
    "                   valid=\"block.valid\"\n" +
    "                   prev=\"!block.prev ? peer.blocks[$index-1].hash : block.prev\">\n" +
    "            </block>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
