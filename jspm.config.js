System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  paths: {},
  packages: {
    "app": {
      "main": "main.js",
      "defaultExtension": "js"
    },
    "rxjs": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/common": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/compiler": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/core": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/forms": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/http": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser-dynamic": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/router": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "reflect-metadata":{
        "main":"Reflect.js",
        "defaultExtension": "js"
    }
  },

  map: {
    "@angular": "node_modules/@angular",
    "rxjs": "node_modules/rxjs",
    "reflect-metadata":"node_modules/reflect-metadata"
  }
});