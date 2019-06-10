/* global cordova device */
"use strict";

import m from "mithril";
import particleModel from "./particleModel.js";

var localStorageWeb;
var fileNameAndroid = "particle.json";

localStorageWeb = window.localStorage;

function onErrorLoadFs(e) {
    console.log('Got error on load file: ', e);
}

function onErrorCreateFile(e) {
    console.log('Got error on create file: ', e);
}
function onErrorReadFile(e) {
    console.log('Got error on read file: ', e);
}

function loadFile(fileEntry) {
    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function () {
            particleModel.cachedParticles = JSON.parse(this.result);
            m.redraw();
        };
        reader.readAsText(file);
    }, onErrorReadFile);
}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry.
    fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {
            console.log("Successful file write...");
        };
        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };
        fileWriter.write(JSON.stringify(dataObj));
    });
}

function createFile(dirEntry, fileName, isAppend, dataObj) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
        writeFile(fileEntry, dataObj, isAppend);
    }, onErrorCreateFile);
}

function writeDataAndroid(fileName, dataObj) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function (dirEntry) {
        createFile(dirEntry, fileName, false, dataObj);
        console.log('file system open: ', dirEntry);
    }, onErrorLoadFs);
}

function writeDataBrowser(dataObj) {
    localStorageWeb.setItem('particles', JSON.stringify(dataObj));
}

function getDataAndroid() {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory + fileNameAndroid, function (dirEntry) { // eslint-disable-line max-len
        loadFile(dirEntry);
        console.log('file system open read: ', dirEntry);
    }, onErrorLoadFs);
}

function getDataBrowser() {
    if (JSON.parse(localStorageWeb.getItem('particles'))) {
        particleModel.cachedParticles = JSON.parse(localStorageWeb.getItem('particles'));
    } else {
        console.log('Nothing in cache to load!');
    }
}


function writeData(dataObj) {
    var isAndroid = (device.platform === "Android");

    if (isAndroid) {
        writeDataAndroid(fileNameAndroid, dataObj);
    } else {
        writeDataBrowser(dataObj);
    }
}

function loadData() {
    var isAndroid = (device.platform === "Android");

    if (isAndroid) {
        getDataAndroid();
    } else {
        getDataBrowser();
    }
}


let cacheModel = {
    write: (dataObj) => {
        writeData(dataObj);
    },
    load: () => {
        loadData();
    }

};

export default cacheModel;
