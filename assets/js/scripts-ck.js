/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/// IE8 ployfill for GetComputed Style (for Responsive Script below)
window.getComputedStyle||(window.getComputedStyle=function(e,t){this.el=e;this.getPropertyValue=function(t){var n=/(\-([a-z]){1})/g;t=="float"&&(t="styleFloat");n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()}));return e.currentStyle[t]?e.currentStyle[t]:null};return this});$(document).ready(function(){var e,t={settings:{prevBtn:$("#work .btn_prev"),nextBtn:$("#work .btn_next"),currPanel:1,numPanels:$(".work_item").length,canAdvance:!1,canRegress:!1,panelWidth:0},init:function(){e=this.settings;if(e.currPanel<e.numPanels){e.nextBtn.addClass("active");e.canAdvance=!0}this.bindUIActions();this.setupPanels()},bindUIActions:function(){e.nextBtn.on("click",function(){t.nextPanel()});e.prevBtn.on("click",function(){t.prevPanel()});$(window).on("resize",function(){t.setupPanels()})},setupPanels:function(){e.panelWidth=$(window).width();$("#work .wrapper").width(e.numPanels*e.panelWidth);$(".work_item").width(e.panelWidth-300);$("#work .wrapper").css("right",(e.currPanel-1)*e.panelWidth)},prevPanel:function(){e.canRegress==1&&$("#work .wrapper").animate({right:"-="+e.panelWidth},function(){e.currPanel--;e.canAdvance=!0;e.nextBtn.addClass("active");if(e.currPanel==1){e.prevBtn.removeClass("active");e.canRegress=!1}})},nextPanel:function(){e.canAdvance==1&&$("#work .wrapper").animate({right:"+="+e.panelWidth},function(){e.currPanel++;e.canRegress=!0;e.prevBtn.addClass("active");if(e.currPanel>=e.numPanels){e.nextBtn.removeClass("active");e.canAdvance=!1}})}},n=$(window).width();n<481;n>481;if(n>=768){$("#likes_wrapper").height(parseInt($(window).height()-$("header").outerHeight()));$("#work").height($(window).height());t.init()}n>1030});(function(e){function c(){n.setAttribute("content",s);o=!0}function h(){n.setAttribute("content",i);o=!1}function p(t){l=t.accelerationIncludingGravity;u=Math.abs(l.x);a=Math.abs(l.y);f=Math.abs(l.z);!e.orientation&&(u>7||(f>6&&a<8||f<8&&a>6)&&u>5)?o&&h():o||c()}if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1))return;var t=e.document;if(!t.querySelector)return;var n=t.querySelector("meta[name=viewport]"),r=n&&n.getAttribute("content"),i=r+",maximum-scale=1",s=r+",maximum-scale=10",o=!0,u,a,f,l;if(!n)return;e.addEventListener("orientationchange",c,!1);e.addEventListener("devicemotion",p,!1)})(this);