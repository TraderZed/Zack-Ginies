/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/// IE8 ployfill for GetComputed Style (for Responsive Script below)
window.getComputedStyle||(window.getComputedStyle=function(e,t){this.el=e;this.getPropertyValue=function(t){var n=/(\-([a-z]){1})/g;t=="float"&&(t="styleFloat");n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()}));return e.currentStyle[t]?e.currentStyle[t]:null};return this});$(document).ready(function(){$(document).scrollTop(0);var e,t={settings:{prevBtn:$("#likes .btn_prev"),nextBtn:$("#likes .btn_next"),video:$("#likes video"),currPanel:0,numPanels:$(".like").length,canAdvance:!1,canRegress:!1,panelWidth:0,verbage:["Biking","Pok&eacute;mon","Drag Queens","Bad Girls Club","Bingo","Video Games","Working Out"],videos:["biking","pokemon","dragqueens","badgirlsclub","bingo","videogames","workingout"]},init:function(){function r(e){var t=e.length,n,r,i;if(t===0)return!1;while(--t){n=Math.floor(Math.random()*(t+1));r=e[t];i=e[n];e[t]=i;e[n]=r}}e=this.settings;if(e.currPanel<e.verbage.length){e.nextBtn.addClass("active");e.canAdvance=!0}var t=new Array;for(var n=0;n<e.verbage.length;n++)t.push(n);r(t);var i=new Array;for(n=0;n<t.length;n++)i.push(e.verbage[t[n]]);e.verbage=new Array;e.verbage=i.slice(0);i=new Array;for(n=0;n<t.length;n++)i.push(e.videos[t[n]]);e.videos=new Array;e.videos=i.slice(0);console.log(e.videos);console.log(e.verbage);console.log(e.video[0]);console.log(e.currPanel);$("#likes h2 span").html(e.verbage[e.currPanel]);e.video[0].src="assets/videos/"+e.videos[e.currPanel]+".mp4";e.video[0].load();e.video[0].play();this.bindUIActions();this.setupPanels()},bindUIActions:function(){e.nextBtn.on("click",function(){t.nextPanel()});e.prevBtn.on("click",function(){t.prevPanel()})},setupPanels:function(){},prevPanel:function(){},nextPanel:function(){if(e.canAdvance==1){e.currPanel++;e.video.fadeOut("slow",function(){e.video[0].src="assets/videos/"+e.videos[e.currPanel]+".mp4";e.video[0].load();e.video[0].play();e.video.fadeIn("slow")});$("#likes h2 span").hide("slide",function(){$("#likes h2 span").html(e.verbage[e.currPanel]);$("#likes h2 span").show("slide",{direction:"right"})});if(e.currPanel>=e.videos.length-1){e.nextBtn.removeClass("active");e.canAdvance=!1}}}},n,r={settings:{prevBtn:$("#work .btn_prev"),nextBtn:$("#work .btn_next"),currPanel:1,numPanels:$(".work_item").length,canAdvance:!1,canRegress:!1,panelWidth:0},init:function(){n=this.settings;if(n.currPanel<n.numPanels){n.nextBtn.addClass("active");n.canAdvance=!0}this.bindUIActions();this.setupPanels()},bindUIActions:function(){n.nextBtn.on("click",function(){r.nextPanel()});n.prevBtn.on("click",function(){r.prevPanel()});$(window).on("resize",function(){r.setupPanels()})},setupPanels:function(){n.panelWidth=$(window).width();$("#work .wrapper").width(n.numPanels*n.panelWidth);$(".work_item").width(n.panelWidth-300);$("#work .wrapper").css("right",(n.currPanel-1)*n.panelWidth)},prevPanel:function(){n.canRegress==1&&$("#work .wrapper").animate({right:"-="+n.panelWidth},function(){n.currPanel--;n.canAdvance=!0;n.nextBtn.addClass("active");if(n.currPanel==1){n.prevBtn.removeClass("active");n.canRegress=!1}})},nextPanel:function(){n.canAdvance==1&&$("#work .wrapper").animate({right:"+="+n.panelWidth},function(){n.currPanel++;n.canRegress=!0;n.prevBtn.addClass("active");if(n.currPanel>=n.numPanels){n.nextBtn.removeClass("active");n.canAdvance=!1}})}},i=$(window).width();i<481;i>481;if(i>=768){$("#likes").height(parseInt($(window).height()-$("header").outerHeight()));$("#work").height($(window).height());t.init();r.init()}i>1030});(function(e){function c(){n.setAttribute("content",s);o=!0}function h(){n.setAttribute("content",i);o=!1}function p(t){l=t.accelerationIncludingGravity;u=Math.abs(l.x);a=Math.abs(l.y);f=Math.abs(l.z);!e.orientation&&(u>7||(f>6&&a<8||f<8&&a>6)&&u>5)?o&&h():o||c()}if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1))return;var t=e.document;if(!t.querySelector)return;var n=t.querySelector("meta[name=viewport]"),r=n&&n.getAttribute("content"),i=r+",maximum-scale=1",s=r+",maximum-scale=10",o=!0,u,a,f,l;if(!n)return;e.addEventListener("orientationchange",c,!1);e.addEventListener("devicemotion",p,!1)})(this);