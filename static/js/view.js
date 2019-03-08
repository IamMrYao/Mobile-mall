var itemPingjiaFlag = false;
var oClientInfo = document.querySelector("#clientInfo").value;
window._clientVersion_ = oClientInfo;
function setCookie(a, c, d) {
    var b = d;
    var f = new Date();
    f.setTime(f.getTime() + d);
    document.cookie = a + "=" + c + ";expires=" + f.toGMTString()
}
function getCookie(b) {
    var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
    if (a = document.cookie.match(c)) {
        return unescape(a[2])
    } else {
        return null
    }
}
function slideExposureFn(c, d, a) {
    var b = 0;
    if (!c || !c.length || c.css("display") == "none") {
        return
    }
    $(window).on("scroll", function() {
        if (d == "top") {
            if ($(window).scrollTop() + $(window).height() > c.offset().top && b == 0) {
                a();
                b++
            }
        } else {
            if (d == "all") {
                if ($(window).scrollTop() + $(window).height() > (c.offset().top + c.height()) && b == 0) {
                    a();
                    b++
                }
            }
        }
    })
}
slideExposureFn($("#download-floor"), "all", function() {
    try {
        var b = new MPing.inputs.Click("MProductdetail_BannerShow");
        var a = new MPing();
        a.send(b)
    } catch (c) {
    }
});
try {
    var headerslider = new HeaderSlider(".header-slider");
    headerslider.init({loadInfoFn: loadInfo, loadAssessFn: loadAssess, loadProductFn: loadProduct})
} catch (e) {
    console.log("headerslider 文件未加载")
}
var oUserAgent = window.navigator.userAgent;
var oBtmTip = document.querySelector(".bottom-tip");
if (oUserAgent.indexOf("iPhone") != -1) {
    oBtmTip.innerHTML = oBtmTip.innerHTML.replace("点击", "上拉")
}
var aGoBack = document.querySelectorAll(".jd-header-icon-back");
for (var i = 0; i < aGoBack.length; i++) {
    if (aGoBack[i]) {
        aGoBack[i].addEventListener("click", function() {
            headerslider.goBack()
        })
    }
}
if ($("#m_common_header").length < 1) {
    $(".hold-div-top").attr("style", "display:none;")
}
function switchDetailTab() {
    var b = document.querySelectorAll(".tab-lst-a");
    for (var a = 0; a < b.length; a++) {
        (function(c) {
            b[a].removeEventListener("click", headerslider.clickBtmDetailTab, false);
            b[a].addEventListener("click", clickRightDetailTab, false)
        }(a))
    }
}
function clickRightDetailTab(a) {
    headerslider.HeightTimer(a);
    window.scrollTo(0, 0)
}
function loadProduct(a, b) {
    var c = document.getElementById("openAppFlagA").value;
    var f = document.getElementById("downloadBM");
    var g = getCookie("downloadAppPlugIn_downCloseStatus_downloadBM");
    var d = document.getElementById("downloadBControl");
    if (a == b) {
        if ((g == null || g == "") && c && f != null && d != null && d.style.display != "none") {
            f.style.display = "block"
        }
    }
}
function loadInfo(a, b) {
    var c = document.getElementById("openAppFlagA").value;
    var f = document.getElementById("downloadBM");
    var g = getCookie("downloadAppPlugIn_downCloseStatus_downloadBM");
    var d = document.getElementById("downloadBControl");
    if (a == b) {
        productInfoLoad({containerID: "goodDetail", wareId: $("#currentWareId").val(), url: "detail.json?wareId=" + $("#currentWareId").val(), cbfn: function() {
                var h = document.getElementById("scale-parent2");
                scale("scale-parent", "scale-cont");
                if (h) {
                    scale("scale-parent2", "scale-cont2")
                }
            }, switchTabCbFn: function() {
                switchDetailTab()
            }, goProdBtnCbFn: function() {
                goProdBtnFn()
            }});
        if ((g == null || g == "") && c && f != null && d != null && d.style.display != "none") {
            f.style.display = "block"
        }
    }
}
function loadAssess(c, f, g) {
    var k = window.sessionStorage;
    var d = 0;
    var b = document.getElementById("openAppFlagA").value;
    var j = document.getElementById("downloadBM");
    var a = document.getElementById("downloadBControl");
    if (k) {
        try {
            d = parseInt(k.getItem("tabIndex"));
            if (!d) {
                d = 0
            }
        } catch (h) {
            d = 0
        }
        g = d
    }
    if (c == f) {
        assessListInit({containerID: "tab-wrapper", wareId: $("#currentWareId").val(), url: "newCommentsDetail.json", tabIndex: g, maxCount: 10, cbList: useful});
        itemPingjiaFlag = true;
        if (b && j != null && a != null && a.style.display != "none") {
            j.style.display = "none"
        }
    }
}
function useful() {
    var f = document.querySelectorAll(".assess-like-btn");
    var d = document.querySelectorAll(".btn-like-icon");
    var c = document.querySelectorAll(".like");
    var g = document.querySelector(".useful-window");
    var a = 0;
    for (var b = 0; b < f.length; b++) {
        (function(h) {
            f[h].onclick = function() {
                d[h].classList.add("like-red");
                a++;
                if (a > 1) {
                    g.style.display = "block";
                    clearTimeout(j);
                    var j = setTimeout(function() {
                        g.style.display = "none"
                    }, 2000)
                } else {
                    g.style.display = "none"
                }
                c[h].classList.add("like_ani")
            }
        })(b)
    }
}
var oBigSmallBuy = document.querySelector("#bigSmallBuy").value;
var oQuantity = document.querySelector(".quantity");
var oCartBtmFixed = document.querySelector(".cart-concern-btm-fixed");
var oBtmPrompt = document.querySelector(".bottom-prompt");
var oComNewTop = document.querySelector(".m_common_new_top");
var oDivTop = document.querySelector(".hold-div-top");
var oDivBottom = document.querySelector(".hold-div-bottom");
var aInputBox = document.querySelectorAll(".input-box");
if (oQuantity) {
    oQuantity.addEventListener("focus", function() {
        oCartBtmFixed.style.position = "static";
        oBtmPrompt.style.position = "static";
        oComNewTop.style.position = "static";
        oDivTop.style.display = "none"
    }, false);
    oQuantity.addEventListener("blur", function() {
        oCartBtmFixed.style.position = "fixed";
        oBtmPrompt.style.position = "fixed";
        oComNewTop.style.position = "fixed";
        oDivTop.style.display = "block"
    }, false);
    if (oBigSmallBuy && typeof MaxCheck == "function") {
        oQuantity.addEventListener("input", MaxCheck, false)
    }
}
if (aInputBox.length > 0) {
    for (var i = 0; i < aInputBox.length; i++) {
        aInputBox[i].addEventListener("focus", function() {
            oCartBtmFixed.style.position = "static";
            oBtmPrompt.style.position = "static";
            oComNewTop.style.position = "static";
            oDivTop.style.display = "none";
            oDivBottom.style.display = "none"
        }, false);
        aInputBox[i].addEventListener("blur", function() {
            oCartBtmFixed.style.position = "fixed";
            oBtmPrompt.style.position = "fixed";
            oComNewTop.style.position = "fixed";
            oDivTop.style.display = "block";
            oDivBottom.style.display = "block"
        }, false)
    }
}
function dowloadAPP(b, f, A, p) {
    try {
        var n = "Item";
        var s = "view-ware";
        var o = $("#resourceType").val();
        var c = $("#resourceValue").val();
        if (o != "" && o != null) {
            n = o
        }
        if (c != "" && c != null) {
            s = c
        }
        var r = $("#computControul").val();
        if (r != "" && "true" == r && o != "M_APP_SAOMA") {
            s = "MWEIXIN_PRODUCTFLOAT_VALUE";
            n = "MWEIXIN_PRODUCTFLOAT_TYPE"
        }
        var y = "Atop";
        if ($("#downloadBM").length > 0) {
            y = "Btop"
        }
        if ($("#downloadBR").length > 0) {
            y = "Ctop"
        }
        if (($("#openAppFlagB") && $("#openAppFlagB").val() == "true")) {
            y = "sxB-weixin"
        }
        if (($("#openAppFlagC") && $("#openAppFlagC").val() == "true")) {
            y = "sxCtop-weixin"
        }
        if (($("#openAppFlagA") && $("#openAppFlagA").val() == "true")) {
            y = "sxAtop"
        }
        if (($("#openAppFlagD") && $("#openAppFlagD").val() == "true")) {
            y = "sxDtop"
        }
        var a = $("#isYushou").val();
        if (a && "true" == a) {
            y = "Dtop"
        }
        var d = "";
        try {
            if (($("#dist") && $("#dist").val() == "jd")) {
                var w = $("#dist").val();
                d = w
            }
        } catch (z) {
        }
        var v = "openApp.jdMobile://virtual";
        var h = {category: "jump", des: "productDetail", skuId: b, sourceType: n, sourceValue: s, M_sourceFrom: y, dist: d};
        var x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msy";
        var m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msy";
        var g = "MProductdetail_FloatTopOpenA";
        var t = "MProductdetail_FloatTopCloseA";
        if ($("#downloadBM").length > 0) {
            x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx3";
            m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx3";
            g = "MProductdetail_FloatTopOpenB";
            t = "MProductdetail_FloatTopCloseB"
        }
        if ($("#downloadBR").length > 0) {
            x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx5";
            m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx5";
            g = "MProductdetail_FloatTopOpenC";
            t = "MProductdetail_FloatTopCloseC"
        }
        if (($("#openAppFlagA") && $("#openAppFlagA").val() == "true")) {
            x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl3";
            m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl3";
            g = "MProductdetail_FloatTopOpen_ReviewtestA";
            t = "MProductdetail_FloatTopClose_ReviewtestA"
        }
        if (($("#openAppFlagB") && $("#openAppFlagB").val() == "true")) {
            x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx1";
            m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx1";
            g = "MProductdetail_FloatTopOpen_B";
            t = "MProductdetail_FloatTopClose_B"
        }
        if (($("#openAppFlagC") && $("#openAppFlagC").val() == "true")) {
            x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx2";
            m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx2";
            g = "MProductdetail_FloatTopOpen_C";
            t = "MProductdetail_FloatTopClose_C"
        }
        if (($("#openAppFlagD") && $("#openAppFlagD").val() == "true")) {
            x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl4";
            m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl4";
            g = "MProductdetail_FloatTopOpen_ReviewtestD";
            t = "MProductdetail_FloatTopClose_ReviewtestD"
        }
        if (a && "true" == a) {
            x = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx";
            m = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx";
            g = "MDownLoadFloat_OpenNow";
            t = "MDownLoadFloat_Close"
        }
        var l = "";
        if (b != "" && b != null && b >= 10000000 && b <= 19999999) {
            v = 'openapp.jdebook://communication?params={"type":"1"}';
            h = "";
            m = "http://e.m.jd.com/jdread.html";
            x = "http://e.m.jd.com/jdread.html";
            l = "\u4e0b\u8f7d\u4eac\u4e1c\u9605\u8bfb\u5ba2\u6237\u7aef<br>\u7cbe\u5f69\u597d\u4e66\u514d\u8d39\u770b"
        }
        var k = "_" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
        $("#content_trynow").attr("id", "content" + k + "_trynow");
        $("#content_x").attr("id", "content" + k + "_x");
        $("#content_div").attr("id", "content" + k + "_div");
        if (window.sessionStorage) {
            window.sessionStorage.removeItem("isPanelClose")
        }
        var q = function() {
            try {
                var B = window.sessionStorage;
                if (B) {
                    B.removeItem("isPanelClose");
                    B.setItem("isPanelClose", "true")
                }
                setTimeout(function() {
                    headerslider.setHoldTopHeight()
                }, 200)
            } catch (C) {
                console.log("closeCallbackFunc top" + C)
            }
        };
        var j = {openAppBtnId: "content" + k + "_trynow", closePanelBtnId: "content" + k + "_x", closePanelId: "content" + k + "_div", downAppURl: x, downWeixin: m, inteneUrl: v, inteneUrlParams: h, noRecord: true, openAppEventId: g, closePanelEventId: t, closeCallblack: q, M_sourceFrom: y};
        if (typeof jQuery.downloadAppPlugIn == "function") {
            jQuery.downloadAppPlugIn(j)
        }
    } catch (z) {
    }
}
function dowloadAPPOfFloor(a, d, x, l) {
    try {
        var j = "Item";
        var n = "view-ware";
        var k = $("#resourceType").val();
        var b = $("#resourceValue").val();
        if (k != "" && k != null) {
            j = k
        }
        if (b != "" && b != null) {
            n = b
        }
        var m = $("#computControul").val();
        if (m != "" && "true" == m && k != "M_APP_SAOMA") {
            n = "MWEIXIN_PRODUCTFLOAT_VALUE";
            j = "MWEIXIN_PRODUCTFLOAT_TYPE"
        }
        var t = "sxotherbanner";
        var p = "jd-msxotherbn";
        var v = "MProductdetail_DownLoadBanner";
        if (($("#openAppFlagA") && $("#openAppFlagA").val() == "true")) {
            t = "sxAbanner";
            p = "jd-msxabn";
            v = "MProductdetail_ABanner"
        }
        if (($("#openAppFlagD") && $("#openAppFlagD").val() == "true")) {
            t = "sxDbanner";
            p = "jd-msxdbn";
            v = "MProductdetail_DBanner"
        }
        var c = "";
        try {
            if (($("#dist") && $("#dist").val() == "jd")) {
                var r = $("#dist").val();
                c = r
            }
        } catch (w) {
        }
        var o = "openApp.jdMobile://virtual";
        var f = {category: "jump", des: "productDetail", skuId: a, sourceType: j, sourceValue: n, dist: c};
        var q = "http://h5.m.jd.com/active/download/download.html?channel=" + p;
        var h = "";
        var g = "http://h5.m.jd.com/active/download/download.html?channel=" + p;
        var s = {openAppBtnId: "download-floor", downAppURl: q, downWeixin: g, inteneUrl: o, inteneUrlParams: f, noRecord: true, openAppEventId: v, M_sourceFrom: t};
        if (typeof jQuery.downloadAppPlugIn == "function") {
            jQuery.downloadAppPlugIn(s)
        }
    } catch (w) {
    }
}
function dowloadAPPMRFloor(a, d, A, n) {
    try {
        var l = "Item";
        var q = "view-ware";
        var m = $("#resourceType").val();
        var b = $("#resourceValue").val();
        if (m != "" && m != null) {
            l = m
        }
        if (b != "" && b != null) {
            q = b
        }
        var p = $("#computControul").val();
        if (p != "" && "true" == p && m != "M_APP_SAOMA") {
            q = "MWEIXIN_PRODUCTFLOAT_VALUE";
            l = "MWEIXIN_PRODUCTFLOAT_TYPE"
        }
        var y = "";
        if ($("#downloadBM").length > 0) {
            y = "Bbottom"
        }
        if ($("#downloadBR").length > 0) {
            y = "Cright"
        }
        if (($("#openAppFlagC") && $("#openAppFlagC").val() == "true")) {
            y = "sxCbottom-weixin"
        }
        if (($("#openAppFlagA") && $("#openAppFlagA").val() == "true")) {
            y = "sxAbottom-weixin"
        }
        var c = "";
        try {
            if (($("#dist") && $("#dist").val() == "jd")) {
                var t = $("#dist").val();
                c = t
            }
        } catch (w) {
        }
        var s = "openApp.jdMobile://virtual";
        var g = {category: "jump", des: "productDetail", skuId: a, sourceType: l, sourceValue: q, M_sourceFrom: y, dist: c};
        var v = "http://h5.m.jd.com/active/download/download.html?channel=jd-msy";
        var j = "http://h5.m.jd.com/active/download/download.html?channel=jd-msy";
        var z = "";
        var f = "";
        var x = "";
        var r = "";
        if ($("#downloadBM").length > 0) {
            v = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx4";
            j = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx4";
            z = "downloadBM";
            f = "MProductdetail_FloatIconOpenB";
            r = "MProductdetail_FloatIconCloseB";
            x = $("#downloadBM").attr("close-time")
        }
        if ($("#downloadBR").length > 0) {
            v = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx6";
            j = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx6";
            z = "downloadBR";
            f = "MProductdetail_FloatIconOpenC";
            r = "MProductdetail_FloatIconCloseC";
            x = $("#downloadBR").attr("close-time")
        }
        if (($("#openAppFlagA") && $("#openAppFlagA").val() == "true")) {
            v = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx5";
            j = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx5";
            x = $("#closeFloorTimeA").val();
            f = "MProductdetail_FloatIconOpen_A";
            r = "MProductdetail_FloatIconClose_A"
        }
        if (($("#openAppFlagC") && $("#openAppFlagC").val() == "true")) {
            v = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx3";
            j = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxwx3";
            x = $("#closeFloorTimeC").val();
            f = "MProductdetail_FloatIconOpen_C";
            r = "MProductdetail_FloatIconClose_C"
        }
        if (x != "" && x != "null") {
            x = parseInt(x) * 1000
        }
        var h = "";
        if (a != "" && a != null && a >= 10000000 && a <= 19999999) {
            s = 'openapp.jdebook://communication?params={"type":"1"}';
            g = "";
            j = "http://e.m.jd.com/jdread.html";
            v = "http://e.m.jd.com/jdread.html";
            h = "\u4e0b\u8f7d\u4eac\u4e1c\u9605\u8bfb\u5ba2\u6237\u7aef<br>\u7cbe\u5f69\u597d\u4e66\u514d\u8d39\u770b"
        }
        var o = function() {
            setCookie("downloadAppPlugIn_downCloseStatus_downloadBM", "true", x)
        };
        var k = {openAppBtnId: "content_tryme", closePanelBtnId: "cloBtnFloor", closePanelId: z, downAppURl: v, downWeixin: j, inteneUrl: s, inteneUrlParams: g, openAppEventId: f, closePanelEventId: r, appDownCloseIntervalTime: x, cookieFlag: z, isnotWriteOpenAppCookie: true, closeCallblack: o, M_sourceFrom: y};
        if (typeof jQuery.downloadAppPlugIn == "function") {
            jQuery.downloadAppPlugIn(k)
        }
    } catch (w) {
    }
}
function dowloadAPPFlagA(a, d, t, k) {
    try {
        var h = "Item";
        var m = "view-ware";
        var j = $("#resourceType").val();
        var b = $("#resourceValue").val();
        var n = "sxspA";
        if (j != "" && j != null) {
            h = j
        }
        if (b != "" && b != null) {
            m = b
        }
        var l = $("#computControul").val();
        if (l != "" && "true" == l && j != "M_APP_SAOMA") {
            m = "MWEIXIN_PRODUCTFLOAT_VALUE";
            h = "MWEIXIN_PRODUCTFLOAT_TYPE"
        }
        var c = "";
        try {
            if (($("#dist") && $("#dist").val() == "jd")) {
                var p = $("#dist").val();
                c = p
            }
        } catch (s) {
        }
        var o = "openApp.jdMobile://virtual";
        var f = {category: "jump", des: "productDetail", skuId: a, sourceType: h, sourceValue: m, dist: c};
        var q = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl1";
        var g = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl1";
        var r = {openAppBtnId: "downloadFlagA", downAppURl: q, downWeixin: g, inteneUrl: o, inteneUrlParams: f, noRecord: true, openAppEventId: "MDownLoadFloat_ProductDetailOpenApp", M_sourceFrom: n};
        if (typeof jQuery.downloadAppPlugIn == "function") {
            jQuery.downloadAppPlugIn(r)
        }
    } catch (s) {
    }
}
function dowloadAPPFlagAP(a, d, t, k) {
    try {
        var h = "Item";
        var m = "view-ware";
        var j = $("#resourceType").val();
        var b = $("#resourceValue").val();
        var n = "sxpjA";
        if (j != "" && j != null) {
            h = j
        }
        if (b != "" && b != null) {
            m = b
        }
        var l = $("#computControul").val();
        if (l != "" && "true" == l && j != "M_APP_SAOMA") {
            m = "MWEIXIN_PRODUCTFLOAT_VALUE";
            h = "MWEIXIN_PRODUCTFLOAT_TYPE"
        }
        var c = "";
        try {
            if (($("#dist") && $("#dist").val() == "jd")) {
                var p = $("#dist").val();
                c = p
            }
        } catch (s) {
        }
        var o = "openApp.jdMobile://virtual";
        var f = {category: "jump", des: "productDetail", skuId: a, sourceType: h, sourceValue: m, dist: c};
        var q = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl2";
        var g = "http://h5.m.jd.com/active/download/download.html?channel=jd-msxpl2";
        var r = {openAppBtnId: "downloadFlagAP", downAppURl: q, downWeixin: g, inteneUrl: o, inteneUrlParams: f, noRecord: true, openAppEventId: "MProductdetail_CommentBanner", M_sourceFrom: n};
        if (typeof jQuery.downloadAppPlugIn == "function") {
            jQuery.downloadAppPlugIn(r)
        }
    } catch (s) {
    }
}
function goProdBtnFn() {
    var b = document.querySelectorAll(".pro-button-box");
    if (b.length > 0) {
        for (var a = 0; a < b.length; a++) {
            b[a].removeEventListener("click", headerslider.btmDetailBackToTop, false);
            b[a].addEventListener("click", goViewDetail, false)
        }
    }
}
function goViewDetail() {
    if ($("#detailView").length > 0) {
        $("#detailView").click()
    } else {
        var a = window.location.href;
        if (a) {
            a = a.split("#")[0]
        }
        window.location.href = a
    }
}
function addCookie(c, f, a, g, d) {
    var h = c + "=" + escape(f);
    if (a != "") {
        var b = new Date();
        b.setTime(b.getTime() + a * 24 * 3600 * 1000);
        h += ";expires=" + b.toGMTString()
    }
    if (g != "") {
        h += ";path=" + g
    }
    if (d != "") {
        h += ";domain=" + d
    }
    document.cookie = h
}
var oCurrentWareId = document.querySelector("#currentWareId").value;
var oSid = document.querySelector("#sid").value;
var oHeaderTitle = document.querySelector("#headerTitle").value;
var openAppFlagA = document.querySelector("#openAppFlagA").value;
if (openAppFlagA) {
    dowloadAPPFlagA(oCurrentWareId, oSid, oHeaderTitle, "");
    dowloadAPPFlagAP(oCurrentWareId, oSid, oHeaderTitle, "")
}
if ($("#content").length > 0) {
    dowloadAPP(oCurrentWareId, oSid, oHeaderTitle, "")
}
if ($("#download-floor").length > 0) {
    dowloadAPPOfFloor(oCurrentWareId, oSid, oHeaderTitle, "")
}
if ($("#downloadBM").length > 0) {
    dowloadAPPMRFloor(oCurrentWareId, oSid, oHeaderTitle, "")
}
if ($("#downloadBR").length > 0) {
    dowloadAPPMRFloor(oCurrentWareId, oSid, oHeaderTitle, "")
}
var logoImgErr = function(a) {
    a.setAttribute("src", "images/shop-occupy-img.png?v=")
};
var imgErr = function(a) {
    a.setAttribute("src", "images/occupy-img320.gif?v=")
};
var accessImgErr = function(a) {
    a.setAttribute("src", "images/occupy-img320.gif?v=");
    a.style.width = "100%";
    a.style.height = "auto"
};
var oDaneng = document.querySelector("#daneng").value;
var oDanengSecPin = document.querySelector("#danengSecPin").value;
if (oDaneng) {
    var ranNum = new Date().getTime();
    var u = oDanengSecPin;
    var url = "http://" + u + ".web.meritco.m.jd.com?t=" + ranNum;
    jQuery.ajax({url: url, type: "get"})
}
if ($("#itemShareShowFlag").val() === "true") {
    function creatShareGift() {
        var c = $("#js-share-gift"), a = document.createElement("i"), b = document.createElement("iframe");
        $(c).addClass("share-gift-wrap").append(a).append(b).css("overflow", "auto");
        $(a).addClass("share-gift-btn");
        $(b).addClass("share-gift-content").attr("scrolling", "no").attr("src", $("#itemShareShowUrl").val()).css("width", document.body.clientWidth + "px");
        b.onload = function() {
            var d = $("#mainLayout");
            $(c).addClass("share-gift-show");
            d.addClass("overflowHidden").css("height", window.screen.height * (2 / 3) + "px");
            bindEvent(c, d)
        }
    }
    function bindEvent(b, a) {
        $(document).on("touchstart", ".share-gift-btn", function() {
            pingClickWithLevel("MProductdetail_AppShareClose", "", "", $("#currentWareId").val(), "");
            b.removeClass("share-gift-show");
            setTimeout(function() {
                a.removeClass("overflowHidden").css("height", "100%");
                b.remove()
            }, 500)
        });
        window.addEventListener("message", function(c) {
            switch (c.data) {
                case"tologin":
                    window.location.href = $("#itemLoginUrl").val();
                    break;
                case"toBean":
                    window.location.href = "//home.m.jd.com/wallet/wallet.action";
                    break;
                case"toCoupon":
                    window.location.href = "//home.m.jd.com/wallet/coupons.action";
                    break;
                case"toIndex":
                    window.location.href = "//m.jd.com";
                    break
                }
        }, false)
    }
    (function init() {
        creatShareGift()
    })()
}
function getCoupon(d, h, c, k, j) {
    if ((c == "" || c == null || c == undefined) || (d == "" || d == null || d == undefined)) {
        var b = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
        showMessage(b);
        return
    }
    var g = $("#couponDivShow").attr("pop-data");
    var a = $("#couponDivShow").attr("pop-conf");
    if (g && "true" == g && a && "true" != a) {
        getPopActiveCoupon(d, h, c, k)
    } else {
        var f = "http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html?couponId=" + h;
        jQuery.ajax({type: "POST", url: "/coupon/couponDetail.json", data: {wareId: $("#currentWareId").val(), isPop: $("#couponDivShow").attr("pop-data")}, dataType: "json", success: function(l) {
                if (l && l.codeKey) {
                    $("#codeKey").val(l.codeKey);
                    poptip({codeKeyShow: l.codeKeyShow, couponId: h, roleId: c, discount: k, codeKey: l.codeKey, encryptedKey: d, limitPlatform: true, limitMsg: j})
                } else {
                    var m = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                    showMessage(m)
                }
            }, error: function(o, l, m, n) {
                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=" + f
            }})
    }
}
function getPopActiveCoupon(c, b, a, d) {
    jQuery.ajax({type: "POST", url: "/coupon/getActiveCoupon.json", data: {sku: $("#currentWareId").val(), discount: d, encryptedKey: c, roleId: a, isPop: $("#couponDivShow").attr("pop-data")}, dataType: "json", success: function(g) {
            if (g && g.couponResult) {
                $("#" + b).attr("onclick", "");
                $("#" + b).removeClass("blue");
                $("#" + b).removeClass("red");
                $("#" + b).removeClass("green");
                $("#" + b).addClass("grep");
                $("#" + b + "_up").html("\u5df2");
                $("#" + b + "_down").html("\u9886");
                var j = {cls: "succee-icon", duration: 3000, message: "\u9886\u53d6\u6210\u529f\uff08\u0035\u007e\u0031\u0030\u5206\u949f\u5230\u8d26\uff09", height: 88, width: 220};
                showMessage(j)
            } else {
                if (g && g.code && g.code == 34) {
                    try {
                        var f = document.querySelector(".certification-floor");
                        f.style.display = "block";
                        $(".one-btn-tip-box-tip").css({marginTop: -$(".one-btn-tip-box-tip").height() / 2});
                        $(".one-btn-tip-info").html("<span>" + g.msg + "</span>")
                    } catch (h) {
                        var k = "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5";
                        if (g && g.msg) {
                            k = g.msg
                        }
                        var j = {cls: "error-icon", duration: 3000, message: k, height: 120, width: 260};
                        showMessage(j)
                    }
                } else {
                    var k = "\u8c8c\u4f3c\u6709\u70b9\u5c0f\u95ee\u9898\uff0c\u60a8\u53ef\u4ee5\u0033\u0030\u79d2\u540e\u518d\u8bd5\u4e00\u4e0b\u54df";
                    if (g && g.msg) {
                        k = g.msg
                    }
                    var j = {cls: "error-icon", duration: 3000, message: k, width: 260};
                    showMessage(j)
                }
            }
        }, error: function(k, f, h, j) {
            var g = "http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html";
            window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=" + g
        }})
}
try {
    $(".one-btn-tip-btn").bind("click", function() {
        $(".certification-floor").hide()
    });
    $(".cover-floor").bind("click", function() {
        $(".certification-floor").hide()
    })
} catch (e) {
}
$(function() {
    var a = $("#couponShow").val();
    if (a && "true" == a && $("#currentWareId").val() != "") {
        couponDetailShow()
    }
});
function couponDetailShow() {
    try {
        jQuery.ajax({type: "POST", url: "coupon.json", data: {wareId: $("#currentWareId").val()}, dataType: "json", success: function(data) {
                if (data && data.coupon) {
                    var couponList = eval(data.coupon);
                    wareId = $("#currentWareId").val();
                    var listHtml = "";
                    var jhtml = "";
                    var dhtml = "";
                    var fhtml = "";
                    $(couponList).each(function(index) {
                        if (couponList[index].applicability) {
                            if (couponList[index] && couponList[index].couponType == 0) {
                                jhtml = jhtml + getCouponHtml(couponList[index], wareId, couponList[index].roleId, couponList[index].applicability)
                            } else {
                                if (couponList[index] && couponList[index].couponType == 1) {
                                    dhtml = dhtml + getCouponHtml(couponList[index], wareId, couponList[index].roleId, couponList[index].applicability)
                                } else {
                                    fhtml = fhtml + getCouponHtml(couponList[index], wareId, couponList[index].roleId, couponList[index].applicability)
                                }
                            }
                            listHtml = jhtml + dhtml + fhtml
                        }
                    });
                    var listaHtml = "";
                    var jahtml = "";
                    var dahtml = "";
                    var fahtml = "";
                    $(couponList).each(function(index) {
                        if (!couponList[index].applicability) {
                            if (couponList[index] && couponList[index].couponType == 0) {
                                jahtml = jahtml + getCouponHtml(couponList[index], wareId, couponList[index].roleId, couponList[index].applicability)
                            } else {
                                if (couponList[index] && couponList[index].couponType == 1) {
                                    dahtml = dahtml + getCouponHtml(couponList[index], wareId, couponList[index].roleId, couponList[index].applicability)
                                } else {
                                    fahtml = fahtml + getCouponHtml(couponList[index], wareId, couponList[index].roleId, couponList[index].applicability)
                                }
                            }
                            listaHtml = jahtml + dahtml + fahtml
                        }
                    });
                    listHtml = listHtml + listaHtml;
                    if (listHtml) {
                        $("#couponlist li").remove();
                        $("#couponlist").append(listHtml);
                        $(".coupon-total-nums").html("\u5171" + couponList.length + "\u5f20");
                        $("#couponDivShow").show();
                        $("#couponActivity").show();
                        if ($(".coupon-slider").length > 0) {
                            slideshow(".coupon-slider").init({lineNum: 1, marginValue: 11, multiMove: true, mpingEvent: "MProductdetail_CouponSlide"})
                        }
                        var couponDetailShow = $("#couponDetailShow").val();
                        if (couponDetailShow && $("#" + couponDetailShow).length > 0 && !$("#" + couponDetailShow).hasClass("grep")) {
                            $("#" + couponDetailShow).click()
                        }
                        $("#whiteBarInfo").attr("class", "prod-whitebar whitebar-flick bdr-b")
                    }
                }
            }, error: function(xhr, type, data) {
            }})
    } catch (e) {
    }
}
function getCouponHtml(f, d, b, a) {
    var c = "";
    try {
        if (f == null || f.discount == null || f.discount == undefined || f.discount == 0) {
            return""
        } else {
            c = c + '<li  class="jd-slider-item coupon_unit ';
            if (a) {
                if (f.name) {
                    f.name = escape(f.name)
                }
                if (f.couponType == 0) {
                    c = c + 'red J_ping" report-eventid="MProductdetail_Coupon" report-eventlevel="5" report-pageparam="' + d + '" id="' + d + "_" + b + '" onclick="getCoupon(\'' + f.encryptedKey + "','" + d + "_" + b + "','" + f.roleId + "','" + f.discount + "','" + f.name + "')\">"
                } else {
                    if (f.couponType == 1) {
                        c = c + 'blue J_ping" report-eventid="MProductdetail_Coupon" report-eventlevel="5" report-pageparam="' + d + '" id="' + d + "_" + b + '" onclick="getCoupon(\'' + f.encryptedKey + "','" + d + "_" + b + "','" + f.roleId + "','" + f.discount + "','" + f.name + "')\">"
                    } else {
                        c = c + 'green J_ping" report-eventid="MProductdetail_Coupon" report-eventlevel="5" report-pageparam="' + d + '" id="' + d + "_" + b + '" onclick="getCoupon(\'' + f.encryptedKey + "','" + d + "_" + b + "','" + f.roleId + "','" + f.discount + "','" + f.name + "')\">"
                    }
                }
            } else {
                c = c + 'grep" id="' + d + "_" + b + '">'
            }
            c = c + '<div class="expe_disc">    <div class="expeNum">        <span class="rmb">\uffe5</span>        <span class="actual-number">' + f.discount + '</span>    </div>    <div class="condi_msg">\u6ee1' + f.quota + '\u53ef\u7528</div></div><div class="coupon_icon"></div>';
            if (a) {
                c = c + '<div class="oper_msg"><div class="up" id="' + d + "_" + b + '_up">\u9886</div><div class="down" id="' + d + "_" + b + '_down">\u53d6</div>'
            } else {
                c = c + '<div class="oper_msg"><div class="up">\u5df2</div><div class="down">\u9886</div>'
            }
            c = c + '</div> <em class="left_m"></em></li>'
        }
    } catch (g) {
    }
    return c
}
function initDetail(a) {
    var d = {seckillContainer: "seckill_time", isStart: false, timer: null, seckillCallback: function() {
        }, argObj: null};
    var b = $.extend(d, a) || $.fn.extend(d, a);
    var g = {seckillContainer: b.seckillContainer, isStart: b.isStart, timer: b.timer, callback: b.seckillCallback, drawSeckill: function() {
            var h = document.getElementById(this.seckillContainer);
            if (h != null) {
                var j = '<span class="seckill-time-num">00</span>';
                j += '<span class="seckill-time-colon">:</span>';
                j += '<span class="seckill-time-num">00</span>';
                j += '<span class="seckill-time-colon">:</span>';
                j += '<span class="seckill-time-num">00</span>';
                h.innerHTML = j
            }
        }, seckillInit: function(j) {
            var h = this;
            h.drawSeckill();
            if (j.seckill) {
                if (j.seckill.seckillTime && j.seckill.timeRemain) {
                    h.endTime = j.seckill.seckillTime;
                    h.timeRemain = j.seckill.timeRemain;
                    h.seckillTime = 1000;
                    h.seckillTimer()
                } else {
                    $("#seckill_time").hide()
                }
            }
        }, seckillTimer: function() {
            var h = this;
            var j = jdM.localstorage.get("index_seckill");
            var r = 0;
            if (j) {
                j = j.split("_");
                var q = j[0];
                var t = parseInt(j[1], 10);
                var s = jdM.date.toDate(j[2]);
                var v = parseInt(j[3], 10);
                if (h.endTime == q && h.timeRemain == t) {
                    var k = new Date();
                    var p = parseInt((k.getTime() - s.getTime()) / 1000, 10);
                    r = v - p;
                    jdM.localstorage.set("index_seckill", h.endTime + "_" + h.timeRemain + "_" + jdM.date.toString(k, "yyyy-MM-dd HH:mm:ss") + "_" + r)
                } else {
                    var k = new Date();
                    r = h.timeRemain;
                    jdM.localstorage.set("index_seckill", h.endTime + "_" + h.timeRemain + "_" + jdM.date.toString(k, "yyyy-MM-dd HH:mm:ss") + "_" + r)
                }
            } else {
                var k = new Date();
                r = h.timeRemain = h.timeRemain - 1;
                jdM.localstorage.set("index_seckill", h.endTime + "_" + h.timeRemain + "_" + jdM.date.toString(k, "yyyy-MM-dd HH:mm:ss") + "_" + r)
            }
            if (r > 0) {
                var w = r % 60;
                var l = parseInt(r / 60, 10);
                var o = l % 60;
                var n = parseInt(l / 60, 10);
                if (n <= 0) {
                    $("#" + h.seckillContainer).find("span").eq(0).text("00")
                } else {
                    if (n > 99) {
                        $("#" + h.seckillContainer).find("span").eq(0).text("99")
                    } else {
                        if (n > 9 && n < 99) {
                            var n = n + "";
                            $("#" + h.seckillContainer).find("span").eq(0).text(n)
                        } else {
                            var n = n + "";
                            $("#" + h.seckillContainer).find("span").eq(0).text("0" + n)
                        }
                    }
                }
                if (o <= 0) {
                    $("#" + h.seckillContainer).find("span").eq(2).text("00")
                } else {
                    if (o > 9) {
                        o = o + "";
                        $("#" + h.seckillContainer).find("span").eq(2).text(o)
                    } else {
                        $("#" + h.seckillContainer).find("span").eq(2).text("0" + o)
                    }
                }
                if (w <= 0) {
                    $("#" + h.seckillContainer).find("span").eq(4).text("00")
                } else {
                    if (w > 9) {
                        w = w + "";
                        $("#" + h.seckillContainer).find("span").eq(4).text(w)
                    } else {
                        $("#" + h.seckillContainer).find("span").eq(4).text("0" + w)
                    }
                }
            } else {
                $("#" + h.seckillContainer).find("span").eq(0).text("00");
                $("#" + h.seckillContainer).find("span").eq(2).text("00");
                $("#" + h.seckillContainer).find("span").eq(4).text("00");
                h.seckillStop();
                h.callback()
            }
        }, seckillRun: function(j) {
            var h = this;
            h.seckillTime = h.seckillTime - j;
            if (h.seckillTime == 0) {
                h.seckillTime = 1000;
                h.seckillTimer()
            }
        }, seckillStart: function() {
            var h = this;
            if (!h.isStart) {
                h.timer = setInterval(function() {
                    h.seckillRun(1000);
                    h.isStart = true
                }, 1000)
            }
        }, seckillStop: function() {
            var h = this;
            if (h.isStart) {
                clearTimeout(h.timer);
                jdM.localstorage.remove("index_seckill")
            }
        }};
    var c = {regristerEvent: function() {
            var h = $("#prodPromotion");
            h.bind("click", function(m) {
                var l = m || event;
                var k = l.srcElement || l.target;
                var n = this;
                var j = n.className;
                if (j.indexOf("down") != -1) {
                    l.preventDefault();
                    $(".promotion-item").unbind("click").bind("click", function(o) {
                        o.stopPropagation()
                    });
                    $(".promotion-item").first().unbind("click");
                    $(".promotion-item").find("a").unbind("click").bind("click", function(o) {
                        o.stopPropagation()
                    });
                    $("#suitContainer").css("display", "block");
                    n.className = n.className.replace("down", "up");
                    h.attr("report-eventparam", "open");
                    if ($("#suitContainer").length > 0) {
                        slideshow("#suitContainer").init({lineNum: 1, marginValue: 40, fullScreen: true, mpingEvent: "MProductdetail_SlideDiscount"})
                    }
                    $(".promotion-item a").each(function(o, p) {
                        if ($(this).attr("report-eventid") == "MProductdetail_Promotion") {
                            $(this).attr("onclick", 'pingClickWithLevel("' + $(this).attr("report-eventid") + '","' + $(this).attr("report-eventparam") + '","","' + $(this).attr("report-pageparam") + '","5")')
                        }
                    })
                } else {
                    $(".promotion-item").unbind("click");
                    $(".promotion-item").find("a").unbind("click").bind("click", function(o) {
                        o.preventDefault()
                    });
                    $("#suitContainer").css("display", "none");
                    n.className = n.className.replace("up", "down");
                    h.attr("report-eventparam", "close")
                }
            })
        }};
    var f = function() {
        if (b.argObj != null) {
            g.seckillInit(b.argObj);
            g.seckillStart();
            c.regristerEvent()
        }
    };
    return f()
}
function commentListInit(n) {
    var f = {containerID: "commentListID", maxCount: 5, fontSize: 14, spaceWidth: 60, url: "", filters: {}};
    String.prototype.getWidth = function(p) {
        var o = document.getElementById("_getwidthID");
        if (o == null) {
            o = document.createElement("span");
            o.id = "_getwidthID";
            document.getElementById("mainLayout").appendChild(o);
            o.style.visibility = "hidden";
            o.style.whiteSpace = "nowrap"
        } else {
            o.style.display = "inline-block"
        }
        o.innerText = this;
        o.style.fontSize = p + "px";
        var q = o.offsetWidth;
        o.style.display = "none";
        return q
    };
    var m = $.extend(f, n);
    var d = document.getElementById(m.containerID);
    var g = "";
    var a = "onorientationchange" in window;
    var b = a ? "orientationchange" : "resize";
    var h = window.navigator.userAgent;
    var k = {measureWidth: function() {
            return document.documentElement.clientWidth
        }, getAdjustW: function() {
            var p = document.documentElement.clientWidth;
            var q = p - 20 - 13 * 3;
            var o = q / 4;
            if (o > 120) {
                o = 120
            }
            return o
        }, liAdjustWidth: function() {
            var o = k.getAdjustW();
            $(".comment-img-item").width(o).height(o)
        }, imgAdjustWidth: function() {
            var o = k.getAdjustW();
            $(".comment-img-item").find("img").each(function(s) {
                var q = $(this);
                var v;
                var r;
                var p;
                var t = new Image();
                t.src = $(q).attr("src");
                t.onload = function() {
                    v = this.width;
                    r = this.height;
                    p = v / r;
                    if (r > v) {
                        q.width(o);
                        q.css("marginTop", (o - (o / p)) / 2 + "px")
                    } else {
                        q.height(o);
                        q.css("marginLeft", (o - (o * p)) / 2 + "px")
                    }
                };
                t.onerror = function() {
                    q.attr("src", "images/occupy-img320.gif?v=");
                    q.width(o).height(o)
                }
            })
        }, imgLoadCb: function(s, q) {
            var p = k.getAdjustW();
            var t = s.width;
            var r = s.height;
            var o = t / r;
            if (q.parent().attr("class") == "comment-img-item") {
                if (r > t) {
                    q.width(p);
                    q.css("marginTop", (p - (p / o)) / 2 + "px")
                } else {
                    q.height(p);
                    q.css("marginLeft", (p - (p * o)) / 2 + "px")
                }
            }
        }, adjustWidth: function() {
            var p = k.measureWidth();
            var r = p - 20 - 65 * 4 - 13 * 3;
            var o = 65 + r / 4;
            var q = document.getElementById("picLasyLoad").value;
            if (o > 120) {
                o = 120
            }
            $(".comment-img-item").width(o).height(o);
            $(".comment-img-item").find("img").each(function(v) {
                var s = $(this);
                var x;
                var t;
                var w = new Image();
                s.width(o).height(o);
                if (q == "true") {
                    w.src = $(s).attr("_src")
                } else {
                    w.src = $(s).attr("src")
                }
                w.onload = function() {
                    x = this.width;
                    t = this.height;
                    picProportion = x / t;
                    if (t > x) {
                        s.width(o);
                        s.height("");
                        s.css("marginTop", (o - (o / picProportion)) / 2 + "px")
                    } else {
                        s.width("");
                        s.height(o);
                        s.css("marginLeft", (o - (o * picProportion)) / 2 + "px")
                    }
                }
            })
        }, hasIcon: function(o) {
            return(this.measureWidth() - m.spaceWidth) * 2 <= o.getWidth(m.fontSize)
        }, downClass: function(o) {
            o.onclick = function() {
                this.className = this.className.replace("down", "up");
                this.onclick = null;
                k.upClass(this)
            }
        }, upClass: function(o) {
            o.onclick = function() {
                this.className = this.className.replace("up", "down");
                this.onclick = null;
                k.downClass(this)
            }
        }, toggleClass: function() {
            var p = $(".down-icon");
            for (var o = 0; o < p.length; o++) {
                p[o].onclick = function(q) {
                    this.onclick = null;
                    k.upClass(this)
                }
            }
        }, addHtml: function(p) {
            g += '<div class="comment-list-item"><div class="comment-item-info"><span class="comment-item-author">';
            g += p.userNickName;
            if ($("#isJx").val() == "true") {
                g += '</span><span class="product-item-star jx-product-item-star"><span class="real-star comment-stars-width'
            } else {
                g += '</span><span class="product-item-star"><span class="real-star comment-stars-width'
            }
            g += p.commentScore;
            g += '"></span>';
            g += '</div><div class="comment-item-content down-icon';
            g += '"><span class="content">';
            g += p.commentData;
            g += "</span></div>";
            if (p.pictureInfoList != undefined && p.pictureInfoList.length > 0) {
                g += '<div class="comment-img-container"> <ul class="img-container J_ping"  report-eventid="MProductdetail_CommentPhoto" report-pageparam="' + $("#currentWareId").val() + '" report-eventlevel="5">';
                for (var o = 0; o < p.pictureInfoList.length; o++) {
                    if (o == 4) {
                        break
                    }
                    g += '<li class="comment-img-item">';
                    if ($("#picLasyLoad") && $("#picLasyLoad").val() == "true") {
                        g += '<img src="images/occupy-img320.gif" _src="';
                        if (p.pictureInfoList[o].picURL && $("#httpsConfig") && "true" == $("#httpsConfig").val()) {
                            g += p.pictureInfoList[o].picURL.replace("http://", "//")
                        } else {
                            g += p.pictureInfoList[o].picURL
                        }
                    } else {
                        g += '<img src="';
                        if (p.pictureInfoList[o].picURL && $("#httpsConfig") && "true" == $("#httpsConfig").val()) {
                            g += p.pictureInfoList[o].picURL.replace("http://", "//")
                        } else {
                            g += p.pictureInfoList[o].picURL
                        }
                    }
                    g += '" onerror="accessImgErr(this)"></li>';
                    if (o < 3) {
                        g += '<li class="comment-img-space"></li>'
                    }
                }
                g += "</div> </ul></a>"
            }
            g += '<div class="comment-item-date">';
            g += p.orderDate.split(" ")[0];
            g += "</div></div>"
        }};
    var l = function() {
        j();
        var o = document.querySelector("#picLasyLoad").value;
        if (o == "true") {
            jQuery.loadImg.lazyLoad({rangeH: 30, container: "", imgcb: k.imgLoadCb, isChangeSize: "false"})
        }
    };
    var c = function(t) {
        var p = m.maxCount;
        var r = t.commentInfoList.length;
        if (r == 0) {
            $(".text-fr")[0].innerHTML = "<span>\u6682\u65e0\u8bc4\u4ef7\uff0c\u7b49\u4f60\u62a2\u6c99\u53d1</span>";
            $("#goods").parent().text("");
            $("#plus-goods").parent().text("");
            document.getElementById("showDetail").style.display = "none";
            return
        }
        var o = r <= p ? r : p;
        for (var q = 0; q < o; q++) {
            k.addHtml(t.commentInfoList[q])
        }
        d.innerHTML = g;
        k.toggleClass();
        k.liAdjustWidth();
        var s = document.getElementById("picLasyLoad").value;
        if (s != "true") {
            k.imgAdjustWidth()
        }
    };
    var j = function() {
        jQuery.ajax({url: "getDetailCommentList.php", data: {wareId: $("#currentWareId").val()}, dataType: "json", success: function(r) {
                try {
                    window.addEventListener(b, function() {
                        if (h.indexOf("MQQBrowser") != -1 || h.indexOf("baidubrowser") != -1 || (h.indexOf("Chrome") != -1 && h.indexOf("Android") != -1)) {
                            clearTimeout(t);
                            var t = setTimeout(function() {
                                k.liAdjustWidth();
                                k.imgAdjustWidth()
                            }, 200)
                        } else {
                            k.liAdjustWidth();
                            k.imgAdjustWidth()
                        }
                    }, false);
                    if (typeof r == "string") {
                        var p = JSON.parse(r)
                    } else {
                        if (typeof r == "object") {
                            var p = r
                        }
                    }
                    var s = parseInt(p.wareDetailComment.goodCnt);
                    var q = parseInt(p.wareDetailComment.allCnt);
                    if (q > 0) {
                        $("#comments").text(q);
                        if (s > 0) {
                            $("#goods").text(Math.round(s * 100 / q) + "%");
                            $("#plus-goods").text(Math.round(s * 100 / q) + "%")
                        }
                        if (p && p.wareDetailComment && p.wareDetailComment.pictureCnt) {
                            $("#orderComment").append("(" + p.wareDetailComment.pictureCnt + ")")
                        }
                    } else {
                        $("#comments").text("0");
                        $("#goods").text("0%");
                        $("#plus-goods").text("0%");
                        $("#orderComment").append("(0)")
                    }
                    if (p && p.wareDetailComment && p.wareDetailComment.consultationCount) {
                        if ($("#consultations").length > 0) {
                            $("#consultations").append("(" + p.wareDetailComment.consultationCount + ")")
                        }
                        if ($("#consultOpenApp").length > 0) {
                            $("#consultOpenApp").append("(" + p.wareDetailComment.consultationCount + ")")
                        }
                    } else {
                        $("#consultations").append("(0)")
                    }
                    c(p.wareDetailComment)
                } catch (o) {
                    $("#showDetail").attr("style", "display:none;")
                }
            }, error: function(o) {
                $(".text-fr")[0].innerHTML = "<span>\u6682\u65e0\u8bc4\u4ef7\uff0c\u7b49\u4f60\u62a2\u6c99\u53d1</span>";
                $("#showDetail").attr("style", "display:none;")
            }});
        k.toggleClass()
    };
    return l()
}
var serviceOpen = function() {
    $(".flick-menu-mask").show();
    $(".service-menu").show();
    if ($(".service-menu").hasClass("service-menu-hide")) {
        $(".service-menu").removeClass("service-menu-hide")
    }
    $(".service-menu").addClass("service-menu-show")
};
var serviceClose = function() {
    $(".flick-menu-mask").hide();
    $(".service-menu").hide();
    if ($(".service-menu").hasClass("service-menu-show")) {
        $(".service-menu").removeClass("service-menu-show")
    }
    $(".service-menu").addClass("service-menu-hide")
};
var serviceExpand = function() {
    $(".service-floor").click(function() {
        serviceOpen()
    });
    $(".service-ok-btn").click(function() {
        serviceClose()
    });
    $(".service-menu-close").click(function() {
        serviceClose()
    })
};
var serviceAndExtendWarranty = function(a) {
    var b = {init: function() {
            b.warrantyStatus();
            b.selectWarranty()
        }, warrantyStatus: function() {
            try {
                var n, q;
                var r = $("#yanBaoInfo").val();
                $("#ybId").val(jdM.sessionstorage.get("ybId"));
                var c = jdM.sessionstorage.get("ybSku");
                if ($("#warranty-seled-list")) {
                    if ($("#ybId").val() != "" && c == $("#currentWareId").val()) {
                        q = $("#ybId").val().split("@@");
                        if (typeof r == "string") {
                            r = JSON.parse(r)
                        }
                        for (var o = 0; o < q.length - 1; o++) {
                            for (var h in r.yanBaoInfo) {
                                for (var g in r.yanBaoInfo[h].products) {
                                    if (r.yanBaoInfo[h].products[g].platformPid == q[o]) {
                                        $("#warranty-seled-list").find(".choose-tip").remove();
                                        n = '<div class="base-txt warranty-text selected-warranty ' + r.yanBaoInfo[h].sortName + '"><i class="warranty-icon"></i>' + r.yanBaoInfo[h].products[g].sortName + "&nbsp;&nbsp;&yen;" + r.yanBaoInfo[h].products[g].price + "</div>";
                                        $("#warranty-seled-list").append(n);
                                        $(".directorder").addClass("disabled");
                                        $(".directorder").unbind("click")
                                    }
                                }
                            }
                        }
                        for (var f = 0; f < q.length - 1; f++) {
                            for (var d = 0; d < $(".warranty-btn").length; d++) {
                                if ($($(".warranty-btn")[d]).attr("data") == q[f]) {
                                    $($(".warranty-btn")[d]).closest(".warranty-btn-wrap").attr("data-selFlag", "1");
                                    $($(".warranty-btn")[d]).addClass("selected");
                                    $($(".warranty-btn")[d]).closest(".warranty-items").find(".warranty-des-href").attr("data-href", $("#warrantyDesHref").val() + "&bindSkuId=" + $($(".warranty-btn")[d]).attr("data"))
                                }
                            }
                        }
                    } else {
                        if (a) {
                            n = '<div class="base-txt warranty-text choose-tip"><i class="warranty-icon"></i>可选延保</div>';
                            $("#warranty-seled-list").append(n)
                        }
                        jdM.sessionstorage.set("ybSku", "");
                        jdM.sessionstorage.set("ybId", "");
                        $("#ybId").val("")
                    }
                }
            } catch (p) {
            }
        }, selectWarranty: function() {
            $(".warranty-btn").click(function() {
                var o, c, f, l, j;
                var m = $(this).closest(".warranty-btn-wrap").attr("data-selFlag");
                var d = $(this).closest(".warranty-items");
                var h = d.find(".warranty-des-href");
                var n = $("#warrantyDesHref").val();
                c = $(this).closest(".warranty-btn-wrap").attr("data-type");
                f = $(this).find(".war-btn-text").html();
                l = $(this).find(".war-btn-price").html();
                if (m == "0") {
                    $(this).addClass("selected");
                    $(".directorder").addClass("disabled");
                    $(".directorder").unbind("click");
                    var p = $("#ybId").val(p);
                    p += $(this).attr("data") + "@@";
                    $("#ybId").val(p);
                    $(this).closest(".warranty-btn-wrap").attr("data-selFlag", "1");
                    $("#warranty-seled-list").find(".choose-tip").remove();
                    j = '<div class="base-txt warranty-text selected-warranty ' + c + '"><i class="warranty-icon"></i>' + f + "&nbsp;&nbsp;" + l + "</div>";
                    $("#warranty-seled-list").append(j);
                    if (h && n != "") {
                        h.attr("data-href", n + "&bindSkuId=" + $(this).attr("data"))
                    }
                } else {
                    if (m == "1") {
                        o = $(this).attr("class");
                        if (o.indexOf("selected") != -1) {
                            $(this).toggleClass("selected");
                            $(this).closest(".warranty-btn-wrap").attr("data-selFlag", "0");
                            $("#warranty-seled-list").find("div." + c).remove();
                            var g = $(this).attr("data") + "@@";
                            var p = $("#ybId").val(p);
                            p = p.replace(g, "");
                            $("#ybId").val(p);
                            if (h && n != "") {
                                h.attr("data-href", n)
                            }
                            if ($("#warranty-seled-list div").length == 0) {
                                $(".directorder").removeClass("disabled");
                                $(".directorder").bind("click", function() {
                                    addWareToCartAndNoJump()
                                });
                                $("#ybId").val("");
                                j = '<div class="base-txt warranty-text choose-tip"><i class="warranty-icon"></i>可选延保</div>';
                                $("#warranty-seled-list").append(j)
                            }
                        } else {
                            $("#warranty-seled-list").find("div." + c).remove();
                            j = '<div class="base-txt warranty-text selected-warranty ' + c + '"><i class="warranty-icon"></i>' + f + "&nbsp;&nbsp;" + l + "</div>";
                            $("#warranty-seled-list").append(j);
                            var k = $(this).closest(".warranty-btn-wrap").find(".selected").attr("data");
                            $(this).closest(".warranty-btn-wrap").find(".warranty-btn").removeClass("selected");
                            $(this).addClass("selected");
                            var p = $("#ybId").val(p);
                            var g = $(this).attr("data");
                            p = p.replace(k, g);
                            $("#ybId").val(p);
                            if (h && n != "") {
                                h.attr("data-href", n + "&bindSkuId=" + $(this).attr("data"))
                            }
                        }
                    }
                }
            })
        }};
    return b.init()
};
var poptip = function(d) {
    var l = {callback: null};
    var r = $.extend(l, d);
    var b = {emptyErr: "\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801", ruleErr: "\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", overdueErr: "\u9a8c\u8bc1\u7801\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"};
    var f = {succ: "\u9886\u53d6\u6210\u529f", err: "\u9886\u53d6\u5931\u8d25", vacancyErr: "\u4f18\u60e0\u5238\u5df2\u62a2\u5149", getAlreadyErr: "\u5df2\u9886\u53d6\uff0c\u4e0d\u80fd\u518d\u9886"};
    var c = '<div id="pop-floor" class="pop-floor J_ping" report-eventid="MProductdetail_IdentifyingCodeClose" report-eventlevel="5" report-pageparam="' + $("#currentWareId").val() + '"></div><div id="captchas-tip" class="captchas-tip">	<div class="tip-title">\u9886\u53d6\u4f18\u60e0\u5238</div>	<div id="tip-coupon" class="tip-coupon"></div>	<div class="captchas-info">		<input class="captchas-input J_ping" report-eventid="MProductdetail_IdentifyingCodeInput" report-eventlevel="5" report-pageparam="' + $("#currentWareId").val() + '" id="captchas-input" maxlength="8" type="text" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801">		<img id="code"   class="captchas-img  J_ping" report-eventid="MProductdetail_IdentifyingCodeImage" report-eventlevel="5" report-pageparam="' + $("#currentWareId").val() + '" src="/authCode/authCodePinImg.action?key=' + r.codeKey + '"  onclick="com_jd_passport_m_validateCode(\'code\', \'codeKey\', \'115\')">		<div id="tip-warn" class="tip-warn"></div>	</div>	<div class="captchas-btns">		<a href="javascript:;" id="btn-cancel" class="tip-btn btn-cancel J_ping" report-eventid="MProductdetail_IdentifyingCodeCancel" report-eventlevel="5" report-pageparam="' + $("#currentWareId").val() + '">\u53d6\u6d88</a>		<a href="javascript:;" id="btn-ensure" class="tip-btn btn-ensure J_ping" report-eventid="MProductdetail_IdentifyingCodeConfirm" report-eventlevel="5" report-pageparam="' + $("#currentWareId").val() + '">\u786e\u5b9a</a>	</div></div>';
    var j, m, a, h, s, g;
    var k = {initModel: function() {
            j = $("#pop-floor");
            if (j.length == 0) {
                $("body").append(c);
                j = $("#pop-floor")
            }
            m = $("#btn-cancel");
            a = $("#btn-ensure");
            s = document.documentElement.scrollTop || document.body.scrollTop;
            g = $("#captchas-tip").height();
            if (g) {
                $("#captchas-tip").attr("data-selfHeight", g)
            } else {
                g = $("#captchas-tip").attr("data-selfHeight")
            }
            k.setBoxPos();
            $("#body").addClass("fix-one-page")
        }, setBoxPos: function(v) {
            var z = $("#captchas-tip");
            var y, x;
            var w = document.documentElement.clientHeight || document.documentElement.clientHeight;
            y = (w - g) / 2 + s;
            z.css("top", y + "px")
        }, show: function() {
            j.css("visibility", "visible");
            $("#captchas-tip").css("visibility", "visible");
            $("#captchas-tip").css("display", "block");
            $("#captchas-input").val("")
        }, hide: function() {
            j.css("visibility", "hidden");
            $("#captchas-tip").css("visibility", "hidden");
            $("#captchas-tip").css("display", "none");
            $("#body").removeClass("fix-one-page")
        }};
    var q = function() {
        k.initModel();
        k.show();
        p();
        o()
    };
    var p = function() {
        if (r.limitPlatform) {
            $("#tip-coupon").addClass("tip-coupon-info");
            if (null != r.limitMsg && undefined != r.limitMsg && "null" != unescape(r.limitMsg)) {
                $("#tip-coupon").html(unescape(r.limitMsg))
            }
        } else {
            $("#tip-coupon").removeClass("tip-coupon-info")
        }
    };
    var t = function() {
        var v = document.querySelector("#captchas-input").value.replace(/\s/g, "");
        if (!v) {
            $("#tip-warn").css("visibility", "visible").empty().html(b.emptyErr)
        } else {
            if (!/^[a-zA-Z0-9]{3,5}$|^[\u4e00-\u9fa5]{3,5}$|^[\d]{1,3}$/ig.test(v)) {
                $("#tip-warn").css("visibility", "visible").empty().html(b.ruleErr)
            } else {
                $("#btn-ensure").unbind("click");
                jQuery.ajax({type: "POST", url: "/coupon/getActiveCoupon.json", data: {sku: $("#currentWareId").val(), codeKey: r.codeKey, validateCode: v, discount: r.discount, encryptedKey: r.encryptedKey, roleId: r.roleId, isPop: $("#couponDivShow").attr("pop-data")}, dataType: "json", success: function(y) {
                        if (y && y.couponResult) {
                            $("#" + r.couponId).attr("onclick", "");
                            $("#" + r.couponId).removeClass("blue");
                            $("#" + r.couponId).removeClass("red");
                            $("#" + r.couponId).removeClass("green");
                            $("#" + r.couponId).addClass("grep");
                            $("#" + r.couponId + "_up").html("\u5df2");
                            $("#" + r.couponId + "_down").html("\u9886");
                            $("#tip-warn").css("visibility", "hidden").empty();
                            k.hide();
                            var A = {cls: "succee-icon", duration: 3000, message: "\u9886\u53d6\u6210\u529f\uff08\u0035\u007e\u0031\u0030\u5206\u949f\u5230\u8d26\uff09", height: 88, width: 220};
                            showMessage(A);
                            com_jd_passport_m_validateCode("code", "codeKey", "115")
                        } else {
                            if (y && y.error) {
                                $("#tip-warn").css("visibility", "hidden").empty();
                                k.hide();
                                var A = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                                showMessage(A);
                                $("#" + r.couponId).bind("click", function() {
                                    t()
                                })
                            } else {
                                if (y && y.msg) {
                                    if (y.code && y.code == 3) {
                                        var w = window.location.href;
                                        if (w) {
                                            w = w.split("#")[0]
                                        }
                                        $("#tip-warn").css("visibility", "visible").empty().html('<a class="J_ping"   report-eventid="MProductdetail_OpenPayPassword" report-pageparam="' + $("#currentWareId").val() + '"   style="color:red;border-bottom: 1px solid red;" href="https://passport.m.jd.com/payPassword/openPayPassword.action?urlFrom=1&returnurl=' + w + '">' + y.msg + "</a>")
                                    } else {
                                        if (y.code && y.code == 34) {
                                            try {
                                                k.hide();
                                                var x = document.querySelector(".certification-floor");
                                                x.style.display = "block";
                                                $(".one-btn-tip-box-tip").css({marginTop: -$(".one-btn-tip-box-tip").height() / 2});
                                                $(".one-btn-tip-info").html("<span>" + y.msg + "</span>")
                                            } catch (z) {
                                                $("#tip-warn").css("visibility", "visible").empty().html(y.msg)
                                            }
                                        } else {
                                            $("#tip-warn").css("visibility", "visible").empty().html(y.msg)
                                        }
                                    }
                                } else {
                                    $("#tip-warn").css("visibility", "visible").empty().html("\u8c8c\u4f3c\u6709\u70b9\u5c0f\u95ee\u9898\uff0c\u60a8\u53ef\u4ee5\u0033\u0030\u79d2\u540e\u518d\u8bd5\u4e00\u4e0b\u54df")
                                }
                                com_jd_passport_m_validateCode("code", "codeKey", "115");
                                $("#btn-ensure").bind("click", function() {
                                    t()
                                })
                            }
                        }
                    }, error: function(z, w, x) {
                        $("#tip-warn").css("visibility", "hidden").empty();
                        k.hide();
                        if ($("#tip-warn").attr("visibility") != "hidden") {
                            var y = {cls: "error-icon", duration: 1000, message: "\u9886\u5238\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                            showMessage(y)
                        }
                    }})
            }
        }
    };
    function n() {
        var w = 0;
        var v, x;
        switch (w) {
            case 0:
                v = f.succ;
                x = "succee-icon";
                break;
            case 1:
                v = f.err;
                x = "error-icon";
                break;
            case 2:
                v = f.vacancyErr;
                x = "error-icon";
                break;
            case 3:
                v = f.getAlreadyErr;
                x = "error-icon";
                break
        }
        return{icon_name: x, msg_tip: v}
    }
    var o = function() {
        m.unbind("click");
        a.unbind("click");
        m.bind("click", function() {
            k.hide();
            $("#tip-warn").css("visibility", "hidden");
            com_jd_passport_m_validateCode("code", "codeKey", "115")
        });
        a.bind("click", function() {
            t()
        });
        j.bind("click", function() {
            k.hide();
            $("#tip-warn").css("visibility", "hidden")
        })
    };
    return q()
};
function makeAppointment() {
    try {
        if (colorSizeSpecValidate()) {
            var a = "http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html";
            var b = new Date().getTime();
            jQuery.ajax({type: "POST", url: "/ware/isAppoint.json?t=" + b, data: {wareId: $("#currentWareId").val(), sid: $("#sid").val()}, dataType: "json", success: function(g) {
                    if (g && true == g.isAppoint) {
                        var f = {cls: "error-icon", duration: 2000, message: "\u60a8\u5df2\u7ecf\u6210\u529f\u9884\u7ea6\uff0c\u65e0\u9700\u91cd\u590d\u9884\u7ea6", height: 100, width: 250};
                        showMessage(f)
                    } else {
                        jQuery.ajax({type: "POST", url: "/ware/yuYue.json?t=" + b, data: {wareId: $("#currentWareId").val(), sid: $("#sid").val()}, dataType: "json", success: function(d) {
                                if (d && d.codeKey) {
                                    $("#codeKey").val(d.codeKey);
                                    appointmentTip({codeKey: d.codeKey})
                                } else {
                                    var h = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                                    showMessage(h)
                                }
                            }, error: function(j, d, h) {
                                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=" + a
                            }})
                    }
                }, error: function(f) {
                    window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=" + a
                }})
        }
    } catch (c) {
        window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=" + a
    }
}
var appointmentTip = function(q) {
    var h = {callback: null};
    var g = $.extend(h, q);
    var f = {emptyErr: "\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801", ruleErr: "\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", overdueErr: "\u9a8c\u8bc1\u7801\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"};
    var c = '<div id="pop-floor-yuyue" class="pop-floor  J_ping" report-eventid="MProductdetail_BookingShade" report-pageparam="' + $("#currentWareId").val() + '"></div><div id="captchas-tip-yuyue" class="captchas-tip">	<div id="tip-title-yuyue" class="tip-title">\u7acb\u5373\u9884\u7ea6</div>	<div class="tip-coupon tip-coupon-info">\u9700\u8981\u9a8c\u8bc1\u7801\u4ee5\u5b8c\u6210\u9884\u7ea6</div>	<div class="captchas-info">		<input class="captchas-input J_ping" report-eventid="MProductdetail_BookingIdentifyingInput" report-pageparam="' + $("#currentWareId").val() + '" id="captchas-input-yuyue" maxlength="8" type="text" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801">		<img id="codeYuyue"   class="captchas-img  J_ping" report-eventid="MProductdetail_BookingIdentifyingPic" report-pageparam="' + $("#currentWareId").val() + '" src="/authCode/authCodePinImg.action?key=' + g.codeKey + '"  onclick="com_jd_passport_m_validateCode(\'codeYuyue\', \'codeKey\', \'112\')">		<div id="tip-warn-yuyue" class="tip-warn"></div>	</div>	<div class="captchas-btns">		<a href="javascript:;" id="btn-cancel-yuyue" class="tip-btn btn-cancel  J_ping" report-eventid="MProductdetail_BookingCancel" report-pageparam="' + $("#currentWareId").val() + '">\u53d6\u6d88</a>		<a href="javascript:;" id="btn-ensure-yuyue" class="tip-btn btn-ensure J_ping" report-eventid="MProductdetail_BookingConfirm" report-pageparam="' + $("#currentWareId").val() + '">\u786e\u5b9a</a>	</div></div>';
    var b, k, d, m, j, n;
    var o = {initModel: function() {
            b = $("#pop-floor-yuyue");
            if (b.length == 0) {
                $("body").append(c);
                b = $("#pop-floor-yuyue")
            }
            k = $("#btn-cancel-yuyue");
            d = $("#btn-ensure-yuyue");
            j = document.documentElement.scrollTop || document.body.scrollTop;
            n = $("#captchas-tip-yuyue").height();
            if (n) {
                $("#captchas-tip-yuyue").attr("data-selfHeight", n)
            } else {
                n = $("#captchas-tip-yuyue").attr("data-selfHeight")
            }
            o.setBoxPos();
            $("#body").addClass("fix-one-page")
        }, setBoxPos: function(r) {
            var w = $("#captchas-tip-yuyue");
            var v, t;
            var s = document.documentElement.clientHeight || document.documentElement.clientHeight;
            v = (s - n) / 2 + j;
            w.css("top", v + "px")
        }, show: function() {
            b.css("visibility", "visible");
            $("#captchas-tip-yuyue").css("visibility", "visible");
            $("#captchas-tip-yuyue").css("display", "block");
            $("#captchas-input-yuyue").val("")
        }, hide: function() {
            b.css("visibility", "hidden");
            $("#captchas-tip-yuyue").css("visibility", "hidden");
            $("#captchas-tip-yuyue").css("display", "none");
            $("#body").removeClass("fix-one-page")
        }};
    var p = function() {
        o.initModel();
        o.show();
        a()
    };
    var l = function() {
        var r = document.querySelector("#captchas-input-yuyue").value.replace(/\s/g, "");
        if (!r) {
            $("#tip-warn-yuyue").css("visibility", "visible").empty().html(f.emptyErr)
        } else {
            if (!/^[a-zA-Z0-9]{3,5}$|^[\u4e00-\u9fa5]{3,5}$|^[\d]{1,3}$/ig.test(r)) {
                $("#tip-warn-yuyue").css("visibility", "visible").empty().html(f.ruleErr)
            } else {
                $("#btn-ensure-yuyue").unbind("click");
                try {
                    jQuery.ajax({type: "POST", url: "/ware/appoint.json", data: {wareId: $("#currentWareId").val(), codeKey: g.codeKey, validateCode: r, sid: $("#sid").val()}, dataType: "json", success: function(w) {
                            if (w && w.isSuccess) {
                                if ("true" == w.isSuccess) {
                                    $("#tip-warn-yuyue").css("visibility", "hidden").empty();
                                    o.hide();
                                    if (w.yuyueAppoint && w.yuyueAppoint.title) {
                                        var v = w.yuyueAppoint.title;
                                        var x = {cls: "succee-icon", duration: 5000, message: v, height: 120, width: 280};
                                        if (v.indexOf("\u91cd\u590d\u9884\u7ea6") > -1 || v.indexOf("\u5df2\u7ecf\u6210\u529f") > -1) {
                                            x = {cls: "succee-icon", duration: 5000, message: v, height: 100, width: 250}
                                        }
                                        showMessage(x)
                                    } else {
                                        var x = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                                        showMessage(x)
                                    }
                                } else {
                                    $("#tip-warn-yuyue").css("visibility", "visible").empty().html(f.ruleErr);
                                    $("#btn-ensure-yuyue").bind("click", function() {
                                        l()
                                    })
                                }
                            } else {
                                $("#tip-warn-yuyue").css("visibility", "visible").empty().html(f.ruleErr);
                                $("#btn-ensure-yuyue").bind("click", function() {
                                    l()
                                })
                            }
                            com_jd_passport_m_validateCode("codeYuyue", "codeKey", "112")
                        }, error: function(y, v, w) {
                            $("#tip-warn-yuyue").css("visibility", "hidden").empty();
                            o.hide();
                            if ($("#tip-warn-yuyue").attr("visibility") != "hidden") {
                                var x = {cls: "error-icon", duration: 1000, message: "\u9884\u7ea6\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                                showMessage(x)
                            }
                            com_jd_passport_m_validateCode("codeYuyue", "codeKey", "112")
                        }})
                } catch (t) {
                    var s = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                    showMessage(s)
                }
            }
        }
    };
    var a = function() {
        k.unbind("click");
        d.unbind("click");
        k.bind("click", function() {
            o.hide();
            $("#tip-warn-yuyue").css("visibility", "hidden");
            com_jd_passport_m_validateCode("codeYuyue", "codeKey", "112")
        });
        d.bind("click", function() {
            l()
        });
        b.bind("click", function() {
            o.hide();
            $("#tip-warn-yuyue").css("visibility", "hidden")
        })
    };
    return p()
};
var validateCode = {refreshLoginCodeAjax: function(c, b, d, a) {
        $.post(c ? c : "/authCode/createCodeWithPinKey.json", {args: a}, function(f) {
            if (f) {
                f = JSON.parse(f);
                if (f.codeKey) {
                    var g = "/authCode/authCodePinImg.action?key=" + f.codeKey + "&rand=" + validateCode.getRandomNum(1, 1000000);
                    g = (encodeURI(encodeURI(g)));
                    $("#" + b).attr("src", g);
                    $("#" + d).val(f.codeKey)
                }
            }
        })
    }, getValidateCode: function(b, c, a) {
        setTimeout(function() {
            validateCode.refreshLoginCodeAjax("", b, c, a)
        }, 500)
    }, getRandomNum: function(a, c) {
        var d = c - a;
        var b = Math.random();
        return(a + Math.round(b * d))
    }};
function com_jd_passport_m_validateCode(b, c, a) {
    validateCode.getValidateCode(b, c, a)
}
var isXnzt = "0";
var isSamSku = false;
var isSamCard = false;
var isSamMember = false;
var isSamMemberAddcart = false;
var isSamMemberBName = "";
var isOilCard = false;
var addCartBizName = "";
var isCustomize = false;
var addCartURL = "";
var isGameCharge = false;
var isPrescribedDrug = false;
var isJdEcard = false;
var isFqyProduct = false;
var hasAddCartNode = false;
var orderEvent = "";
var buttonDisabledWhenNoStock = false;
var notCallLvBizNames = [];
var commonConfig;
var commonConfigJsonNode = document.getElementById("commonConfigJson");
var commonConfigJson;
var isHk = "false";
var isJdOtc = "false";
var isOtc = "false";
var wareType = "0";
var eventParam = "";
var easyByEventparam = "";
if (commonConfigJsonNode) {
    commonConfigJson = commonConfigJsonNode.value
}
var isYuyue = false;
var isYushou = false;
var isMiaosha = false;
initParam();
var aAactionListA = document.querySelectorAll(".action-list a");
for (var i = 0; i < aAactionListA.length; i++) {
    aAactionListA[i].innerHTML = aAactionListA[i].innerHTML.replace(/(^\s*)|(\s*$)/g, "")
}
function initParam() {
    if (commonConfigJson) {
        commonConfig = eval("(" + commonConfigJson + ")")
    }
    if (commonConfig && commonConfig.isXnztEnable && commonConfig.isXnzt) {
        isXnzt = commonConfig.isXnzt
    } else {
        isXnzt = "0"
    }
    if (commonConfig && commonConfig.isSamSku) {
        isSamSku = commonConfig.isSamSku
    } else {
        isSamSku = false
    }
    if (commonConfig && commonConfig.isSamCard) {
        isSamCard = commonConfig.isSamCard
    } else {
        isSamCard = false
    }
    if (commonConfig && commonConfig.isSamMember) {
        isSamMember = commonConfig.isSamMember
    } else {
        isSamMember = false
    }
    if (commonConfig && commonConfig.isSamMemberAddcart) {
        isSamMemberAddcart = commonConfig.isSamMemberAddcart
    } else {
        isSamMemberAddcart = false
    }
    if (commonConfig && commonConfig.isSamMemberBName) {
        isSamMemberBName = commonConfig.isSamMemberBName;
        addCartBizName = isSamMemberBName
    } else {
        isSamMemberBName = "";
        addCartBizName = ""
    }
    if (commonConfig && commonConfig.isOilCard) {
        isOilCard = commonConfig.isOilCard
    } else {
        isOilCard = false
    }
    if (commonConfig && commonConfig.addCartBizName) {
        addCartBizName = commonConfig.addCartBizName
    } else {
        addCartBizName = ""
    }
    if (commonConfig && commonConfig.isCustomize) {
        isCustomize = commonConfig.isCustomize
    } else {
        isCustomize = false
    }
    if (commonConfig && commonConfig.addCartUrl) {
        addCartURL = commonConfig.addCartUrl
    } else {
        addCartURL = ""
    }
    if (commonConfig && commonConfig.isGameCharge) {
        isGameCharge = commonConfig.isGameCharge
    } else {
        isGameCharge = false
    }
    if (commonConfig && commonConfig.isPrescribedDrug) {
        isPrescribedDrug = commonConfig.isPrescribedDrug
    } else {
        isPrescribedDrug = false
    }
    if (commonConfig && commonConfig.isYuyue) {
        isYuyue = commonConfig.isYuyue
    } else {
        isYuyue = false
    }
    if (commonConfig && commonConfig.isYushou) {
        isYushou = commonConfig.isYushou
    } else {
        isYushou = false
    }
    if (commonConfig && commonConfig.hasAddCartNode) {
        hasAddCartNode = commonConfig.hasAddCartNode
    } else {
        hasAddCartNode = false
    }
    if (commonConfig && commonConfig.isJdEcard) {
        isJdEcard = commonConfig.isJdEcard
    } else {
        isJdEcard = false
    }
    if (commonConfig && commonConfig.addCartBizName == "staging") {
        isFqyProduct = true
    } else {
        isFqyProduct = false
    }
    if (commonConfig && commonConfig.orderEvent) {
        orderEvent = commonConfig.orderEvent
    } else {
        orderEvent = ""
    }
    if (commonConfig && commonConfig.buttonDisabledWhenNoStock) {
        buttonDisabledWhenNoStock = commonConfig.buttonDisabledWhenNoStock
    } else {
        buttonDisabledWhenNoStock = false
    }
    if (commonConfig && commonConfig.notCallLvBizNames) {
        notCallLvBizNames = commonConfig.notCallLvBizNames
    } else {
        notCallLvBizNames = []
    }
    if (commonConfig && commonConfig.isMiaosha) {
        isMiaosha = true
    }
    if ($("#isHk") && $("#isHk").val()) {
        isHk = $("#isHk").val()
    } else {
        isHk = "false"
    }
    if ($("#isJdOtc") && $("#isJdOtc").val()) {
        isJdOtc = $("#isJdOtc").val()
    } else {
        isJdOtc = "false"
    }
    if ($("#isOtc") && $("#isOtc").val()) {
        isOtc = $("#isOtc").val()
    } else {
        isOtc = "false"
    }
    if (isHk && isHk == "true") {
        wareType = "1"
    } else {
        if (isOtc && isOtc == "true") {
            wareType = "2"
        } else {
            if (isSamSku || isSamCard) {
                wareType = "3"
            } else {
                if (isMiaosha) {
                    wareType = "4"
                } else {
                    wareType = "0"
                }
            }
        }
    }
    eventParam = $("#currentWareId").val() + "_" + wareType;
    var easyType = "0";
    if (isMiaosha) {
        easyType = "1"
    }
    easyByEventparam = $("#currentWareId").val() + "_" + easyType
}
$(function() {
    try {
        if ($("#puller")) {
            $("#puller").generateRegionList({actionURL: "/ware/thirdAddress.json?checkParam=" + $("#addressSign").val(), wareID: $("#currentWareId").val(), initFlag: true})
        }
    } catch (aa) {
    }
    try {
        var U = navigator.userAgent;
        var H = (U.match(/MQQBrowser/i)) ? true : false;
        var E = (U.match(/MicroMessenger/i)) ? true : false;
        if (commonConfig && commonConfig.thirdAppToQQBrowser && commonConfig.thirdAppToQQBrowser == "true") {
            var n = document.createElement("iframe");
            n.style.cssText = "display:none;width:0px;height:0px;";
            document.body.appendChild(n);
            var f = new Date().getTime();
            var W = getCookie("__jdv");
            var q = "";
            if (W && W != "" && W.split("|").length >= 6) {
                var F = W.split("|");
                q = "&utm_source=" + F[1] + "&utm_campaign=" + F[2] + "&utm_media=" + F[3] + "&utm_term=" + F[4]
            }
            var c = "mttbrowser://url=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html?thirdAppParam=thirdApp" + q + ",ChannelID=com.jd.m,encoded=0,PosID=102,openqbtime=" + f + ",windowType=1";
            n.src = c;
            if (H && !E) {
            } else {
                n.src = c
            }
        }
    } catch (aa) {
    }
    try {
        var I = $("#wxIPhoneControul").val();
        var y = $("#couponDetailShow").val();
        if (I != "" && "true" == I && (y == "" || y == null || y == undefined)) {
            var K = new Date();
            var n = document.createElement("iframe");
            n.style.cssText = "display:none;width:0px;height:0px;";
            document.body.appendChild(n);
            var B = $("#resourceType").val();
            var p = $("#resourceValue").val();
            if (B == "" || B == null || B == undefined || B != "M_APP_SAOMA") {
                B = "MWEIXIN_PRODUCT_TYPE";
                p = "MWEIXIN_PRODUCT_VALUE"
            }
            var g = 'openApp.jdMobile://virtual?params={"category":"jump","des":"productDetail","skuId":"' + $("#currentWareId").val() + '","sourceType":"' + B + '","sourceValue":"' + p + '"}';
            try {
                var D = [];
                try {
                    D.push('"m_param":' + MPing.EventSeries.getSeries())
                } catch (aa) {
                    D.push('"m_param":null')
                }
                var S = D.join(",");
                if (S) {
                    g = g.split("}")[0] + "," + S + "}"
                }
            } catch (aa) {
            }
            n.src = g
        }
    } catch (aa) {
    }
    var G = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    var j = G - 114 + (w / 2);
    var O = G - 135 + (w / 2);
    document.getElementById("cart").style.left = j + "px";
    document.getElementById("tip").style.left = O + "px";
    newDetailInit();
    $("#cartyuyue").bind("click", function() {
        jQuery.ajax({url: urlEncode("/ware/isAppoint.json", $("#sid").val()), data: {wareId: $("#currentWareId").val()}, dataType: "json", success: function(ah) {
                try {
                    if (ah && true == ah.isAppoint) {
                        Y()
                    } else {
                        $("#tip").css("display", "block");
                        if (ah && ah.text != null && ah.text != "") {
                            $(".pop-txt").text(ah.text)
                        } else {
                            $(".pop-txt").text("\u7cfb\u7edf\u7e41\u5fd9,\u8bf7\u7a0d\u540e\u518d\u8bd5!")
                        }
                        var af = 100;
                        var ae = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                        var ag = document.documentElement.clientHeight || document.body.clientHeight;
                        document.getElementById("tip").style.bottom = ((ag - af) / 2 - ae) + "px";
                        $("#myyuyue").css("display", "none")
                    }
                } catch (ad) {
                    window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
                }
            }, error: function(ad) {
                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
            }})
    });
    $("#focusOn").bind("click", function() {
        var af = document.getElementById("focusOn");
        var ae = af.querySelector(".btm-act-icn");
        var ad = ae.className;
        if (ad.indexOf("focus-out") == -1) {
            jQuery.ajax({url: urlEncode("/user/cancelFavorite.json", $("#sid").val()), data: {wareId: $("#currentWareId").val()}, dataType: "json", success: function(ai) {
                    try {
                        ae.className = ad.replace("focus-on", "focus-out");
                        $(af).find(".btm-act-icn").removeClass("click-focus-show");
                        $(af).find(".focus-scale").css("display", "none");
                        $(af).find(".focus-info").text("关注");
                        var ah = {cls: "succee-icon", duration: 1000, message: "\u53d6\u6d88\u5173\u6ce8", height: 88, width: 180};
                        showMessage(ah)
                    } catch (ag) {
                        window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
                    }
                }, error: function(ag) {
                    window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
                }})
        } else {
            jQuery.ajax({url: urlEncode("/user/addFavorite.json", $("#sid").val()), data: {wareId: $("#currentWareId").val()}, dataType: "json", success: function(ai) {
                    try {
                        ae.className = ad.replace("focus-out", "focus-on");
                        $(af).find(".focus-scale").css("display", "inline-block");
                        $(af).find(".btm-act-icn").attr("class", "btm-act-icn focus-on click-focus-show");
                        $(af).find(".focus-scale").attr("class", "focus-scale focus-scale-show");
                        $(af).find(".focus-info").text("已关注");
                        var ah = {cls: "succee-icon", duration: 1000, message: "\u5173\u6ce8\u6210\u529f", height: 88, width: 180};
                        showMessage(ah)
                    } catch (ag) {
                        window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
                    }
                }, error: function(ag) {
                    window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
                }})
        }
    });
    var Y = function() {
        beforeAddCart("1");
        if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
            $(".cart-loading-icon").css("display", "inline-block")
        }
        modify();
        if (colorSizeSpecValidate()) {
            if (isPrescribedDrug) {
                addDrugToCart()
            } else {
                if (isJdEcard) {
                    addJdEcardToCart()
                } else {
                    if ("1" == $("#type").val() || "true" == $("#isBuyCode").val() || isSamCard || isOilCard || isCustomize || isGameCharge || hasAddCartNode) {
                        if ("1" == $("#type").val()) {
                            if (isSpecWindowOpen()) {
                                pingAddClickWithLevel("MProductdetail_PurchaseImmediately", "W", "", $("#currentWareId").val(), "5")
                            } else {
                                pingAddClickWithLevel("MProductdetail_PurchaseImmediately", "N", "", $("#currentWareId").val(), "5")
                            }
                        } else {
                            if ("true" == $("#isBuyCode").val()) {
                                pingAddClickWithLevel("MProductdetail_ShoppingCodeBuy", "", "", $("#currentWareId").val(), "5")
                            }
                        }
                        if (isSamCard) {
                            pingClickWithLevel("MProductdetail_SamCardBuy", "", "", "", "")
                        }
                        if (isOilCard) {
                            if (isSpecWindowOpen()) {
                                pingClickWithLevel("MProductdetail_OilCardOrder", "W", "", $("#currentWareId").val(), "5")
                            } else {
                                pingClickWithLevel("MProductdetail_OilCardOrder", "N", "", $("#currentWareId").val(), "5")
                            }
                        }
                        if (isCustomize) {
                            if (isSpecWindowOpen()) {
                                pingClickWithLevel("MProductdetail_Customization", $("#currentWareId").val() + "_W", "", $("#currentWareId").val(), "3")
                            } else {
                                pingClickWithLevel("MProductdetail_Customization", $("#currentWareId").val() + "_N", "", $("#currentWareId").val(), "3")
                            }
                        }
                        if (isGameCharge) {
                            pingClickWithLevel("MProductdetail_GameCardOrder", "", "", "", "5")
                        }
                        if (hasAddCartNode) {
                            sendAddCartNodeEvent(orderEvent)
                        }
                        if (addCartBizName && addCartBizName == "staging") {
                            fqyJump(addCartBizName)
                        } else {
                            judgeKO($("#currentWareId").val(), $("#sid").val(), addCartBizName)
                        }
                    } else {
                        try {
                            if (isSpecWindowOpen()) {
                                pingAddClickWithEventParam("MProductdetail_SpecificationAddtocart", eventParam, "", $("#currentWareId").val(), "5")
                            } else {
                                pingAddClickWithEventParam("MProductdetail_Addtocart", eventParam, "", $("#currentWareId").val(), "5")
                            }
                            floorABCTestPing("MProductdetail_ABtestAddtocartClick");
                            openAppABCTest("MProductdetail_jiache")
                        } catch (ad) {
                            pingAddClickWithEventParam("MProductdetail_Addtocart", eventParam, "", $("#currentWareId").val(), "5")
                        }
                        newAddWare($("#currentWareId").val(), $("#number").val(), false, $("#ybId").val(), $("#resourceType").val(), $("#resourceValue").val(), $("#sid").val())
                    }
                }
            }
        }
    };
    var Q = function() {
        beforeAddCart("2");
        modify();
        if (colorSizeSpecValidate() && "0" == isXnzt) {
            if (isSpecWindowOpen()) {
                pingAddClickWithEventParam("MProductdetail_SpecificationEasybuy", easyByEventparam, "", $("#currentWareId").val(), "5")
            } else {
                pingAddClickWithEventParam("MProductdetail_Easybuy", easyByEventparam, "", $("#currentWareId").val(), "5")
            }
            floorABCTestPing("MProductdetail_ABtestEasybuyClick");
            openAppABCTest("MProductdetail_ljgm");
            var ah = false;
            try {
                var ag = $("#mpingAbtest").val();
                if (ag) {
                    var ae = getCookie("abtest");
                    if (ae != "" && ae != null && ae.indexOf("_") > -1) {
                        var ad = ae.split("_");
                        if (ad.length > 1 && ad[1] != "" && ad[1] != null && parseInt(ad[1]) < ag) {
                            ah = true
                        }
                    }
                }
            } catch (af) {
            }
            if (isJdEcard) {
                tojdEcartPage($("#currentWareId").val(), $("#number").val())
            } else {
                if (ah) {
                    setTimeout(function() {
                        try {
                            newAddWare($("#currentWareId").val(), $("#number").val(), true, $("#ybId").val(), $("#resourceType").val(), $("#resourceValue").val(), $("#sid").val())
                        } catch (ai) {
                        }
                    }, 100)
                } else {
                    newAddWare($("#currentWareId").val(), $("#number").val(), true, $("#ybId").val(), $("#resourceType").val(), $("#resourceValue").val(), $("#sid").val())
                }
            }
        }
    };
    var v = function() {
        var ae = $("#sid").val();
        var ad = "http://p.m.jd.com/cart/cart.action";
        pingClickWithLevel("MProductdetail_GotoCart", $("#currentWareId").val(), "", $("#currentWareId").val(), "5");
        if (ae != null && ae != "") {
            ad += "?sid=" + ae
        }
        window.location.href = ad
    };
    $(".add_cart").bind("click", Y);
    $(".directorder").bind("click", Q);
    if ($("#toCart").length > 0) {
        $("#toCart").click(v)
    }
    var V, ac;
    ac = $("#yuyueType").val();
    if ("true" == $("#isYuYue").val()) {
        switch (ac) {
            case"1":
                $("#bottom_prompt_msg_div").show();
                $(".hold-div-bottom").attr("style", "display:block");
                V = new Date().getTime() / 1000 + parseInt($("#yuYueStartTime").val().length > 0 ? $("#yuYueStartTime").val() : 0);
                C();
                break;
            case"2":
                $("#bottom_prompt_msg_div").show();
                $(".hold-div-bottom").attr("style", "display:block");
                V = new Date().getTime() / 1000 + parseInt($("#yuYueEndTime").val().length > 0 ? $("#yuYueEndTime").val() : 0);
                C();
                break;
            case"3":
                $("#bottom_prompt_msg_div").show();
                $(".hold-div-bottom").attr("style", "display:block");
                if ($("#buyStartTime").val() != "" && $("#buyStartTime").val() != null && $("#buyStartTime").val().length > 0) {
                    V = new Date().getTime() / 1000 + parseInt($("#buyStartTime").val().length > 0 ? $("#buyStartTime").val() : 0);
                    C()
                } else {
                    $("#prompt_msg").text("\u62a2\u8d2d\u672a\u5f00\u59cb\uff0c\u656c\u8bf7\u5173\u6ce8")
                }
                break;
            case"4":
                $("#bottom_prompt_msg_div").show();
                $(".hold-div-bottom").attr("style", "display:block");
                if ("false" == $("#cartFlag").val()) {
                    $(".buyImmediately").addClass("disabled");
                    $(".buyImmediately").unbind("click")
                }
                V = new Date().getTime() / 1000 + parseInt($("#buyEndTime").val().length > 0 ? $("#buyEndTime").val() : 0);
                C();
                break;
            case"5":
                if ("true" == $("#isYuYue").val()) {
                    $("#bottom_prompt_msg_div").hide();
                    $(".hold-div-bottom").attr("style", "display:none")
                }
                break;
            default:
                break
            }
    } else {
        if ("true" == $("#cartFlag").val()) {
            $("#bottom_prompt_msg_div").hide();
            $(".hold-div-bottom").attr("style", "display:none");
            if (isSamCard && isSamMember) {
                $(".add_cart").addClass("disabled");
                $(".add_cart").unbind("click")
            }
        } else {
            $("#bottom_prompt_msg_div").show();
            $(".hold-div-bottom").attr("style", "display:block");
            if ($("#stockStatus").text()) {
                $("#prompt_msg").text($("#stockStatus").text())
            } else {
                if ($("#reasonTips").val() != "") {
                    $("#prompt_msg").text($("#reasonTips").val())
                } else {
                    $("#bottom_prompt_msg_div").hide();
                    $(".hold-div-bottom").attr("style", "display:none")
                }
            }
            if (isJdOtc == "true" || isHk == "true" || isSamCard || isCustomize || isPrescribedDrug || (hasAddCartNode && buttonDisabledWhenNoStock)) {
                $(".add_cart").addClass("disabled");
                $(".add_cart").unbind("click")
            } else {
                $(".add_cart").hide();
                $(".directorder").hide();
                $(".looksimilar").show();
                if ($("#stockNotice").val() == "true") {
                    $(".arrivalInform").show();
                    if ($("#cart1").hasClass("four-column-l3r1")) {
                        $("#cart1").removeClass("four-column-l3r1");
                        $("#cart1").addClass("five-column")
                    }
                    if ($("#cart1").hasClass("three-column")) {
                        $("#cart1").removeClass("three-column");
                        $("#cart1").addClass("four-column")
                    }
                    if ($("#cart1").hasClass("four-column")) {
                        $("#cart1").removeClass("four-column");
                        $("#cart1").addClass("four-column")
                    }
                    if ($(".looksimilar").hasClass("red-color")) {
                        $(".looksimilar").addClass("yellow-color");
                        $(".looksimilar").removeClass("red-color")
                    }
                } else {
                    $(".arrivalInform").hide();
                    if ($("#cart1").hasClass("five-column")) {
                        $("#cart1").removeClass("five-column");
                        $("#cart1").addClass("four-column-l3r1")
                    }
                    if ($("#cart1").hasClass("four-column")) {
                        $("#cart1").removeClass("four-column");
                        $("#cart1").addClass("three-column")
                    }
                    if ($(".looksimilar").hasClass("yellow-color")) {
                        $(".looksimilar").addClass("red-color");
                        $(".looksimilar").removeClass("yellow-color")
                    }
                }
            }
        }
    }
    if (isSamCard && !isSamMemberAddcart) {
        $(".add_cart").addClass("disabled");
        $(".add_cart").unbind("click")
    }
    var s = $("#arrvalinTel");
    var L = $("#arrvalinMsg");
    s.onblur = function() {
        var ad = handlePhone(s.value);
        if (ad[0] != "0") {
            s.value = "";
            L.text(ad[1]);
            L.show()
        }
    };
    s.onfocus = function() {
        L.hide()
    };
    $("#depreciatebt").bind("click", function() {
        var ad = handlePhone($.trim($("#arrvalinTel").val()));
        if (ad[0] == "0") {
            jQuery.ajax({url: "/ware/skuNotice.json", data: {sid: $("#sid").val(), skuId: $("#currentWareId").val(), phoneNo: $("#arrvalinTel").val(), address: $("#btn-select-region").attr("region-data")}, dataType: "json", success: function(aj) {
                    try {
                        if (aj && aj.skuNotice) {
                            var ag = document.getElementById("productInformFloor");
                            var ak = document.getElementById("arrvalInformBlock");
                            var ae = document.getElementsByTagName("body")[0];
                            ae.removeChild(ag);
                            ak.style.display = "none";
                            var af = aj.skuNotice.code;
                            if (af == 0) {
                                var ai = {cls: "succee-icon", duration: 1000, message: "\u64cd\u4f5c\u6210\u529f", height: 88, width: 180};
                                showMessage(ai)
                            } else {
                                var ai = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                                showMessage(ai)
                            }
                            return
                        } else {
                            var ag = document.getElementById("productInformFloor");
                            var ak = document.getElementById("arrvalInformBlock");
                            var ae = document.getElementsByTagName("body")[0];
                            ae.removeChild(ag);
                            ak.style.display = "none";
                            var ai = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                            showMessage(ai);
                            return
                        }
                    } catch (ah) {
                        var ag = document.getElementById("productInformFloor");
                        var ak = document.getElementById("arrvalInformBlock");
                        var ae = document.getElementsByTagName("body")[0];
                        ae.removeChild(ag);
                        ak.style.display = "none";
                        var ai = {cls: "error-icon", duration: 1000, message: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", height: 88, width: 180};
                        showMessage(ai);
                        return
                    }
                }, error: function(ae) {
                    window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
                }})
        }
    });
    $(".buyImmediately").bind("click", function() {
        if (!$(".buyImmediately").hasClass("disabled")) {
            buyImmediatelyClickFunction()
        }
    });
    $(".makeAppointments").bind("click", function() {
        if (isSpecWindowOpen()) {
            pingClickWithLevel("MProductdetail_SubscribeImmediately", "W", "", $("#currentWareId").val(), "5")
        } else {
            pingClickWithLevel("MProductdetail_SubscribeImmediately", "N", "", $("#currentWareId").val(), "5")
        }
        makeAppointment()
    });
    var x;
    function l(ai) {
        var ad = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        var ah = document.documentElement.clientWidth || document.body.clientWidth;
        var ag = ad - 60 + (ah / 2);
        document.getElementById("save").style.left = ag + "px";
        var ae = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var aj = document.documentElement.clientHeight || document.body.clientHeight;
        var af = ae - 25 + (aj / 2);
        document.getElementById("save").style.top = af + "px";
        if (1 == ai) {
            $("#guanzhu").html("\u53d6\u6d88\u6210\u529f")
        } else {
            $("#guanzhu").html("\u5173\u6ce8\u6210\u529f")
        }
        $(".pop-attention").show();
        setTimeout(function() {
            $(".pop-attention").hide()
        }, 3000)
    }
    function C() {
        var ai = new Date().getTime() / 1000;
        var aj = parseInt(V - ai);
        var ah, af, ae, ag, ad;
        if (aj >= 0) {
            ah = Math.floor(aj / 86400);
            af = Math.floor((aj - ah * 86400) / 3600);
            ae = Math.floor((aj - ah * 86400 - af * 3600) / 60);
            ag = Math.floor(aj - ah * 86400 - af * 3600 - ae * 60);
            if (parseInt(ah) > 0) {
                ad = ah + "\u5929" + af + "\u5c0f\u65f6" + ae + "\u5206\u949f"
            } else {
                ad = af + "\u5c0f\u65f6" + ae + "\u5206\u949f" + ag + "\u79d2"
            }
            if ("1" == ac) {
                $("#prompt_msg").text("\u8ddd\u9884\u7ea6\u5f00\u59cb\u8fd8\u6709" + ad)
            } else {
                if ("2" == ac) {
                    $("#prompt_msg").text("\u8ddd\u9884\u7ea6\u7ed3\u675f\u8fd8\u6709" + ad)
                } else {
                    if ("3" == ac) {
                        $("#prompt_msg").text("\u8ddd\u62a2\u8d2d\u5f00\u59cb\u8fd8\u6709" + ad)
                    } else {
                        if ("4" == ac) {
                            if ("true" == $("#cartFlag").val() && $("#stockStatus").text().indexOf("\u62b1\u6b49") <= 0) {
                                $("#prompt_msg").text("\u8ddd\u62a2\u8d2d\u7ed3\u675f\u8fd8\u6709" + ad)
                            } else {
                                if ($("#stockStatus").text()) {
                                    $("#prompt_msg").text($("#stockStatus").text())
                                } else {
                                    $("#prompt_msg").text("\u62b1\u6b49\uff0c\u6240\u9009\u5730\u533a\u6682\u65f6\u65e0\u8d27")
                                }
                            }
                        }
                    }
                }
            }
            if (0 == parseInt(aj)) {
                window.location.reload()
            }
            if (aj > 0) {
                setTimeout(function() {
                    C()
                }, 1000)
            }
        }
    }
    function m(ae) {
        if (ae && ae.yuYue && ae.yuYue.isYuYue) {
            var ad = "http://item.m.jd.com/yuyue/" + ae.ware.wareId + ".html";
            $("#nowyuyue").attr("href", ad);
            $("#cart1").css("display", "none");
            ac = ae.yuYue.yuyueType;
            if ("1" == ae.yuYue.yuyueType) {
                $("#yuyuecart").css("display", "none");
                $("#yuyuenow").css("display", "none");
                $("#yuyueing").find(".btn-yuyue").attr("data", "1");
                $("#yuyuecontext").text("\u5f00\u59cb\u9884\u7ea6");
                $("#yuyueing").show();
                V = new Date().getTime() / 1000 + parseInt(ae.yuYue.yuYueStartTime);
                getTimes()
            } else {
                if ("2" == ae.yuYue.yuyueType) {
                    $("#yuyueing").css("display", "none");
                    $("#yuyuecart").css("display", "none");
                    $(".btn-yuyue2").attr("data", "2");
                    $("#yuyuenow").show();
                    $("#yuyuenow").css("display", "block");
                    V = new Date().getTime() / 1000 + parseInt(ae.yuYue.yuYueEndTime);
                    getTimes()
                } else {
                    if ("3" == ae.yuYue.yuyueType) {
                        $("#test2").text(ae.yuYue.buyStartTime);
                        $("#yuyuenow").css("display", "none");
                        $("#yuyuecart").css("display", "none");
                        $("#yuyueing").show();
                        $("#yuyueing").find(".btn-yuyue").attr("data", "3");
                        $("#yuyuetime").empty();
                        $("#yuyuecontext").empty();
                        if (parseInt(ae.yuYue.buyStartTime) > 0) {
                            $("#yuyuecontext").text("\u5f00\u59cb\u62a2\u8d2d");
                            V = new Date().getTime() / 1000 + parseInt(ae.yuYue.buyStartTime);
                            getTimes()
                        } else {
                            $("#yuyuetime").text("\u62a2\u8d2d\u672a\u5f00\u59cb\uff0c\u656c\u8bf7\u5173\u6ce8");
                            $("#yuyuecontext").empty()
                        }
                    } else {
                        if ("4" == ae.yuYue.yuyueType) {
                            $("#yuyueing").css("display", "none");
                            $("#yuyuenow").css("display", "none");
                            $("#yuyuecart").show();
                            $("#cartyuyue").attr("data", "4");
                            V = new Date().getTime() / 1000 + parseInt(ae.yuYue.buyEndTime);
                            getTimes()
                        } else {
                            if ("5" == ae.yuYue.yuyueType) {
                                $("#yuyueendcontext").text("\u62a2\u8d2d\u5df2\u7ed3\u675f");
                                $("#yuyueend").css("display", "block")
                            }
                        }
                    }
                }
            }
        } else {
            $("#cart1").css("display", "table");
            $(".add_cart").removeClass("btn-cart-def");
            $(".directorder").removeClass("btn-buy-def")
        }
    }
    if ($("#imBottom").length > 0) {
        var h = "";
        if (commonConfig && commonConfig.shopUrlConf) {
            h = "https://chat.jd.com/merchant/index?v=6&sku=" + $("#currentWareId").val() + "&imgUrl=" + $("#imgUrl").val() + "&goodName=" + encodeURIComponent(encodeURIComponent($("#goodName").val())) + "&jdPrice=" + $("#jdPrice").val() + "&sid=" + $("#sid").val() + "&entry=m_item"
        } else {
            h = "https://im.m.jd.com/merchant/index?v=6&sku=" + $("#currentWareId").val() + "&imgUrl=" + $("#imgUrl").val() + "&goodName=" + encodeURIComponent(encodeURIComponent($("#goodName").val())) + "&jdPrice=" + $("#jdPrice").val() + "&sid=" + $("#sid").val()
        }
        $("#imBottom").attr("href", h)
    }
    var R = $("#cartJson").val();
    if (R && "true" == R) {
        $.post("cartNum.json", {sid: $("#sid").val()}, function(ae) {
            if (ae && ae.cartJson && ae.cartJson.Num) {
                var ad = ae.cartJson.Num;
                if (ad != null && ad != undefined && ad.length != 0 && parseInt(ad) > 0) {
                    if (parseInt(ad) > 99) {
                        $("#carNum").text("99+")
                    } else {
                        $("#carNum").text(ad)
                    }
                }
            }
        }, "json")
    }
    if (I != "" && "true" == I && (y == "" || y == null || y == undefined)) {
        setTimeout(function() {
            try {
                pingClick("ProductDetail_ToAPP_Virtual", "Test A", "", $("#currentWareId").val())
            } catch (ad) {
            }
        }, 100)
    } else {
        if ($("#weixinAbtest").val() && "true" == $("#weixinAbtest").val() && $("#computControul").val() && "true" == $("#computControul").val()) {
            setTimeout(function() {
                try {
                    pingClick("ProductDetail_ToAPP_Virtual", "Test B", "", $("#currentWareId").val())
                } catch (ad) {
                }
            }, 100)
        }
    }
    var N = document.querySelector(".oversea-tip");
    var A = document.querySelector(".oversea-menu");
    var ab = document.querySelector(".flick-menu-mask");
    var b = document.querySelector(".oversea-menu-content");
    var r = document.querySelector(".oversea-menu-close");
    var X = document.querySelector(".oversea-ok");
    if (N && A) {
        N.addEventListener("click", function() {
            ab.style.display = "block";
            b.style.display = "block";
            b.classList.add("oversea-menu-show");
            if (b.classList.contains("oversea-menu-back")) {
                b.classList.remove("oversea-menu-back")
            }
        }, false)
    }
    var T = function() {
        ab.style.display = "none";
        b.classList.remove("oversea-menu-show");
        b.classList.add("oversea-menu-back");
        b.style.display = "none"
    };
    if (r) {
        r.addEventListener("click", T, false)
    }
    if (X) {
        X.addEventListener("click", T, false)
    }
    var a = document.getElementById("natureID");
    var ab = document.querySelector(".flick-menu-mask");
    var k = document.querySelector(".spec-menu-content");
    var d = document.querySelector(".spec-menu-close");
    var Z = document.getElementById("ybId");
    var J = document.querySelector(".spec-menu-middle");
    var t = document.querySelector(".service-menu");
    var b = document.querySelector(".oversea-menu-content");
    var P = 0;
    J.addEventListener("scroll", function(ad) {
        if (ad.target.scrollTop > 100 && P == 0) {
            pingClickWithLevel("MProductdetail_SpecificationSlide", "", "", "", "");
            P++
        }
    }, false);
    if (a) {
        a.addEventListener("click", function() {
            ab.style.display = "block";
            k.style.display = "block";
            k.classList.add("spec-menu-show");
            if (k.classList.contains("spec-menu-back")) {
                k.classList.remove("spec-menu-back")
            }
            pingClickWithLevel("MProductdetail_SpecificationWindow", "", "", "", "4");
            updateSpecBottomButton()
        }, false)
    }
    var o = function() {
        ab.style.display = "none";
        k.classList.remove("spec-menu-show");
        k.classList.add("spec-menu-back");
        k.style.display = "none";
        jdM.sessionstorage.set("ybId", Z.value);
        jdM.sessionstorage.set("ybSku", $("#currentWareId").val());
        P = 0;
        try {
            jdM.sessionstorage.set("skuIdNum", $("#currentWareId").val() + "-" + $("#number").val())
        } catch (af) {
        }
        var ae = "";
        try {
            var ag = $("#dist").val();
            if (ag && ag == "jd") {
                ae = "?dist=jd"
            }
        } catch (af) {
        }
        if ($("#currentWareId").val() != $("#preWareId").val()) {
            var ad = "/product/" + $("#currentWareId").val() + ".html" + ae;
            location.href = ad
        }
    };
    if (d) {
        d.addEventListener("click", function() {
            pingClickWithLevel("MProductdetail_SpecificationClose", "", "", "", "");
            o()
        }, false)
    }
    if (ab) {
        ab.addEventListener("click", function() {
            if (b && b.style.display == "block") {
                T()
            } else {
                if (k && k.style.display == "block") {
                    pingClickWithLevel("MProductdetail_SpecificationMask", "", "", "", "");
                    o()
                } else {
                    if (t && t.style.display == "block") {
                        serviceClose()
                    }
                }
            }
        }, false)
    }
    try {
        var z = jdM.sessionstorage.get("skuIdNum");
        if (z && z.split("-").length == 2) {
            if ($("#currentWareId").val() == z.split("-")[0]) {
                $("#number").val(z.split("-")[1]);
                modify()
            } else {
                jdM.sessionstorage.remove("skuIdNum")
            }
        } else {
            jdM.sessionstorage.remove("skuIdNum")
        }
    } catch (aa) {
    }
    picShowGoback();
    replyListGoBack();
    warePicShowGoback();
    if (isPrescribedDrug) {
        setDrugCartNum()
    }
    if (isJdEcard) {
        setjdECartNum()
    }
});
function buyImmediatelyClickFunction() {
    if (colorSizeSpecValidate()) {
        pingClickWithLevel("MProductdetail_ImmediatelyBuy", "", "", $("#currentWareId").val(), "5");
        jQuery.ajax({url: urlEncode("/ware/isAppoint.json", $("#sid").val()), data: {wareId: $("#currentWareId").val()}, dataType: "json", success: function(f) {
                try {
                    if (f && true == f.isAppoint) {
                        addWareToCart()
                    } else {
                        var c = "";
                        if (f && f.text) {
                            c = ""
                        } else {
                            c = "\u7cfb\u7edf\u7e41\u5fd9,\u8bf7\u7a0d\u540e\u518d\u8bd5!"
                        }
                        var b = {cls: "succee-icon", duration: 2000, message: c, height: 88, width: 180};
                        showMessage(b)
                    }
                } catch (a) {
                    var b = {cls: "error-icon", duration: 2000, message: "\u7cfb\u7edf\u7e41\u5fd9,\u8bf7\u7a0d\u540e\u518d\u8bd5!", height: 88, width: 180};
                    showMessage(b)
                }
            }, error: function(a) {
                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
            }})
    }
}
function newDetailInit() {
    try {
        slide("#slide").init({startIndex: 0, number: true, laseMoveFn: jump, lastImgSlider: sliderJump, preDef: "lnr", location: true, autoPlay: false, autoHeight: false, mpingEvent: "MProductdetail_SlideFocusPic", wareId: $("#currentWareId").val(), isBanOneImg: false, numberWrapId: "#slidePageNub"})
    } catch (g) {
    }
    initDetail({argObj: {seckill: {seckillTime: "2015-08-03 20:00:02", timeRemain: $("#miaoshaRemainTime").val()}}, seckillCallback: function() {
            try {
                var h = parseInt($("#refresh").val());
                if (h > 0 && h < 3) {
                    location.href = "/product/" + $("#currentWareId").val() + ".html?refresh=" + $("#refresh").val();
                    return false
                }
            } catch (j) {
            }
            return false
        }});
    serviceExpand();
    serviceAndExtendWarranty(true);
    if ($("#isShowDetail").val() != "false" && $("#currentWareId").val() != "") {
     //   commentListInit({containerID: "comment-listID", url: "data.json", maxCount: 3, fontSize: 14, filters: {}})
    } else {
        $("#comments").parent().text("");
        $("#goods").parent().text("")
    }
    var d = document.querySelector(".spec-first-pic");
    var a = document.querySelector(".big-pic-popups");
    var c = document.querySelector("#bigPicPageNub .btn-arrow-left");
    var f = document.documentElement.clientWidth;
    var b = document.querySelector(".scroll-big-imgs");
    b.style.marginTop = -f / 2 + "px";
    d.addEventListener("click", function() {
        pingClickWithLevel("MProductdetail_SpecificationPic", "", "", "", "");
        specBigPicRequest()
    }, false);
    a.addEventListener("click", function() {
        var h = document.querySelector('#bigPicPageNub [data-slide-num="slideNub"]').innerHTML;
        pingClickWithLevel("MProductdetail_SpecBigPicClick", h, "", $("#currentWareId").val(), "");
        $(".big-pic-popups").fadeOut()
    }, false);
    c.addEventListener("click", function(h) {
        h.stopPropagation();
        var j = document.querySelector('#bigPicPageNub [data-slide-num="slideNub"]').innerHTML;
        pingClickWithLevel("MProductdetail_SpecBigPicBack", j, "", $("#currentWareId").val(), "");
        $(".big-pic-popups").fadeOut()
    }, false);
    warDesClickFn()
}
function warDesClickFn() {
    $(".warranty-des-href").on("click", function() {
        pingClickWithLevel("MProductdetail_SpecInsuranceExplain", "", "", $("#currentWareId").val(), "");
        jdM.sessionstorage.set("ybId", $("#ybId").val());
        jdM.sessionstorage.set("ybSku", $("#currentWareId").val());
        window.location.href = $(this).attr("data-href")
    })
}
function specBigPicRequest() {
    $.ajax({type: "get", url: "/ware/newWarePicShow.json?wareId=" + $("#currentWareId").val() + "&picInitNum=1", dataType: "json", beforeSend: function() {
        }, success: function(c) {
            var b = "";
            if (c && c.ware && c.ware.images && c.ware.images.length > 0) {
                b += '<ul data-slide-ul="firstUl">';
                for (var a = 0; a < c.ware.images.length; a++) {
                    b += '<li data-ul-child="child">';
                    b += '    <img alt="' + c.ware.wname + '" src="' + c.ware.images[a].newpath.replace("/n4/", "/n12/").replace("http://", "//") + '" onerror="imgError();">';
                    b += "</li>"
                }
                b += "</ul>";
                $("#bigPicSlide").html(b);
                slide("#bigPicSlide").init({startIndex: 0, number: true, loop: true, preDef: "lnr", autoPlay: false, autoHeight: false, mpingEvent: "MProductdetail_SpecSlideBigPic", wareId: $("#currentWareId").val(), isBanOneImg: true, numberWrapId: "#bigPicPageNub"});
                $(".big-pic-popups").fadeIn()
            }
        }, error: function(b, a) {
        }})
}
function jump(a) {
    var c = document.getElementById("tittup");
    var d = document.getElementById("slide");
    var b = d.offsetWidth;
    if (a < -b / 5) {
        c.children[0].classList.add("rotate");
        c.children[1].innerHTML = "\u91ca\u653e\u67e5\u770b\u8be6\u60c5"
    }
    if (a > -b / 5) {
        c.children[0].classList.remove("rotate");
        c.children[1].innerHTML = "\u6ed1\u52a8\u67e5\u770b\u8be6\u60c5"
    }
    c.style.WebkitTransform = "translateX(" + a + "px)";
    c.style.transform = "translateX(" + a + "px)"
}
function sliderJump() {
    headerslider.sliderJump()
}
function getCookie(c) {
    var b = document.cookie.split(";");
    for (var d = 0; d < b.length; d++) {
        if (b[d].indexOf(c) >= 0) {
            var a = b[d].split("=");
            if (a && a.length > 1 && a[1] != "") {
                return unescape(a[1])
            } else {
                return""
            }
        }
    }
    return""
}
var addWareToCart = function() {
    beforeAddCart("1");
    if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
        $(".cart-loading-icon").css("display", "inline-block")
    }
    modify();
    if (colorSizeSpecValidate()) {
        if (isPrescribedDrug) {
            addDrugToCart()
        } else {
            if (isJdEcard) {
                addJdEcardToCart()
            } else {
                if ("1" == $("#type").val() || "true" == $("#isBuyCode").val() || isSamCard || isOilCard || isCustomize || isGameCharge || hasAddCartNode) {
                    if ("1" == $("#type").val()) {
                        if (isSpecWindowOpen()) {
                            pingAddClickWithLevel("MProductdetail_PurchaseImmediately", "W", "", $("#currentWareId").val(), "5")
                        } else {
                            pingAddClickWithLevel("MProductdetail_PurchaseImmediately", "N", "", $("#currentWareId").val(), "5")
                        }
                    } else {
                        if ("true" == $("#isBuyCode").val()) {
                            pingAddClickWithLevel("MProductdetail_ShoppingCodeBuy", "", "", $("#currentWareId").val(), "5")
                        }
                    }
                    if (isSamCard) {
                        pingClickWithLevel("MProductdetail_SamCardBuy", "", "", "", "")
                    }
                    if (isOilCard) {
                        if (isSpecWindowOpen()) {
                            pingClickWithLevel("MProductdetail_OilCardOrder", "W", "", $("#currentWareId").val(), "5")
                        } else {
                            pingClickWithLevel("MProductdetail_OilCardOrder", "N", "", $("#currentWareId").val(), "5")
                        }
                    }
                    if (isCustomize) {
                        if (isSpecWindowOpen()) {
                            pingClickWithLevel("MProductdetail_Customization", $("#currentWareId").val() + "_W", "", $("#currentWareId").val(), "3")
                        } else {
                            pingClickWithLevel("MProductdetail_Customization", $("#currentWareId").val() + "_N", "", $("#currentWareId").val(), "3")
                        }
                    }
                    if (isGameCharge) {
                        pingClickWithLevel("MProductdetail_GameCardOrder", "", "", "", "5")
                    }
                    if (hasAddCartNode) {
                        sendAddCartNodeEvent(orderEvent)
                    }
                    if (addCartBizName && addCartBizName == "staging") {
                        fqyJump(addCartBizName)
                    } else {
                        judgeKO($("#currentWareId").val(), $("#sid").val(), addCartBizName)
                    }
                } else {
                    try {
                        if (isSpecWindowOpen()) {
                            pingAddClickWithEventParam("MProductdetail_SpecificationAddtocart", eventParam, "", $("#currentWareId").val(), "5")
                        } else {
                            pingAddClickWithEventParam("MProductdetail_Addtocart", eventParam, "", $("#currentWareId").val(), "5")
                        }
                        floorABCTestPing("MProductdetail_ABtestAddtocartClick");
                        openAppABCTest("MProductdetail_jiache")
                    } catch (a) {
                        pingAddClickWithEventParam("MProductdetail_Addtocart", eventParam, "", $("#currentWareId").val(), "5")
                    }
                    newAddWare($("#currentWareId").val(), $("#number").val(), false, $("#ybId").val(), $("#resourceType").val(), $("#resourceValue").val(), $("#sid").val())
                }
            }
        }
    }
};
var addWareToCartAndNoJump = function() {
    beforeAddCart("2");
    modify();
    if (colorSizeSpecValidate() && "0" == isXnzt) {
        if (isSpecWindowOpen()) {
            pingAddClickWithEventParam("MProductdetail_SpecificationEasybuy", easyByEventparam, "", $("#currentWareId").val(), "5")
        } else {
            pingAddClickWithEventParam("MProductdetail_Easybuy", easyByEventparam, "", $("#currentWareId").val(), "5")
        }
        floorABCTestPing("MProductdetail_ABtestEasybuyClick");
        openAppABCTest("MProductdetail_ljgm");
        if (isJdEcard) {
            tojdEcartPage($("#currentWareId").val(), $("#number").val())
        } else {
            newAddWare($("#currentWareId").val(), $("#number").val(), true, $("#ybId").val(), $("#resourceType").val(), $("#resourceValue").val(), $("#sid").val())
        }
    }
};
function infoRender(c) {
    if (c && c.ware && c.ware.wareId) {
        $("#wareInfo").attr("href", urlEncode("/detail/" + c.ware.wareId + ".html", $("#sid").val()))
    }
    if (c && c.stock) {
        var a = "";
        if (c.stock.jdPrice && c.stock.jdPrice != "" && c.stock.jdPrice.toLowerCase() != "null" && parseFloat(c.stock.jdPrice) > 0) {
            a = c.stock.jdPrice
        } else {
            a = "\u6682\u65e0\u62a5\u4ef7";
            $(".depreciate-arrival-inform-box").attr("style", "display:none;")
        }
        $("#price").html(a);
        $("#currentWareId").val(c.stock.wareId);
        $("#jdPrice").val(c.stock.jdPrice)
    } else {
        var a = "";
        if (c && c.ware && c.ware.jdPrice && c.ware.jdPrice != "" && c.ware.jdPrice.toLowerCase() != "null" && parseFloat(c.ware.jdPrice) > 0) {
            a = c.ware.jdPrice
        } else {
            a = "\u6682\u65e0\u62a5\u4ef7";
            $(".depreciate-arrival-inform-box").attr("style", "display:none;")
        }
        $("#price").html(a);
        if (c && c.ware && c.ware.jdPrice) {
            $("#jdPrice").val(c.ware.jdPrice)
        }
    }
    if (c && c.stock && c.stock.flag) {
        if ((c.stock.jdPrice > 0) && c.stock.flag) {
            $("#stockFlag").val(c.stock.flag);
            if ("true" != $("#isYuYue").val()) {
                $("#bottom_prompt_msg_div").hide();
                $(".hold-div-bottom").attr("style", "display:none;")
            }
        }
        if ($("#couponDivShow").css("display") === "none" && !($("#prodPromotion").length > 0)) {
            $("#couponActivity").attr("class", "goods-part bdr-tb mar-t")
        }
        if ($("#whiteBarInfo").attr("data") && $("#whiteBarInfo").attr("data") != "" && $("#whiteBarInfo").attr("data") != "null") {
            $("#whiteBarInfo").attr("style", "display:")
        }
    } else {
        if ($("#couponDivShow").css("display") === "none" && !($("#prodPromotion").length > 0)) {
            $("#couponActivity").attr("class", "goods-part mar-t")
        }
        $("#whiteBarInfo").attr("style", "display:none");
        if (c && c.stock && c.stock.flag) {
            $("#stockFlag").val(c.stock.flag)
        } else {
            if ($("#stockStatus").text()) {
                $("#prompt_msg").text($("#stockStatus").text())
            } else {
                $("#prompt_msg").text(reasonTips("\u62b1\u6b49\uff0c\u6240\u9009\u5730\u533a\u6682\u65f6\u65e0\u8d27"))
            }
            $("#bottom_prompt_msg_div").show();
            $(".hold-div-bottom").attr("style", "display:block;")
        }
    }
    if ("true" == $("#isYuYue").val()) {
        if (!(c.stock && c.stock.flag)) {
            var b = $("#yuyueType").val();
            $("#bottom_prompt_msg_div").show();
            $(".hold-div-bottom").attr("style", "display:block");
            switch (b) {
                case"4":
                    if ("\u65e0\u8d27" == c.stock.status) {
                        $("#stockStatus").text(reasonTips("\u62b1\u6b49\uff0c\u6240\u9009\u5730\u533a\u6682\u65f6\u65e0\u8d27"))
                    } else {
                        if ("\u6682\u4e0d\u652f\u6301\u914d\u9001" == c.stock.status) {
                            $("#stockStatus").text("\u62b1\u6b49\uff0c\u8be5\u5546\u54c1\u6682\u4e0d\u652f\u6301\u8d2d\u4e70")
                        } else {
                            $("#stockStatus").text("\u62b1\u6b49\uff0c\u6240\u9009\u5730\u533a\u6682\u65f6\u65e0\u8d27")
                        }
                    }
                    $("#prompt_msg").text($("#stockStatus").text());
                    $(".buyImmediately").addClass("disabled");
                    $(".buyImmediately").unbind("click");
                    break;
                default:
                    break
                }
        } else {
            var b = $("#yuyueType").val();
            switch (b) {
                case"4":
                    $(".buyImmediately").removeClass("disabled");
                    $(".buyImmediately").bind("click", function() {
                        buyImmediatelyClickFunction()
                    });
                    break;
                default:
                    break
                }
        }
    }
}
function stockRender(f) {
    if (f) {
        if (f.feeType) {
            var l = window.location.href;
            if (l) {
                l = l.split("#")[0]
            }
            window.location.href = l
        }
        if (f.thirdAddressSamInfo) {
            if (f.thirdAddressSamInfo && f.thirdAddressSamInfo.samNewSku) {
                var d = f.thirdAddressSamInfo.samNewSku;
                if (d != "null" && d != $("#currentWareId").val()) {
                    location.href = "/product/" + d + ".html"
                }
            }
        }
        if (f.stock) {
            if ((f.stock.status && "\u65e0\u8d27" == f.stock.status || "\u6682\u4e0d\u652f\u6301\u914d\u9001" == f.stock.status) || !(f.stock.flag)) {
                $("#cartFlag").val("false");
                var a = "\u62b1\u6b49\uff0c\u6240\u9009\u5730\u533a\u6682\u65f6\u65e0\u8d27";
                if (f.ware && f.ware.reasonTips) {
                    a = f.ware.reasonTips
                }
                if ("\u65e0\u8d27" == f.stock.status) {
                    $("#stockStatus").text(reasonTips("\u62b1\u6b49\uff0c\u6240\u9009\u5730\u533a\u6682\u65f6\u65e0\u8d27"))
                } else {
                    if (a != "") {
                        $("#stockStatus").text(a)
                    } else {
                        $("#stockStatus").text("\u62b1\u6b49\uff0c\u8be5\u5546\u54c1\u6682\u4e0d\u652f\u6301\u8d2d\u4e70")
                    }
                }
                if (isJdOtc == "true" || isHk == "true" || isSamCard || isCustomize || isPrescribedDrug || (hasAddCartNode && buttonDisabledWhenNoStock)) {
                    $(".add_cart").show();
                    $(".add_cart").addClass("disabled");
                    $(".add_cart").unbind("click")
                } else {
                    $(".add_cart").hide();
                    $(".directorder").hide();
                    $(".looksimilar").show();
                    var j = f.stock.stockNotice;
                    $("#stockNotice").val(j);
                    if (j) {
                        $(".arrivalInform").show();
                        if ($("#cart1").hasClass("four-column-l3r1")) {
                            $("#cart1").removeClass("four-column-l3r1");
                            $("#cart1").addClass("five-column")
                        }
                        if ($("#cart1").hasClass("three-column")) {
                            $("#cart1").removeClass("three-column");
                            $("#cart1").addClass("four-column")
                        }
                        if ($("#cart1").hasClass("four-column")) {
                            $("#cart1").removeClass("four-column");
                            $("#cart1").addClass("four-column")
                        }
                        if ($(".looksimilar").hasClass("red-color")) {
                            $(".looksimilar").addClass("yellow-color");
                            $(".looksimilar").removeClass("red-color")
                        }
                    } else {
                        $(".arrivalInform").hide();
                        if ($("#cart1").hasClass("five-column")) {
                            $("#cart1").removeClass("five-column");
                            $("#cart1").addClass("four-column-l3r1")
                        }
                        if ($("#cart1").hasClass("four-column")) {
                            $("#cart1").removeClass("four-column");
                            $("#cart1").addClass("three-column")
                        }
                        if ($(".looksimilar").hasClass("yellow-color")) {
                            $(".looksimilar").addClass("red-color");
                            $(".looksimilar").removeClass("yellow-color")
                        }
                    }
                }
            } else {
                $("#cartFlag").val("true");
                $("#stockStatus").html(f.stock.status);
                $(".looksimilar").hide();
                $(".arrivalInform").hide();
                if ("true" != $("#isBuyCode").val() && "1" != $("#type").val() && "1" != isXnzt && "" == $("#ybId").val() && "true" != isJdOtc && "true" != isHk && !isSamSku && !isSamCard && !isOilCard && !isCustomize && !isGameCharge && !isPrescribedDrug && !hasAddCartNode) {
                    $(".directorder").show();
                    $(".add_cart").show();
                    if ($("#cart1").hasClass("three-column")) {
                        $("#cart1").removeClass("three-column");
                        $("#cart1").addClass("four-column")
                    }
                    if ($("#cart1").hasClass("four-column-l3r1")) {
                        $("#cart1").removeClass("four-column-l3r1");
                        $("#cart1").addClass("five-column")
                    }
                } else {
                    if ($("#ybId").val()) {
                        if ("true" != $("#isBuyCode").val() && "1" != $("#type").val() && "1" != isXnzt && "true" != isJdOtc && "true" != isHk && !isSamSku && !isSamCard && !isOilCard && !isCustomize && !isGameCharge && !hasAddCartNode) {
                            $(".directorder").show();
                            $(".directorder").addClass("disabled");
                            $(".directorder").unbind("click");
                            $(".add_cart").show();
                            if ($("#cart1").hasClass("three-column")) {
                                $("#cart1").removeClass("three-column");
                                $("#cart1").addClass("four-column")
                            }
                            if ($("#cart1").hasClass("four-column-l3r1")) {
                                $("#cart1").removeClass("four-column-l3r1");
                                $("#cart1").addClass("five-column")
                            }
                        } else {
                            $(".directorder").hide();
                            $(".add_cart").show();
                            if ($("#cart1").hasClass("five-column")) {
                                $("#cart1").removeClass("five-column");
                                $("#cart1").addClass("four-column-l3r1")
                            }
                            if ($("#cart1").hasClass("four-column")) {
                                $("#cart1").removeClass("four-column");
                                $("#cart1").addClass("three-column")
                            }
                            if (isSamCard && isSamMember) {
                                $(".add_cart").addClass("disabled");
                                $(".add_cart").unbind("click")
                            }
                        }
                    } else {
                        $(".directorder").hide();
                        $(".add_cart").show();
                        if ($(".add_cart").hasClass("disabled")) {
                            $(".add_cart").removeClass("disabled");
                            $(".add_cart").click(addWareToCart)
                        }
                        if ($("#cart1").hasClass("five-column")) {
                            $("#cart1").removeClass("five-column");
                            $("#cart1").addClass("four-column-l3r1")
                        }
                        if ($("#cart1").hasClass("four-column")) {
                            $("#cart1").removeClass("four-column");
                            $("#cart1").addClass("three-column")
                        }
                        if (isSamCard && isSamMember) {
                            $(".add_cart").addClass("disabled");
                            $(".add_cart").unbind("click")
                        }
                    }
                }
                if (isSamCard && !isSamMemberAddcart) {
                    $(".add_cart").addClass("disabled");
                    $(".add_cart").unbind("click")
                }
            }
        }
        if (f.stock && f.stock.jdPrice) {
            $("#jdPrice-copy").empty();
            var k = f.stock.jdPrice.split(".");
            if (k && k.length > 1) {
                $("#jdPrice-copy").append('<span class="big-price">' + k[0] + '</span><span class="small-price">.' + k[1] + "</span>")
            } else {
                $("#jdPrice-copy").text(f.stock.jdPrice)
            }
        }
        if (f.thirdAddressSamInfo && f.thirdAddressSamInfo.samPrice && f.thirdAddressSamInfo.samPrice != "\u6682\u65e0\u62a5\u4ef7") {
            $("#samPrice-copy").empty();
            $("#samPrice-copy").append(f.thirdAddressSamInfo.samPrice)
        }
        $(".service-floor-iconList").empty();
        $(".service-menu-iconList").empty();
        if ($("#serviceFloorConfig").val() == "false" && ((f.ware && f.ware.iconList && f.ware.iconList.length == 0) || f.ware.iconList == "" || f.ware.iconList == "null" || !f.ware.iconList)) {
            $(".service-floor").hide()
        } else {
            $(".service-floor").show();
            if (f.ware && f.ware.iconList) {
                $.each(f.ware.iconList, function(n, m) {
                    if (m && m.imageUrl && $("#httpsConfig") && "true" == $("#httpsConfig").val()) {
                        m.imageUrl = m.imageUrl.replace("http://", "//")
                    }
                    $(".service-floor-iconList").append('<div class="service-tip-module"><i class="service-icon support-service-icon"></i><span class="service-icon-text">' + m.name + "</span></div>");
                    $(".service-menu-iconList").append('<div class="service-item-row"><img src="' + m.imageUrl + '" class="service-item-icon"><span class="service-item-title">' + m.name + '</span><span class="service-item-text">' + m.tip + "</span></div> ")
                })
            }
        }
        if (f.ware && f.ware.fare) {
            $("#fareMoney").empty();
            $("#fareMoney").text(f.ware.fare);
            $("#fare").show()
        }
        if (f.ware && f.ware.saveEnergy && f.ware.saveEnergy.energyText) {
            $("#saveEnergyUrl").attr("href", f.ware.saveEnergy.energyUrl);
            $("#saveEnergyUrlText").html(f.ware.saveEnergy.energyText);
            $("#saveEnergy").attr("style", "display:")
        } else {
            $("#saveEnergy").attr("style", "display:none;")
        }
        if ($("#stockStatus").text()) {
            $("#prompt_msg").text($("#stockStatus").text())
        } else {
            $("#prompt_msg").text(reasonTips("\u62b1\u6b49\uff0c\u6240\u9009\u5730\u533a\u6682\u65f6\u65e0\u8d27"))
        }
        if (f.ware && f.ware.proFlagList) {
            $("#sale").empty();
            $.each(f.ware.proFlagList, function(n, m) {
                $("#sale").append('<i class="icon-bg02">' + m.text + "</i> ")
            })
        }
        if (f.proInformation) {
            var h = {};
            try {
                h.promotionInfo = f.proInformation;
                M.setRunMod(["promotionInfo"]);
                M.runner(h)
            } catch (g) {
            }
        }
        try {
            if (f.ware && f.ware.weightInfo && f.ware.weightInfo.content) {
                $("#weightInfoDiv").show();
                $("#weightInfoText").html(f.ware.weightInfo.content);
                $("#specWeightDiv").show();
                $("#spec_weight").html(f.ware.weightInfo.content)
            } else {
                $("#weightInfoDiv").hide();
                $("#specWeightDiv").hide()
            }
        } catch (g) {
        }
    }
    if ($(".arrivalInform").length > 0) {
        $(".arrivalInform").each(function() {
            depreciatePop($(this).attr("id"), "arrvalInformBlock")
        })
    }
    var b = 30;
    var c = new Date();
    c.setTime(c.getTime() + b * 24 * 60 * 60 * 1000);
    document.cookie = "commonAddress=;expires=" + c.toGMTString() + ";path=/;domain=.m.jd.com"
}
function minus() {
    var a = parseInt($("#number").val(), 10);
    var b = $("#lowestbuy").val();
    b = parseInt(b);
    if (b != 200 && $(".quantity-increase").hasClass("limited")) {
        $(".quantity-increase").removeClass("limited")
    }
    if (b && b > 1) {
        if (a <= 200) {
            $(".lowestbuy-tip").html("(" + b + "件起购)")
        }
        if (a <= b + 1) {
            if (!$(".quantity-decrease").hasClass("limited")) {
                $(".quantity-decrease").addClass("limited")
            }
            $("#number").val(b);
            $(".amount").html(b + "\u4ef6")
        } else {
            if ($(".quantity-decrease").hasClass("limited")) {
                $(".quantity-decrease").removeClass("limited")
            }
            a--;
            $("#number").val(a);
            $(".amount").html(a + "\u4ef6")
        }
    } else {
        if (a <= 200) {
            $(".lowestbuy-tip").html("")
        }
        if (a <= 2) {
            if (!$(".quantity-decrease").hasClass("limited")) {
                $(".quantity-decrease").addClass("limited")
            }
            $("#number").val(1);
            $(".amount").html("1\u4ef6")
        } else {
            if ($(".quantity-decrease").hasClass("limited")) {
                $(".quantity-decrease").removeClass("limited")
            }
            a--;
            $("#number").val(a);
            $(".amount").html(a + "\u4ef6")
        }
    }
}
function plus() {
    var a = parseInt($("#number").val(), 10);
    var b = $("#lowestbuy").val();
    b = parseInt(b);
    if (a < 200 && $(".quantity-decrease").hasClass("limited")) {
        $(".quantity-decrease").removeClass("limited")
    }
    if (a >= 199) {
        if (b != 200) {
            $(".lowestbuy-tip").html("(限购200件)")
        }
        if (!$(".quantity-increase").hasClass("limited")) {
            $(".quantity-increase").addClass("limited")
        }
        $("#number").val(200);
        $(".amount").html("200\u4ef6")
    } else {
        a++;
        $("#number").val(a);
        $(".amount").html(a + "\u4ef6")
    }
}
function modify() {
    var a = parseInt($("#number").val(), 10);
    var b = $("#lowestbuy").val();
    b = parseInt(b);
    if (!isNaN(a)) {
        if (b && b > 1) {
            if (a < 200 && b < 200) {
                $(".lowestbuy-tip").html("(" + b + "件起购)")
            } else {
                if (a <= 200 && b == 200) {
                    $(".lowestbuy-tip").html("(" + b + "件起购)")
                } else {
                    $(".lowestbuy-tip").html("(限购200件)")
                }
            }
            if (parseInt(a) < b) {
                if ($(".message-box").length == 0) {
                    $.toast({message: b + "件起购", delay: 2000, isMaskClose: false, cls: "error-icon"})
                }
                if (!$(".quantity-decrease").hasClass("limited")) {
                    $(".quantity-decrease").addClass("limited")
                }
                $("#number").val(b);
                $(".amount").html(b + "\u4ef6")
            } else {
                if (parseInt(a) == b) {
                    if (!$(".quantity-decrease").hasClass("limited")) {
                        $(".quantity-decrease").addClass("limited")
                    }
                    $("#number").val(b);
                    $(".amount").html(b + "\u4ef6")
                } else {
                    if ($(".quantity-decrease").hasClass("limited")) {
                        $(".quantity-decrease").removeClass("limited")
                    }
                    $("#number").val(parseInt(a));
                    $(".amount").html(parseInt(a) + "\u4ef6")
                }
            }
        } else {
            if (a <= 1) {
                if (!$(".quantity-decrease").hasClass("limited")) {
                    $(".quantity-decrease").addClass("limited")
                }
                $("#number").val(1);
                $(".amount").html("1\u4ef6")
            } else {
                if ($(".quantity-decrease").hasClass("limited")) {
                    $(".quantity-decrease").removeClass("limited")
                }
                $("#number").val(parseInt(a));
                $(".amount").html(parseInt(a) + "\u4ef6")
            }
            if (a < 200) {
                $(".lowestbuy-tip").html("")
            } else {
                $(".lowestbuy-tip").html("(限购200件)")
            }
        }
        if (a == 200) {
            if (!$(".quantity-increase").hasClass("limited")) {
                $(".quantity-increase").addClass("limited")
            }
        }
    } else {
        if (b && b > 1) {
            $(".lowestbuy-tip").html("(" + b + "件起购)");
            $.toast({message: b + "件起购", delay: 2000, cls: "error-icon"});
            if (!$(".quantity-decrease").hasClass("limited")) {
                $(".quantity-decrease").addClass("limited")
            }
            $("#number").val(b);
            $(".amount").html(b + "\u4ef6")
        } else {
            if (!$(".quantity-decrease").hasClass("limited")) {
                $(".quantity-decrease").addClass("limited")
            }
            $("#number").val(1);
            $(".amount").html("1\u4ef6")
        }
    }
}
function MaxCheck() {
    var a = parseInt($("#number").val(), 10);
    var b = $("#lowestbuy").val();
    b = parseInt(b);
    if (a >= 200) {
        if (b != 200) {
            $(".lowestbuy-tip").html("(限购200件)")
        }
        if (!$(".quantity-increase").hasClass("limited")) {
            $(".quantity-increase").addClass("limited")
        }
        $("#number").val(200);
        $(".amount").html("200\u4ef6")
    } else {
        if (b != 200) {
            if ($(".quantity-increase").hasClass("limited")) {
                $(".quantity-increase").removeClass("limited")
            }
        }
    }
}
var pingClick = function(g, d, c, a) {
    if ($("#pingUse").val()) {
        try {
            var f = new MPing.inputs.Click(g);
            f.event_param = d;
            f.page_param = a;
            var b = new MPing();
            b.send(f)
        } catch (h) {
        }
    }
};
var pingClickWithLevel = function(h, d, c, a, g) {
    if ($("#pingUse").val()) {
        try {
            var f = new MPing.inputs.Click(h);
            f.event_param = d;
            f.page_param = a;
            f.event_level = g;
            var b = new MPing();
            b.send(f)
        } catch (j) {
        }
    }
};
var pingAddClick = function(f, d, c, a) {
    try {
        if ($("#pingUse").val()) {
            var h = new MPing.inputs.AddCart(f, a);
            h.event_param = a;
            var b = new MPing();
            b.send(h)
        }
    } catch (g) {
    }
};
var pingAddClickWithLevel = function(g, d, c, a, f) {
    try {
        if ($("#pingUse").val()) {
            var j = new MPing.inputs.AddCart(g, a);
            j.page_param = a;
            j.event_param = a;
            j.event_level = f;
            var b = new MPing();
            b.send(j)
        }
    } catch (h) {
    }
};
var pingAddClickWithEventParam = function(g, d, c, a, f) {
    try {
        if ($("#pingUse").val()) {
            var j = new MPing.inputs.AddCart(g, a);
            j.page_param = a;
            j.event_param = d;
            j.event_level = f;
            var b = new MPing();
            b.send(j)
        }
    } catch (h) {
    }
};
var floorABCTestPing = function(b) {
    try {
        if ($("#floorABCTest").val() && $("#floorABCTest").val() == "true") {
            var a = "";
            if ($("#downloadBM").length > 0) {
                a = "B"
            } else {
                if ($("#downloadBR").length > 0) {
                    a = "C"
                } else {
                    a = "A"
                }
            }
            pingAddClickWithEventParam(b, a, "", "", "")
        }
    } catch (c) {
    }
};
var openAppABCTest = function(b) {
    try {
        if ($("#openAppABCflag") && $("#openAppABCflag").val() != "") {
            var a = $("#openAppABCflag").val();
            pingAddClickWithEventParam(b, a, "", "", "")
        }
    } catch (c) {
    }
};
var eTime;
var newAddWare = function(a, f, d, q, b, m, c) {
    var p = "";
    try {
        var j = $("#dist").val();
        if (j && j == "jd") {
            p = "&dist=jd"
        }
    } catch (g) {
    }
    eTime = new Date().getTime() / 1000 + 4;
    var l = getCookie("USER_FLAG_CHECK");
    if (isNotBlank(d) && d) {
        var n = $("#newOrderServer").val();
        if (q) {
            var h = "//p.m.jd.com/cart/addDirOrder.json?wareId=" + a + "&num=" + f + "&suitSkuId=" + a + "&suitSkuNum=" + f + (isNotBlank(d) && d ? "&isAjax=" + d : "") + "&sType=8&ybId=" + q + "&resourceType=" + b + "&resourceValue=" + m + (isNotBlank(c) && (c != "") ? "&sid=" + c : "") + "&USER_FLAG_CHECK=" + l
        } else {
            var h = "//p.m.jd.com/cart/addDirOrder.json?wareId=" + a + "&num=" + f + (isNotBlank(d) && d ? "&isAjax=" + d : "") + "&resourceType=" + b + "&resourceValue=" + m + (isNotBlank(c) && (c != "") ? "&sid=" + c : "") + "&USER_FLAG_CHECK=" + l
        }
        var o = jQuery.get(h, function() {
            afterAddCart("2", h, "");
            if (n == "true") {
                window.location.href = "http://p.m.jd.com/norder/order.action?wareId=" + a + "&wareNum=" + f + "&enterOrder=true" + (isNotBlank(c) && (c != "") ? "&sid=" + $("#sid").val() : "")
            } else {
                window.location.href = "http://p.m.jd.com/order/order.action?wareId=" + a + "&wareNum=" + f + "&enterOrder=true&yys=false&from=0" + (isNotBlank(c) && (c != "") ? "&sid=" + $("#sid").val() : "")
            }
        })
    } else {
        if (q) {
            var k = "add.json?wareId=" + a + "&num=" + f + "&suitSkuId=" + a + "&suitSkuNum=" + f + (isNotBlank(d) && d ? "&isAjax=" + d : "") + "&sType=8&ybId=" + q + "&resourceType=" + b + "&resourceValue=" + m + (isNotBlank(c) && (c != "") ? "&sid=" + c : "") + "&USER_FLAG_CHECK=" + l + p
        } else {
            var k = "add.json?wareId=" + a + "&num=" + f + (isNotBlank(d) && d ? "&isAjax=" + d : "") + "&resourceType=" + b + "&resourceValue=" + m + (isNotBlank(c) && (c != "") ? "&sid=" + c : "") + "&USER_FLAG_CHECK=" + l + p
        }
        var o = ajax(k, function(v) {
            afterAddCart("1", k, v);
            if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                $(".cart-loading-icon").css("display", "none")
            }
            var r = JSON.parse(v).sid;
            $("#sid").val(r);
            var w = JSON.parse(v);
            if (w && w.cartJson && w.cartJson.Num) {
                var x = w.cartJson.Num;
                if (parseInt(x) > 0) {
                    addNumberShow(parseInt(x))
                }
            }
            var A = "\u52a0\u5165\u8d2d\u7269\u8f66\u6210\u529f";
            var z = "succee-icon";
            var s = 180;
            var y = 88;
            if (w && w.cartJson && w.cartJson.resultCode && "0" == w.cartJson.resultCode) {
            } else {
                if (w && w.cartJson && w.cartJson.resultCode && "1" == w.cartJson.resultCode) {
                    z = "error-icon";
                    A = "\u8d2d\u7269\u8f66\u585e\u6ee1\u4e86\uff0c\u5148\u628a\u9009\u597d\u7684\u5546\u54c1\u4e0b\u5355\u5427";
                    s = 270
                } else {
                    if (w && w.cartJson && w.cartJson.resultCode && "6" == w.cartJson.resultCode) {
                        z = "error-icon";
                        A = "\u8d2d\u7269\u8f66\u5546\u54c1\u592a\u591a\uff0c\u52a0\u5165\u8d2d\u7269\u8f66\u5931\u8d25";
                        s = 240
                    } else {
                        z = "error-icon";
                        A = "\u52a0\u5165\u8d2d\u7269\u8f66\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5";
                        s = 220
                    }
                }
            }
            var t = {cls: z, duration: 2000, message: A, width: s, height: y};
            showMessage(t)
        }, function() {
            if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                $(".cart-loading-icon").css("display", "none");
                var s = "error-icon";
                var v = "\u8BF7\u524D\u5F80\u8D2D\u7269\u8F66\u67E5\u770B";
                var t = 220;
                var r = 88;
                var w = {cls: s, duration: 2000, message: v, width: t, height: r};
                showMessage(w)
            }
        })
    }
};
var judgeKO = function(f, b, c) {
    var a = "/ware/judgeOrder.json?wareId=" + f + (isNotBlank(b) && (b != "") ? "&sid=" + b : "") + "&businessName=" + c;
    if (c == "customize" || c == "gameCharge" || isAddCartBizName(c)) {
        a += "&addCartLink=" + encodeURIComponent(addCartURL)
    }
    var d = ajax(a, function(h) {
        try {
            var k = JSON.parse(h);
            if (k && k.url) {
                if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                    $(".cart-loading-icon").css("display", "none")
                }
                if (c && c == "oilCardService") {
                    window.location.href = k.url
                } else {
                    if (c && c == "customize") {
                        var g = k.url + "#index/sku:" + $("#currentWareId").val() + "/num:" + $("#number").val();
                        if ($("#size").length > 0 && $("#size").find("a.selected").text()) {
                            g += "/size:" + encodeURIComponent($("#size").find("a.selected").text())
                        }
                        if ($("#color").length > 0 && $("#color").find("a.selected").text()) {
                            g += "/color:" + encodeURIComponent($("#color").find("a.selected").text())
                        }
                        if ($("#spec").length > 0 && $("#spec").find("a.selected").text()) {
                            g += "/spec:" + encodeURIComponent($("#spec").find("a.selected").text())
                        }
                        window.location.href = g
                    } else {
                        if (c && c == "gameCharge") {
                            goToGameCharge(k.url)
                        } else {
                            if (isAddCartBizName(c)) {
                                window.location.href = k.url
                            } else {
                                window.location.href = k.url + "&sid=" + b
                            }
                        }
                    }
                }
            } else {
                if (k && k.text) {
                    alert(k.text)
                }
            }
        } catch (j) {
            if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                $(".cart-loading-icon").css("display", "none")
            }
            window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + b + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
        }
    }, function() {
        if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
            $(".cart-loading-icon").css("display", "none");
            var h = "error-icon";
            var k = "\u8BF7\u524D\u5F80\u8D2D\u7269\u8F66\u67E5\u770B";
            var j = 220;
            var g = 88;
            var l = {cls: h, duration: 2000, message: k, width: j, height: g};
            showMessage(l)
        }
    })
};
function goToGameCharge(b) {
    if (b) {
        var a = b + "?skuId=" + $("#currentWareId").val() + "&skuName=" + encodeURIComponent($("#goodName").val()) + "&skuPrice=" + $("#jdPrice").val() + "&chargeType=" + $("#thirdCategoryId").val();
        window.location.href = a
    }
}
var xmlHttp;
var ajax = function(b, h, c, g) {
    if (b.length == 0) {
        return""
    }
    xmlHttp = d();
    if (xmlHttp == null) {
        return false
    }
    b = b + "&ran=" + Math.random();
    xmlHttp.onreadystatechange = a;
    xmlHttp.open("GET", b, true);
    xmlHttp.timeout = 5000;
    xmlHttp.ontimeout = f;
    xmlHttp.send(null);
    function a() {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            try {
                h.call(this, xmlHttp.responseText, g)
            } catch (j) {
            }
        }
    }
    function f() {
        c.call(this, xmlHttp.responseText, g)
    }
    function d() {
        var j = null;
        try {
            j = new XMLHttpRequest()
        } catch (k) {
            try {
                j = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (k) {
                j = new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        return j
    }
    return true
};
function reasonTips(a) {
    var b = $("#reasonTips").val();
    return b == "" ? a : b
}
function picShowGoback() {
    var b = window.sessionStorage;
    var a = b.getItem("picShowGoback");
    if (a == "true") {
        b.removeItem("picShowGoback");
        $("#orderComment").click()
    }
}
function replyListGoBack() {
    var b = window.sessionStorage;
    var a = b.getItem("replyListGoBack");
    if (a == "true") {
        b.removeItem("replyListGoBack");
        $("#pingjia").click()
    }
}
function warePicShowGoback() {
    try {
        var b = window.localStorage;
        var a = localStorage.getItem("warePicShowGoback");
        if (a == "true") {
            localStorage.removeItem("warePicShowGoback");
            $("#detailInfo").click()
        }
    } catch (c) {
    }
}
function toWarePicShow() {
    var a = "/ware/newWarePicShow.action?";
    try {
        var c = document.querySelector('#slidePageNub [data-slide-num="slideNub"]').innerHTML;
        a += "sid=" + $("#sid").val() + "&wareId=" + $("#currentWareId").val() + "&picInitNum=" + c;
        location.href = a
    } catch (b) {
    }
}
function toGuessYouLike(b, c) {
    try {
        if (b) {
            jQuery.getJSON(b + "&jsoncallback=?", function(d) {
            })
        }
        if (c) {
            setTimeout(function() {
                location.href = c
            }, 100)
        }
    } catch (a) {
    }
}
function toSuitPage(b) {
    try {
        if (b) {
            pingClickWithLevel("MProductdetail_PreferentialPackage", b, "", $("#currentWareId").val(), "5");
            location.href = b
        }
    } catch (a) {
    }
}
function toShop(b, a) {
    try {
        if (b && a) {
            if (a == 0) {
                pingClickWithLevel("MProductdetail_EnterShop", b + "_0", "", $("#currentWareId").val(), "5")
            } else {
                if (a == 1) {
                    pingClickWithLevel("MProductdetail_EnterShop", b + "_2", "", $("#currentWareId").val(), "5")
                } else {
                    if (a == 2) {
                        pingClickWithLevel("MProductdetail_EnterShop", b + "_1", "", $("#currentWareId").val(), "5")
                    }
                }
            }
            setTimeout(function() {
                location.href = "https://shop.m.jd.com/?shopId=" + b + "&skuId=" + $("#currentWareId").val() + "&categoryId=" + $("#categoryId").val()
            }, 100)
        }
    } catch (c) {
    }
}
function specPresaleButtonToOrder() {
    if (colorSizeSpecValidate()) {
        try {
            if ($("#pingUse").val()) {
                var c = new MPing.inputs.AddCart("MProductdetail_OrderImmediately", $("#currentWareId").val());
                c.event_param = "W";
                c.event_level = "5";
                var a = new MPing();
                a.send(c)
            }
        } catch (b) {
        }
        setTimeout(function() {
            try {
                var f = $("#number").val();
                var d = "https://v.m.jd.com/presaleOrder/order.action?wids=" + $("#currentWareId").val() + "&nums=" + $("#number").val() + "&sid=" + $("#sid").val();
                location.href = d
            } catch (g) {
            }
        }, 100)
    }
}
function isSpecWindowOpen() {
    try {
        var a = false;
        if ($(".spec-menu-content").length > 0) {
            if ($(".spec-menu-content").css("display") != "none") {
                a = true
            }
        }
        return a
    } catch (b) {
        return false
    }
}
function beforeAddCart(d) {
    try {
        var c = "tag_" + new Date().getTime();
        var b = window.screen.width * window.devicePixelRatio + "_" + window.screen.height * window.devicePixelRatio + "_" + window.screen.colorDepth;
        var a = getCookie("USER_FLAG_CHECK");
        jQuery.ajax({type: "POST", url: "/ware/clientInfoStat.json?step=1&rand=" + c, data: {statWareId: $("#currentWareId").val(), statWareNum: $("#number").val(), statAddCartType: d, statYbIds: $("#ybId").val(), statResourceType: $("#resourceType").val(), statResourceValue: $("#resourceValue").val(), statSid: $("#sid").val(), statUserFlagCheck: a, postTime: c, tag: b}, success: function(g) {
            }, error: function(k, g, h, j) {
            }})
    } catch (f) {
    }
}
function afterAddCart(c, h, b) {
    try {
        var a = "";
        var j = "";
        try {
            if (b) {
                a = JSON.parse(b).sid;
                var g = JSON.parse(b);
                if (g && g.cartJson && g.cartJson.resultCode) {
                    j = g.cartJson.resultCode
                }
            }
        } catch (f) {
        }
        var k = "tag_" + new Date().getTime();
        var l = window.screen.width * window.devicePixelRatio + "_" + window.screen.height * window.devicePixelRatio + "_" + window.screen.colorDepth;
        jQuery.ajax({type: "POST", url: "/ware/clientInfoStat.json?step=2&rand=" + k, data: {statAddCartType: c, statRequestUrl: h, statResponseSid: a, statResponseResultCode: j, postTime: k, tag: l}, success: function(d) {
            }, error: function(o, d, m, n) {
            }})
    } catch (f) {
    }
}
function fqyJump(a) {
    try {
        var b = "" + new Date().getTime();
        jQuery.ajax({type: "post", url: "/ware/queryCreditInfo.json?rand=" + b, dataType: "json", data: {}, success: function(j) {
                if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                    $(".cart-loading-icon").css("display", "none")
                }
                var h = "\u7528\u6237\u60A8\u597D\uFF0C\u5206\u671F\u7528\u670D\u52A1\u76EE\u524D\u4EC5\u5BF9\u4EAC\u4E1C\u767D\u6761\u6709\u826F\u597D\u6D88\u8D39\u8BB0\u5F55\u7528\u6237\u63D0\u4F9B\uFF0C\u8BF7\u60A8\u9996\u5148\u5F00\u901A\u767D\u6761\u670D\u52A1\u3002";
                var f = "error-icon";
                var g = 270;
                var d = 188;
                if (j && j.errorCode && "0" == j.errorCode) {
                    judgeKO($("#currentWareId").val(), $("#sid").val(), a)
                } else {
                    $.toast({maxHeight: 100, autoClose: false, message: h, styleType: 4, btns: {closeTxt: "我知道了"}})
                }
            }, error: function(j, d, f, g) {
                try {
                    if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                        $(".cart-loading-icon").css("display", "none")
                    }
                } catch (h) {
                }
                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
            }})
    } catch (c) {
    }
}
function addDrugToCart() {
    try {
        var c = "" + new Date().getTime();
        jQuery.ajax({type: "post", url: "/ware/addDrugToCart.json?rand=" + c, dataType: "json", data: {wareId: $("#currentWareId").val(), drugSkuNum: $("#number").val(), sid: $("#sid").val()}, success: function(m) {
                try {
                    var o = new MPing.inputs.AddCart("MProductdetail_MedicineAdd", $("#currentWareId").val());
                    o.event_param = $("#currentWareId").val();
                    o.event_level = "5";
                    var l = new MPing();
                    l.send(o)
                } catch (n) {
                }
                if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                    $(".cart-loading-icon").css("display", "none")
                }
                var s = "\u52a0\u5165\u836f\u54c1\u6e05\u5355\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5";
                var r = "error-icon";
                var j = 270;
                var q = 88;
                if (m && m.errorCode && "0" == m.errorCode) {
                    r = "succee-icon";
                    s = "\u52a0\u5165\u836f\u54c1\u6e05\u5355\u6210\u529f";
                    j = 180;
                    if (m.num) {
                        var p = m.num;
                        if (parseInt(p) > 0) {
                            drugCartNumberShow(parseInt(p))
                        }
                    }
                }
                var k = {cls: r, duration: 2000, message: s, width: j, height: q};
                showMessage(k)
            }, error: function(n, j, k, l) {
                try {
                    if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                        $(".cart-loading-icon").css("display", "none")
                    }
                } catch (m) {
                }
                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
            }})
    } catch (h) {
        try {
            if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                $(".cart-loading-icon").css("display", "none")
            }
            console.log(h);
            var f = "\u52a0\u5165\u836f\u54c1\u6e05\u5355\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5";
            var b = "error-icon";
            var d = 270;
            var a = 88;
            var g = {cls: b, duration: 2000, message: f, width: d, height: a};
            showMessage(g)
        } catch (h) {
        }
    }
}
function addJdEcardToCart() {
    try {
        var c = "" + new Date().getTime();
        jQuery.ajax({type: "post", url: "/ware/addJdEcardToCart.json?rand=" + c, dataType: "json", data: {wareId: $("#currentWareId").val(), ecardNum: $("#number").val(), sid: $("#sid").val()}, success: function(o) {
                try {
                    if (isSpecWindowOpen()) {
                        pingClickWithLevel("MProductdetail_EcardSpecAddCart", "", "", $("#currentWareId").val(), "5")
                    } else {
                        pingClickWithLevel("MProductdetail_EcardAddCart", "", "", $("#currentWareId").val(), "5")
                    }
                } catch (q) {
                }
                if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                    $(".cart-loading-icon").css("display", "none")
                }
                var n = "\u52a0\u5165E\u5361\u6e05\u5355\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5";
                var k = "error-icon";
                var m = 270;
                var j = 88;
                if (o && o.errorCode && "0" == o.errorCode) {
                    k = "succee-icon";
                    n = "\u52a0\u5165E\u5361\u6e05\u5355\u6210\u529f";
                    m = 180;
                    if (o.num) {
                        var l = o.num;
                        if (parseInt(l) > 0) {
                            jdECartNumberShow(parseInt(l))
                        }
                    }
                } else {
                    if (o && o.errorCode && "1" == o.errorCode) {
                        n = o.errorMessage;
                        m = 180
                    }
                }
                var p = {cls: k, duration: 2000, message: n, width: m, height: j};
                showMessage(p)
            }, error: function(n, j, k, l) {
                try {
                    if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                        $(".cart-loading-icon").css("display", "none")
                    }
                } catch (m) {
                }
                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
            }})
    } catch (h) {
        try {
            if ($("#addCartLoading").length > 0 && $("#addCartLoading").val() && $("#addCartLoading").val() == "true") {
                $(".cart-loading-icon").css("display", "none")
            }
            console.log(h);
            var f = "\u52a0\u5165E\u5361\u6e05\u5355\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5";
            var b = "error-icon";
            var d = 270;
            var a = 88;
            var g = {cls: b, duration: 2000, message: f, width: d, height: a};
            showMessage(g)
        } catch (h) {
        }
    }
}
function jdECartNumberShow(a) {
    try {
        if (parseInt(a) > 99) {
            $("#jdEcardCartNum").text("99+")
        } else {
            $("#jdEcardCartNum").text(a)
        }
    } catch (b) {
    }
}
function setjdECartNum() {
    try {
        if ($("#pin").length > 0 && $("#pin").val() == "login") {
            var a = "" + new Date().getTime();
            jQuery.ajax({type: "post", dataType: "json", url: "/ware/getJdEcartNum.json?rand=" + a, data: {sid: $("#sid").val()}, success: function(c) {
                    try {
                        if (c && c.num) {
                            if (parseInt(c.num) > 0) {
                                jdECartNumberShow(c.num)
                            }
                        }
                    } catch (d) {
                        console.log(d)
                    }
                }, error: function(g, c, d, f) {
                }})
        }
    } catch (b) {
    }
}
function drugCartNumberShow(a) {
    try {
        if (parseInt(a) > 99) {
            $("#drugCartNum").text("99+")
        } else {
            $("#drugCartNum").text(a)
        }
    } catch (b) {
    }
}
function setDrugCartNum() {
    try {
        if ($("#pin").length > 0 && $("#pin").val() == "login") {
            var a = "" + new Date().getTime();
            jQuery.ajax({type: "post", dataType: "json", url: "/ware/getDrugCartNum.json?rand=" + a, data: {sid: $("#sid").val()}, success: function(c) {
                    try {
                        if (c && c.num) {
                            if (parseInt(c.num) > 0) {
                                drugCartNumberShow(c.num)
                            }
                        }
                    } catch (d) {
                        console.log(d)
                    }
                }, error: function(g, c, d, f) {
                }})
        }
    } catch (b) {
    }
}
function toDrugCart(a) {
    if (a && a != "") {
        if ($("#pin").length > 0 && $("#pin").val() == "login") {
            pingClickWithLevel("MProductdetail_MedicineList", "", "", "", "3");
            location.href = a
        } else {
            location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
        }
    }
}
function toJdECart(a) {
    if (a && a != "") {
        if ($("#pin").length > 0 && $("#pin").val() == "login") {
            pingClickWithLevel("MProductdetail_EcardCart", "", "", $("#currentWareId").val(), "");
            location.href = a
        } else {
            location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
        }
    }
}
function sendAddCartNodeEvent(g) {
    if (g) {
        if (g.indexOf(";") >= 0) {
            try {
                var j = g.split(";");
                if (j && j.length > 1) {
                    var d = j[0];
                    var c = "", b = "", a = "", f = "";
                    if (j[1] && j[1] != "null") {
                        c = j[1]
                    } else {
                        c = ""
                    }
                    if (j.length > 2 && j[2] && j[2] != "null") {
                        b = j[2]
                    } else {
                        b = ""
                    }
                    if (j.length > 3 && j[3] && j[3] != "null") {
                        a = j[3]
                    } else {
                        a = ""
                    }
                    if (j.length > 4 && j[4] && j[4] != "null") {
                        f = j[4]
                    } else {
                        f = ""
                    }
                    pingClickWithLevel(d, c, b, a, f)
                }
            } catch (h) {
            }
        } else {
            pingClickWithLevel(g, "", "", "", "5")
        }
    }
}
function isAddCartBizName(a) {
    if (notCallLvBizNames && a) {
        if (notCallLvBizNames.length > 0) {
            for (var b = 0; b < notCallLvBizNames.length; b++) {
                if (a == notCallLvBizNames[b]) {
                    return true
                }
            }
        }
    }
    return false
}
function tojdEcartPage(a, b) {
    if ($("#pin").length > 0 && $("#pin").val() == "login") {
        try {
            if (isSpecWindowOpen()) {
                pingClickWithLevel("MProductdetail_EcardSpecBuy", "", "", $("#currentWareId").val(), "5")
            } else {
                pingClickWithLevel("MProductdetail_EcardBuy", "", "", $("#currentWareId").val(), "5")
            }
        } catch (c) {
        }
        location.href = "http://giftcard.jd.com/giftcardpurchase/mIndex?skuNumInfo=" + a + "," + b
    } else {
        location.href = "https://passport.m.jd.com/user/login.action?sid=" + $("#sid").val() + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
    }
}
var currentColorSizeSpec = "";
function updateColorSizeSpec() {
    try {
        var wareId = document.getElementById("currentWareId").value;
        var colorSizeSkuJson = document.getElementById("skuColorSizeSpec").value;
        if (colorSizeSkuJson) {
            var skuColorSize = eval("(" + colorSizeSkuJson + ")");
            var allColorSet = [];
            var allSizeSet = [];
            var allSpecSet = [];
            allColorSet = eval("(" + $("#allColorSet").val() + ")");
            allSizeSet = eval("(" + $("#allSizeSet").val() + ")");
            allSpecSet = eval("(" + $("#allSpecSet").val() + ")");
            var colorNode = document.getElementById("color");
            var sizeNode = document.getElementById("size");
            var specNode = document.getElementById("spec");
            var preColor = "";
            if (colorNode && colorNode.querySelector(".selected") && colorNode.querySelector(".selected").title) {
                preColor = colorNode.querySelector(".selected").title
            }
            var preSize = "";
            if (sizeNode && sizeNode.querySelector(".selected") && sizeNode.querySelector(".selected").title) {
                preSize = sizeNode.querySelector(".selected").title
            }
            var preSpec = "";
            if (specNode && specNode.querySelector(".selected") && specNode.querySelector(".selected").title) {
                preSpec = specNode.querySelector(".selected").title
            }
            var currentColor = preColor;
            var currentSize = preSize;
            var currentSpec = preSpec;
            var colorList = [];
            var sizeList = [];
            var specList = [];
            var attributes = [];
            if (colorNode) {
                attributes.push("color")
            }
            if (sizeNode) {
                attributes.push("size")
            }
            if (specNode) {
                attributes.push("spec")
            }
            if (event.target) {
                if (event.target.parentNode && event.target.parentNode.id) {
                    if (event.target.parentNode && event.target.parentNode.id && event.target.parentNode.id == "color") {
                        if (colorNode && colorNode.querySelector(".selected")) {
                            colorNode.querySelector(".selected").className = "a-item J_ping"
                        }
                        event.target.className = "a-item selected J_ping";
                        currentColor = event.target.title || "";
                        if (currentColor == preColor) {
                            if (preSize == "" && preSpec == "") {
                                colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, allColorSet, "");
                                if (sizeNode) {
                                    sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, allSizeSet, "")
                                }
                                if (specNode) {
                                    specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, allSpecSet, "")
                                }
                            } else {
                                if (preSize != "" && preSpec != "") {
                                    for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                        var tempColorSize = skuColorSize.colorSize[index];
                                        if (tempColorSize.size == preSize && tempColorSize.spec == preSpec) {
                                            if (colorList.indexOf(tempColorSize.color) < 0) {
                                                colorList.push(tempColorSize.color)
                                            }
                                        }
                                    }
                                    colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, "");
                                    if (sizeNode) {
                                        sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, allSizeSet, preSize)
                                    }
                                    if (specNode) {
                                        specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, allSpecSet, preSpec)
                                    }
                                } else {
                                    if (preSize != "") {
                                        for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                            var tempColorSize = skuColorSize.colorSize[index];
                                            if (tempColorSize.size == preSize) {
                                                if (colorList.indexOf(tempColorSize.color) < 0) {
                                                    colorList.push(tempColorSize.color)
                                                }
                                                if (tempColorSize.spec && specList.indexOf(tempColorSize.spec) < 0) {
                                                    specList.push(tempColorSize.spec)
                                                }
                                            }
                                        }
                                        colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, "");
                                        if (sizeNode) {
                                            sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, allSizeSet, preSize)
                                        }
                                        if (specNode) {
                                            specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, "")
                                        }
                                    } else {
                                        if (preSpec != "") {
                                            for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                                var tempColorSize = skuColorSize.colorSize[index];
                                                if (tempColorSize.spec == preSpec) {
                                                    if (colorList.indexOf(tempColorSize.color) < 0) {
                                                        colorList.push(tempColorSize.color)
                                                    }
                                                    if (tempColorSize.size && sizeList.indexOf(tempColorSize.size) < 0) {
                                                        sizeList.push(tempColorSize.size)
                                                    }
                                                }
                                            }
                                            colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, "");
                                            if (sizeNode) {
                                                sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, "")
                                            }
                                            if (specNode) {
                                                specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, allSpecSet, preSpec)
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            var skuId = findSkuId(skuColorSize.colorSize, attributes, currentColor, currentSize, currentSpec);
                            if (skuId != "") {
                                refreshSpecInfoBySkuId(skuId)
                            } else {
                                var sizeFlag = false, specFlag = false;
                                for (var i = 0; i < skuColorSize.colorSize.length; i++) {
                                    colorSize = skuColorSize.colorSize[i];
                                    if (colorList.indexOf(colorSize.color) < 0) {
                                        colorList.push(colorSize.color)
                                    }
                                    if (colorSize.color == currentColor) {
                                        if (currentSize == colorSize.size) {
                                            if (!specFlag) {
                                                sizeFlag = true
                                            }
                                        }
                                        if (currentSpec == colorSize.spec) {
                                            if (!sizeFlag) {
                                                specFlag = true
                                            }
                                        }
                                        if (sizeList.indexOf(colorSize.size) < 0) {
                                            sizeList.push(colorSize.size)
                                        }
                                        if (specList.indexOf(colorSize.spec) < 0) {
                                            specList.push(colorSize.spec)
                                        }
                                    }
                                }
                                if (sizeFlag) {
                                    specList = [];
                                    currentSpec = "";
                                    for (var j = 0; j < skuColorSize.colorSize.length; j++) {
                                        colorSize = skuColorSize.colorSize[j];
                                        if (colorSize.color == currentColor && colorSize.size == currentSize) {
                                            if (specList.indexOf(colorSize.spec) < 0) {
                                                specList.push(colorSize.spec)
                                            }
                                        }
                                    }
                                } else {
                                    if (specFlag) {
                                        sizeList = [];
                                        currentSize = "";
                                        for (var j = 0; j < skuColorSize.colorSize.length; j++) {
                                            colorSize = skuColorSize.colorSize[j];
                                            if (colorSize.color == currentColor && colorSize.spec == currentSpec) {
                                                if (sizeList.indexOf(colorSize.size) < 0) {
                                                    sizeList.push(colorSize.size)
                                                }
                                            }
                                        }
                                    } else {
                                        currentSize = "";
                                        currentSpec = ""
                                    }
                                }
                                if (specNode) {
                                    specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, currentSpec)
                                }
                                if (colorNode) {
                                    colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, currentColor)
                                }
                                if (sizeNode) {
                                    sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, currentSize)
                                }
                            }
                        }
                    }
                    if (event.target.parentNode && event.target.parentNode.id && event.target.parentNode.id == "size") {
                        if (sizeNode && sizeNode.querySelector(".selected")) {
                            sizeNode.querySelector(".selected").className = "a-item J_ping"
                        }
                        event.target.className = "a-item selected J_ping";
                        currentSize = event.target.title || "";
                        if (currentSize == preSize) {
                            if (preColor == "" && preSpec == "") {
                                sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, allSizeSet, "");
                                if (colorNode) {
                                    colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, allColorSet, "")
                                }
                                if (specNode) {
                                    specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, allSpecSet, "")
                                }
                            } else {
                                if (preColor != "" && preSpec != "") {
                                    for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                        var tempColorSize = skuColorSize.colorSize[index];
                                        if (tempColorSize.color == preColor && tempColorSize.spec == preSpec) {
                                            if (sizeList.indexOf(tempColorSize.size) < 0) {
                                                sizeList.push(tempColorSize.size)
                                            }
                                        }
                                    }
                                    sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, "");
                                    if (colorNode) {
                                        colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, allColorSet, preColor)
                                    }
                                    if (specNode) {
                                        specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, allSpecSet, preSpec)
                                    }
                                } else {
                                    if (preColor != "") {
                                        for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                            var tempColorSize = skuColorSize.colorSize[index];
                                            if (tempColorSize.color == preColor) {
                                                if (sizeList.indexOf(tempColorSize.size) < 0) {
                                                    sizeList.push(tempColorSize.size)
                                                }
                                                if (tempColorSize.spec && specList.indexOf(tempColorSize.spec) < 0) {
                                                    specList.push(tempColorSize.spec)
                                                }
                                            }
                                        }
                                        sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, "");
                                        if (specNode) {
                                            specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, "")
                                        }
                                        if (colorNode) {
                                            colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, allColorSet, preColor)
                                        }
                                    } else {
                                        if (preSpec != "") {
                                            for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                                var tempColorSize = skuColorSize.colorSize[index];
                                                if (tempColorSize.spec == preSpec) {
                                                    if (sizeList.indexOf(tempColorSize.size) < 0) {
                                                        sizeList.push(tempColorSize.size)
                                                    }
                                                    if (tempColorSize.color && colorList.indexOf(tempColorSize.color) < 0) {
                                                        colorList.push(tempColorSize.color)
                                                    }
                                                }
                                            }
                                            sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, "");
                                            if (colorNode) {
                                                colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, "")
                                            }
                                            if (specNode) {
                                                specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, allSpecSet, preSpec)
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            var skuId = findSkuId(skuColorSize.colorSize, attributes, currentColor, currentSize, currentSpec);
                            if (skuId != "") {
                                refreshSpecInfoBySkuId(skuId)
                            } else {
                                var colorFlag = false, specFlag = false;
                                for (var i = 0; i < skuColorSize.colorSize.length; i++) {
                                    colorSize = skuColorSize.colorSize[i];
                                    if (sizeList.indexOf(colorSize.size) < 0) {
                                        sizeList.push(colorSize.size)
                                    }
                                    if (colorSize.size == currentSize) {
                                        if (currentColor == colorSize.color) {
                                            if (!specFlag) {
                                                colorFlag = true
                                            }
                                        }
                                        if (currentSpec == colorSize.spec) {
                                            if (!colorFlag) {
                                                specFlag = true
                                            }
                                        }
                                        if (colorList.indexOf(colorSize.color) < 0) {
                                            colorList.push(colorSize.color)
                                        }
                                        if (specList.indexOf(colorSize.spec) < 0) {
                                            specList.push(colorSize.spec)
                                        }
                                    }
                                }
                                if (colorFlag) {
                                    specList = [];
                                    currentSpec = "";
                                    for (var j = 0; j < skuColorSize.colorSize.length; j++) {
                                        colorSize = skuColorSize.colorSize[j];
                                        if (colorSize.color == currentColor && colorSize.size == currentSize) {
                                            if (specList.indexOf(colorSize.spec) < 0) {
                                                specList.push(colorSize.spec)
                                            }
                                        }
                                    }
                                } else {
                                    if (specFlag) {
                                        colorList = [];
                                        currentColor = "";
                                        for (var j = 0; j < skuColorSize.colorSize.length; j++) {
                                            colorSize = skuColorSize.colorSize[j];
                                            if (colorSize.size == currentSize && colorSize.spec == currentSpec) {
                                                if (colorList.indexOf(colorSize.color) < 0) {
                                                    colorList.push(colorSize.color)
                                                }
                                            }
                                        }
                                    } else {
                                        currentColor = "";
                                        currentSpec = ""
                                    }
                                }
                                if (specNode) {
                                    specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, currentSpec)
                                }
                                if (colorNode) {
                                    colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, currentColor)
                                }
                                if (sizeNode) {
                                    sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, currentSize)
                                }
                            }
                        }
                    }
                    if (event.target.parentNode && event.target.parentNode.id && event.target.parentNode.id == "spec") {
                        if (specNode && specNode.querySelector(".selected")) {
                            specNode.querySelector(".selected").className = "a-item J_ping"
                        }
                        event.target.className = "a-item selected J_ping";
                        currentSpec = event.target.title || "";
                        if (currentSpec == preSpec) {
                            if (preColor == "" && preSize == "") {
                                specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, allSpecSet, "");
                                if (colorNode) {
                                    colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, allColorSet, "")
                                }
                                if (sizeNode) {
                                    sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, allSizeSet, "")
                                }
                            } else {
                                if (preColor != "" && preSize != "") {
                                    for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                        var tempColorSize = skuColorSize.colorSize[index];
                                        if (tempColorSize.color == preColor && tempColorSize.size == preSize) {
                                            if (specList.indexOf(tempColorSize.spec) < 0) {
                                                specList.push(tempColorSize.spec)
                                            }
                                        }
                                    }
                                    specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, "");
                                    if (colorNode) {
                                        colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, allColorSet, preColor)
                                    }
                                    if (sizeNode) {
                                        sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, allSizeSet, preSize)
                                    }
                                } else {
                                    if (preColor != "") {
                                        for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                            var tempColorSize = skuColorSize.colorSize[index];
                                            if (tempColorSize.color == preColor) {
                                                if (sizeList.indexOf(tempColorSize.size) < 0) {
                                                    sizeList.push(tempColorSize.size)
                                                }
                                                if (tempColorSize.spec && specList.indexOf(tempColorSize.spec) < 0) {
                                                    specList.push(tempColorSize.spec)
                                                }
                                            }
                                        }
                                        specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, "");
                                        if (sizeNode) {
                                            sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, "")
                                        }
                                        if (colorNode) {
                                            colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, allColorSet, preColor)
                                        }
                                    } else {
                                        if (preSize != "") {
                                            for (var index = 0; index < skuColorSize.colorSize.length; index++) {
                                                var tempColorSize = skuColorSize.colorSize[index];
                                                if (tempColorSize.size == preSize) {
                                                    if (specList.indexOf(tempColorSize.spec) < 0) {
                                                        specList.push(tempColorSize.spec)
                                                    }
                                                    if (tempColorSize.color && colorList.indexOf(tempColorSize.color) < 0) {
                                                        colorList.push(tempColorSize.color)
                                                    }
                                                }
                                            }
                                            specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, "");
                                            if (colorNode) {
                                                colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, "")
                                            }
                                            if (sizeNode) {
                                                sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, allSizeSet, preSize)
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            var skuId = findSkuId(skuColorSize.colorSize, attributes, currentColor, currentSize, currentSpec);
                            if (skuId != "") {
                                refreshSpecInfoBySkuId(skuId)
                            } else {
                                var colorFlag = false, sizeFlag = false;
                                for (var i = 0; i < skuColorSize.colorSize.length; i++) {
                                    colorSize = skuColorSize.colorSize[i];
                                    if (specList.indexOf(colorSize.spec) < 0) {
                                        specList.push(colorSize.spec)
                                    }
                                    if (colorSize.spec == currentSpec) {
                                        if (currentColor == colorSize.color) {
                                            if (!sizeFlag) {
                                                colorFlag = true
                                            }
                                        }
                                        if (currentSize == colorSize.size) {
                                            if (!colorFlag) {
                                                sizeFlag = true
                                            }
                                        }
                                        if (colorList.indexOf(colorSize.color) < 0) {
                                            colorList.push(colorSize.color)
                                        }
                                        if (sizeList.indexOf(colorSize.size) < 0) {
                                            sizeList.push(colorSize.size)
                                        }
                                    }
                                }
                                if (colorFlag) {
                                    sizeList = [];
                                    currentSize = "";
                                    for (var j = 0; j < skuColorSize.colorSize.length; j++) {
                                        colorSize = skuColorSize.colorSize[j];
                                        if (colorSize.color == currentColor && colorSize.spec == currentSpec) {
                                            if (sizeList.indexOf(colorSize.size) < 0) {
                                                sizeList.push(colorSize.size)
                                            }
                                        }
                                    }
                                } else {
                                    if (sizeFlag) {
                                        colorList = [];
                                        currentColor = "";
                                        for (var j = 0; j < skuColorSize.colorSize.length; j++) {
                                            colorSize = skuColorSize.colorSize[j];
                                            if (colorSize.size == currentSize && colorSize.spec == currentSpec) {
                                                if (colorList.indexOf(colorSize.color) < 0) {
                                                    colorList.push(colorSize.color)
                                                }
                                            }
                                        }
                                    } else {
                                        currentColor = "";
                                        currentSize = ""
                                    }
                                }
                                if (specNode) {
                                    specNode.innerHTML = generateNewColorSizeSpecHtml(allSpecSet, specList, currentSpec)
                                }
                                if (colorNode) {
                                    colorNode.innerHTML = generateNewColorSizeSpecHtml(allColorSet, colorList, currentColor)
                                }
                                if (sizeNode) {
                                    sizeNode.innerHTML = generateNewColorSizeSpecHtml(allSizeSet, sizeList, currentSize)
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
    }
    return
}
function refreshSpecInfoBySkuId(c) {
    if (c) {
        $("#currentWareId").val(c);
        if ($("#newColorSizeInfo").length > 0 && $("#newColorSizeInfo").val()) {
            if (currentColorSizeSpec && currentColorSizeSpec != "") {
                currentColorSizeSpec += '<span class="amount">' + $("#number").val() + "件</span>";
                if (document.getElementById("specDetailInfo_spec")) {
                    $("#specDetailInfo_spec").html(currentColorSizeSpec)
                }
                currentColorSizeSpec = ""
            }
        } else {
            var g = document.getElementById("color");
            var j = document.getElementById("size");
            var f = document.getElementById("spec");
            var b = "";
            if (g && g.querySelector(".selected") && g.querySelector(".selected").title) {
                b = g.querySelector(".selected").title + " "
            }
            var d = "";
            if (j && j.querySelector(".selected") && j.querySelector(".selected").title) {
                d = j.querySelector(".selected").title + " "
            }
            var a = "";
            if (f && f.querySelector(".selected") && f.querySelector(".selected").title) {
                a = f.querySelector(".selected").title + " "
            }
            var h = b + d + a;
            h += '<span class="amount">' + $("#number").val() + "件</span>";
            if (document.getElementById("specDetailInfo_spec")) {
                $("#specDetailInfo_spec").html(h)
            }
        }
    }
    jQuery.ajax({url: "/ware/getSpecInfo.json", data: {sid: $("#sid").val(), wareId: c, yanbaoIds: $("#ybId").val()}, dataType: "json", success: function(l) {
            try {
                if (l && l.commonConfigJson) {
                    commonConfigJson = l.commonConfigJson
                }
                initParam();
                updateHiddenValues();
                updateNewWareSpecInfo(l);
                updateSpecBottomButton()
            } catch (k) {
                return
            }
        }, error: function(k) {
            return
        }});
    return
}
function updateSpecBottomButton() {
    try {
        if (isYuyue) {
            showGeneralButtons(false);
            showYushouButtons(false);
            showYuyueButtons(true)
        } else {
            if (isYushou) {
                showGeneralButtons(false);
                showYuyueButtons(false);
                showYushouButtons(true)
            } else {
                showYushouButtons(false);
                showYuyueButtons(false);
                showGeneralButtons(true)
            }
        }
    } catch (a) {
    }
}
function updateNewWareSpecInfo(h) {
    if (h && h.wareWeight) {
        $("#specWeightDiv").css("display", "block");
        $("#spec_weight").html(h.wareWeight)
    } else {
        $("#specWeightDiv").css("display", "none")
    }
    if (h && h.warePrice) {
        $("#spec_price").html(h.warePrice)
    } else {
        $("#spec_price").html("暂无报价")
    }
    if (h && h.plusPrice) {
        $("#specPlus").css("display", "block");
        $("#specJdPri").css("display", "none");
        $("#specPlusPrice").html(h.plusPrice);
        $("#specJdPrice").html(h.warePrice)
    } else {
        if (h) {
            $("#specPlus").css("display", "none");
            $("#specJdPri").css("display", "block");
            $("#spec_price").html(h.warePrice)
        }
    }
    if (h && h.wareMainImageUrl) {
        $("#spec_image").attr("src", h.wareMainImageUrl)
    }
    $("#ybId").val("");
    jdM.sessionstorage.set("ybId", "");
    jdM.sessionstorage.set("ybSku", $("#currentWareId").val());
    $("#warranty-seled-list").html("");
    var k = '<div class="base-txt warranty-text choose-tip"><i class="warranty-icon"></i>可选延保</div>';
    $("#warranty-seled-list").append(k);
    if (h && h.newYanBaoInfo) {
        var b = '{"yanBaoInfo":' + h.newYanBaoInfo + "}";
        $("#ybId").val("");
        if (typeof b == "string") {
            b = JSON.parse(b)
        }
        var d = "";
        for (var c = 0; c < b.yanBaoInfo.length; c++) {
            var f = b.yanBaoInfo[c];
            d += '<div class="warranty-items">';
            d += '	<div class="warranty-items-wrap">';
            d += '		<img class="warranty-items-img" src="' + f.products[0].imgurl + '"><span class="warranty-items-title">' + f.sortName + "</span>";
            if (h.yanbaoServiceInfoUrl && h.yanbaoServiceInfoUrl != "null") {
                d += '		<a class="warranty-des-href" href="javascript:void(0);" data-href="' + h.yanbaoServiceInfoUrl + '">';
                d += '			<span class="warranty-des">服务介绍</span>';
                d += '			<span class="warranty-des-icon"></span>';
                d += "		</a>";
                $("#warrantyDesHref").val(h.yanbaoServiceInfoUrl)
            }
            d += "	</div>";
            d += '	<div class="warranty-btn-wrap" data-selFlag="0" data-type="' + f.sortName + '">';
            d += '		<div class="warranty-btn-row">';
            for (var a = 0; a < f.products.length; a++) {
                var g = f.products[a];
                if (a % 2 == 1) {
                    d += '			<a class="warranty-btn J_ping" data="' + g.platformPid + '" report-eventid="MProductdetail_SpecificationInsurance">';
                    d += '				<span class="war-btn-text">' + g.sortName + '</span><span class="war-btn-price">&yen;' + g.price + "</span>";
                    d += "			</a>";
                    d += '			</div><div class="warranty-btn-row">'
                } else {
                    d += '			<a class="warranty-btn J_ping" data="' + g.platformPid + '" report-eventid="MProductdetail_SpecificationInsurance">';
                    d += '				<span class="war-btn-text">' + g.sortName + '</span><span class="war-btn-price">&yen;' + g.price + "</span>";
                    d += "			</a>"
                }
            }
            d += "		</div>";
            d += "	</div>";
            d += "</div>"
        }
        if ($("#spec_yanbaoItems").length > 0) {
            $(".warranty-wrap").show();
            $("#spec_yanbaoItems").html(d);
            warDesClickFn();
            serviceAndExtendWarranty(false)
        }
    } else {
        $(".warranty-wrap").hide();
        $("#spec_yanbaoItems").html("")
    }
    $("#number").val("1");
    if (isFqyProduct) {
        $("#addCartNum").css("display", "none")
    } else {
        $("#addCartNum").css("display", "block")
    }
    modify()
}
function updateHiddenValues() {
    if (commonConfig) {
        if (commonConfig.type) {
            $("#type").val(commonConfig.type)
        } else {
            $("#type").val("-1")
        }
        if (commonConfig.cartFlag) {
            if ($("#stockFlag").length > 0) {
                $("#stockFlag").val(commonConfig.cartFlag)
            }
            $("#cartFlag").val(commonConfig.cartFlag)
        } else {
            $("#cartFlag").val("false")
        }
        if (commonConfig.isYuyue) {
            $("#isYuYue").val(commonConfig.isYuyue);
            if (commonConfig.yuyueType) {
                $("#yuyueType").val(commonConfig.yuyueType)
            } else {
                $("#yuyueType").val("-1")
            }
        } else {
            $("#isYuYue").val("false");
            $("#yuyueType").val("-1")
        }
        if (commonConfig.isBuyCode) {
            $("#isBuyCode").val(commonConfig.isBuyCode)
        } else {
            $("#isBuyCode").val("false")
        }
        if (commonConfig.stockNotice) {
            $("#stockNotice").val(commonConfig.stockNotice)
        } else {
            $("#stockNotice").val("false")
        }
        if (commonConfig.addCartText) {
            $("#addCartText").val(commonConfig.addCartText)
        } else {
            $("#addCartText").val("")
        }
    }
}
function showGeneralButtons(a) {
    if (a) {
        initCurrentGeneralButtons()
    } else {
        $("#add_cart_spec").hide();
        $("#directorder_spec").hide()
    }
}
function initCurrentGeneralButtons() {
    var d = false;
    var c = "加入购物车";
    var a = "立即购买";
    if ("1" == $("#type").val() || "true" == $("#isBuyCode").val() || ("1" == isXnzt) || "true" == isJdOtc || "true" == isHk || isSamSku || isOilCard || isCustomize || isGameCharge || isPrescribedDrug || hasAddCartNode || isJdEcard) {
        d = true;
        if ("1" == $("#type").val()) {
            c = "立即抢购"
        } else {
            if ("true" == $("#isBuyCode").val()) {
                c = "必购码购买"
            } else {
                if (isSamCard) {
                    if ($("#addCartText").val() != "") {
                        c = $("#addCartText").val()
                    } else {
                        c = "立即购买"
                    }
                } else {
                    if (isOilCard) {
                        if ($("#addCartText").val() != "") {
                            c = $("#addCartText").val()
                        } else {
                            c = "立即充值"
                        }
                    } else {
                        if (isCustomize) {
                            if ($("#addCartText").val() != "") {
                                c = $("#addCartText").val()
                            } else {
                                c = "去定制"
                            }
                        } else {
                            if (isPrescribedDrug) {
                                c = "加入药品清单"
                            } else {
                                if (isJdEcard) {
                                    d = false;
                                    c = "加入E卡清单"
                                } else {
                                    if (isGameCharge) {
                                        c = "立即购买"
                                    } else {
                                        if (hasAddCartNode) {
                                            if ($("#addCartText").val() != "") {
                                                c = $("#addCartText").val()
                                            } else {
                                                c = "立即购买"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if ($("#cartFlag").val() == "true") {
        $("#looksimilar_spec").hide();
        $("#arrivalInform_spec").hide();
        if (d) {
            $("#add_cart_spec").html(c);
            $("#add_cart_spec").show();
            $("#directorder_spec").hide();
            $("#add_cart_spec").unbind("click");
            $("#add_cart_spec").bind("click", addWareToCart);
            if ($("#add_cart_spec").hasClass("disabled")) {
                $("#add_cart_spec").removeClass("disabled")
            }
            if ($("#add_cart_spec").hasClass("yellow-color")) {
                $("#add_cart_spec").removeClass("yellow-color")
            }
            if (!$("#add_cart_spec").hasClass("red-color")) {
                $("#add_cart_spec").addClass("red-color")
            }
            if (isSamCard && isSamMember) {
                $("#add_cart_spec").addClass("disabled");
                $("#add_cart_spec").unbind("click")
            }
        } else {
            $("#add_cart_spec").html(c);
            $("#directorder_spec").html(a);
            $("#add_cart_spec").show();
            $("#directorder_spec").show();
            $("#add_cart_spec").unbind("click");
            $("#add_cart_spec").bind("click", addWareToCart);
            $("#directorder_spec").unbind("click");
            $("#directorder_spec").bind("click", addWareToCartAndNoJump);
            if ($("#add_cart_spec").hasClass("disabled")) {
                $("#add_cart_spec").removeClass("disabled")
            }
            if ($("#add_cart_spec").hasClass("red-color")) {
                $("#add_cart_spec").removeClass("red-color")
            }
            if (!$("#add_cart_spec").hasClass("yellow-color")) {
                $("#add_cart_spec").addClass("yellow-color")
            }
            if ($("#ybId").val() && $("#ybId").val() != "") {
                $("#directorder_spec").removeClass("disabled");
                $("#directorder_spec").addClass("disabled");
                $("#directorder_spec").unbind("click")
            } else {
                $("#directorder_spec").removeClass("disabled")
            }
        }
    } else {
        if (d) {
            $("#add_cart_spec").html(c)
        } else {
            $("#add_cart_spec").html(c);
            $("#directorder_spec").html(a)
        }
        var b = false;
        if (isJdOtc == "true" || isHk == "true" || isSamCard || isCustomize || isPrescribedDrug || (hasAddCartNode && buttonDisabledWhenNoStock)) {
            b = true
        }
        if (b) {
            $("#add_cart_spec").addClass("disabled");
            $("#add_cart_spec").unbind("click");
            $("#directorder_spec").hide()
        } else {
            $("#add_cart_spec").hide();
            $("#directorder_spec").hide();
            $("#looksimilar_spec").show();
            if ($("#stockNotice").val() == "false") {
                $("#arrivalInform_spec").hide();
                if ($("#looksimilar_spec").hasClass("yellow-color")) {
                    $("#looksimilar_spec").removeClass("yellow-color")
                }
                if (!$("#looksimilar_spec").hasClass("red-color")) {
                    $("#looksimilar_spec").addClass("red-color")
                }
            } else {
                $("#arrivalInform_spec").show();
                if ($("#looksimilar_spec").hasClass("red-color")) {
                    $("#looksimilar_spec").removeClass("red-color")
                }
                if (!$("#looksimilar_spec").hasClass("yellow-color")) {
                    $("#looksimilar_spec").addClass("yellow-color")
                }
            }
        }
    }
}
function showYushouButtons(a) {
    if (a) {
        if ($("#cartFlag").val() == "true") {
            $("#yushou_add_cart_spec").show();
            if ($("#yushou_add_cart_spec").hasClass("disabled")) {
                $("#yushou_add_cart_spec").removeClass("disabled")
            }
            $("#looksimilar_spec").hide();
            $("#arrivalInform_spec").hide()
        } else {
            $("#yushou_add_cart_spec").hide();
            $("#looksimilar_spec").show();
            if ($("#stockNotice").val() == "false") {
                $("#arrivalInform_spec").hide();
                if ($("#looksimilar_spec").hasClass("yellow-color")) {
                    $("#looksimilar_spec").removeClass("yellow-color")
                }
                if (!$("#looksimilar_spec").hasClass("red-color")) {
                    $("#looksimilar_spec").addClass("red-color")
                }
            } else {
                $("#arrivalInform_spec").show();
                if ($("#looksimilar_spec").hasClass("red-color")) {
                    $("#looksimilar_spec").removeClass("red-color")
                }
                if (!$("#looksimilar_spec").hasClass("yellow-color")) {
                    $("#looksimilar_spec").addClass("yellow-color")
                }
            }
        }
    } else {
        $("#yushou_add_cart_spec").hide()
    }
}
function showYuyueButtons(a) {
    if (a) {
        $("#looksimilar_spec").hide();
        $("#arrivalInform_spec").hide();
        if ($("#isYuYue").val() == "true") {
            switch ($("#yuyueType").val()) {
                case"1":
                    if ($("#waitingForAppointments_spec").length > 0) {
                        $("#waitingForAppointments_spec").show();
                        if ($("#makeAppointments_spec").length > 0) {
                            $("#makeAppointments_spec").hide()
                        }
                        if ($("#waitingForBuying_spec").length > 0) {
                            $("#waitingForBuying_spec").hide()
                        }
                        if ($("#buyImmediately_spec").length > 0) {
                            $("#buyImmediately_spec").hide()
                        }
                        if ($("#appointmentsEnd_spec").length > 0) {
                            $("#appointmentsEnd_spec").hide()
                        }
                    }
                    break;
                case"2":
                    if ($("#makeAppointments_spec").length > 0) {
                        $("#makeAppointments_spec").show();
                        $("#makeAppointments_spec").unbind("click");
                        $("#makeAppointments_spec").bind("click", function() {
                            pingClickWithLevel("MProductdetail_SubscribeImmediately", "W", "", $("#currentWareId").val(), "5");
                            makeAppointment()
                        });
                        if ($("#waitingForAppointments_spec").length > 0) {
                            $("#waitingForAppointments_spec").hide()
                        }
                        if ($("#waitingForBuying_spec").length > 0) {
                            $("#waitingForBuying_spec").hide()
                        }
                        if ($("#buyImmediately_spec").length > 0) {
                            $("#buyImmediately_spec").hide()
                        }
                        if ($("#appointmentsEnd_spec").length > 0) {
                            $("#appointmentsEnd_spec").hide()
                        }
                    }
                    break;
                case"3":
                    if ($("#waitingForBuying_spec").length > 0) {
                        $("#waitingForBuying_spec").show();
                        if ($("#waitingForAppointments_spec").length > 0) {
                            $("#waitingForAppointments_spec").hide()
                        }
                        if ($("#makeAppointments_spec").length > 0) {
                            $("#makeAppointments_spec").hide()
                        }
                        if ($("#buyImmediately_spec").length > 0) {
                            $("#buyImmediately_spec").hide()
                        }
                        if ($("#appointmentsEnd_spec").length > 0) {
                            $("#appointmentsEnd_spec").hide()
                        }
                    }
                    break;
                case"4":
                    if ($("#buyImmediately_spec").length > 0) {
                        $("#buyImmediately_spec").show();
                        if ($("#cartFlag").val() == "true") {
                            $("#buyImmediately_spec").unbind("click");
                            $("#buyImmediately_spec").bind("click", function() {
                                if (!$("#buyImmediately_spec").hasClass("disabled")) {
                                    buyImmediatelyClickFunction()
                                }
                            })
                        } else {
                            $("#buyImmediately_spec").addClass("disabled");
                            $("#buyImmediately_spec").unbind("click")
                        }
                        if ($("#waitingForAppointments_spec").length > 0) {
                            $("#waitingForAppointments_spec").hide()
                        }
                        if ($("#makeAppointments_spec").length > 0) {
                            $("#makeAppointments_spec").hide()
                        }
                        if ($("#waitingForBuying_spec").length > 0) {
                            $("#waitingForBuying_spec").hide()
                        }
                        if ($("#appointmentsEnd_spec").length > 0) {
                            $("#appointmentsEnd_spec").hide()
                        }
                    }
                    break;
                case"5":
                    if ($("#appointmentsEnd_spec").length > 0) {
                        $("#appointmentsEnd_spec").show();
                        if ($("#waitingForAppointments_spec").length > 0) {
                            $("#waitingForAppointments_spec").hide()
                        }
                        if ($("#makeAppointments_spec").length > 0) {
                            $("#makeAppointments_spec").hide()
                        }
                        if ($("#waitingForBuying_spec").length > 0) {
                            $("#waitingForBuying_spec").hide()
                        }
                        if ($("#buyImmediately_spec").length > 0) {
                            $("#buyImmediately_spec").hide()
                        }
                    }
                    break
                }
        }
    } else {
        if ($("#waitingForAppointments_spec").length > 0) {
            $("#waitingForAppointments_spec").hide()
        }
        if ($("#makeAppointments_spec").length > 0) {
            $("#makeAppointments_spec").hide()
        }
        if ($("#waitingForBuying_spec").length > 0) {
            $("#waitingForBuying_spec").hide()
        }
        if ($("#buyImmediately_spec").length > 0) {
            $("#buyImmediately_spec").hide()
        }
        if ($("#appointmentsEnd_spec").length > 0) {
            $("#appointmentsEnd_spec").hide()
        }
    }
}
function findSkuId(g, c, b, k, j) {
    var a = ["color", "size", "spec"];
    var l = getInsertSection(a, c);
    for (var d = 0; d < g.length; d++) {
        var h = g[d];
        var f = 0;
        if (l.indexOf("color") > -1 && h.color == b) {
            f++
        }
        if (l.indexOf("size") > -1 && h.size == k) {
            f++
        }
        if (l.indexOf("spec") > -1 && h.spec == j) {
            f++
        }
        if (f == l.length) {
            return h.skuId
        }
    }
    return""
}
function getInsertSection(c, b) {
    var a = [];
    if (c && b && c.length > 0 && b.length > 0) {
        if (c.length >= b.length) {
            var f = [];
            for (var d = 0; d < c.length; d++) {
                f[c[d]] = 1
            }
            for (var d = 0; d < b.length; d++) {
                if (typeof f[b[d]] !== "undefined") {
                    a.push(b[d])
                }
            }
        } else {
            return getInsertSection(b, c)
        }
    }
    return a
}
function findSkuIdOfColorSizeSpec(b, d, g, c) {
    if (d != "" && g != "" && c != "") {
        for (var f = 0; f < b.length; f++) {
            var a = b[f];
            if (a.color == d && a.size == g && a.spec == c) {
                return a.skuId
            }
        }
    } else {
        if (d != "" && g != "") {
            for (var f = 0; f < b.length; f++) {
                var a = b[f];
                if (a.color == d && a.size == g) {
                    return a.skuId
                }
            }
        } else {
            if (d != "" && c != "") {
                for (var f = 0; f < b.length; f++) {
                    var a = b[f];
                    if (a.color == d && a.spec == c) {
                        return a.skuId
                    }
                }
            } else {
                if (g != "" && c != "") {
                    for (var f = 0; f < b.length; f++) {
                        var a = b[f];
                        if (a.size == g && a.spec == c) {
                            return a.skuId
                        }
                    }
                } else {
                    if (d != "") {
                        for (var f = 0; f < b.length; f++) {
                            var a = b[f];
                            if (a.color == d) {
                                return a.skuId
                            }
                        }
                    } else {
                        if (g != "") {
                            for (var f = 0; f < b.length; f++) {
                                var a = b[f];
                                if (a.size == g) {
                                    return a.skuId
                                }
                            }
                        } else {
                            if (c != "") {
                                for (var f = 0; f < b.length; f++) {
                                    var a = b[f];
                                    if (a.spec == c) {
                                        return a.skuId
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return""
}
function generateColorSizeSpecHtml(a, d) {
    var c = "";
    try {
        var f = document.getElementById("currentWareId").value;
        for (var b = 0; b < a.length; b++) {
            var g = a[b];
            c += '<a title="' + g + '"';
            if (g == d) {
                c += ' class="a-item selected J_ping"'
            } else {
                c += ' class="a-item J_ping" onclick="updateColorSizeSpec()"'
            }
            c += ' report-eventid="MProductdetail_SpecificationSpec"  report-eventparam="' + g + '" href="javascript:void(0);">' + g + "</a>"
        }
    } catch (h) {
    }
    return c
}
function generateNewColorSizeSpecHtml(g, a, d) {
    var c = "";
    try {
        var f = document.getElementById("currentWareId").value;
        if (g && a && g.length >= a.length) {
            for (var b = 0; b < g.length; b++) {
                var h = g[b];
                c += '<a title="' + h + '"';
                if (h == d) {
                    c += ' class="a-item selected J_ping" onclick="updateColorSizeSpec()"'
                } else {
                    if (a.indexOf(h) > -1) {
                        c += ' class="a-item J_ping" onclick="updateColorSizeSpec()"'
                    } else {
                        c += ' class="a-item no-goods J_ping" onclick="updateColorSizeSpec()"'
                    }
                }
                c += ' report-eventid="MProductdetail_SpecificationSpec"  report-eventparam="' + h + '" href="javascript:void(0);">' + h + "</a>"
            }
        }
    } catch (j) {
    }
    return c
}
function colorSizeSpecValidate() {
    try {
        var delimiter = "\u548c";
        var tipArray = [];
        if ($("#newColorSizeInfo").length > 0 && $("#newColorSizeInfo").val()) {
            var newColorSizeInfo = eval("(" + $("#newColorSizeInfo").val() + ")");
            var list = newColorSizeInfo.colorSize;
            for (var j = 0; j < list.length; j++) {
                var pIdIndex = j + 1;
                var tempNewColorSize = list[j];
                var selectedButton = $("#p-new-spec-" + pIdIndex).children(".selected");
                var selectedButtonIndex = -1;
                if (selectedButton.length == 0) {
                    tipArray.push(tempNewColorSize.title)
                }
            }
        } else {
            var colorSizeSkuJson = document.getElementById("skuColorSizeSpec").value;
            var colorTitleName = "";
            var sizeTitleName = "";
            var specTitleName = "";
            if (colorSizeSkuJson) {
                var skuColorSize = eval("(" + colorSizeSkuJson + ")");
                if (skuColorSize && skuColorSize.colorSizeTitle) {
                    if (skuColorSize.colorSizeTitle.colorName && skuColorSize.colorSizeTitle.colorName != "*") {
                        colorTitleName = skuColorSize.colorSizeTitle.colorName
                    }
                    if (skuColorSize.colorSizeTitle.sizeName && skuColorSize.colorSizeTitle.sizeName != "*") {
                        sizeTitleName = skuColorSize.colorSizeTitle.sizeName
                    }
                    if (skuColorSize.colorSizeTitle.specName && skuColorSize.colorSizeTitle.specName != "*") {
                        specTitleName = skuColorSize.colorSizeTitle.specName
                    }
                }
            } else {
                return true
            }
            var colorNode = document.getElementById("color");
            var sizeNode = document.getElementById("size");
            var specNode = document.getElementById("spec");
            if (colorNode && colorTitleName != "") {
                if (!colorNode.querySelector(".selected")) {
                    tipArray.push('"' + colorTitleName + '"')
                }
            }
            if (sizeNode && sizeTitleName != "") {
                if (!sizeNode.querySelector(".selected")) {
                    tipArray.push('"' + sizeTitleName + '"')
                }
            }
            if (specNode && specTitleName != "") {
                if (!specNode.querySelector(".selected")) {
                    tipArray.push('"' + specTitleName + '"')
                }
            }
        }
        if (tipArray && tipArray.length > 0) {
            var spectext = "\u8bf7\u9009\u62e9";
            for (var i = 0; i < tipArray.length; i++) {
                spectext += tipArray[i];
                if (i != (tipArray.length - 1)) {
                    spectext += delimiter
                }
            }
            var defaultHeight = 88;
            var defalutWidth = 180;
            if (tipArray.length > 2) {
                defaultHeight = 120;
                defalutWidth = 200
            }
            var defaults = {cls: "error-icon", duration: 3000, message: spectext, height: defaultHeight, width: defalutWidth};
            showMessage(defaults);
            return false
        } else {
            return true
        }
    } catch (e) {
        return true
    }
    return true
}
function updateColorSizeInfo() {
    try {
        var newColorSizeInfo = eval("(" + $("#newColorSizeInfo").val() + ")");
        var list = newColorSizeInfo.colorSize;
        var isSameButtonClick = false;
        if (event.target) {
            if (event.target.parentNode && event.target.parentNode.id) {
                if (event.target.parentNode.querySelector(".selected")) {
                    if (event.target.parentNode.querySelector(".selected").id == event.target.id) {
                        isSameButtonClick = true
                    } else {
                        isSameButtonClick = false
                    }
                    event.target.parentNode.querySelector(".selected").className = "a-item J_ping"
                }
                if (isSameButtonClick) {
                    event.target.className = "a-item J_ping";
                    var tempArray = event.target.parentNode.id.split("-");
                    var index = parseInt(tempArray[tempArray.length - 1]) - 1;
                    var commonSkuList = [];
                    var isCommonListInit = false;
                    var notUpdateIndex = [];
                    for (var i = 0; i < list.length; i++) {
                        if (i != index) {
                            var pIdIndex = i + 1;
                            var selectedButton = $("#p-new-spec-" + pIdIndex).children(".selected");
                            if (selectedButton && selectedButton.length > 0) {
                                var buttonIdArray = selectedButton[0].id.split("-");
                                var selectedButtonIndex = parseInt(buttonIdArray[buttonIdArray.length - 1]);
                                var tempSkuList = list[i].buttons[selectedButtonIndex].skuList;
                                if (!isCommonListInit) {
                                    commonSkuList = tempSkuList;
                                    isCommonListInit = true
                                }
                                if (getInsertSection(commonSkuList, tempSkuList).length > 0) {
                                    notUpdateIndex.push(i);
                                    commonSkuList = getInsertSection(commonSkuList, tempSkuList)
                                }
                            }
                        }
                    }
                    for (var j = 0; j < list.length; j++) {
                        var pIdIndex = j + 1;
                        if (notUpdateIndex.indexOf(j) < 0) {
                            var tempNewColorSize = list[j];
                            var selectedButton = $("#p-new-spec-" + pIdIndex).children(".selected");
                            var selectedButtonIndex = -1;
                            if (selectedButton.length > 0) {
                                var buttonIdArray = selectedButton[0].id.split("-");
                                selectedButtonIndex = parseInt(buttonIdArray[buttonIdArray.length - 1])
                            }
                            var html = "";
                            for (var m = 0; m < tempNewColorSize.buttons.length; m++) {
                                var tempSkuList = tempNewColorSize.buttons[m].skuList;
                                var title = tempNewColorSize.buttons[m].text;
                                html += '<a title="' + title + '"';
                                if (getInsertSection(commonSkuList, tempSkuList).length > 0) {
                                    if (m == selectedButtonIndex) {
                                        html += ' class="a-item selected J_ping" '
                                    } else {
                                        html += ' class="a-item J_ping" '
                                    }
                                } else {
                                    if (commonSkuList.length == 0) {
                                        html += ' class="a-item J_ping" '
                                    } else {
                                        html += ' class="a-item no-goods J_ping" '
                                    }
                                }
                                html += 'id="button-new-spec-' + m + '" onclick="updateColorSizeInfo();" report-eventid="MProductdetail_SpecificationSpec" report-eventparam="' + title + '"  href="javascript:void(0)">' + title + "</a>"
                            }
                            $("#p-new-spec-" + pIdIndex).html(html)
                        }
                    }
                } else {
                    event.target.className = "a-item selected J_ping";
                    var tempArray = event.target.parentNode.id.split("-");
                    var index = parseInt(tempArray[tempArray.length - 1]) - 1;
                    var newColorSize = list[index];
                    var tempArray2 = event.target.id.split("-");
                    var buttonIndex = parseInt(tempArray2[tempArray2.length - 1]);
                    var currentSkuList = newColorSize.buttons[buttonIndex].skuList;
                    var commonSkuList = currentSkuList;
                    var selectedButtonCount = 1;
                    currentColorSizeSpec = "";
                    for (var i = 0; i < list.length; i++) {
                        if (i != index) {
                            var pIdIndex = i + 1;
                            var selectedButton = $("#p-new-spec-" + pIdIndex).children(".selected");
                            if (selectedButton && selectedButton.length > 0) {
                                selectedButtonCount++;
                                currentColorSizeSpec += selectedButton[0].title + " ";
                                var buttonIdArray = selectedButton[0].id.split("-");
                                var selectedButtonIndex = parseInt(buttonIdArray[buttonIdArray.length - 1]);
                                var tempSkuList = list[i].buttons[selectedButtonIndex].skuList;
                                commonSkuList = getInsertSection(commonSkuList, tempSkuList)
                            }
                        } else {
                            currentColorSizeSpec += event.target.title + " "
                        }
                    }
                    if (commonSkuList.length == 1 && selectedButtonCount == list.length) {
                        refreshSpecInfoBySkuId(commonSkuList[0])
                    } else {
                        if (commonSkuList.length > 1 && selectedButtonCount == list.length) {
                            refreshSpecInfoBySkuId(commonSkuList[0])
                        } else {
                            currentColorSizeSpec = "";
                            for (var j = 0; j < list.length; j++) {
                                var tempNewColorSize = list[j];
                                if (j != index) {
                                    var pIdIndex = j + 1;
                                    var selectedButton = $("#p-new-spec-" + pIdIndex).children(".selected");
                                    var selectedButtonIndex = -1;
                                    if (selectedButton.length > 0) {
                                        var buttonIdArray = selectedButton[0].id.split("-");
                                        selectedButtonIndex = parseInt(buttonIdArray[buttonIdArray.length - 1])
                                    }
                                    var html = "";
                                    for (var m = 0; m < tempNewColorSize.buttons.length; m++) {
                                        var tempSkuList = tempNewColorSize.buttons[m].skuList;
                                        var title = tempNewColorSize.buttons[m].text;
                                        html += '<a title="' + title + '"';
                                        if (getInsertSection(currentSkuList, tempSkuList).length > 0) {
                                            if (m == selectedButtonIndex) {
                                                html += ' class="a-item selected J_ping" '
                                            } else {
                                                html += ' class="a-item J_ping" '
                                            }
                                        } else {
                                            html += ' class="a-item no-goods J_ping" '
                                        }
                                        html += 'id="button-new-spec-' + m + '" onclick="updateColorSizeInfo();" report-eventid="MProductdetail_SpecificationSpec" report-eventparam="' + title + '"  href="javascript:void(0)">' + title + "</a>"
                                    }
                                    $("#p-new-spec-" + pIdIndex).html(html)
                                } else {
                                    for (var m = 0; m < tempNewColorSize.buttons.length; m++) {
                                        if (m != buttonIndex) {
                                            $("#button-new-spec-" + m).attr("class", "a-item J_ping")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
    }
}
(function() {
    function depreciatePop(btnID, boxId) {
        var oBtn = document.getElementById(btnID);
        var oBox = document.getElementById(boxId);
        var depreciateYesB = document.getElementById("depreciateYesB");
        var floor;
        var oBody = document.getElementsByTagName("body")[0];
        var cancelButt = oBox.querySelector(".cancel-but");
        var expectPrompt = oBox.querySelector(".input-prompt");
        var discountBlock = oBox.querySelector(".discount-block");
        var expectP = oBox.querySelector(".input-box[type=number]");
        var phoneNum = oBox.querySelector(".input-box[type=tel]");
        var phoneNumPrompt = oBox.querySelector(".phone-num-prompt");
        var sid = $("#sid").val();
        if (oBtn) {
            oBtn.onclick = function() {
                var pin = $("#pin").val();
                if (pin == "" || typeof (pin) == "undefined") {
                    window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + sid + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html";
                    return
                }
                appearFrame(oBox)
            }
        }
        function appearFrame(myid) {
            floor = document.createElement("div");
            floor.className = "product-inform-floor J_ping";
            floor.id = "productInformFloor";
            floor.style.height = document.documentElement.offsetHeight + "px";
            floor.style.display = "block";
            floor.setAttribute("report-eventid", "MProductdetail_ArrivalMask");
            floor.setAttribute("report-eventlevel", "5");
            floor.setAttribute("report-pageparam", $("#currentWareId").val());
            oBody.appendChild(floor);
            ProScrollH = document.documentElement.scrollTop || document.body.scrollTop;
            ProClientH = document.documentElement.clientHeight;
            myid.style.display = "block";
            myid.style.visibility = "visible";
            myid.style.top = ProScrollH + ProClientH * 0.5 - myid.offsetHeight / 2 + "px";
            phoneNum.value = "";
            phoneNumPrompt.innerHTML = "";
            phoneNumPrompt.style.visibility = "hidden";
            floor.onclick = function() {
                oBody.removeChild(floor);
                oBox.style.display = "none";
                oBox.style.visibility = "hidden"
            };
            cancelButt.onclick = function() {
                oBody.removeChild(floor);
                oBox.style.display = "none";
                oBox.style.visibility = "hidden"
            };
            phoneNum.onblur = function() {
                var data = handlePhone(phoneNum.value);
                if (data[0] != "0") {
                    phoneNumPrompt.innerHTML = data[1];
                    phoneNumPrompt.style.visibility = "visible"
                }
            };
            phoneNum.onfocus = function() {
                phoneNumPrompt.style.visibility = "hidden"
            };
            if (expectP) {
                expectP.value = "";
                discountBlock.style.display = "none";
                expectPrompt.innerHTML = "";
                expectP.onfocus = function() {
                    expectPrompt.style.visibility = "hidden";
                    discountBlock.style.display = "none"
                };
                expectP.onblur = function() {
                    var jdPrice = "\u6682\u65e0\u62a5\u4ef7";
                    if (document.getElementById("jdPrice")) {
                        jdPrice = $.trim(document.getElementById("jdPrice").value)
                    }
                    var expectPrice = $.trim(expectP.value);
                    var data = handlePrice(expectPrice, jdPrice);
                    if (data[0] == "0") {
                        expectPrice = (expectPrice * 1).toFixed(2);
                        var discount = (expectPrice / jdPrice * 10).toFixed(1);
                        $(".discount-block").html(discount + "\u6298");
                        expectP.value = expectPrice;
                        discountBlock.style.display = "block"
                    } else {
                        expectPrompt.innerHTML = data[1];
                        expectPrompt.style.visibility = "visible";
                        discountBlock.style.display = "none"
                    }
                }
            }
            depreciateYesB.onclick = function() {
                var jdPrice = "\u6682\u65e0\u62a5\u4ef7";
                if (document.getElementById("jdPrice")) {
                    jdPrice = $.trim(document.getElementById("jdPrice").value)
                }
                var price = $.trim(expectP.value);
                var phone = phoneNum.value;
                var priceData = handlePrice(price, jdPrice);
                var phoneData = handlePhone(phone);
                if (priceData[0] == "0" && phoneData[0] == "0") {
                    jQuery.ajax({url: "/ware/priceSubscriber.json", data: {wareId: $("#currentWareId").val(), sid: $("#sid").val(), hopePrice: price, phoneNo: phone}, dataType: "json", success: function(d) {
                            try {
                                if (d && d.priceSubscriberResonse) {
                                    var obj = eval("(" + d.priceSubscriberResonse + ")");
                                    var code = obj.resultCode;
                                    if (code == "1") {
                                        oBody.removeChild(floor);
                                        oBox.style.display = "none";
                                        toastSuccess("\u8ba2\u9605\u6210\u529f!")
                                    } else {
                                        oBody.removeChild(floor);
                                        oBox.style.display = "none";
                                        toastError(obj.msg)
                                    }
                                } else {
                                    oBody.removeChild(floor);
                                    oBox.style.display = "none";
                                    toastError("\u8ba2\u9605\u5931\u8d25")
                                }
                            } catch (e) {
                                oBody.removeChild(floor);
                                oBox.style.display = "none";
                                toastError("\u8ba2\u9605\u5931\u8d25")
                            }
                        }, error: function(d) {
                            window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + sid + "&returnurl=http://item.m.jd.com/product/" + $("#currentWareId").val() + ".html"
                        }})
                } else {
                    expectPrompt.innerHTML = (priceData[0] == "0" ? "" : priceData[1]);
                    phoneNumPrompt.innerHTML = (phoneData[0] == "0" ? "" : phoneData[1]);
                    expectPrompt.style.visibility = "visible";
                    phoneNumPrompt.style.visibility = "visible"
                }
            }
        }}
    window.depreciatePop = depreciatePop
})();
function handlePrice(a, b) {
    var c, d;
    if (a == "" || a == "null") {
        c = "99";
        d = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u671f\u671b\u4ef7\u683c"
    } else {
        a = a * 1;
        b = b * 1;
        if (a < 0) {
            c = "2";
            d = "\u671f\u671b\u4ef7\u683c\u4e0d\u80fd\u5c0f\u4e8e0"
        } else {
            if (a > b) {
                c = "3";
                d = "\u671f\u671b\u4ef7\u683c\u4e0d\u80fd\u5927\u4e8e\u5f53\u524d\u4ef7\u683c"
            } else {
                c = "0";
                d = "\u6b63\u786e\u503c"
            }
        }
    }
    return initDataArray(c, d)
}
function handlePhone(a) {
    var b = /^(\+86)?1[3-9][0-9]{9}$/;
    var c, d;
    if (a == "" || a == "null") {
        c = "1";
        d = "\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"
    } else {
        if (!b.test(a)) {
            c = "2";
            d = "\u624b\u673a\u53f7\u7801\u9519\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165"
        } else {
            c = "0";
            d = "\u6b63\u786e\u503c"
        }
    }
    return initDataArray(c, d)
}
function initDataArray(a, c) {
    var b = new Array(2);
    b[0] = a;
    b[1] = c;
    return b
}
function toastSuccess(a) {
    $.toast({message: a, cls: "succee-icon"})
}
function toastError(a) {
    $.toast({message: a, cls: "error-icon"})
}
if ($("#depreciateInformIsShow").val() != "false") {
    depreciatePop("depreciateInformPr", "depreciateInformBlock")
}
if ($(".arrivalInform").length > 0) {
    $(".arrivalInform").each(function() {
        depreciatePop($(this).attr("id"), "arrvalInformBlock")
    })
}
var itemInfoFlag = false;
var itemScaleFlag = true;
function productInfoLoad(n) {
    var c = {containerID: "goodDetail", wareId: "", url: "", cbfn: null, switchTabCbFn: function() {
        }, goProdBtnCbFn: function() {
        }};
    var m = $.extend(c, n);
    var a = document.getElementById(m.containerID);
    var f = document.querySelector(".tab-lst");
    var d = "";
    var b = "";
    var j = {addInfo: function(r) {
            var q = this;
            d += '<div class="detail" id="wareInfo" style="display:block;">';
            if (r.OP && r.overseaNotices && r.overseaNotices.length > 0) {
                d += '    <div id="scale-parent2">';
                d += '        <div class="scale-box" id="scale-cont2">';
                for (var p = 0, o = r.overseaNotices.length; p < o; p++) {
                    if (r.OP && r.overseaNotices[p] && $("#httpsConfig") && "true" == $("#httpsConfig").val() && r.overseaNotices[p].indexOf('src="http://') > -1) {
                        d += r.overseaNotices[p].replace(/src="http:\/\//g, 'src="//')
                    } else {
                        d += r.overseaNotices[p]
                    }
                }
                d += "</div></div>"
            }
            d += '    <div id="scale-parent">';
            if (r && r.wdis && r.wdis != "null" && r.wdis != "暂无") {
                d += '        <div class="scale-box" id="scale-cont">';
                d += "            <p>";
                d += "                <span>";
                if (r.wdis && $("#httpsConfig") && "true" == $("#httpsConfig").val() && r.wdis.indexOf('src="http://') > -1) {
                    d += r.wdis.replace(/src="http:\/\//g, 'src="//')
                } else {
                    d += r.wdis
                }
                d += "</span></p>"
            } else {
                itemScaleFlag = false;
                d += '        <div   id="scale-cont">';
                d += '<div class="errPic"><img src="images/4.4/i/dog.png"/><span class="errPic-content">暂无商品介绍</span><div class="pro-button-box"><span class="pro-button J_ping"  report-eventid="MProductdetail_DetailViewGoods" report-eventlevel="5"';
                if (r.wareId) {
                    d += 'report-eventparam="' + r.wareId + '"'
                }
                d += ">查看商品信息</span></div></div>"
            }
            d += "</div></div>";
            d += '<div id="recommendWrap" class="recommend-wrap"></div>';
            d += '<div id="scanWrap" class="recommend-wrap"></div>';
            d += "</div>";
            d += '<div class="detail" id="wareStandard" style="display:none;">';
            if (r && r.wi && r.wi.code && r.wi.code != "null" && r.wi.code != "暂无") {
                if (r.wi.type == 1 || r.wi.type == 4) {
                    d += "<p><span>";
                    d += r.wi.code;
                    d += "</span></p>"
                } else {
                    if (r.wi.type == 2 || r.wi.type == 3) {
                        d += "<table class='table-border' width='100%'><tbody>";
                        d = this.doJson(JSON.parse(r.wi.code), d, r.wi.type);
                        d += "</tbody></table>"
                    }
                }
            } else {
                d += '<div class="errPic"><img src="images/4.4/i/dog.png"/><span class="errPic-content">暂无规格参数</span><div class="pro-button-box"><span class="pro-button J_ping"  report-eventid="MProductdetail_DetailViewGoods" report-eventlevel="5"';
                if (r.wareId) {
                    d += 'report-eventparam="' + r.wareId + '"'
                }
                d += ">查看商品信息</span></div></div>"
            }
            d += '</div><div class="detail" id="warePack" style="display:none;">';
            if ((r && r.wi && r.wi.wareQD && r.wi.wareQD != "null" && r.wi.wareQD != "暂无") || (r && r.wi && r.wi.ybInfo && r.wi.ybInfo != "null" && r.wi.ybInfo != "暂无") || (r && r.wi && r.wi.priceDescription && r.wi.priceDescription != "null" && r.wi.priceDescription != "暂无")) {
                d += "<p>";
                if (r && r.wi && r.wi.wareQD && r.wi.wareQD != "null" && r.wi.wareQD != "暂无") {
                    d += "<p>包装清单：</p>";
                    d += "<p>";
                    d += r.wi.wareQD;
                    d += "</p><br/>"
                } else {
                    d += ""
                }
                if (r && r.wi && r.wi.ybInfo && r.wi.ybInfo != "null" && r.wi.ybInfo != "暂无") {
                    d += "<p>售后服务：</p>";
                    d += "<p>";
                    d += r.wi.ybInfo;
                    d += "</p><br/>"
                } else {
                    d += ""
                }
                if (r && r.wi && r.wi.priceDescription && r.wi.priceDescription != "null" && r.wi.priceDescription != "暂无") {
                    d += "<p>价格说明：</p>";
                    d += "<p>";
                    d += r.wi.priceDescription;
                    d += "</p>"
                } else {
                    d += ""
                }
                d += "</p>"
            } else {
                d += '<div class="errPic"><img src="images/4.4/i/dog.png"/><span class="errPic-content">暂无包装售后</span><div class="pro-button-box"><span class="pro-button J_ping"  report-eventid="MProductdetail_DetailViewGoods" report-eventlevel="5"';
                if (r.wareId) {
                    d += 'report-eventparam="' + r.wareId + '"'
                }
                d += ">查看商品信息</span></div></div>"
            }
            d += '</div><div class="detail" id="wareService" style="display:none;">';
            d += "    <p>";
            d += "        <span>";
            if (r && r.wi && r.wi.ybInfo && r.wi.ybInfo != "null") {
                d += r.wi.ybInfo
            } else {
                d += ""
            }
            d += "</span></p></div>"
        }, loopArray: function(q, s) {
            var r;
            for (var p = 0, o = q.length; p !== o; ++p) {
                if ((r = s(q[p], p)) !== undefined) {
                    return r
                }
            }
        }, loopObj: function(p, q) {
            for (var o in p) {
                q(o, p[o])
            }
        }, doJson: function(o, r, p) {
            var q = this;
            if (p == 2) {
                this.loopArray(o, function(t, s) {
                    q.loopObj(t, function(x, w) {
                        r += "<tr><td colspan='2'><strong>" + x + "</strong></td></tr>";
                        q.loopArray(w, function(y, v) {
                            q.loopObj(y, function(A, z) {
                                A = A.replace(/[\（|(]/, "<br/> (");
                                r += "<tr><td>" + A + "</td><td>" + z + "</td></tr>"
                            })
                        })
                    })
                })
            } else {
                if (p == 3) {
                    this.loopArray(o, function(t, s) {
                        q.loopObj(t, function(x, w) {
                            x = x.replace(/[\（|(]/, "<br/> (");
                            r += "<tr><td>" + x + "</td><td>" + w + "</td></tr>"
                        })
                    })
                }
            }
            return r
        }, addBook: function(q) {
            d += '<div class="detail" id="bookContent" style="display:block;">';
            d += '    <div id="scale-parent">';
            if (q && q.ware && q.ware.bookAttrs && q.ware.bookAttrs != "null") {
                d += '        <div class="scale-box-ebook" id="scale-cont">';
                d += "            <p>";
                d += "                <span></span></p>";
                d += '            <div class="book-container">';
                for (var p = 0; p < q.ware.bookAttrs.length; p++) {
                    d += '                <div class="book-container-item">';
                    d += '                    <span class="book-item-title">\u3010';
                    if (q.ware.bookAttrs[p].label && q.ware.bookAttrs[p].label != "null") {
                        d += q.ware.bookAttrs[p].label
                    } else {
                        d += ""
                    }
                    d += "\u3011</span>";
                    d += '<p class="book-item-content">';
                    if (q.ware.bookAttrs[p].value && q.ware.bookAttrs[p].value != "null") {
                        if ($("#httpsConfig") && "true" == $("#httpsConfig").val() && q.ware.bookAttrs[p].value.indexOf('src="http://') > -1) {
                            d += q.ware.bookAttrs[p].value.replace(/src="http:\/\//g, 'src="//')
                        } else {
                            d += q.ware.bookAttrs[p].value
                        }
                    } else {
                        d += ""
                    }
                    d += "</p></div>"
                }
            } else {
                itemScaleFlag = false;
                d += '<div class="errPic"><img src="images/4.4/i/dog.png"/><span class="errPic-content">暂无商品介绍</span><div class="pro-button-box"><span class="pro-button J_ping"  report-eventid="MProductdetail_DetailViewGoods" report-eventlevel="5"';
                if (q.wareId) {
                    d += 'report-eventparam="' + q.wareId + '"'
                }
                d += ">查看商品信息</span></div></div></div>"
            }
            d += "</div><p></p></div></div>";
            d += '<div id="recommendWrap" class="recommend-wrap"></div>';
            d += '<div id="scanWrap" class="recommend-wrap"></div>';
            d += "</div>";
            d += '<div class="detail" id="bookInfo" style="display:none;">';
            d += "<p><span></span></p>";
            if (q && q.ware && q.ware.attrs && q.ware.attrs != "null") {
                for (var o = 0; o < q.ware.attrs.length; o++) {
                    d += '<div class="book-container">';
                    d += '    <div class="book-info-line">';
                    d += '         <span class="info-title">';
                    if (q.ware.attrs[o].label && q.ware.attrs[o].label != "null") {
                        d += q.ware.attrs[o].label
                    } else {
                        d += ""
                    }
                    d += "</span>";
                    d += '         <span class="info-content">';
                    if (q.ware.attrs[o].value == "undefined") {
                        d += ""
                    } else {
                        d += q.ware.attrs[o].value
                    }
                    d += "</span></div></div>"
                }
            } else {
                d += ""
            }
            d += "<p></p></div>";
            d += '<div class="detail" id="bookCata" style="display:none;">';
            d += "    <p>";
            d += '        <span style="margin-left:5px">';
            if (q && q.ware && q.ware.catalogue && q.ware.catalogue != "null") {
                d += q.ware.catalogue
            } else {
                d += ""
            }
            d += "</span></p></div>"
        }, zhuangbaFn: function(o) {
            if (o && o.popWareDetailWebViewMap && o.popWareDetailWebViewMap.cssContent) {
                $("body").append(o.popWareDetailWebViewMap.cssContent)
            }
        }, clickDetailTab: function() {
            var o = document.querySelectorAll(".detail"), q = document.querySelectorAll(".tab-lst-a");
            for (var p = 0; p < q.length; p++) {
                (function(r) {
                    q[p].addEventListener("click", function() {
                        for (var s = 0; s < o.length; s++) {
                            o[s].style.display = "none"
                        }
                        for (var t = 0; t < q.length; t++) {
                            if (q[t].classList.contains("on")) {
                                q[t].classList.remove("on")
                            }
                        }
                        q[r].classList.add("on");
                        var v = q[r].getAttribute("value");
                        document.getElementById(v).style.display = "block"
                    }, false)
                }(p))
            }
        }};
    var l = function() {
        if (!itemInfoFlag) {
            g()
        }
    };
    var h = function(o) {
        var p = "";
        if ($("#uniformShopId").val()) {
            p = p + "&shopId=" + $("#uniformShopId").val()
        }
        if ($("#uniformFlt").val()) {
            p = p + "&flt=" + $("#uniformFlt").val()
        }
        j.zhuangbaFn(o);
        j.addInfo(o);
        a.innerHTML = d;
        j.clickDetailTab();
        m.switchTabCbFn();
        m.goProdBtnCbFn();
        if (itemScaleFlag) {
            m.cbfn()
        }
        recommendLoad({containerID: "recommendWrap", url: "uniformRecommend.json?wareId=" + $("#currentWareId").val() + p})
    };
    var k = function(o) {
        var p = "";
        if ($("#uniformShopId").val()) {
            p = p + "&shopId=" + $("#uniformShopId").val()
        }
        if ($("#uniformFlt").val()) {
            p = p + "&flt=" + $("#uniformFlt").val()
        }
        j.zhuangbaFn(o);
        j.addBook(o);
        a.innerHTML = d;
        j.clickDetailTab();
        m.switchTabCbFn();
        m.goProdBtnCbFn();
        if (itemScaleFlag) {
            m.cbfn()
        }
        recommendLoad({containerID: "recommendWrap", url: "uniformRecommend.json?wareId=" + $("#currentWareId").val() + p})
    };
    var g = function() {
        var o = document.querySelector(".is-loading");
        $.ajax({type: "get", url: m.url, data: m.filters, dataType: "json", beforeSend: function() {
                o.style.display = "block"
            }, success: function(p) {
                o.style.display = "none";
                if (p && !m.itemInfoFlag) {
                    if (p.isbook) {
                        k(p)
                    } else {
                        if (p.ware) {
                            h(p.ware)
                        }
                    }
                    itemInfoFlag = true
                }
            }, error: function(q, p) {
                o.style.display = "none"
            }})
    };
    return l()
}
function assessListInit(s) {
    var h = {containerID: "tab-wrapper", url: "", tabIndex: 0, maxCount: 10, cbList: null};
    var r = $.extend(h, s);
    var g = document.getElementById(r.containerID);
    var o = document.querySelector(".is-loading");
    var p = document.getElementById("tabs");
    var j = "";
    var n = "";
    var a = "onorientationchange" in window;
    var d = a ? "orientationchange" : "resize";
    var c = document.getElementById("openAppFlagA").value;
    var m = {getAdjustW: function() {
            var v = document.documentElement.clientWidth;
            var w = v - 20 - 13 * 3;
            var t = w / 4;
            if (t > 120) {
                t = 120
            }
            return t
        }, liAdjustWidth: function() {
            var t = m.getAdjustW();
            $(".product-imgs-li").width(t).height(t)
        }, imgAdjustWidth: function() {
            var t = m.getAdjustW();
            $(".product-imgs-li").find("img").each(function(y) {
                var w = $(this);
                var A;
                var x;
                var v;
                var z = new Image();
                z.src = $(w).attr("src");
                z.onload = function() {
                    A = this.width;
                    x = this.height;
                    v = A / x;
                    if (x > A) {
                        w.width(t);
                        w.css("marginTop", (t - (t / v)) / 2 + "px")
                    } else {
                        w.height(t);
                        w.css("marginLeft", (t - (t * v)) / 2 + "px")
                    }
                };
                z.onerror = function() {
                    w.attr("src", "images/occupy-img320.gif?v=");
                    w.width(t).height(t)
                }
            })
        }, imgLoadCb: function(y, w) {
            var v = m.getAdjustW();
            var z = y.width;
            var x = y.height;
            var t = z / x;
            if (x > z) {
                w.width(v);
                w.css("marginTop", (v - (v / t)) / 2 + "px")
            } else {
                w.height(v);
                w.css("marginLeft", (v - (v * t)) / 2 + "px")
            }
        }, addTop: function(v) {
            var t = $("#currentWareId").val();
            n += '<li class="tab-item J_ping" report-eventid="MProductdetail_CommentAllTab" report-eventlevel="5" report-pageparam="' + t + '">';
            n += '    <p class="tab-assess-title">\u5168\u90e8\u8bc4\u4ef7</p>';
            n += '    <p class="tab-assess-num">';
            n += v.allCnt || 0;
            n += "    </p>";
            n += "</li>";
            n += '<li class="tab-item J_ping" report-eventid="MProductdetail_CommentFavorableTab" report-eventlevel="5" report-pageparam="' + t + '">';
            n += '    <p class="tab-assess-title">\u597d\u8bc4</p>';
            n += '    <p class="tab-assess-num">';
            n += v.goodCnt || 0;
            n += "    </p>";
            n += "</li>";
            n += '<li class="tab-item J_ping" report-eventid="MProductdetail_CommentMediumTab" report-eventlevel="5" report-pageparam="' + t + '">';
            n += '    <p class="tab-assess-title">\u4e2d\u8bc4</p>';
            n += '    <p class="tab-assess-num">';
            n += v.normalCnt || 0;
            n += "    </p>";
            n += "</li>";
            n += '<li class="tab-item J_ping" report-eventid="MProductdetail_CommentPoorTab" report-eventlevel="5" report-pageparam="' + t + '">';
            n += '    <p class="tab-assess-title">\u5dee\u8bc4</p>';
            n += '    <p class="tab-assess-num">';
            n += v.badCnt || 0;
            n += "    </p>";
            n += "</li>";
            n += '<li class="tab-item J_ping" report-eventid="MProductdetail_CommentPictureTab" report-eventlevel="5" report-pageparam="' + t + '">';
            n += '    <p class="tab-assess-title">\u6709\u56fe</p>';
            n += '    <p class="tab-assess-num">';
            n += v.pictureCnt || 0;
            n += "    </p>";
            n += "</li>"
        }, switchTab: function() {
            var z = document.getElementById("tabs");
            var y = document.querySelectorAll(".tab-item");
            var w = document.querySelectorAll(".tab-assess-num");
            var x = document.querySelector(".reply-body");
            if (z != null) {
                for (var t = 0; t < y.length; t++) {
                    y[t].classList.remove("tab-hover");
                    w[t].classList.remove("tab-assess-rednum")
                }
                y[r.tabIndex].classList.add("tab-hover");
                w[r.tabIndex].classList.add("tab-assess-rednum");
                for (var v = 0; v < y.length; v++) {
                    (function(A) {
                        y[A].onclick = function() {
                            r.tabIndex = A;
                            for (var B = 0; B < v; B++) {
                                y[B].classList.remove("tab-hover");
                                w[B].classList.remove("tab-assess-rednum")
                            }
                            y[A].classList.add("tab-hover");
                            w[A].classList.add("tab-assess-rednum");
                            x.scrollTop = 0;
                            r.url = "newCommentsDetail.json";
                            l(1)
                        }
                    })(v)
                }
            }
        }, tabReturn: function() {
            var t = document.querySelectorAll(".tab-btn")[0], x = this, w = document.querySelectorAll(".tab-item"), v = document.querySelectorAll(".tab-assess-num");
            if (t) {
                t.onclick = function() {
                    pingClickWithLevel("MProductdetail_CommentAll", "", "", $("#currentWareId").val(), "5");
                    r.tabIndex = 0;
                    if (w.length > 0) {
                        for (var y = 0; y < w.length; y++) {
                            w[y].classList.remove("tab-hover");
                            v[y].classList.remove("tab-assess-rednum")
                        }
                        w[r.tabIndex].classList.add("tab-hover");
                        v[r.tabIndex].classList.add("tab-assess-rednum")
                    }
                    r.url = "newCommentsDetail.json";
                    l(1)
                }
            }
        }, addHtml: function(B) {
            var A = $("#currentWareId").val();
            var t = $("#sid").val();
            var y = "";
            if (B && B.guid) {
                y = B.guid
            }
            var x = "/newComments/clickUseful.json?sid=" + t + "&wareId=" + A + "&commentId=" + y;
            var z = "javascript:void(0)";
            if ($("#isDisplayReplyBtn").val() == "true") {
                z = "/replyList/" + A + "_" + y + ".html?sid=" + t
            } else {
                if (B.replyCnt > 0) {
                    z = "/replyList/" + A + "_" + y + ".html?sid=" + t
                }
            }
            j += '<div class="assess-flat">';
            j += '    <span class="assess-wrapper">';
            j += '        <div class="assess-top">';
            j += '            <span class="user-portrait">';
            j += '                <img src="//';
            j += B.userImgURL;
            j += '" onerror="userDefaultImg();" >';
            j += "</span>";
            j += '            <span class="user-name">';
            j += B.userNickName;
            j += "</span>";
            if (B && B.plusAvailable && B.plusAvailable == "101") {
                j += '<a class="plus-icon-wrap J_ping" report-eventid="MProductdetail_CommentPlus" href="' + B.plusAddress + '">';
                j += '    <img class="plus-icon plus-icon-left" src="images/plus-icon.png">';
                j += '    <span class="plus-icon-text">试用</span>';
                j += "</a>"
            } else {
                if (B && B.plusAvailable && B.plusAvailable == "201") {
                    j += '<a class="plus-icon-wrap J_ping" report-eventid="MProductdetail_CommentPlus" href="' + B.plusAddress + '">';
                    j += '    <img class="plus-icon" src="images/plus-icon.png">';
                    j += "</a>"
                } else {
                    j += '            <span class="vip-icon ';
                    switch (B.userLevel) {
                        case"0":
                            j += "vip-diamond-icon";
                            break;
                        case"1":
                            j += "vip-gold-icon";
                            break;
                        case"2":
                            j += "vip-silver-icon";
                            break;
                        case"3":
                            j += "vip-copper-icon";
                            break;
                        case"4":
                            j += "vip-register-icon";
                            break;
                        case"5":
                            j += "vip-register-icon";
                            break;
                        case"6":
                            j += "vip-register-icon";
                            break;
                        case"-1":
                            j += "vip-register-icon";
                            break
                    }
                    j += '"></span>'
                }
            }
            j += '            <span class="assess-date">';
            j += B.commentDate.replace(/ (\d{2}):(\d{2}):(\d{2})$/, "");
            j += "</span>";
            j += "</div>";
            j += '        <div class="assess-bottom">';
            j += '            <span class="comment-item-star">';
            j += '                <span class="real-star comment-stars-width';
            j += B.commentScore;
            j += '"></span>';
            j += "</span>";
            j += '            <p class="assess-content">';
            j += B.commentData;
            j += "</p>";
            if (B.commentType == 1) {
                j += '<div class="product-img-module">';
                j += '     <a class="J_ping" report-eventid="MProductdetail_CommentPictureTab" report-pageparam="' + $("#currentWareId").val() + '" href="/ware/newCommentDetailPicShow.action?commentId=' + B.guid + "&wareId=" + $("#currentWareId").val() + '">';
                j += '         <ul class="jd-slider-container">';
                for (var w = 0; w < B.pictureInfoList.length; w++) {
                    if (w == 4) {
                        break
                    }
                    j += '<li class="jd-slider-item product-imgs-li">';
                    if ($("#picLasyLoad") && $("#picLasyLoad").val() == "true") {
                        j += '<img src="images/occupy-img320.gif" _src="';
                        if (B.pictureInfoList[w].picURL && $("#httpsConfig") && "true" == $("#httpsConfig").val()) {
                            j += B.pictureInfoList[w].picURL.replace("http://", "//")
                        } else {
                            j += B.pictureInfoList[w].picURL
                        }
                    } else {
                        j += '<img src="';
                        if (B.pictureInfoList[w].picURL && $("#httpsConfig") && "true" == $("#httpsConfig").val()) {
                            j += B.pictureInfoList[w].picURL.replace("http://", "//")
                        } else {
                            j += B.pictureInfoList[w].picURL
                        }
                    }
                    j += '" onerror="accessImgErr(this)"></li>';
                    if (w < 3) {
                        j += '<li class="product-img-space"></li>'
                    }
                }
                j += "</ul>";
                j += "</a>";
                j += "</div>"
            }
            j += '            <p class="pay-date">\u8d2d\u4e70\u65e5\u671f\uff1a';
            j += B.orderDate;
            j += "            </p>";
            try {
                if (B.wareAttribute.length > 0) {
                    j += '            <p class="product-type">';
                    if (B.wareAttribute[0]) {
                        if (B.wareAttribute[0].颜色) {
                            j += "\u989c\u8272\uff1a";
                            j += B.wareAttribute[0].颜色
                        } else {
                            if (B.wareAttribute[0].型号) {
                                j += "\u578b\u53f7\uff1a";
                                j += B.wareAttribute[0].型号
                            }
                        }
                    }
                    if (B.wareAttribute[1]) {
                        if (B.wareAttribute[1].颜色) {
                            j += " \u989c\u8272\uff1a";
                            j += B.wareAttribute[1].颜色
                        } else {
                            if (B.wareAttribute[1].型号) {
                                j += " \u578b\u53f7\uff1a";
                                j += B.wareAttribute[1].型号
                            }
                        }
                    }
                    j += "            </p>"
                }
            } catch (v) {
            }
            j += "        </div>";
            j += "    </span>";
            j += '    <div class="assess-btns-box"><div class="assess-btns" >';
            j += '        <a class="assess-like-btn" id="' + y + '" onclick="clickUseful(\'' + y + "')\">";
            j += '            <i class="assess-btns-icon btn-like-icon like-grey" id="praiseBtn_' + y + '" ></i>';
            j += '            <span class="assess-btns-num" id="praiseCnt_' + y + '" data="' + B.praiseCnt + '">(';
            j += B.praiseCnt;
            j += ")</span>";
            j += '            <i class="like" id="like_' + y + '">+1</i>';
            j += "</a>";
            j += '        <a class="assess-reply-btn" onclick="isEnterReplyPage(' + B.replyCnt + ')" id="' + y + "_" + B.replyCnt + '" href="' + z + '">';
            if (B.replyCnt > 0) {
                j += '            <i class="assess-btns-icon btn-reply-icon"></i>'
            } else {
                j += '            <i class="assess-btns-icon btn-no-reply-icon"></i>'
            }
            j += '            <span class="assess-btns-num">(';
            j += B.replyCnt;
            j += ")</span>";
            j += "</a>";
            j += "</div></div>";
            j += "</div>"
        }};
    var q = function() {
        if (!itemPingjiaFlag) {
            l(0);
            b()
        }
    };
    var k = function(t) {
        m.addTop(t);
        p.innerHTML = n;
        m.switchTab()
    };
    var f = function(B, t) {
        try {
            var C = $("#currentWareId").val();
            if (B.commentInfoList.length < r.maxCount) {
                o.style.display = "none";
                if (c) {
                    $(".open-app-a-bottom").show();
                    var z = "还有" + B.allCnt + "条评价，打开京东APP立即查看";
                    $("#openAppAText").html(z)
                } else {
                    $(".reply-flat-bottom").show()
                }
                $("#loadMoreFlag").val("false")
            } else {
                $(".reply-flat-bottom").hide();
                $("#loadMoreFlag").val("true")
            }
            if (B.commentInfoList.length == 0 && t) {
                $("#loadMoreFlag").val("false");
                $(".reply-flat-bottom").hide();
                v = document.querySelector(".reply-body");
                j = "";
                j += '<div class="tab-no-assess">';
                if (r.tabIndex == 4) {
                    j += '<div class="errPic"><img src="images/4.4/i/dog.png"/><span class="errPic-content">\u6682\u65e0\u6709\u56fe\u8bc4\u4ef7</span><div class="pro-button-box"><span class="pro-button tab-btn J_ping"  report-eventid="MProductdetail_CommentAll" report-eventlevel="5" report-pageparam="' + C + '">\u67e5\u770b\u5168\u90e8\u8bc4\u4ef7</span></div></div>'
                } else {
                    if (r.tabIndex != 0) {
                        j += '<div class="errPic"><img src="images/4.4/i/dog.png"/><span class="errPic-content">\u6682\u65e0\u8bc4\u4ef7</span><div class="pro-button-box"><span class="pro-button tab-btn J_ping" report-eventid="MProductdetail_CommentAll" report-eventlevel="5" report-pageparam="' + C + '">\u67e5\u770b\u5168\u90e8\u8bc4\u4ef7</span></div></div>'
                    } else {
                        j += '<div class="errPic"><img src="images/4.4/i/dog.png"/><span class="errPic-content">\u6682\u65e0\u8bc4\u4ef7</span><div class="pro-button-box"><span class="pro-button J_ping" report-eventid="MProductdetail_CommentAll" report-eventlevel="5" report-pageparam="' + C + '" onclick="goViewDetail();">\u8fd4\u56de\u5546\u54c1\u9875</span></div></div>'
                    }
                }
                j += "</div>";
                g.innerHTML = j;
                o.style.display = "none";
                v.classList.add("white-color");
                v.classList.remove("reply-body-color");
                m.tabReturn();
                return
            } else {
                var v = document.querySelector(".reply-body");
                var w = $("#tabs li.tab-hover").find(".tab-assess-rednum").html();
                if (w != null) {
                    var E = parseInt($.trim(w))
                }
                v.classList.add("reply-body-color");
                v.classList.remove("white-color");
                if (!isNaN(E) && 0 == E) {
                    $("#loadMoreFlag").val("false");
                    v.classList.add("white-color");
                    v.classList.remove("reply-body-color")
                }
                var x = (r.maxCount <= B.commentInfoList.length) ? r.maxCount : B.commentInfoList.length;
                if (t) {
                    g.innerHTML = ""
                }
                j = "";
                for (var A = 0; A < x; A++) {
                    m.addHtml(B.commentInfoList[A])
                }
                g.innerHTML += j;
                m.liAdjustWidth();
                var y = document.getElementById("picLasyLoad").value;
                if (y != "true") {
                    m.imgAdjustWidth()
                }
            }
            if ($(".tab-no-assess") && $(".tab-no-assess").length) {
                $(".reply-flat-bottom").hide();
                $("#replyBody").addClass("white-color");
                $("#replyBody").removeClass("reply-body-color")
            }
            if ($(".tab-btn") && $(".tab-btn").length) {
                m.tabReturn()
            }
        } catch (D) {
        }
    };
    var b = function() {
        window.addEventListener(d, function() {
            clearTimeout(t);
            var t = setTimeout(function() {
                var v = document.documentElement.clientHeight - $(".jd-header-new-bar").height() - $(".hold-div-bottom").height() - $(".cart-concern-btm-fixed").height();
                r.oLoadPage.orientationchangeCb(v);
                m.liAdjustWidth();
                m.imgAdjustWidth()
            }, 300)
        })
    };
    var l = function(v) {
        var t = "newCommentsDetail.json";
        var z = $("#commontType").val();
        var y;
        if (!z) {
            z = "0"
        }
        switch (r.tabIndex) {
            case 0:
                z = "0";
                break;
            case 1:
                z = "3";
                break;
            case 2:
                z = "2";
                break;
            case 3:
                z = "1";
                break;
            case 4:
                z = "4";
                break;
            default:
                z = "0";
                break
        }
        $("#commontType").val(z);
        try {
            var x = window.sessionStorage;
            if (x) {
                x.removeItem("tabIndex");
                x.setItem("tabIndex", r.tabIndex)
            }
        } catch (B) {
        }
        if (c) {
            y = "caseA"
        } else {
            y = ""
        }
        var A = {wareId: $("#currentWareId").val(), offset: "1", num: "10", type: z, checkParam: $("#commendetailModel").attr("commendetail-data"), evokeType: y};
        var w = document.documentElement.clientHeight - $(".jd-header-new-bar").height() - $(".hold-div-bottom").height() - $(".cart-concern-btm-fixed").height();
        r.oLoadPage = new LoadPage();
        r.oLoadPage.init({containId: "#commentListId", pointHeight: w, reqType: "post", baseUrl: r.url, reqPara: A, reLoad: true, pageNo: "offset", beforeFn: function() {
                o.style.display = "block"
            }, successFn: function(C) {
                var F = this, E = null;
                clearTimeout(E);
                o.style.display = "none";
                if (C && C.wareDetailComment) {
                    var D = C.wareDetailComment;
                
                    if (D.commentInfoList) {
                        if (v == "0" && this.reLoad && p != null) {
                            k(D)
                        }
                        f(D, this.reLoad);
                        window.addEventListener(d, function() {
                            m.liAdjustWidth();
                            m.imgAdjustWidth()
                        }, false);
                        if ($("#picLasyLoad") && $("#picLasyLoad").val() == "true") {
                            jQuery.loadImg.lazyLoad({rangeH: 30, scrollObj: "#commentListId", container: "tab-wrapper", isChangeSize: "false", imgcb: m.imgLoadCb})
                        }
                    }
                    itemPingjiaFlag = true
                } else {
                    C = {wareDetailComment: {allCnt: "0", badCnt: "0", canConsultFlag: "true", code: "0", commentInfoList: [], consultationCount: "0", goodCnt: "0", normalCnt: "0", pictureCnt: "0", showPicCnt: "0"}, commentCount: 0, totalPage: 0};
                    if (v == "0" && this.reLoad && p != null) {
                        k(C.wareDetailComment)
                    }
                    f(C.wareDetailComment.commentInfoList, this.reLoad)
                }
            }, errorFn: function() {
                data = {wareDetailComment: {allCnt: "0", badCnt: "0", canConsultFlag: "true", code: "0", commentInfoList: [], consultationCount: "0", goodCnt: "0", normalCnt: "0", pictureCnt: "0", showPicCnt: "0"}, commentCount: 0, totalPage: 0};
                if (v == "0" && this.reLoad && p != null) {
                    k(data.wareDetailComment)
                }
                f(data.wareDetailComment.commentInfoList, this.reLoad)
            }})
    };
    return q()
}
var pingClick = function(g, d, c, a) {
    try {
        var f = new MPing.inputs.Click(g);
        f.event_param = d;
        f.page_param = a;
        var b = new MPing();
        b.send(f)
    } catch (h) {
    }
};
var pingClickWithLevel = function(h, d, c, a, g) {
    try {
        var f = new MPing.inputs.Click(h);
        f.event_param = d;
        f.page_param = a;
        f.event_level = g;
        var b = new MPing();
        b.send(f)
    } catch (j) {
    }
};
function isEnterReplyPage(a) {
    pingClickWithLevel("MProductdetail_CommentReply", "", "", $("#currentWareId").val(), "5");
    if ($("#isDisplayReplyBtn").val() == "true") {
        return true
    } else {
        if (a > 0) {
            return true
        } else {
            $("#pop_none_reply").css("display", "block");
            setTimeout(function() {
                $("#pop_none_reply").css("display", "none")
            }, 1000);
            return false
        }
    }
}
function userDefaultImg() {
    var a = event.srcElement;
    a.src = "/images/newcomments/user-default-avatar.png";
    a.onerror = null
}
function clickUseful(g) {
    try {
        pingClickWithLevel("MProductdetail_CommentLikebutton", "", "", $("#currentWareId").val(), "5");
        var k = document.getElementById(g);
        var d = document.getElementById("praiseBtn_" + g);
        var j = document.getElementById("like_" + g);
        var c = document.querySelector(".useful-window");
        var f = $("#currentWareId").val();
        var a = document.getElementById("sid").value;
        var h = new Date().getTime();
        jQuery.ajax({url: "/newComments/clickUseful.json?t=" + h, type: "post", dataType: "json", data: {wareId: f, commentId: g, sid: a}, success: function(l) {
                try {
                    if (l) {
                        if (l.clickUseful == "0") {
                            d.classList.add("like-red");
                            j.classList.add("like_ani");
                            var m = document.getElementById("praiseCnt_" + g);
                            var p = m.getAttribute("data");
                            var o = parseInt(p) + 1;
                            m.setAttribute("data", "" + o);
                            m.innerHTML = "(" + o + ")";
                            c.style.display = "none"
                        } else {
                            if (l.clickUseful == "1") {
                                c.style.display = "block";
                                clearTimeout(n);
                                var n = setTimeout(function() {
                                    c.style.display = "none"
                                }, 1000)
                            } else {
                                c.style.display = "none"
                            }
                        }
                    } else {
                        window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + a + "&returnurl=http://item.m.jd.com/product/" + f + ".html"
                    }
                } catch (q) {
                    window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + a + "&returnurl=http://item.m.jd.com/product/" + f + ".html"
                }
            }, error: function(m, l) {
                window.location.href = "https://passport.m.jd.com/user/login.action?sid=" + a + "&returnurl=http://item.m.jd.com/product/" + f + ".html"
            }})
    } catch (b) {
    }
}
$(function() {
    var a = 0;
    var c = $("#type").val();
    if (c) {
        if (c == "4") {
            a = 4
        } else {
            if (c == "0") {
                a = 0
            }
        }
    } else {
        var b = window.sessionStorage;
        if (b) {
            try {
                a = parseInt(b.getItem("tabIndex"));
                if (!a) {
                    a = 0
                }
            } catch (d) {
                a = 0
            }
        }
    }
});
function recommendLoad(j) {
    var c = {containerID: "recommendWrap", url: "", cbfn: null};
    var h = $.extend(c, j);
    var b = document.getElementById(h.containerID);
    var d = "";
    var g = {addRecommend: function(m) {
            d += '<img class="recommend-title" src="images/guess-title.png">';
            d += '<ul class="find-similar-ul" id="recommendList">';
            for (var l = 0; l < m.length; l++) {
                d += '<li class="similar-li">';
                d += '<a href="javascript:void(0);" onclick="toGuessYouLike(\'' + m[l].clickUrl + "','/product/" + m[l].wareId + '.html\')" class="J_ping" report-eventid="MProductdetail_TestBRecProduct"  report-eventparam="' + m[l].wareId + "_" + (l + 1) + '" report-eventlevel="4">';
                d += '<div class="similar-product">';
                d += '<img class="Jschangewidth"  src="images/occupy-img320.gif?v="  _src="' + m[l].imageurl + '">';
                d += '<span class="similar-product-text">';
                if (m[l].markImageUrl && m[l].markImageUrl != "" && m[l].markImageUrl != null) {
                    d += '<img src="' + m[l].markImageUrl + '" class="product-icon" style="width:' + m[l].markWidth + "px;height:" + m[l].markHeight + 'px;">'
                }
                d += m[l].wname;
                d += "</span>";
                if (m[l].jdPrice && m[l].jdPrice != "" && m[l].jdPrice != null && m[l].jdPrice != "暂无报价" && m[l].jdPriceStart && m[l].jdPriceEnd) {
                    d += '<span class="similar-product-price">&yen;  <span class="detail-big-price">' + m[l].jdPriceStart + '</span><span class="detail-small-price">.' + m[l].jdPriceEnd + "</span></span>"
                } else {
                    d += '<span class="similar-product-price"><span class="detail-big-price">暂无报价</span></span>'
                }
                d += '<span class="double-price-wrap">';
                if (m[l].wareType && m[l].wareType == 8) {
                    if (m[l].tryPlusPrice && m[l].tryPlusPrice != "" && m[l].tryPlusPrice != null) {
                        d += '<span class="double-price double-jx-price"';
                        if (m[l].priceColor && m[l].priceColor != "" && m[l].priceColor != null) {
                            d += 'style="color:#' + m[l].priceColor + '"'
                        }
                        d += ">&yen; " + m[l].tryPlusPrice;
                        d += "</span>"
                    }
                } else {
                    if (m[l].isSamWare && m[l].samPrice && m[l].samPrice != "" && m[l].samPrice != null) {
                        d += '<span class="double-price double-sam-price"';
                        if (m[l].priceColor && m[l].priceColor != "" && m[l].priceColor != null) {
                            d += 'style="color:#' + m[l].priceColor + '"'
                        }
                        d += ">&yen; " + m[l].samPrice;
                        d += "</span>"
                    } else {
                        if (m[l].tryPlusPrice && m[l].tryPlusPrice != "" && m[l].tryPlusPrice != null) {
                            d += '<span class="double-price double-jx-price"';
                            if (m[l].priceColor && m[l].priceColor != "" && m[l].priceColor != null) {
                                d += 'style="color:#' + m[l].priceColor + '"'
                            }
                            d += ">&yen; " + m[l].tryPlusPrice;
                            d += "</span>"
                        }
                    }
                }
                if (m[l].priceIcon && m[l].priceIcon != "" && m[l].priceIcon != null) {
                    d += '<img src="' + m[l].priceIcon + '" class="price-icon">'
                }
                d += "<span>";
                d += '<span class="double-space"></span>';
                d += "</div>";
                d += "</a>";
                d += "</li>"
            }
            d += "</ul>"
        }, setSamProductHeight: function(r) {
            var o = $(".similar-li"), s = null, q = null, n = null, l = null;
            var m = r;
            r = Math.floor(o.length / 2);
            for (var p = m; p < r; p++) {
                s = $(o[p * 2]).find(".double-price");
                q = $(o[p * 2 + 1]).find(".double-price");
                n = $(o[p * 2]).find(".double-space");
                l = $(o[p * 2 + 1]).find(".double-space");
                if (s.length > 0 && q.length == 0 && l[0].className.indexOf("sam-height") == -1) {
                    l.addClass("double-height")
                } else {
                    if (s.length == 0 && q.length > 0 && n[0].className.indexOf("sam-height") == -1) {
                        n.addClass("double-height")
                    }
                }
            }
        }};
    var k = function() {
        f()
    };
    var a = function(m) {
        var l = document.getElementById("pin");
        if (m && m.length > 0) {
            g.addRecommend(m)
        }
        b.innerHTML = d;
        g.setSamProductHeight(0);
        if (l) {
            scanLoad({containerID: "scanWrap", url: "/ware/getWareHistory.json?wareId=" + $("#currentWareId").val()})
        }
    };
    var f = function() {
        $.ajax({type: "get", url: h.url, data: h.filters, dataType: "json", beforeSend: function() {
            }, success: function(l) {
                a(l.uniformRecommendList)
            }, error: function(m, l) {
            }})
    };
    return k()
}
function scanLoad(j) {
    var b = {containerID: "scanWrap", url: "", cbfn: null};
    var h = $.extend(b, j);
    var a = document.getElementById(h.containerID);
    var c = "";
    var g = {addScan: function(m) {
            c += '<img class="recommend-title" src="images/scan-title.png">';
            c += '<ul class="find-similar-ul" id="recommendList">';
            for (var l = 0; l < m.length; l++) {
                c += '<li class="similar-li">';
                c += '<a href="/product/' + m[l].wareId + '.html" class="J_ping" report-eventid="MProductdetail_TestBRecord"  report-eventparam="' + m[l].wareId + "_" + (l + 1) + '" report-eventlevel="4">';
                c += '<div class="similar-product">';
                c += '<img class="Jschangewidth"  src="images/occupy-img320.gif?v="  _src="' + m[l].imageurl + '">';
                c += '<span class="similar-product-text">';
                c += m[l].wname;
                c += "</span>";
                if (m[l].jdPrice && m[l].jdPrice != "" && m[l].jdPrice != null && m[l].jdPrice != "暂无报价" && m[l].jdPriceStart && m[l].jdPriceEnd) {
                    c += '<span class="similar-product-price"><span class="detail-big-price">' + m[l].jdPriceStart + '</span><span class="detail-small-price">.' + m[l].jdPriceEnd + "</span></span>"
                } else {
                    c += '<span class="similar-product-price"><span class="detail-big-price">暂无报价</span></span>'
                }
                c += "</div>";
                c += "</a>";
                c += "</li>"
            }
            c += "</ul>"
        }};
    var k = function() {
        f()
    };
    var d = function(l) {
        g.addScan(l);
        a.innerHTML = c
    };
    var f = function() {
        $.ajax({type: "get", url: h.url, data: h.filters, dataType: "json", beforeSend: function() {
            }, success: function(l) {
                if (l && l.wareHistory && l.wareHistory.code && l.wareHistory.code == "0" && l.wareHistory.wareInfoList && l.wareHistory.wareInfoList.length > 0) {
                    d(l.wareHistory.wareInfoList)
                }
            }, error: function(m, l) {
            }})
    };
    return k()
}
;