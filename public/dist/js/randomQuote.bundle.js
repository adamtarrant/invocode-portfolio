!function(t){var e={};function n(o){if(e[o])return e[o].exports;var u=e[o]={i:o,l:!1,exports:{}};return t[o].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}({26:function(t,e){},7:function(t,e,n){"use strict";var o,u,i=n(26);(o=i)&&o.__esModule;function r(t){"false"==t&&($("#quote").animate({opacity:0},100),$("#quote-author").animate({opacity:0},100),$("#text").text("Loading..."),$("#quote").animate({opacity:1},1e3)),fetch("/randomquote/newquote").then(function(t){return t.json()}).then(function(t){$("#quote").animate({opacity:0},100),setTimeout(function(){$("#text").html(t.quote),""==t.author?$("#quote-author").html("<i>Anon</i>"):$("#quote-author").html("<i>"+t.author+"</i>"),$("#tweet-link").attr("href","https://twitter.com/intent/tweet?hashtags=quotes&text="+encodeURIComponent(t.quote+" -"+t.author))},1e3),setTimeout(function(){$("#quote").animate({opacity:1},2e3),$("#quote-author").animate({opacity:1},2e3)},1e3)})}function a(t){var e=["YlGn","Purples","OrRd","YlGnBu","GnBu","Oranges","BuGn","PuBuGn","PuBu","Blues","PiYG","PuOr","YlOrRd","Greens","RdBu","YlOrBr","PuRd"],n=["#00AF56","#AD4FE1","#F86B4D","#32A087","#35AA78","#F58F00","#00A36E","#027399","#533FE6","#204C85","#9D1B70","#D54141","#E97B00","#24B42D","#6C3A70","#AC4702","#C11A55"];if("true"==t){var o=Math.floor(Math.random()*e.length);u=o}else o=u;var i=Trianglify({height:document.documentElement.clientHeight,width:window.innerWidth,x_colors:e[o],cell_size:40});$("canvas").length?document.body.appendChild(i.canvas(document.querySelector("canvas"))):document.body.appendChild(i.canvas()),$("body").animate({color:n[o]},500),$(".button").animate({"background-color":n[o]},500)}$(document).ready(function(){r(),a("true"),$("#get-quote").on("click",function(t){r("false")}),$("#get-quote").on("click",function(t){a("true")}),$(window).resize(function(){clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){a()},200)})})}});