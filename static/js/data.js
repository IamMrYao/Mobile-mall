function dataScanLoad(a) {
    var b = {containerID: "scan-record", url: "", cbfn: null}, c = $.extend(b, a), d = document.getElementById(c.containerID), e = "", f = {addScan: function(a) {
            e += '<ul class="jd-slider-container shopping-scan-list">';
            for (var b = 0; b < a.length; b++)
                e += '<li class="jd-slider-item shopping-scan-item">', e += '<a href="/product/' + a[b].wareId + '.html" class="J_ping" report-eventid="MProductdetail_RecordProduct" report-eventparam="' + a[b].wareId + '"  report-eventlevel="4">', e += '<div class="scan-item-pic">', e += '<img alt="' + a[b].wname + '" src="' + a[b].imageurl + '" onerror="imgErr(this)">', e += '</div><div class="scan-item-content"><span>', e += a[b].wname, e += "</span></div></a>", e += '<div class="scan-item-price"><span>', e += a[b].jdPrice, e += "</span></div></li>";
            e += "</ul>", e += '<div class="guess-focus-btn jd-slider-btnDiv"></div>'
        }, addError: function() {
            e += '<p class="no-scan-tip">暂无浏览记录</p>'
        }}, g = function() {
        j()
    }, h = function(a) {
        f.addScan(a), d.innerHTML = e, c.cbfn()
    }, i = function() {
        f.addError(), d.innerHTML = e
    }, j = function() {
        $.ajax({type: "get", url: c.url, dataType: "json", beforeSend: function() {
            }, success: function(a) {
                a && a.wareHistory && a.wareHistory.code && "0" == a.wareHistory.code && a.wareHistory.wareInfoList && a.wareHistory.wareInfoList.length > 0 ? h(a.wareHistory.wareInfoList) : i()
            }, error: function(a, b) {
                i()
            }})
    };
    return g()
}
!function(a) {
    var b = a.M = a.M || {}, c = {decodeHtml: function(a) {
            var b = {"&lt;": "<", "&gt;": ">", "&amp;": "&", "&nbsp;": " ", "&quot;": '"', "&copy;": "", "&apos;": "'"};
            return"string" != typeof a ? a : a.replace(/&\w+;|&#(\d+);/g, function(a, c) {
                var d = b[a];
                return void 0 === d && (d = isNaN(c) ? a : String.fromCharCode(160 == c ? 32 : c)), d
            })
        }, isUnsignedNumeric: function(a) {
            if (d.isEmpty(a))
                return!1;
            var b = /^\d+(\.\d+)?$/;
            return b.test(a)
        }, isInteger: function(a) {
            if (d.isEmpty(phone))
                return!1;
            var b = /^(-     |\+)?\d+$/;
            return b.test(a)
        }, isUnsignedInteger: function(a) {
            var b = /^\d+$/;
            return b.test(a)
        }, isFloat: function(a) {
            if (d.isEmpty(a))
                return!1;
            var b = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
            return b.test(a)
        }, isPhoneNum: function(a) {
            if (d.isEmpty(a))
                return!1;
            var b = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            return b.test(a)
        }, isEmail: function(a) {
            if (d.isEmpty(a))
                return!1;
            var b = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            return b.test(a)
        }, hasSpace: function(a) {
            return void 0 == val || null == val || "null" == val || "undefined" == val || a.indexOf("") > -1
        }, URLencode: function(a) {
            return escape(a).replace(/\+/g, "%2B").replace(/\"/g, "%22").replace(/\'/g, "%27").replace(/\//g, "%2F").replace(/\#/g, "%23")
        }}, d = {$mObj: {}, merge: function(a, b, c) {
            if (!a || !b || "object" != typeof b)
                return a;
            if (c) {
                var e, f;
                for (e in b)
                    b.hasOwnProperty(e) && (f = b[e], f && f.constructor === Object && a[e] && a[e].constructor === Object ? d.merge(a[e], f) : a[e] = f)
            } else
                for (var g in b)
                    a[g] = b[g];
            return a
        }, clone: function(a, b) {
            return d.merge({}, a, b)
        }, namespace: function() {
            var b, c, e, f, g, h, i = a;
            for (e = 0, g = arguments.length; e < g; e++) {
                var j = arguments[e];
                if (!d.$mObj.namespace[j]) {
                    for (b = j.split("."), f = 0, h = b.length; f < h; f++)
                        c = b[f], i[c] || (i[c] = {}), i = i[c];
                    d.$mObj.namespace[j] = !0
                }
            }
        }, extend: function() {
            var a = function(a) {
                for (var b in a)
                    a.hasOwnProperty(b) && (this[b] = a[b])
            };
            return function(b, c) {
                "function" == typeof b || (b = function() {
                });
                var d = function() {
                    b.apply(this, arguments)
                }, e = function() {
                };
                return e.prototype = b.prototype, d.prototype = new e, d.prototype.constructor = d, d.superclass = b.prototype, b.prototype.constructor === Object.prototype.constructor && (b.prototype.constructor = b), d.override = function(a) {
                    if (d.prototype && a && "object" == typeof a)
                        for (var b in a)
                            d.prototype[b] = a[b]
                }, d.prototype.override = a, d.override(c), d
            }
        }(), extends: function(a, b) {
            for (var c in b)
                void 0 !== b[c] && (a[c] = b[c])
        }, each: function(a, c, e) {
            if (!d.isEmpty(a) && c)
                if (d.isArray(a))
                    for (var f = 0, g = a.length; f < g; f++)
                        try {
                            if (c.call(e, a[f], f, a) === !1)
                                return
                        } catch (a) {
                            b.log(a, "error")
                        }
                else
                    for (var h in a)
                        if (a.hasOwnProperty(h))
                            try {
                                if (c.call(e, a[h], h, a) === !1)
                                    return
                            } catch (a) {
                                b.log(a, "error")
                            }
        }, contains: function(a, b) {
            if (d.isArray(a)) {
                if ("indexOf"in Array.prototype)
                    return a.indexOf(b) !== -1;
                var c, e;
                for (c = 0, e = a.length; c < e; c++)
                    if (a[c] === b)
                        return!0;
                return!1
            }
            return!d.isEmpty(a) && b in a
        }, isEmpty: function(a, b) {
            if ("undefined" == typeof a || null === a || !b && "" === a || d.isArray(a) && 0 === a.length)
                return!0;
            if (d.isObject(a)) {
                for (var c in a)
                    if (Object.prototype.hasOwnProperty.call(a, c))
                        return!1;
                return!0
            }
            return!1
        }, isBlank: function(a) {
            return!!d.isEmpty(a) || d.isEmpty(String(a).replace(/^\s+|\s+$/g, ""))
        }, isDefined: function(a) {
            return"undefined" == typeof a
        }, isObject: function(a) {
            return"[object Object]" === Object.prototype.toString.call(null) ? null !== a && void 0 !== a && "[object Object]" === Object.prototype.toString.call(a) && void 0 === a.ownerDocument : "[object Object]" === Object.prototype.toString.call(a)
        }, isFunction: function(a) {
            return"[object Function]" === Object.prototype.toString.apply(a)
        }, isArray: function(a) {
            return"[object Array]" === Object.prototype.toString.apply(a)
        }, isDate: function(a) {
            return"[object Date]" === Object.prototype.toString.apply(a)
        }, isNumber: function(a) {
            return"number" == typeof a && isFinite(a)
        }, isString: function(a) {
            return"string" == typeof a
        }, isBoolean: function(a) {
            return"boolean" == typeof a
        }}, e = {toString: function(a, b) {
            var c = void 0, d = a.getFullYear(), e = a.getMonth() + 1, f = a.getDate(), g = a.getHours(), h = a.getMinutes(), i = a.getSeconds();
            return e = parseInt(e) < 10 ? "0" + e : e, f = parseInt(f) < 10 ? "0" + f : f, g = parseInt(g) < 10 ? "0" + g : g, h = parseInt(h) < 10 ? "0" + h : h, i = parseInt(i) < 10 ? "0" + i : i, "yyyy-MM-dd HH:mm:ss" == b ? c = d + "-" + e + "-" + f + " " + g + ":" + h + ":" + i : "yyyy-MM-dd" == b ? c = d + "-" + e + "-" + f : "yyyy-MM" == b ? c = d + "-" + e : "yyyy" == b && (c = d), c
        }, toDate: function(a) {
            if (19 == a.length) {
                var b = a.substring(0, 4), c = a.substring(5, 7), d = a.substring(8, 10), e = a.substring(11, 13), f = a.substring(14, 16), g = a.substring(17, 19);
                return new Date(b, c - 1, d, e, f, g)
            }
            if (10 == a.length) {
                var b = a.substring(0, 4), c = a.substring(5, 7), d = a.substring(8, 10);
                return new Date(b, c - 1, d)
            }
            if (7 == a.length) {
                var b = a.substring(0, 4), c = a.substring(5, 7);
                return new Date(b, c - 1)
            }
            if (4 == a.length) {
                var b = a.substring(0, 4);
                return new Date(b)
            }
        }, getMonthDays: function(a, b) {
            var c = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31), d = a.getFullYear();
            return"undefined" == typeof b && (b = a.getMonth()), 0 != d % 4 || 0 == d % 100 && 0 != d % 400 || 1 != b ? c[b] : 29
        }, addDays: function(a, b) {
            var c = 1 == arguments.length ? e.toDate(e.today()) : e.toDate(b);
            return c = new Date(c.getTime() + 24 * parseInt(a) * 3600 * 1e3), e.toString(new Date(c), "yyyy-MM-dd HH:mm:ss")
        }, addMonths: function(a, b) {
            var c = 1 == arguments.length ? e.toDate(e.today()) : e.toDate(b), d = (c.getMonth(), c.getDate()), f = e.getMonthDays(c, c.getMonth() + parseInt(a));
            return d > f && c.setDate(f), c.setMonth(c.getMonth() + parseInt(a)), e.toString(c, "yyyy-MM-dd HH:mm:ss")
        }, addMonthsForStart: function(a, b) {
            var c = 1 == arguments.length ? e.today() : b;
            return c = e.addMonths(a, c), e.firstDayOfMonth(c)
        }, addMonthsForEnd: function(a, b) {
            var c = 1 == arguments.length ? e.today() : b;
            return c = e.addMonths(a, c), e.addDays(-1, e.firstDayOfMonth(c))
        }, addYears: function(a, b) {
            var c = 1 == arguments.length ? e.toDate(e.today()) : e.toDate(b);
            return c.setYear(c.getYear() + parseInt(a)), e.toString(c, "yyyy-MM-dd HH:mm:ss")
        }, addYearsForStart: function(a, b) {
            var c = 1 == arguments.length ? e.today() : b;
            return c = e.addYears(a, c), e.firstDayOfYear(c)
        }, addYearsForEnd: function(a, b) {
            var c = 1 == arguments.length ? e.today() : b;
            return c = e.addYears(a, c), e.firstDayOfYear(c)
        }, sunOfWeek: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b = new Date(b - 864e5 * b.getDay()), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, monOfWeek: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b = new Date(b - 864e5 * (b.getDay() - 1)), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, tueOfWeek: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b = new Date(b - 864e5 * (b.getDay() - 2)), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, wedOfWeek: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b = new Date(b - 864e5 * (b.getDay() - 3)), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, turOfWeek: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b = new Date(b - 864e5 * (b.getDay() - 4)), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, friOfWeek: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b = new Date(b - 864e5 * (b.getDay() - 5)), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, satOfWeek: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b = new Date(b - 864e5 * (b.getDay() - 6)), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, firstDayOfMonth: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b.setDate(1), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, lastDayOfMonth: function(a) {
            return a = 0 == arguments.length ? e.today() : a, a = e.addMonths(1, a), a = e.firstDayOfMonth(a), a = e.addDays(-1, a)
        }, firstDayOfYear: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b.setMonth(0), b.setDate(1), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, lastDayOfYear: function(a) {
            var b = 0 == arguments.length ? e.toDate(e.today()) : e.toDate(a);
            return b.setMonth(11), b.setDate(31), e.toString(b, "yyyy-MM-dd HH:mm:ss")
        }, today: function(a) {
            return 0 == arguments.length ? e.toString(new Date, "yyyy-MM-dd") : e.toString(new Date, a)
        }}, f = {getCookie: function(a) {
            var b, c = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
            return b = document.cookie.match(c), b ? unescape(b[2]) : null
        }, setCookie: function(a, b, c, d, e) {
            var f = a + "=" + escape(b);
            if ("" != c) {
                var g = new Date;
                g.setTime(g.getTime() + 24 * c * 3600 * 1e3), f += ";expires=" + g.toGMTString()
            }
            "" != d && (f += ";path=" + d), "" != e && (f += ";domain=" + e), document.cookie = f
        }, delCookie: function(a) {
            var b = new Date;
            b.setTime(b.getTime() - 1), document.cookie = a + "=; expires=" + b.toGMTString()
        }}, g = {getParam: function(a) {
            var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
            return null != c ? unescape(c[2]) : null
        }, setParams: function(a) {
            var b = window.location.search, c = "", e = new Array, f = {};
            if (!d.isObject(a))
                throw new Error("arguments is not a jsonobject");
            if (b.indexOf("?") != -1 && (c = b.substr(b.indexOf("?") + 1)), c.length > 0) {
                var g = c.split("&");
                for (i in g) {
                    var h = g[i].split("=");
                    h.length > 1 ? f[h[0]] = h[1] : f[h[0]] = ""
                }
                d.merge(f, a)
            } else
                f = a;
            for (key in f)
                e.push(key), e.push("="), e.push(a[key]), e.push("&");
            e.pop(), window.location.search = e.jion()
        }, getHash: function() {
            var a = window.location.hash;
            return a ? a.replace("#", "") : void 0
        }, setHash: function(a) {
            a ? window.location.hash = "#" + a : window.location.hash = ""
        }}, h = {ajax: function(a) {
            return!(!a || !a.url) && ($.ajax({url: a.url, type: a.type || "post", dataType: a.dataType || "json", async: a.async !== !1, data: a.data || {}, timeout: a.timeout && a.timeout > 0 ? a.timeout : 0, success: function(b) {
                    a.success && a.success.call(a.scope, b)
                }, error: function(b) {
                    a.error && a.error.call(a.scope, b)
                }}), !0)
        }};
    BrowserUtil = function() {
        function a() {
            var a = navigator.userAgent;
            d = {}, e = {};
            var b = a.match(/Web[kK]it[\/]{0,1}([\d.]+)/), c = a.match(/(Android);?[\s\/]+([\d.]+)?/), f = !!a.match(/\(Macintosh\; Intel /), g = a.match(/(iPad).*OS\s([\d_]+)/), h = a.match(/(iPod)(.*OS\s([\d_]+))?/), i = !g && a.match(/(iPhone\sOS)\s([\d_]+)/), j = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), k = j && a.match(/TouchPad/), l = a.match(/Kindle\/([\d.]+)/), m = a.match(/Silk\/([\d._]+)/), n = a.match(/(BlackBerry).*Version\/([\d.]+)/), o = a.match(/(BB10).*Version\/([\d.]+)/), p = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/), q = a.match(/PlayBook/), r = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/), s = a.match(/Firefox\/([\d.]+)/), t = a.match(/MSIE\s([\d.]+)/) || a.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/), u = !r && a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/), v = u || a.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/), w = a.indexOf("MicroMessenger") >= 0;
            b && (e.browser = "webkit", e.version = b[1]), c && (d.os = "android", d.version = c[2]), i && !h && (d.os = "ios", d.cline = "iphone"), g && (d.os = "ios", d.cline = "ipad"), h && (d.os = "ios", d.cline = "ipod", d.version = h[3] ? h[3].replace(/_/g, ".") : null), j && (d.os = "webos", d.version = j[2]), k && (d.os = "touchpad"), n && (d.os = "blackberry", d.version = n[2]), o && (d.os = "bb10", d.version = o[2]), p && (d.os = "rimtabletos", d.version = p[2]), q && (d.os = "playbook"), l && (d.kindle = "kindle", d.version = l[1]), m && (d.silk = "silk", d.version = m[1]), !m && d.android && a.match(/Kindle Fire/) && (e.browser = "silk"), r && (e.browser = "chrome", e.version = r[1]), s && (e.browser = "firefox", e.version = s[1]), t && (e.browser = "ie", e.version = t[1]), v && (f || d.ios) && (e.browser = "safari", f && (e.version = v[1])), u && (e.browser = "webview"), w && (e.browser = "weixin"), d.tablet = !!(g || q || c && !a.match(/Mobile/) || s && a.match(/Tablet/) || t && !a.match(/Phone/) && a.match(/Touch/)), d.phone = !(d.tablet || d.ipod || !(c || i || j || n || o || r && a.match(/Android/) || r && a.match(/CriOS\/([\d.]+)/) || s && a.match(/Mobile/) || t && a.match(/Touch/))), d.os = d.os || null, d.version = d.version || null, d.cline = d.cline || null, d.kindle = d.kindle || !1, d.tablet = d.tablet || null, d.phone = d.phone || !1, d.silk = d.silk || null, e.browser = e.browser || null, e.version = e.version || null
        }
        function b() {
            return d && e || a(), d
        }
        function c() {
            return d && e || a(), e
        }
        var d = null, e = null;
        return{getOs: b, getBrowser: c}
    }, LocalStorageUtil = function() {
        function a(a) {
            var b = null;
            return f && a && (b = window.localStorage.getItem(a)), b
        }
        function c(a, b) {
            if (f && a)
                try {
                    window.localStorage.setItem(a, b)
                } catch (c) {
                    LocalStorageUtil.removeAll(), window.localStorage.setItem(a, b)
                }
        }
        function d(a) {
            f && a && window.localStorage.removeItem(a)
        }
        function e() {
            f && window.localStorage.clear()
        }
        var f = !!window.localStorage;
        if (f) {
            try {
                window.localStorage.setItem("M_test", 1)
            } catch (a) {
                f = !1, b.log("localStorage无法set", "error")
            }
            try {
                window.localStorage.getItem("M_test")
            } catch (a) {
                f = !1, b.log("localStorage无法get", "error")
            }
            try {
                window.localStorage.removeItem("M_test")
            } catch (a) {
                f = !1, b.log("localStorage无法remove", "error")
            }
        }
        return{get: a, set: c, remove: d, removeAll: e}
    }, b.modules = {}, b.runMod = [], b.config = {debug: 0}, b.log = function(a, c) {
        b.config && b.config.debug && "undefined" != typeof console && null !== console && console[c || (c = "log")] && console[c](a)
    };
    var j = {require: function(a, b) {
            !d.isArray(a) && (a = Array(a)), j.loadJs(a, b)
        }, loadJs: function(a, b) {
            $LAB.setOptions({AlwaysPreserveOrder: !0}).script(a).wait(function() {
                b && b.call(null)
            })
        }, exports: function(a) {
            return b.modules[a] && b.modules[a].exports ? b.modules[a].exports : null
        }, define: function(a, c) {
            return 1 == arguments.length && (c = a), d.isEmpty(a) && b.isFunction(c) ? void c.call(null) : (!b.modules[a] && (b.modules[a] = {}), void(b.modules[a].factory = c))
        }, defineModule: function() {
            d.each(b.modules, function(a, c) {
                var d = b.modules[c];
                if (!d.exports && d.factory) {
                    d.exports = {};
                    var e = d.factory.call(null, d.exports);
                    e && (d.exports = e)
                }
            })
        }, setRunMod: function(a, c) {
            d.isArray(a) ? c ? b.runMod = a : b.runMod = b.runMod.concat(a) : d.isString(a) && !d.isBlank(a) && (c ? b.runMod = [a] : b.runMod.push(a))
        }, setConfig: function(a, b) {
            j.setGlobalProp("config", a, b)
        }, setGlobalProp: function(a, c, e) {
            var f = b[a];
            if (d.isString(c))
                return void(f[c] = e);
            if (d.isObject(c)) {
                var g = c;
                d.each(g, function(b, c) {
                    setGlobalProp(a, c, b)
                })
            }
        }, idSeed: 0, genId: function(a) {
            var b = (a || "mGen") + ++j.idSeed;
            return b
        }, runner: function(a) {
            j.defineModule();
            var c = !1;
            d.isObject(a) && (c = !0), d.each(b.runMod, function(e) {
                var f = c && a[e] ? a[e] : null;
                if (j.exports(e)) {
                    var g = j.exports(e), h = g.clazz ? new g.clazz(f) : g;
                    if (d.isFunction(h.run))
                        try {
                            h.run()
                        } catch (a) {
                            b.log(a, "error")
                        }
                }
            })
        }};
    b.require = function() {
        return j.require.apply(null, arguments)
    }, b.genId = function() {
        return j.genId.apply(null, arguments)
    }, b.define = function() {
        return j.define.apply(null, arguments)
    }, b.runner = function() {
        return j.runner.apply(null, arguments)
    }, b.setConfig = function() {
        return j.setConfig.apply(null, arguments)
    }, b.setRunMod = function() {
        return j.setRunMod.apply(null, arguments)
    }, b.exports = function() {
        return j.exports.apply(null, arguments)
    }, b.http = h, b.string = c, b.date = e, b.object = d, b.cookie = f, b.url = g, b.browser = new BrowserUtil, b.localstorage = new LocalStorageUtil
}(window), M.define("shopInfo", function(a) {
    var b = function(a) {
        this.init(a)
    };
    M.object.merge(b.prototype, {init: function(a) {
            this.containers = document.querySelector("#shop-floor"), a && a.shopInfo && (this.containers.innerHTML = this.addDOM(a.shopInfo), this.bind(a.shopInfo))
        }, addDOM: function(a) {
            var b = "", c = document.querySelector("#currentWareId"), d = document.querySelector("#sid"), e = document.querySelector("#commonConfigJson");
            if (e)
                var f = JSON.parse(e.value).shopUrlConf;
            return a.shop ? (b += '<div class="shop-part" id="jshopkefu">', b += '<a href="javascript:void(0);"  class="shop-href" onclick="toShop(\'' + a.shop.shopId + "','" + a.shop.wareType + "');\">", b += '<div class="shop-row1"><span class="shop-row" ><div class="shop-icon">', b += a.shop.logo ? '<img src="' + a.shop.logo + '" onerror="logoImgErr(this)">' : '<img src="/images/5.4/shop-occupy-img.png">', b += '</div><span class="shop-name">' + a.shop.name + "</span>", a.shop.venderType && "1" == a.shop.venderType ? a.shop.wareType && "0" == a.shop.wareType ? b += '<i class="label-icon-div have-not-icon-div red-div goods-sign"><span class="label-text white-text">自营</span></i>' : a.shop.wareType && "1" == a.shop.wareType && (b += '<i class="label-icon-div have-icon-div goods-sign"><i class="label-icon otc-icon"></i><span class="label-text red-div white-text">药品</span><span class="label-text red-text">自营</span></i>') : a.shop.venderType && "0" == a.shop.venderType && (a.shop.wareType && "0" == a.shop.wareType && a.shop.diamond ? b += '<i class="label-icon-div have-not-icon-div  diamond-icon-div goods-sign"><span class="label-text">品质认证</span></i>' : a.shop.wareType && "1" == a.shop.wareType && (b += '<i class="label-icon-div have-icon-div goods-sign"><i class="label-icon otc-icon"></i><span class="label-text red-div white-text">药品</span></i>')), a.shop.wareType && "2" == a.shop.wareType && (b += '<img class="goods-sign global-icon" src="/images/5.4/global-icon.png"/>'), a.shop.venderType && "0" == a.shop.venderType && (b += a.shop.score > 0 ? '<span class="score-text red-font">' + a.shop.score.toFixed(1) + "</span>" : '<span class="score-text red-font">0</span>'), b += "</span></div>", a.shop.brief && (b += '<div class="shop-slogan">', b += "<span>" + a.shop.brief + "</span>", b += "</div>"), a.shop.venderType && "0" == a.shop.venderType && (b += '<div class="shop-describe">', "0" != a.shop.wareScoreLevel && (b += '<span class="describe-info">商品 ', "1" == a.shop.wareScoreLevel ? b += '<span class="red-font">' : "-1" == a.shop.wareScoreLevel && (b += '<span class="green-font">'), b += a.shop.wareScore ? a.shop.wareScore.toFixed(1) : 0, b += "</span></span>"), "0" != a.shop.serviceScoreLevel && (b += '<span class="describe-info">服务 ', "1" == a.shop.serviceScoreLevel ? b += '<span class="red-font">' : "-1" == a.shop.serviceScoreLevel && (b += '<span class="green-font">'), b += a.shop.serviceScore ? a.shop.serviceScore.toFixed(1) : 0, b += "</span></span>"), "0" != a.shop.efficiencyScoreLevel && (b += '<span class="describe-info">物流 ', "1" == a.shop.efficiencyScoreLevel ? b += '<span class="red-font">' : "-1" == a.shop.efficiencyScoreLevel && (b += '<span class="green-font">'), b += a.shop.efficiencyScore ? a.shop.efficiencyScore.toFixed(1) : 0, b += "</span></span>"), b += "</div>"), b += '<div class="shop-tab"><span class="tabs">', b += '<div class="num">', b += a.shop.followCount ? a.shop.followCount : 0, b += "</div>", b += '<div class="text">关注人数</div>', b += '<div class="vertical-line"></div></span><span class="tabs">', b += '<div class="num">', b += a.shop.totalNum ? a.shop.totalNum : 0, b += "</div>", b += '<div class="text">全部商品</div>', b += '<div class="vertical-line"></div></span><span class="tabs">', b += '<div class="num">', b += a.shop.shopActivityTotalNum ? a.shop.shopActivityTotalNum : 0, b += "</div>", b += '<div class="text">店铺动态</div>', b += "</span></div></a>", a.shop.url && (a.customerService.hasChat || a.customerService.hasJimi) ? (b += '<div class="shop-footer" id="shopfooter">', b += '<div class="shop-dong">', a.customerService.hasJimi && !a.customerService.online ? (b += '<a class="shop-btn" id="imJimi" href="http://jimi.m.jd.com/?source=m_product&productId=' + c.value + "&sid=" + d.value + '" >', b += '<i class="icon-dong icon-dong-jimi"></i>', b += '<span class="dong-text J_ping" report-eventid="MProductdetail_ContactJIMI"  report-pageparam="' + c.value + '" report-eventlevel="5">联系JIMI</span></a>') : a.customerService.hasChat && (a.customerService.online ? (b += e && f ? '<a class="shop-btn" id="im" href="http://chat.jd.com/merchant/index?v=6&sku=' + $("#currentWareId").val() + "&imgUrl=" + $("#imgUrl").val() + "&goodName=" + encodeURIComponent(encodeURIComponent($("#goodName").val())) + "&jdPrice=" + $("#jdPrice").val() + "&sid=" + $("#sid").val() + '&entry=m_item">' : '<a class="shop-btn" id="im" href="http://im.m.jd.com/merchant/index?v=6&sku=' + $("#currentWareId").val() + "&imgUrl=" + $("#imgUrl").val() + "&goodName=" + encodeURIComponent(encodeURIComponent($("#goodName").val())) + "&jdPrice=" + $("#jdPrice").val() + "&sid=" + $("#sid").val() + '">', "3" == a.customerService.shopCustomType || "4" == a.customerService.shopCustomType ? b += '<i class="icon-dong icon-dong-red"></i>' : "2" == a.customerService.shopCustomType ? b += '<i class="icon-dong icon-dong-yellow"></i>' : "1" == a.customerService.shopCustomType && (b += '<i class="icon-dong icon-dong-blue"></i>')) : (b += '<a class="shop-btn" id="im">', b += '<i class="icon-dong icon-dong-not"></i>'), b += '<span class="dong-text J_ping" report-eventid="MProductdetail_AskServiceEntrance"  report-pageparam="' + c.value + '" report-eventlevel="5">', "3" == a.customerService.shopCustomType || "4" == a.customerService.shopCustomType ? b += "联系客服" : "2" == a.customerService.shopCustomType ? b += "联系卖家" : "1" == a.customerService.shopCustomType && (b += "联系供应商"), b += "</span></a>"), b += "</div>", b += '<div class="shop-go">', b += '<a class="shop-btn" href="javascript:void(0);"  class="shop-href" onclick="toShop(\'' + a.shop.shopId + "','" + a.shop.wareType + "');\">", b += '<i class="icon-go"></i>', b += '<span class="go-text">进入店铺</span></a></div>', b += "</div>") : a.customerService.hasJimi || a.customerService.hasChat || (b += '<div class="shop-footer" id="shopfooter">', b += '<div class="no-chat-shop-go">', b += '<a class="shop-btn" href="javascript:void(0);"  class="shop-href" onclick="toShop(\'' + a.shop.shopId + "','" + a.shop.wareType + "');\">", b += '<i class="icon-go"></i>', b += '<span class="go-text">进入店铺</span></a></div>', b += "</div>")) : a.customerService.hasJimi && !a.customerService.online ? (b += '<div class="shop-part" id="jimiKefu">', b += '<div class="noshop-dong">', b += '<a class="noshop-dong-btn" id="imJimi" href="http://jimi.m.jd.com/?source=m_product&productId=' + c.value + "&sid=" + d.value + '" >', b += '<i class="noshop-icon-dong noshop-jimi"></i>', b += '<span class="noshop-dong-text J_ping"  report-eventid="MProductdetail_ContactJIMI"  report-pageparam="' + c.value + '" report-eventlevel="5">联系JIMI</span>', b += '<span class="icon-right"></span></a></div></div>') : a.customerService.hasChat ? (b += '<div class="shop-part" id="kefu">', b += '<div class="noshop-dong">', a.customerService.online ? (b += e && f ? '<a class="noshop-dong-btn" id="im" href="http://chat.jd.com/merchant/index?v=6&sku=' + $("#currentWareId").val() + "&imgUrl=" + $("#imgUrl").val() + "&goodName=" + encodeURIComponent(encodeURIComponent($("#goodName").val())) + "&jdPrice=" + $("#jdPrice").val() + "&sid=" + $("#sid").val() + '&entry=m_item">' : '<a class="noshop-dong-btn" id="im" href="http://im.m.jd.com/merchant/index?v=6&sku=' + $("#currentWareId").val() + "&imgUrl=" + $("#imgUrl").val() + "&goodName=" + encodeURIComponent(encodeURIComponent($("#goodName").val())) + "&jdPrice=" + $("#jdPrice").val() + "&sid=" + $("#sid").val() + '">', "3" == a.customerService.shopCustomType || "4" == a.customerService.shopCustomType ? b += '<i class="noshop-icon-dong noshop-icon-dong-red" id="imshow"></i>' : "2" == a.customerService.shopCustomType ? b += '<i class="noshop-icon-dong noshop-icon-dong-yellow" id="imshow"></i>' : "1" == a.customerService.shopCustomType && (b += '<i class="noshop-icon-dong noshop-icon-dong-blue" id="imshow"></i>')) : (b += '<a class="noshop-dong-btn" id="im">', b += '<i class="noshop-icon-dong noshop-icon-dong-not" id="imshow"></i>'), b += '<span class="noshop-dong-text J_ping"  report-eventid="MProductdetail_AskServiceEntrance"  report-pageparam="' + c.value + '" report-eventlevel="5">', "3" == a.customerService.shopCustomType || "4" == a.customerService.shopCustomType ? b += "联系客服" : "2" == a.customerService.shopCustomType ? b += "联系卖家" : "1" == a.customerService.shopCustomType && (b += "联系供应商"), b += "</span>", b += '<span class="icon-right"></span></a></div></div>') : a.customerService.hasJimi || a.customerService.hasChat || $("#shop-floor").removeClass("bdr-tb").removeClass("mar-t"), b
        }, NotOnline: function(a) {
            var b = document.querySelector("#im");
            !a.customerService.hasChat || a.customerService.hasJimi || a.customerService.online || b.addEventListener("click", function() {
                if ("3" == a.customerService.shopCustomType || "4" == a.customerService.shopCustomType)
                    var b = {cls: "error-icon", duration: 1e3, message: "客服不在线哟!", width: 180, height: 88};
                else if ("2" == a.customerService.shopCustomType)
                    var b = {cls: "error-icon", duration: 1e3, message: "卖家不在线哟!", width: 180, height: 88};
                else if ("1" == a.customerService.shopCustomType)
                    var b = {cls: "error-icon", duration: 1e3, message: "供应商不在线哟!", width: 180, height: 88};
                showMessage(b)
            }, !1)
        }, bind: function(a) {
            this.NotOnline(a)
        }}), a.clazz = b
}), M.define("guessInfo", function(a) {
    var b = function(a) {
        this.init(a)
    };
    M.object.merge(b.prototype, {init: function(a) {
            this.oBottomTabConfig = document.querySelector("#bottomTabConfig"), this.oIsPicLazyLoad = JSON.parse(this.oBottomTabConfig.value).isPicLazyLoad, this.oHasHistory = JSON.parse(this.oBottomTabConfig.value).hasHistory, this.oHasGuess = JSON.parse(this.oBottomTabConfig.value).hasGuess, this.oPin = document.querySelector("#pin"), this.oPin ? this.isLogin = !0 : this.isLogin = !1, this.drawTitle(), this.drawDom(a), this.relegateFn()
        }, addGuessTitle: function() {
            var a = "";
            return this.isLogin && this.oHasHistory && this.oHasGuess ? (a += '<div class="guess-tab">', a += '<span class="switch-title selected" report-eventid="MProductdetail_RecommendTab">为你推荐</span>', a += '<span class="switch-title" report-eventid="MProductdetail_RecordTab">浏览记录</span>', a += "</div>") : (this.isLogin && this.oHasHistory && !this.oHasGuess && (a += '<div class="guess-single">', a += '<span class="shopping-guess-title">', a += "浏览记录", a += "</span></div>"), (this.isLogin && !this.oHasHistory || !this.isLogin) && this.oHasGuess && (a += '<div class="guess-single">', a += '<span class="shopping-guess-title">', a += "为你推荐", a += "</span></div>")), a
        }, addGuessDOM: function(a) {
            var b = document.querySelector("#currentWareId"), c = "";
            c += '<ul class="jd-slider-container shopping-guess-list" id="guessList">';
            for (var d = 0; d < a.recommendList.length; d++)
                c += '<li class="jd-slider-item shopping-guess-item">', c += '<a href="javascript:void(0);" onclick="toGuessYouLike(\'' + a.recommendList[d].clkUrl + "','/product/" + a.recommendList[d].skuId + '.html\')" class="J_ping" report-eventid="MProductdetail_GuessYouLike" ', c += a.recommendList[d].eventParam ? 'report-eventparam="' + a.recommendList[d].eventParam + '"' : 'report-eventparam="' + a.recommendList[d].skuId + '"', c += 'report-pageparam="' + b.value + '" report-eventlevel="5">', c += '<div class="guess-item-pic">', c += '<img alt="' + a.recommendList[d].name + '"', c += this.oIsPicLazyLoad ? 'src="../images/occupy-img320.gif?v="  _src="' + a.recommendList[d].image + '">' : 'src="' + a.recommendList[d].image + '" onerror="imgErr(this)">', c += '</div><div class="guess-item-content">', c += "<span>" + a.recommendList[d].name + "</span>", c += "</div></a>", c += '<div class="guess-item-price">', c += "<span><i>" + a.recommendList[d].jprice + "</i></span>", c += "</div></li>";
            return c += "</ul>", c += '<div class="guess-focus-btn jd-slider-btnDiv"></div>'
        }, drawTitle: function() {
            var a = document.querySelector(".guess-title-wrapper");
            a.innerHTML = this.addGuessTitle()
        }, drawDom: function(a) {
            var b = document.querySelector("#guessing");
            a && a.recommendInfo && a.recommendInfo.recommendList.length > 0 && (b.innerHTML = this.addGuessDOM(a.recommendInfo), $("#guessing").length > 0 && slideshow("#guessing").init({lineNum: 2, marginValue: 3, multiMove: !0, isSymmetry: !0, smallBtn: !0, mpingEvent: "MProductdetail_SlideYouLike"}))
        }, switchGuessScan: function() {
            for (var a = document.querySelectorAll(".guess-tab .switch-title"), b = document.querySelectorAll(".shopping-switch-cover"), c = document.querySelector(".manage-scan"), d = 1, e = null, f = this, g = 0; g < a.length; g++)
                !function(h) {
                    a[h].addEventListener("click", function() {
                        for (var i = 0; i < g; i++)
                            a[i].classList.remove("selected"), b[i].style.display = "none";
                        a[h].classList.add("selected"), b[h].style.display = "block", 1 == h ? c.style.display = "block" : c.style.display = "none", 0 == h ? pingClick("MProductdetail_RecommendTab", "", "", "") : 1 == h && pingClick("MProductdetail_RecordTab", "", "", ""), 1 == h && 1 == d && (b[h].style.visibility = "hidden", dataScanLoad({containerID: "scan-record", url: "/ware/getWareHistory.json?wareId=" + $("#currentWareId").val(), cbfn: function() {
                                $("#scan-record").length > 0 && slideshow("#scan-record").init({lineNum: 2, marginValue: 3, multiMove: !0, isSymmetry: !0, smallBtn: !0, mpingFn: f.ScanSlideMping})
                            }}), clearTimeout(e), e = setTimeout(function() {
                            b[h].style.visibility = "visible"
                        }, 500)), d++
                    }, !1)
                }(g)
        }, ScanSlideMping: function() {
            pingClick("MProductdetail_SlideRecord", "", "", "")
        }, relegateFn: function() {
            var a = null, b = this;
            this.oHasGuess || ($("#guessing").removeClass("guess-up"), $("#guessing").addClass("guess-down"), this.oHasHistory && this.isLogin && ($("#scan-record").show(), $(".manage-scan").show(), $("#scan-record").css("visibility", "hidden"), dataScanLoad({containerID: "scan-record", url: "/ware/getWareHistory.json?wareId=" + $("#currentWareId").val(), cbfn: function() {
                    $("#scan-record").length > 0 && slideshow("#scan-record").init({lineNum: 2, marginValue: 3, multiMove: !0, isSymmetry: !0, smallBtn: !0, mpingFn: b.ScanSlideMping})
                }}), clearTimeout(a), a = setTimeout(function() {
                $("#scan-record").css("visibility", "visible")
            }, 500))), this.oHasHistory || ($("#scan-record").removeClass("scan-up"), $("#scan-record").addClass("scan-down")), this.oHasHistory || this.oHasGuess || $("#showRecommendList").removeClass("bdr-t").removeClass("mar-t")
        }, bind: function() {
            this.switchGuessScan()
        }, run: function() {
            this.bind()
        }}), a.clazz = b
}), M.define("promotionInfo", function(a) {
    var b = function(a) {
        this.init(a)
    };
    M.object.merge(b.prototype, {init: function(a) {
            this.containers = document.querySelector(".promotion-content"), a && (this.containers.innerHTML = this.addDOM(a), this.bind())
        }, addDOM: function(a) {
            var b = this, c = "", d = 0, e = 0, f = 0, g = document.querySelector("#currentWareId"), h = document.querySelector("#sid"), i = document.querySelector("#resourceType"), j = document.querySelector("#resourceValue"), k = document.querySelector("#httpsConfig");
            if (a.activityList && (e += a.activityList.length), a.giftList && (e += a.giftList.length), a.suitList && (e += 1), a && a.suitList && a.suitList.length > 0)
                for (var l = 0, m = a.suitList.length; l < m; l++)
                    a.suitList[l].discount && f < parseFloat(a.suitList[l].discount.substring(1)) && (f = parseFloat(a.suitList[l].discount.substring(1)));
            if (c += '<div class="promotion-item promotion-info"><span>可享受以下优惠</span></div>', a.activityList) {
                for (var l = 0, m = a.activityList.length; l < m; l++)
                    a.activityList[l].text && a.activityList[l].value && '"null"' != a.activityList[l].value && ("活动预告" != a.activityList[l].text && "跨店铺满免" != a.activityList[l].text || (c += d > 1 && 3 != e ? '<div class="promotion-item item-import item-display-inline">' : '<div class="promotion-item item-import">', c += "true" == $("#isJx").val() ? '<i class="label-icon-div have-not-icon-div jx-border"><span class="label-text jx-text">' : '<i class="label-icon-div have-not-icon-div"><span class="label-text">', c += a.activityList[l].text + "</span></i>", c += a.activityList[l].link && "" != a.activityList[l].link ? '<a class="J_ping" href="' + a.activityList[l].link + '" report-eventid="MProductdetail_SalesPromotion" report-eventlevel="5" report-eventparam="' + a.activityList[l].link + '" report-pageparam="' + g.value + '">' : a.activityList[l].promoId && "" != a.activityList[l].promoId && '"null"' != a.activityList[l].promoId ? '<a href="http://so.m.jd.com/ware/search.action?activityId=' + a.activityList[l].promoId + "&activitySTip=" + a.activityList[l].value + "&skuId=" + g.value + '"  class="J_ping"  report-eventid="MProductdetail_Promotion" report-eventlevel="5" report-eventparam="' + g.value + "_http://so.m.jd.com/ware/search.action?activityId=" + a.activityList[l].promoId + "&activitySTip=" + a.activityList[l].value + "&skuId=" + g.value + '" report-pageparam="' + g.value + '">' : '<a href="javascript:void(0)">', c += d > 1 && 3 != e ? '<span class="promotion-item-text  promotion-item-link">' + a.activityList[l].value + "</span>" : '<span class="promotion-item-text">' + a.activityList[l].value + "</span>", (a.activityList[l].link && "" != a.activityList[l].link || a.activityList[l].promoId && "" != a.activityList[l].promoId && '"null"' != a.activityList[l].promoId) && (c += '<span class="promotion-left"><em class="icon-arrow icon-arrow-right"></em></span>'), c += "</a></div>", d++));
                for (var l = 0, m = a.activityList.length; l < m; l++)
                    a.activityList[l].text && a.activityList[l].value && '"null"' != a.activityList[l].value && "活动预告" != a.activityList[l].text && "跨店铺满免" != a.activityList[l].text && (c += d > 1 && 3 != e ? '<div class="promotion-item item-import item-display-inline">' : '<div class="promotion-item item-import">', c += "true" == $("#isJx").val() ? '<i class="label-icon-div have-not-icon-div jx-border"><span class="label-text jx-text">' : '<i class="label-icon-div have-not-icon-div"><span class="label-text">',
                            c += a.activityList[l].text + "</span></i>", c += a.activityList[l].link && "" != a.activityList[l].link ? '<a class="J_ping" href="' + a.activityList[l].link + '" report-eventid="MProductdetail_SalesPromotion" report-eventlevel="5" report-eventparam="' + a.activityList[l].link + '" report-pageparam="' + g.value + '">' : a.activityList[l].promoId && "" != a.activityList[l].promoId && '"null"' != a.activityList[l].promoId ? '<a href="http://so.m.jd.com/ware/search.action?activityId=' + a.activityList[l].promoId + "&activitySTip=" + a.activityList[l].value + "&skuId=" + g.value + '"  class="J_ping"  report-eventid="MProductdetail_Promotion" report-eventlevel="5" report-eventparam="' + g.value + "_http://so.m.jd.com/ware/search.action?activityId=" + a.activityList[l].promoId + "&activitySTip=" + a.activityList[l].value + "&skuId=" + g.value + '" report-pageparam="' + g.value + '">' : '<a href="javascript:void(0)">', c += d > 1 && 3 != e ? '<span class="promotion-item-text  promotion-item-link">' + a.activityList[l].value + "</span>" : '<span class="promotion-item-text">' + a.activityList[l].value + "</span>", (a.activityList[l].link && "" != a.activityList[l].link || a.activityList[l].promoId && "" != a.activityList[l].promoId && '"null"' != a.activityList[l].promoId) && (c += '<span class="promotion-left"><em class="icon-arrow icon-arrow-right"></em></span>'), c += "</a></div>", d++)
            }
            if (a.giftList)
                for (var l = 0, m = a.giftList.length; l < m; l++)
                    a.giftList[l].value && a.giftList[l].text && '"null"' != a.giftList[l].value && '"null"' != a.giftList[l].text && (a.giftList[l].skuId && "" != a.giftList[l].skuId ? (c += d > 1 && 3 != e ? '<div class="promotion-item item-import item-display-inline J_ping"' : '<div class="promotion-item item-import J_ping"', c += 'report-eventid="MProductdetail_SalesPromotion" report-pageparam="' + g.value + '" report-eventlevel="5">') : c += d > 1 && 3 != e ? '<div class="promotion-item item-display-inline">' : '<div class="promotion-item">', c += "true" == $("#isJx").val() ? '<i class="label-icon-div have-not-icon-div jx-border"><span class="label-text jx-text">' : '<i class="label-icon-div have-not-icon-div"><span class="label-text">', c += a.giftList[l].text + "</span></i>", c += '<a href="/product/' + a.giftList[l].skuId + ".html\" onclick=\"pingClickWithLevel('MProductdetail_SalesPromotion','http://item.m.jd.com/product/" + a.giftList[l].skuId + ".html','','" + g.value + "','5')\">", c += d > 1 && 3 != e ? '<span class="promotion-item-text  promotion-item-link">' + a.giftList[l].value + "</span>" : '<span class="promotion-item-text">' + a.giftList[l].value + "</span>", a.giftList[l].skuId && "" != a.giftList[l].skuId && (c += '<span class="promotion-left"><em class="icon-arrow icon-arrow-right"></em></span>'), c += "</a></div>", d++);
            if (a && a.suitList && a.suitList.length > 0) {
                c += d > 1 && 3 != e ? '<div class="promotion-item item-import item-display-inline" style="position:relative">' : '<div class="promotion-item item-import" style="position:relative">', c += "true" == $("#isJx").val() ? '<i class="label-icon-div have-not-icon-div jx-border"><span class="label-text jx-text">' : '<i class="label-icon-div have-not-icon-div"><span class="label-text">', c += "优惠套装</span></i>", c += '<a href="javascript:void(0)" onclick="toSuitPage(\'' + b.composite("/suit/" + g.value + ".html?resourceType=" + i.value + "&resourceValue=" + j.value, h.value) + "')\">", c += d > 1 && 3 != e ? '<span class="promotion-item-link promotion-item-text">' : '<span class="promotion-item-text">', c += "最高省<i>" + f + " 元</i></span>", c += d > 1 && 3 != e ? '<span class="promotion-item-suit  promotion-item-link">' : '<span class="promotion-item-suit">', c += "共 " + a.suitList.length + " 款</span>", c += '<span class="promotion-left"><em class="icon-arrow icon-arrow-right-group"></em></span></a>', c += '<div class="promotion-suit-container promotion-item-link" id="suitContainer">', c += '<ul class="jd-slider-container suit-list" id="suitList">';
                for (var l = 0, m = a.suitList.length; l < m; l++) {
                    c += '<li class="suit-item jd-slider-item">', c += '<div class="suit-item-title">套装' + (l + 1) + "</div>", c += '<div class="suit-item-content">', c += '<span class="suit-item-pic J_ping"  report-eventid="MProductdetail_PreferentialPackage"  report-pageparam="' + g.value + '" report-eventlevel="5" onclick="toSuitPage(\'' + b.composite("/suit/" + g.value + ".html?resourceType=" + i.value + "&resourceValue=" + j.value, h.value) + "')\">", c += k.value ? '<img alt="' + a.suitList[l].mainSkuName + '" src="' + a.domain.replace("http://", "//") + a.suitList[l].mainSkuPicUrl + '"/></span>' : '<img alt="' + a.suitList[l].mainSkuName + '" src="' + a.domain + a.suitList[l].mainSkuPicUrl + '"/></span>', a.suitList[l].productList && a.suitList[l].productList.length > 0 && (c += '<span class="suit-item-add">+</span>');
                    for (var n = 0, o = a.suitList[l].productList.length; n < o; n++)
                        0 != n && (c += '<span class="suit-item-add">+</span>'), c += '<span class="suit-item-pic" onclick="toSuitPage(\'' + b.composite("/suit/" + g.value + ".html?resourceType=" + i.value + "&resourceValue=" + j.value, h.value) + "')\">", c += k.value ? '<img alt="' + a.suitList[l].productList[n].skuName + '" src="' + a.domain.replace("http://", "//") + a.suitList[l].productList[n].skuPicUrl + '"/></span>' : '<img alt="' + a.suitList[l].productList[n].skuName + '" src="' + a.domain + a.suitList[l].productList[n].skuPicUrl + '"/></span>';
                    c += "</div></li>", d++
                }
                c += "</ul></div></div>"
            }
            return c
        }, composite: function(a, b) {
            var c, d = a.indexOf("?") != -1 ? "&" : "?";
            return a && b && (c = a + d + "sid=" + b.replace(new RegExp("['\"\\s]", "gm"), "")), c.toString()
        }, bind: function() {
            $("#suitContainer").length > 0 && slideshow("#suitContainer").init({lineNum: 1, marginValue: 40, fullScreen: !0, mpingEvent: "MProductdetail_SlideDiscount"})
        }}), a.clazz = b
});