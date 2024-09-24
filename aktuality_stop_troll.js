//
// Cieľom trolla je provokovať iných používateľov. To najlepšie, čo môžete urobiť, že na jeho komentáre nebudete reagovať.
//
// ==UserScript==
// @name         Blokovanie trollov na aktuality.sk
// @namespace    http://tampermonkey.net/
// @version      0.33
// @description  try to take over the world!
// @author       StarshipTrooper
// @match        https://www.aktuality.sk/diskusia/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aktuality.sk
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

/* global $ */

(function() {
	'use strict';
	var troll_messages = [];
	var button_css = `
		background-color:#cf2f32;
		border:none;border-radius:4px;
		font-size:12px;
		font-weight:400;
		box-shadow:0 16px 20px rgba(0,0,0,.1);
		color:#fff;
		cursor:pointer;
		display:inline-block;
		line-height:20px;
		padding:5px 10px;
		height:30px;
		margin-left: 10px;
	`;
	if ($("#account-login-dropdown .account-title-wrapper #account-button-title").text() != "Prihlásiť") {
		$.each($("div.d-comment-wrapper"), function() {
			var message_id = $(this).attr("data-comment-id");
			var user_id = $(this).attr("data-azet_user_id");
			$(this).parent().attr("data-comm_id",message_id);
			$(this).parent().attr("data-user_id",user_id);
			// ban/unban button
			if (localStorage.getItem("ban_user_"+user_id) === null) {
				$(this).find("div.d-buttons").append(`<span style="`+button_css+`" class="ban" onclick="javascript:localStorage.setItem('ban_user_`+user_id+`',1);location.reload();">BAN</span>`);
			} else {
				troll_messages.push(message_id);
				$(this).find("div.user-img-wrapper").html(`<span style="font-size:30px;">&#129484;</span>`);
				$(this).find("div.user-img-wrapper").css({"width":"52px","text-align":"center"});
				$(this).find("div.d-buttons").append(`<span style="`+button_css+`" onclick="javascript:localStorage.removeItem('ban_user_`+user_id+`');location.reload();">UNBAN</span>`);
				$(this).find("div.d-buttons").append(`<span style="`+button_css+`" onclick="javascript:$(this).parent().parent().parent().parent().find('div.d-body').toggle();">&#128065;</span>`);
				$(this).css({"background":"#fcfcfa","margin-bottom":"2px"});
				$(this).find("div.d-body").css("color","#877");
				$(this).find("div.d-body").hide();
			}
		});
		$.each(troll_messages, function(index,value) {
			var element = $("div.d-anchor-wrapper[data-comm_id='"+value+"']");
			setTimeout(
				function() {
					var disliked_messages = JSON.parse(localStorage.getItem("disliked_messages") || "[]");
					var msg_idx = disliked_messages.indexOf(value);
					if (msg_idx === -1) {
						disliked_messages.push(value);
						if (disliked_messages.length > 500) {
							disliked_messages.shift();
						}
						localStorage.setItem("disliked_messages", JSON.stringify(disliked_messages));
						element.find("span.d-dislike").click();
						element.find("span.d-dislike").css("color","#822");
					}
					element.find("span.d-dislike").css("background","#ff8");
				},
				(index*800)
			);
		});
	} else {
        console.log("Neprihlásený");
    }
})();
