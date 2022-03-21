// ==UserScript==
// @name         Blokovanie trollov na aktuality.sk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       StarshipTrooper
// @match        https://www.aktuality.sk/diskusia/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aktuality.sk
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var trolls = [
        'Brauch_keine_Frau_nur_Vaselin',
        'Kolt a Meirová',
        'Kolt_a_Meirová_02'
    ];


    var trollsQuoted = trolls.map(name => '"'+name+'"');
    var trollsCondition = trollsQuoted.join(' or .=');
    function _x(STR_XPATH) {
        var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
        var xnodes = [];
        var xres;
        while (xres = xresult.iterateNext()) {
            xnodes.push(xres);
        }
        return xnodes;
    }

    window.jQuery(_x('//*[contains(@class,"d-comment-wrapper") and .//*[contains(@class,"username") and (.=' + trollsCondition + ')]]')).find(("span.d-dislike" )).click();
    window.jQuery(_x('//*[contains(@class,"d-comment-wrapper") and .//*[contains(@class,"username") and (.=' + trollsCondition + ')]]')).hide();

})();
