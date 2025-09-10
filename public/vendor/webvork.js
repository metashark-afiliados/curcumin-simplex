(function () {
  "use strict";

  var wvDOM = {
    getElement: function (elem) {
      if (!elem) return undefined;
      return document.querySelector(elem);
    },
    getElementAll: function (elem) {
      if (!elem) return undefined;
      return document.querySelectorAll(elem);
    },
    getAttributeElement: function (elem, name) {
      if (!name || !elem) return undefined;
      return elem.getAttribute(name);
    },
    setScriptAttribute: function (attr, name) {
      if (!attr || !name) return undefined;
      var newScript = document.createElement("script");
      document.body.appendChild(newScript);
      newScript.setAttribute(attr, name);
    },
    crateScript: function (value) {
      if (!value) return undefined;
      var newScript = document.createElement("script");
      newScript.innerHTML = value;
      document.body.appendChild(newScript);
    },
    crateScriptHead: function (value) {
      if (!value) return undefined;
      var newScript = document.createElement("script");
      newScript.innerHTML = value;
      document.head.appendChild(newScript);
    },
  };

  var wvParams = {
    offerId: "",
    pageType: "",
    createdUrl: "",
    YmCounter: "",
    GaCounter: "",
    tracker: "",
    params: "",
    // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð´Ð»Ñ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ñ url
    get: function (name) {
      if (
        (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
          this.getLocationSearch()
        ))
      );
      return name === null ? undefined : encodeURIComponent(name[1]);
    },
    getAllCounts: function (countName) {
      var allCounts = {};
      var params = wvParams
        .getLocationSearch()
        .replace("?", "")
        .split("&")
        .filter(function (el) {
          return el.match(countName);
        });
      params.forEach(function (el) {
        var id = el.split("=");
        if (id[0].indexOf(countName) + 1) {
          allCounts[id[0]] = id[1];
        }
      });
      return Object.keys(allCounts).length ? allCounts : "";
    },
    // Ð¡ÐºÐ»Ð°Ð´Ñ‹Ð²Ð°ÐµÑ‚ ÑÑ‚Ñ€Ð¾ÐºÐ¸, ÐµÑÐ»Ð¸ Ð²Ñ‚Ð¾Ñ€Ð¾Ð¹ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€ Ð¿ÑƒÑÑ‚Ð¾Ð¹ Ð¸Ð»Ð¸ Ñ Ð¾ÑˆÐ¸Ð±ÐºÐ¾Ð¹, Ð²ÐµÑ€Ð½ÐµÑ‚ ''
    set: function (str, existStr) {
      if (str && existStr && existStr !== "undefined") {
        return str + existStr;
      }
      return "";
    },
    getLocationSearch: function () {
      return location.search;
    },
    getUrl: function () {
      return window.location.href;
    },
    getHtmlData: function () {
      return wvDOM.getElement("html");
    },
    // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð½Ð° ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð° Ð¸Ð»Ð¸ ÐºÑƒÐºÐ¸, Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°ÐµÑ‚ Ð¿ÐµÑ€Ð²Ð¾Ðµ Ñ‡Ñ‚Ð¾ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚ Ð¸Ð»Ð¸ Ð¿ÑƒÑÑ‚ÑƒÑŽ ÑÑ‚Ñ€Ð¾ÐºÑƒ
    isExist: function (prop) {
      var param = this.get(prop);
      if (param) {
        return param;
      }

      var cookie = wvCookie.get("c_" + prop);
      if (cookie) {
        return cookie;
      }

      return "";
    },
    // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð¾Ð²Ð°Ð½Ð¸Ñ ÑÐ²Ð¾Ð¹ÑÑ‚Ð²Ð°
    isReal: function (prop) {
      if (prop) {
        return prop;
      }
      return "";
    },
  };

  var wvCookie = {
    // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ ÐºÑƒÐºÐ¸
    get: function (name) {
      if (!name) return;
      var matches = this.searchCookie(name);
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    // Ð£ÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÐ¼ ÐºÑƒÐºÐ¸
    set: function (cname, cvalue, exdays) {
      var expires,
        cookieStr,
        d = new Date();

      if (!exdays) {
        exdays = 1;
      }

      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      expires = "expires=" + d.toUTCString();

      if (cname && cvalue) {
        cookieStr = cname + "=" + cvalue + ";" + expires + ";path=/";
        document.cookie = cookieStr;
      } else {
        cookieStr = null;
      }

      return cookieStr;
    },
    //ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÐ¼ ÐºÑƒÐºÐ¸ Ð¸Ð· Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¾Ð² url
    setParamsToCookie: function () {
      var paramsArr = [
        "ym",
        "ga",
        "gtag",
        "fb",
        "tt",
        "fb_sot",
        "fb_sol",
        "fb_sos",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ];
      return paramsArr.map(function (param_key) {
        var parameter = wvParams.get(param_key);
        if (parameter) {
          return wvCookie.set("c_" + param_key, parameter, 1);
        }
      });
    },
    // ÐŸÐ¾Ð¸ÑÐº ÐºÑƒÐºÐ¸
    searchCookie: function (name) {
      return document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
    },
    updateExpireDate: function () {
      const cookieDecoded = decodeURIComponent(document.cookie);
      const cookieArr = cookieDecoded.split("; ");
      cookieArr.forEach(function (val) {
        var name, value;
        name = val.slice(0, val.indexOf("="));
        value = val.substring(val.indexOf("=") + 1);
        wvCookie.set(name, value, 1);
      });
    },
  };

  // ÐžÐ±ÑŠÐµÐºÑ‚ Ñ Ð¸Ð·Ð²ÐµÑÑ‚Ð½Ñ‹Ð¼Ð¸ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð°Ð¼Ð¸ Ð¸Ð»Ð¸ ÐºÑƒÐºÐ°Ð¼Ð¸
  var wvPageData = {
    ym: wvParams.isExist("ym"),
    ga: wvParams.isExist("ga"),
    gtag: wvParams.isExist("gtag"),
    fb: wvParams.isExist("fb"),
    fb_track: wvParams.isExist("fb_track"),
    fb2: wvParams.isExist("fb2"),
    fb2_track: wvParams.isExist("fb2_track"),
    tt: wvParams.isExist("tt"),
    utm_source: wvParams.isExist("utm_source"),
    utm_medium: wvParams.isExist("utm_medium"),
    utm_campaign: wvParams.isExist("utm_campaign"),
    utm_content: wvParams.isExist("utm_content"),
    utm_term: wvParams.isExist("utm_term"),
    shopwindow_id: wvParams.isExist("shopwindow_id"),
    cbwv: wvParams.isExist("cbwv"),
    fb_sot: wvParams.isExist("fb_sot"), // Ð¤Ð»Ð°Ð³ Ð´Ð»Ñ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ¸ Ð¿Ð¸ÐºÑÐµÐ»Ñ Ð½Ð° Ð¿Ñ€ÐµÐ»ÐµÐ½Ð´Ð¸Ð½Ð³
    fb_sol: wvParams.isExist("fb_sol"), // Ð¤Ð»Ð°Ð³ Ð´Ð»Ñ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ¸ Ð¿Ð¸ÐºÑÐµÐ»Ñ Ð½Ð° Ð»ÐµÐ½Ð´Ð¸Ð½Ð³
    fb_sos: wvParams.isExist("fb_sos"), // Ð¤Ð»Ð°Ð³ Ð´Ð»Ñ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ¸ Ð¿Ð¸ÐºÑÐµÐ»Ñ Ð½Ð° success
    allTiktok: wvParams.getAllCounts("pixel_id"), // ÐŸÐ¸ÐºÑÐµÐ»Ð¸ Ñ‚Ð¸ÐºÑ‚Ð¾ÐºÐ°
  };

  var wvMetric = {
    pageType: null,
    // Ð£ÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÑ‚ ÑÑ‡ÐµÑ‚Ñ‡Ð¸ÐºÐ¸
    add: function (type, counterID) {
      switch (type) {
        case "YM":
          if (counterID !== null) {
            var scriptYM =
              '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.com/metrika/tag.js", "ym"); ym(' +
              counterID +
              ', "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });';
            wvDOM.crateScript(scriptYM);
            return scriptYM;
          }
          break;
        case "GA":
          if (counterID !== null) {
            var scriptGALinkID =
              "https://www.googletagmanager.com/gtag/js?id=" + counterID;
            var scriptGA =
              "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '" +
              counterID +
              "');";
            wvDOM.setScriptAttribute("src", scriptGALinkID);
            wvDOM.crateScript(scriptGA);
            return scriptGA;
          }
          break;
        case "GTAG":
          if (counterID !== null) {
            var scriptGTAG =
              "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" +
              counterID +
              "');";
            wvDOM.crateScript(scriptGTAG);
            return scriptGTAG;
          }
          break;
        case "TP":
          var scriptTP =
            '!function (p,i,x,e,l,j,s) {p[l] = p[l] || function (pixelId) {p[l].pixelId = pixelId};j = i.createElement(x), s = i.getElementsByTagName(x)[0], j.async = 1, j.src = e, s.parentNode.insertBefore(j, s)}(window, document, "script", "https://cdn.truffle.bid/p/inline-pixel.js", "ttf") \nttf("f19b6513-7856-cdd5-c801-9ed3b8f32cf7")';
          wvDOM.crateScript(scriptTP);
          return scriptTP;
        case "FB":
          if (counterID !== null) {
            var scriptFB;
            var track =
              "fbq('track', '" + (wvPageData.fb_track || "PageView") + "');";

            if (
              this.pageType === "success" &&
              (wvPageData.fb_track !== "Purchase" ||
                wvPageData.fb_track !== "Lead")
            ) {
              track =
                "fbq('track', 'Lead'); fbq('track', 'AddToCart'); fbq('track', '" +
                (wvPageData.fb_track || "PageView") +
                "');";
            }

            scriptFB =
              "!function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
              "n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
              "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
              "n.queue=[];t=b.createElement(e);t.async=!0;" +
              "t.src=v;s=b.getElementsByTagName(e)[0];" +
              "s.parentNode.insertBefore(t,s)}(window, document,'script'," +
              "'https://connect.facebook.net/en_US/fbevents.js');" +
              "fbq('init', " +
              decodeURI(counterID) +
              ");" +
              track;
            wvDOM.crateScript(scriptFB);
            return scriptFB;
          }
          break;
        case "FB2":
          if (counterID !== null) {
            var scriptFB;
            var track =
              "fbq('track', '" + (wvPageData.fb2_track || "PageView") + "');";

            if (
              wvPageData.fb2_track !== "Purchase" ||
              wvPageData.fb_track !== "Lead"
            ) {
              track =
                "fbq('track', 'Lead'); fbq('track', 'AddToCart'); fbq('track', '" +
                (wvPageData.fb2_track || "PageView") +
                "');";
            }

            scriptFB =
              "!function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
              "n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
              "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
              "n.queue=[];t=b.createElement(e);t.async=!0;" +
              "t.src=v;s=b.getElementsByTagName(e)[0];" +
              "s.parentNode.insertBefore(t,s)}(window, document,'script'," +
              "'https://connect.facebook.net/en_US/fbevents.js');" +
              "fbq('init', " +
              decodeURI(counterID) +
              ");" +
              track;
            wvDOM.crateScript(scriptFB);
            return scriptFB;
          }
          break;
        case "TT":
          if (counterID !== null) {
            var scriptTT;
            var track = "tt('track', '" + (wvPageData.tt || "PageView") + "');";
            var scriptTT = `!function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e }, ttq.load = function (e, n) { var i = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; var o = document.createElement("script"); o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a) }; ttq.load('${counterID}'); ttq.page();}(window, document, 'ttq');`;
            wvDOM.crateScript(scriptTT);
            return scriptTT;
          }
          break;
        default:
          return null;
      }
    },
    // Ð”Ð»Ñ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ¸ Ð¿Ð¾Ð»Ð·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ñ… Ð¼ÐµÑ‚Ñ€Ð¸Ðº
    set: function (ym, ga, gtag, fb, fb2, tt, allTiktok, pageType) {
      if (!ym && !ga && !gtag && !fb && !tt && !pageType) return null;
      var counts = "";
      this.pageType = pageType;
      if (ym) {
        counts += this.add("YM", ym);
      }
      if (ga) {
        counts += this.add("GA", ga);
      }
      if (gtag) {
        counts += this.add("GTAG", gtag);
      }
      //Ñ„Ð± ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÑ‚ÑÑ Ð² Ð·Ð°Ð²Ð¸ÑÐ¸ÑÐ¼Ð¾ÑÑ‚Ð¸ Ð¾Ñ‚ Ñ‚Ð¸Ð¿Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ Ð¸ Ð¿ÐµÑ€ÐµÐ´Ð°Ð½Ð½Ñ‹Ñ… Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¾Ð²
      if (fb) {
        var pixel = {
          fb_sot: wvParams.isExist("fb_sot"),
          fb_sol: wvParams.isExist("fb_sol"),
          fb_sos: wvParams.isExist("fb_sos"),
        };

        //ÐµÑÐ»Ð¸ Ð½Ðµ Ð¿ÐµÑ€ÐµÐ´Ð°Ð½Ð¾ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¾Ð² Ð´Ð»Ñ Ð¿Ð¸ÐºÑÐµÐ»Ñ, Ð²ÐµÑˆÐ°ÐµÐ¼ ÐµÐ³Ð¾ Ð½Ð° Ð²ÑÐµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹
        if (!pixel.fb_sot && !pixel.fb_sol && !pixel.fb_sos && !pageType) {
          counts += this.add("FB", fb);
        }

        if (pixel.fb_sol && pageType === "landing") {
          counts += this.add("FB", fb);
        }

        if (pixel.fb_sot && pageType === "prelanding") {
          counts += this.add("FB", fb);
        }

        if (pixel.fb_sos && pageType === "success") {
          counts += this.add("FB", fb);
        }
      }

      if (fb2) {
        if (pageType === "success") {
          counts += this.add("FB2", fb2);
        }
      }

      if (tt) {
        counts += this.add("TT", tt);
      }

      if (allTiktok) {
        if (pageType === "success") {
          for (var key in allTiktok) {
            counts += this.add("TT", allTiktok[key]);
          }
        }
      }
      return counts;
    },
    metricsHandler: function (cb) {
      if (!cb) {
        throw new Error("metricsHandler method don`t has param");
      }
      var unloadedMetricsCount = 3;
      //Ð²Ñ‹Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ñ‚Ñ€ÐµÐºÐµÑ€ Ð²Ñ‚Ð¾Ñ€Ð¾Ð¹ Ñ€Ð°Ð· ÐºÐ¾Ð³Ð´Ð° Ð·Ð°Ð³Ñ€ÑƒÐ·ÑÑ‚ÑÑ Ð¼ÐµÑ‚Ñ€Ð¸ÐºÐ¸ Ð¸ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÑÐµÐ¼ ÐºÑƒÐºÐ¸ YM Ð¸ GA, Ð¸ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð½Ñ‹Ðµ Ð³ÑƒÐ¸Ð´Ñ‹
      wvParams.tracker.addEventListener("load", function () {
        cb();
        tryCB();
      });

      //Ð¶Ð´ÐµÐ¼ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ ÑÑ‡ÐµÑ‚Ñ‡Ð¸ÐºÐ° YM https://bit.ly/2T1m8Kt
      document.addEventListener(
        "yacounter" + wvParams.YmCounter + "inited",
        function () {
          tryCB();
        }
      );

      //Ð¶Ð´ÐµÐ¼ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ ÑÑ‡ÐµÑ‚Ñ‡Ð¸ÐºÐ° GA, https://bit.ly/2BDZYqD
      // try {
      //     ga(function () {
      //         tryCB();
      //     });
      // } catch (e) {
      //     throw new Error('google analytics Ð½Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ¶ÐµÐ½, Ð²Ñ‹ÐºÐ»ÑŽÑ‡Ð¸Ñ‚Ðµ adblock');
      // }

      function tryCB() {
        unloadedMetricsCount--;
        if (unloadedMetricsCount === 0) {
          // cb();
        }
      }
      return true;
    },
  };

  var wvForm = {
    data: [
      "ym",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "prelanding_id",
      "url",
      "cookie_enabled",
      "referer",
      "shopwindow_id",
    ],
    // Ð£ÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÐ¼ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ Ð² Ð¸Ð½Ð¿ÑƒÑ‚Ñ‹
    setParamsToInput: function () {
      this.setFormsInput("ym", wvPageData.ym);
      this.setFormsInput("utm_source", wvPageData.utm_source);
      this.setFormsInput("utm_medium", wvPageData.utm_medium);
      this.setFormsInput("utm_campaign", wvPageData.utm_campaign);
      this.setFormsInput("utm_content", wvPageData.utm_content);
      this.setFormsInput("utm_term", wvPageData.utm_term);
      this.setFormsInput(
        "prelanding_id",
        wvParams.isReal(wvParams.get("prelanding_id"))
      );
      this.setFormsInput("url", wvParams.getUrl());
      this.setFormsInput("cookie_enabled", navigator.cookieEnabled ? 1 : 0);
      this.setFormsInput("referer", wvPage.getReferrer());
      this.setFormsInput("shopwindow_id", wvPageData.shopwindow_id);
      return true;
    },
    setFormsInput: function (inputName, value) {
      if (!inputName || !value) return null;
      var inputs = this.getInputs('input[name="' + inputName + '"]');
      if (inputs) {
        Array.prototype.forEach.call(inputs, function (input) {
          input.value = value;
        });

        return true;
      }
    },
    getInputs: function (inputName) {
      return wvDOM.getElementAll(inputName);
    },
  };

  var wvLink = {
    // Ð˜Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ ÑÑÑ‹Ð»Ð¾Ðº Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð½Ð° Ð½Ð¾Ð²Ñ‹Ð¹ Ð¿ÑƒÑ‚ÑŒ
    changeLinks: function () {
      var amountLinks = wvLink.getLink("a");
      if (!amountLinks) {
        throw new Error("Links of the page not found!");
      }
      amountLinks.forEach(function (link) {
        link.setAttribute("href", wvLink.getUrl());
      });
      return amountLinks;
    },
    // Ð˜Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ ÐŸÐÐ ÐÐœÐ•Ð¢Ð ÐžÐ’ ÑÑÑ‹Ð»Ð¾Ðº Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ñ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð½Ñ‹Ð¼ ÐºÐ»Ð°ÑÑÐ¾Ð¼
    changeLinksByClassName: function (classNames) {
      if (!classNames) return null;

      return classNames.map(function (className) {
        var links = wvLink.getLink(className);
        if (!links) {
          throw new Error('Class "' + className + '" not found!');
        }

        links.forEach(function (link) {
          var currentHref = link.getAttribute("href");
          currentHref += wvPage.getQuerySimbols(currentHref) + wvParams.params;
          link.setAttribute("href", currentHref);
        });
        return links;
      });
    },
    // Ð˜Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ ÐŸÐžÐ›ÐÐ«Ð¥ ÑÑÑ‹Ð»Ð¾Ðº Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ñ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð½Ñ‹Ð¼ ÐºÐ»Ð°ÑÑÐ¾Ð¼
    changeFullLinksByClassName: function (classNames) {
      if (!classNames) return null;
      return classNames.map(function (className) {
        var links = wvLink.getLink(className);
        if (!links) {
          throw new Error('Class "' + className + '" not found!');
        }
        links.forEach(function (link) {
          link.setAttribute("href", wvLink.getUrl());
        });
        return links;
      });
    },
    getLink: function (elem) {
      return wvDOM.getElementAll(elem);
    },
    getUrl: function () {
      return wvParams.createdUrl;
    },
  };

  var wvGuid = {
    // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð³ÑƒÐ¸Ð´Ð°
    getGuid: function (name) {
      if (!name) return null;
      var dataGuid = this.getAttrElem(this.getHtmlData(), "data-" + name);
      if (dataGuid) {
        return dataGuid;
      } else {
        var c_guid = wvCookie.get("c_" + name);
        if (c_guid) {
          return c_guid;
        } else {
          return "";
        }
      }
    },
    // Ð¡Ñ‚Ð°Ð²Ð¸Ð¼ Ð³ÑƒÐ¸Ð´ Ð² ÐºÑƒÐºÐ¸
    setGuidsToCookie: function () {
      var first_guid = this.getAttrElem(this.getHtmlData(), "data-first_guid");
      var guid = this.getAttrElem(this.getHtmlData(), "data-guid");
      if (first_guid) {
        wvCookie.set("c_first_guid", first_guid, 1);
        wvCookie.set("c_guid", guid, 1);
        return first_guid;
      } else if (guid) {
        wvCookie.set("c_first_guid", guid, 1);
        wvCookie.set("c_guid", guid, 1);
        return guid;
      } else {
        return undefined;
      }
    },
    // Ð¡Ñ‚Ð°Ð²Ð¸Ð¼ Ð³ÑƒÐ¸Ð´Ñ‹ Ð² Ð¸Ð½Ð¿ÑƒÑ‚Ñ‹
    setGuidsToInput: function () {
      var first_guid = this.getAttrElem(this.getHtmlData(), "data-first_guid");
      var guid = this.getAttrElem(this.getHtmlData(), "data-guid");
      if (first_guid) {
        wvForm.setFormsInput("first_guid", first_guid);
        wvForm.setFormsInput("guid", guid);
        return first_guid;
      } else if (guid) {
        wvForm.setFormsInput("first_guid", guid);
        wvForm.setFormsInput("guid", guid);
        return guid;
      } else {
        return undefined;
      }
    },
    getAttrElem: function (elem, name) {
      return wvDOM.getAttributeElement(elem, name);
    },
    getHtmlData: function () {
      return wvParams.getHtmlData();
    },
  };

  var wvPhone = {
    // ÐŸÐ¾Ð´ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ ÐºÐ¾Ð´ Ñ‚ÐµÐ»ÐµÑ„Ð¾Ð½Ð°
    addPhoneCode: function () {
      var mask = {
        init: function () {
          var selects = wvPhone.getCountryElement(".country_select");
          var phones = wvPhone.getPhoneElement(".wv_phone");

          if (!selects || !phones) return null;

          //Ð²Ñ‹ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ Ð´ÐµÑ„Ð¾Ð»Ñ‚Ð½Ñ‹Ð¹ ÐºÐ¾Ð´
          var countryCode = selects[0].value.toLowerCase();
          var countryCodes = {
            ar: "+54",
            at: "+43",
            be: "+32",
            ch: "+41",
            de: "+49",
            it: "+39",
            es: "+34",
            fi: "+358",
            lv: "+371",
            lt: "+370",
            ee: "+372",
            ro: "+40",
            bg: "+359",
            pl: "+48",
            gr: "+30",
            cy: "+357",
            hu: "+36",
            fr: "+33",
            cz: "+420",
            pt: "+351",
            pe: "+51",
            co: "+57",
            cl: "+56",
            gt: "+502",
            ru: "+7",
            in: "+91",
            dk: "+45",
            sk: "+421",
            kz: "+7",
            tr: "+90",
            us: "+1",
            no: "+47",
            se: "+46",
            nl: "+31",
            ie: "+353",
          };

          selects.forEach(function (select) {
            select.addEventListener("change", function () {
              countryCode = this.value;
              selects.forEach(function (sel) {
                sel.value = countryCode;
              });
            });
          });

          phones.forEach(function (phone) {
            phone.pattern = "(\\+)[0-9]{9,16}";
            phone.title = "the phone must contain 9 to 16 digits only";

            //Ð¿Ñ€Ð¸ Ð¿Ð¾Ð¿Ð°Ð´Ð°Ð½Ð¸Ð¸ Ñ„Ð¾ÐºÑƒÑÐ° Ð¾ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ ÐºÐ¾Ð´ + Ð²Ð²ÐµÐ´ÐµÐ½Ð½ÑƒÑŽ Ñ‡Ð°ÑÑ‚ÑŒ Ð½Ð¾Ð¼ÐµÑ€Ð°
            phone.addEventListener("focusin", function () {
              var code = countryCodes[countryCode.toLowerCase()];
              this.value = !(this.value.length > code.length)
                ? code
                : this.value;
            });

            //Ð¿Ñ€Ð¸ Ð²Ð²Ð¾Ð´Ðµ Ð±Ð»Ð¾ÐºÐ¸Ñ€ÑƒÐµÐ¼ ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ðµ ÐºÐ¾Ð´Ð° ÑÑ‚Ñ€Ð°Ð½Ñ‹
            phone.addEventListener("input", function () {
              var code = countryCodes[countryCode.toLowerCase()];
              this.value.indexOf(code) && (this.value = code);
            });
          });

          return { selects: selects, phones: phones };
        },
      };
      return mask.init();
    },
    // ÐŸÐ¾Ð´ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ placeholders
    setPlaceholders: function () {
      var selects = this.getCountryElement(".country_select"); // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ Ð²ÑÐµ ÑÐµÐ»ÐµÐºÑ‚Ñ‹
      var names = this.getNameElement('input[name="name"]'); // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ Ð²ÑÐµ Ð¸Ð½Ð¿ÑƒÑ‚Ñ‹ Ñ Ð¸Ð¼ÐµÐ½ÐµÐ¼
      var phones = this.getPhoneElement('input[name="phone"]'); // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ Ð²ÑÐµ Ð¸Ð½Ð¿ÑƒÑ‚Ñ‹ Ñ Ñ‚ÐµÐ»ÐµÑ„Ð¾Ð½Ð¾Ð¼
      var optionVal = "";

      if (!selects && !phones) return null;

      // Ð’Ñ‹ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ Ð´ÐµÑ„Ð¾Ð»Ñ‚Ð½Ð¾Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ Ð¿Ð»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€Ð¾Ð²
      window.onload = function () {
        // Ð£Ð±Ð¸Ñ€Ð°ÐµÐ¼ Ð°Ð²Ñ‚Ð¾Ð·Ð°Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ðµ Ñ„Ð¾Ñ€Ð¼Ñ‹ Ð¿Ñ€Ð¸ Ð½Ð°Ð¶Ð°Ñ‚Ð¸Ð¸ ÐºÐ½Ð¾Ð¿ÐºÐ¸ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‚Ð°
        // names.forEach(function (name) {
        //     name.setAttribute('autocomplete', 'off');
        //     name.value='';
        // });
        // phones.forEach(function (phone) {
        //     phone.setAttribute('autocomplete', 'off');
        //     phone.value='';
        // });
        var defaultSelect = selects[0];
        if (defaultSelect) {
          optionVal = defaultSelect.value; // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ Ñ‚ÐµÐºÑƒÑ‰ÐµÐµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ ÑÐµÐ»ÐµÐºÑ‚Ð°
          changePhonePlaceholder(optionVal);
        }
      };

      // ÐžÐ±ÑŠÐµÐºÑ‚ ÑÐ¾ Ð²ÑÐµÐ¼Ð¸ Ð¿Ð»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€Ð°Ð¼Ð¸
      var phonesHolders = {
        ar: "mob:+541148912345",
        at: "mob:+43121234567",
        be: "mob:+32121234567",
        ch: "mob:+41121234567",
        de: "mob:+49121234567",
        it: "mob:+39121234567",
        es: "mob:+34121234567",
        fi: "mob:+35812123456",
        lv: "mob:+37121234567",
        lt: "mob:+37061234567",
        ee: "mob:+37251234567",
        ro: "mob:+40712345678",
        bg: "mob:+35948123456",
        pl: "mob:+48121234567",
        gr: "mob:+306912345678",
        cy: "mob:+35796123456",
        hu: "mob:+36201234567",
        fr: "mob:+33155430261",
        cz: "mob:+420121234567",
        pt: "mob:+351121234567",
        pe: "mob:+51312345789",
        co: "mob:+57425525856",
        cl: "mob:+56012345678",
        gt: "mob:+502601123456",
        ru: "Ð¼Ð¾Ð±:+79999999999",
        in: "mob:+911253241232",
        dk: "mob:+4566145222",
        sk: "mob:+421552451110",
        kz: "mob:+77212437014",
        tr: "mob:+902422291984",
        us: "mob:+19735966554",
        no: "mob:+4799999999",
        se: "mob:+46999999999",
        nl: "mob:+31101234567",
        ie: "mob:+35361421800",
      };

      selects.forEach(function (select) {
        // Ð”Ð»Ñ ÐºÐ°Ð¶Ð´Ð¾Ð³Ð¾ ÑÐµÐ»ÐµÐºÑ‚Ð° Ð²ÐµÑˆÐ°ÐµÐ¼ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸Ðº
        select.addEventListener("change", function () {
          optionVal = this.options[this.selectedIndex].value; // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ Ñ‚ÐµÐºÑƒÑ‰ÐµÐµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ ÑÐµÐ»ÐµÐºÑ‚Ð°
          selects.forEach(function (otherSelect) {
            otherSelect.value = optionVal;
          });
          return changePhonePlaceholder(optionVal); // ÐœÐµÐ½ÑÐµÐ¼ Ð²ÑÐµ Ð¸Ð½Ð¿ÑƒÑ‚Ñ‹ phone
        });
      });

      // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ ÑÐ¼ÐµÐ½Ñ‹ Ð²ÑÐµÑ… Ð¸Ð½Ð¿ÑƒÑ‚Ð¾Ð² Ñ Ð¸Ð¼ÐµÐ½ÐµÐ¼ name
      function changePhonePlaceholder(optionVal) {
        return phones.forEach(function (phone) {
          return (phone.placeholder = phonesHolders[optionVal.toLowerCase()]);
        });
      }
      return { selects: selects, phones: phones, names: names };
    },
    getPhoneElement: function (elem) {
      var selects = wvDOM.getElementAll(elem);
      return selects.length ? selects : 0;
    },
    getCountryElement: function (elem) {
      var phones = wvDOM.getElementAll(elem);
      return phones.length ? phones : 0;
    },
    getNameElement: function (elem) {
      var names = wvDOM.getElementAll(elem);
      return names.length ? names : 0;
    },
  };

  var wvName = {
    init: function () {
      var selects = wvPhone.getCountryElement(".country_select");
      var names = wvName.getNameElement('input[name="name"]');

      if (!selects || !names) return null;

      var countryCode = selects[0].value.toLowerCase();
      // ÐžÐ±ÑŠÐµÐºÑ‚ ÑÐ¾ Ð²ÑÐµÐ¼Ð¸ Ð¿Ð»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€Ð°Ð¼Ð¸
      var countryValidationText = {
        ar: "Por favor, utilice letras latinas.",
        at: "Bitte verwenden Sie beim AusfÃ¼llen dieses Formulars nur lateinische Buchstaben.",
        be: "Veuillez n'utiliser que des lettres latines pour remplir ce formulaire.",
        ch: "Bitte verwenden Sie beim AusfÃ¼llen dieses Formulars nur lateinische Buchstaben.",
        de: "Bitte verwenden Sie beim AusfÃ¼llen dieses Formulars nur lateinische Buchstaben.",
        it: "Per favore, usa solo lettere latine durante la compilazione di questo modulo.",
        es: "Por favor, utilice letras latinas.",
        fi: "KÃ¤ytÃ¤ vain latinalaisia kirjaimia tÃ¤yttÃ¤essÃ¤si tÃ¤tÃ¤ lomaketta.",
        pl: "Prosimy o uÅ¼ywanie tylko liter Å‚aciÅ„skich podczas wypeÅ‚niania tego formularza.",
        fr: "Veuillez n'utiliser que des lettres latines pour remplir ce formulaire.",
        cz: "PÅ™i vyplÅˆovÃ¡nÃ­ tohoto formulÃ¡Å™e prosÃ­m pouÅ¾Ã­vejte pouze latinskÃ¡ pÃ­smena.",
        pt: "Por favor, use apenas letras latinas ao preencher este formulÃ¡rio.",
        pe: "Por favor, utilice letras latinas.",
        co: "Por favor, utilice letras latinas.",
        cl: "Por favor, utilice letras latinas.",
        gt: "Por favor, utilice letras latinas.",
        ro: "VÄƒ rugÄƒm sÄƒ utilizaÈ›i numai litere latine cÃ¢nd completaÈ›i acest formular.",
        ru: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ Ð¿Ñ€Ð¸ Ð·Ð°Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ð¸ ÑÑ‚Ð¾Ð¹ Ñ„Ð¾Ñ€Ð¼Ñ‹ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ð»Ð°Ñ‚Ð¸Ð½ÑÐºÐ¸Ðµ Ð±ÑƒÐºÐ²Ñ‹.",
        in: "Please use only Latin letters when filling out this form.",
        dk: "Brug venligst kun latinske bogstaver, nÃ¥r du udfylder denne formular.",
        sk: "Bitte verwenden Sie beim AusfÃ¼llen dieses Formulars nur lateinische Buchstaben.",
        kz: "Bitte verwenden Sie beim AusfÃ¼llen dieses Formulars nur lateinische Buchstaben.",
        tr: "Bitte verwenden Sie beim AusfÃ¼llen dieses Formulars nur lateinische Buchstaben.",
        us: "Please enter only Latin letters when filling out this form.",
        no: "Vennligst bruk kun latinske bokstaver nÃ¥r du fyller ut dette skjemaet.",
        se: "VÃ¤nligen anvÃ¤nd endast latinska bokstÃ¤ver nÃ¤r du fyller i detta formulÃ¤r.",
      };
      var validationText = {
        ar: "Los datos no son correctos.",
        at: "Die Daten sind nicht korrekt.",
        be: "Les donnÃ©es ne sont pas correctes.",
        ch: "Die Daten sind nicht korrekt.",
        de: "Die Daten sind nicht korrekt.",
        it: "I dati non sono corretti.",
        es: "Los datos no son correctos.",
        fi: "Tiedot eivÃ¤t ole oikein.",
        pl: "Dane nie sÄ… poprawne.",
        fr: "Les donnÃ©es ne sont pas correctes.",
        cz: "Ãšdaje nejsou sprÃ¡vnÃ©.",
        pt: "Os dados nÃ£o estÃ£o corretos",
        pe: "Los datos no son correctos.",
        co: "Los datos no son correctos.",
        cl: "Los datos no son correctos.",
        gt: "Los datos no son correctos.",
        ro: "Datele sunt incorecte.",
        ru: "Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹.",
        in: "The data is incorrect.",
        dk: "Dataene er ikke korrekte.",
        sk: "Die Daten sind nicht korrekt.",
        kz: "Die Daten sind nicht korrekt.",
        tr: "Die Daten sind nicht korrekt.",
        us: "The data is not correct.",
        no: "Opplysningene er ikke korrekte.",
        se: "Uppgifterna Ã¤r inte korrekta.",
      };

      names.forEach(function (name) {
        var namePlaceholder = name.placeholder;
        name.addEventListener("input", function () {
          if (name.value.trim() == "") {
            name.value = "";
            return (name.placeholder = namePlaceholder);
          }
          return;
        });
      });

      if (countryCode === "cl") {
        names.forEach(function (name) {
          name.addEventListener("input", function () {
            if (name.value.match(/^[a-zA-Z\s]+$/)) {
              return true;
            } else if (name.value.trim() == "") {
              name.value = "";
              return (name.placeholder = validationText[countryCode]);
            } else {
              name.value = "";
              return (name.placeholder = countryValidationText[countryCode]);
            }
          });
        });
      }
    },
    getNameElement: function (elem) {
      var names = wvDOM.getElementAll(elem);
      return names.length ? names : 0;
    },
  };

  var wvPage = {
    init: function () {
      // Ð•ÑÐ»Ð¸ ÑÑ‚Ð¾ Ð½Ðµ Ð»ÐµÐ½Ð´Ð¸Ð½Ð³
      if (wvParams.pageType !== "landing") {
        var prelandId = wvDOM.getAttributeElement(
          wvParams.getHtmlData(),
          "data-prelanding_id"
        );
        wvParams.params =
          "url=" +
          encodeURIComponent(wvParams.getUrl()) +
          wvParams.set("&utm_source=", wvPageData.utm_source) +
          wvParams.set("&utm_medium=", wvPageData.utm_medium) +
          wvParams.set("&utm_campaign=", wvPageData.utm_campaign) +
          wvParams.set("&utm_content=", wvPageData.utm_content) +
          wvParams.set("&utm_term=", wvPageData.utm_term) +
          wvParams.set("&referer=", encodeURIComponent(wvPage.getReferrer())) +
          wvParams.set("&prelanding_id=", prelandId) +
          wvParams.set("&offer_id=", wvParams.offerId) +
          wvParams.set("&page_type=", wvParams.pageType);

        // Ð’Ñ‹Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ñ‚Ñ€ÐµÐºÐµÑ€ Ð¸ Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÐ¼ Ð² Ð½ÐµÐ³Ð¾ Ð¸Ð·Ð²ÐµÑÑ‚Ð½Ñ‹Ðµ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹
        wvParams.tracker = wvPage.jsonp(
          "//webvkrd.com/js.php?" + wvParams.params
        );

        // ÐŸÐ¾ÑÐ»Ðµ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ñ Ð»ÐµÐ½Ð´Ð¸Ð½Ð³Ð° Ð¸Ð· Ñ‚Ñ€ÐµÐºÐµÑ€Ð°, Ð¼ÐµÐ½ÑÐµÐ¼ ÑÑÑ‹Ð»ÐºÐ¸ Ð½Ð° Ñ‚Ñ€Ð°Ð½Ð·Ð¸Ñ‚ÐºÐµ
        wvParams.tracker.addEventListener("load", function () {
          var trackerData = {
            land: wvParams.isReal(
              wvDOM.getAttributeElement(
                wvParams.getHtmlData(),
                "data-landing_url"
              )
            ),
            guid: wvParams.isReal(wvGuid.getGuid("guid")),
            fguid: wvParams.isReal(wvGuid.getGuid("first_guid")),
          };

          wvParams.createdUrl = trackerData.land;
          for (var key in wvPageData) {
            if (wvParams.isReal(wvPageData[key])) {
              wvParams.createdUrl +=
                wvPage.getQuerySimbols(wvParams.createdUrl) +
                key +
                "=" +
                wvPageData[key];
            }
          }

          wvParams.createdUrl +=
            wvParams.set(
              wvPage.getQuerySimbols(wvParams.createdUrl) + "referer=",
              encodeURIComponent(wvPage.getReferrer())
            ) +
            wvParams.set(
              wvPage.getQuerySimbols(wvParams.createdUrl) + "prelanding_id=",
              prelandId
            );
          if (wvParams.pageType !== "success") {
            if (document.body.getAttribute("data-links") === "change-only-wv") {
              wvLink.changeFullLinksByClassName([".wv_link"]);
            } else {
              wvLink.changeLinks();
            }
          }
          wvGuid.setGuidsToCookie();
        });

        // Ð•ÑÐ»Ð¸ ÑÑ‚Ð¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾Ð³Ð¾ Ð·Ð°ÐºÐ°Ð·Ð°, ÑÑ‚Ð°Ð²Ð¸Ð¼ ÑÑ‡ÐµÑ‚Ñ‡Ð¸ÐºÐ¸ Ð»ÐµÐ½Ð´Ð¸Ð½Ð³Ð°
        if (wvParams.pageType === "success") {
          wvGuid.setGuidsToInput();
          wvForm.setFormsInput(
            "lead_guid",
            wvParams.isReal(wvParams.get("lead_guid"))
          );

          // Landing webvork counters
          wvParams.YmCounter = "98121540";
          wvParams.GaCounter = "G-BLBB3RLLYE";
          wvMetric.add("GA", wvParams.GaCounter);
          wvMetric.add("YM", wvParams.YmCounter);
          wvMetric.add("TP");
          wvForm.setParamsToInput();
          wvParams.test = "success page";
        } else {
          // Ð˜Ð½Ð°Ñ‡Ðµ ÑÑ‚Ð°Ð²Ð¸Ð¼ ÑÑ‡ÐµÑ‚Ñ‡Ð¸ÐºÐ¸ Ñ‚Ñ€Ð°Ð½Ð·Ð¸Ñ‚ÐºÐ¸
          // Prelanding webvork counters
          wvParams.YmCounter = "98121540";
          wvParams.GaCounter = "G-BLBB3RLLYE";
          wvMetric.add("GA", wvParams.GaCounter);
          wvMetric.add("YM", wvParams.YmCounter);
          wvMetric.add("TP");
          wvParams.test = "not landing page";
        }

        wvMetric.metricsHandler(function () {
          wvParams.params =
            wvParams.set("c_ym_uid=", wvCookie.get("_ym_uid")) +
            wvParams.set("&c_ga=", wvCookie.get("_ga")) +
            wvParams.set("&guid=", wvGuid.getGuid("guid")) +
            wvParams.set("&first_guid=", wvGuid.getGuid("first_guid"));
          wvPage.jsonp("//webvkrd.com/js.php?" + wvParams.params);
        });

        // Ð•ÑÐ»Ð¸ ÐµÑÑ‚ÑŒ Ð¿Ð¾Ñ‚Ð¾Ðº, Ñ‚Ð¾ ÑÑ‚Ð°Ð²Ð¸Ð¼ ÐºÑƒÐºÐ¸
        if (wvParams.get("utm_source") !== null) {
          wvCookie.setParamsToCookie();
        }
        // Ð•ÑÐ»Ð¸ ÑÑ‚Ð¾ Ð»ÐµÐ½Ð´Ð¸Ð½Ð³
      } else {
        var landId = wvDOM.getAttributeElement(
          wvParams.getHtmlData(),
          "data-landing_id"
        );
        // Landing webvork counters
        wvParams.YmCounter = "98121540";
        wvParams.GaCounter = "G-BLBB3RLLYE";
        wvMetric.add("GA", wvParams.GaCounter);
        wvMetric.add("YM", wvParams.YmCounter);
        wvMetric.add("TP");
        wvParams.test = "landing page";

        wvParams.params =
          "url=" +
          encodeURIComponent(wvParams.getUrl()) +
          wvParams.set("&utm_source=", wvPageData.utm_source) +
          wvParams.set("&utm_medium=", wvPageData.utm_medium) +
          wvParams.set("&utm_campaign=", wvPageData.utm_campaign) +
          wvParams.set("&utm_content=", wvPageData.utm_content) +
          wvParams.set("&utm_term=", wvPageData.utm_term) +
          wvParams.set("&referer=", encodeURIComponent(wvPage.getReferrer())) +
          wvParams.set("&landing_id=", landId) +
          wvParams.set("&offer_id=", wvParams.offerId) +
          wvParams.set("&page_type=", wvParams.pageType);
        // Ð—Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼ Ñ‚Ñ€ÐµÐºÐµÑ€ Ñ Ð¿ÐµÑ€ÐµÐ´Ð°Ñ‡ÐµÐ¹ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¾Ð²
        wvParams.tracker = wvPage.jsonp(
          "//webvkrd.com/js.php?" + wvParams.params
        );

        wvMetric.metricsHandler(function () {
          wvParams.params =
            wvParams.set("c_ym_uid=", wvCookie.get("_ym_uid")) +
            wvParams.set("&c_ga=", wvCookie.get("_ga")) +
            wvParams.set("&guid=", wvGuid.getGuid("guid")) +
            wvParams.set("&first_guid=", wvGuid.getGuid("first_guid"));
          wvPage.jsonp("//webvkrd.com/js.php?" + wvParams.params);
          wvGuid.setGuidsToCookie();
          wvGuid.setGuidsToInput();
        });

        wvForm.setParamsToInput();
        wvCookie.setParamsToCookie();
        if (wvParams.get("utm_source")) {
          wvCookie.set("c_uri", document.location, 1);
          wvCookie.set("c_referer", wvPage.getReferrer(), 1);
        }

        // Ð”Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ Ñƒ Ð¼Ð½Ð¾Ð³Ñ€Ð°Ñ‚Ñ€Ð°Ð½Ð¸Ñ‡Ð½Ñ‹Ñ… ÑÐ°Ð¹Ñ‚Ð¾Ð²
        wvLink.changeLinksByClassName([".wv_formpay", ".wv_params"]);
      }
      return wvParams;
    },
    getQuerySimbols: function (url) {
      return url.includes("?") ? "&" : "?";
    },
    getReferrer: function () {
      switch (wvParams.pageType) {
        case "prelanding":
          return wvPage.getRef();

        case "landing":
          var utmSource = wvParams.get("utm_source");
          var paramReferer = wvParams.get("referer");
          var cookieReferer = wvCookie.get("c_referer");
          var currentReferer = wvPage.getRef();

          if (paramReferer) {
            return paramReferer;
          }

          // ÐÐ° Ñ€ÐµÑ„ÐµÑ€Ð°Ð»ÐºÐµ Ð½ÑƒÐ¶Ð½Ð¾ Ð±Ñ€Ð°Ñ‚ÑŒ Ð²ÑÐµÐ³Ð´Ð° Ð½Ð¾Ð²Ñ‹Ð¹ Ñ€ÐµÑ„Ñ€ÐµÑ€ ÐµÑÐ»Ð¸ ÐµÑÑ‚ÑŒ Ð¿Ð¾Ñ‚Ð¾Ðº
          if (wvParams.offerId === "13" && utmSource) {
            return currentReferer;
          }

          if (wvParams.offerId === "13" && !utmSource && !!cookieReferer) {
            return currentReferer;
          }

          if (wvParams.offerId === "13" && !utmSource && cookieReferer) {
            return cookieReferer;
          }
          //-------------------------------------------------------------

          if (utmSource && !!cookieReferer) {
            return currentReferer;
          }

          if (utmSource && !currentReferer) {
            return cookieReferer;
          }

          if (cookieReferer) {
            return cookieReferer;
          }

          return currentReferer;

        case "success":
          return wvCookie.get("c_referer");
      }
    },
    getRef: function () {
      return document.referrer;
    },
    // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ Ð²Ñ‹Ð·Ð¾Ð²Ð°
    jsonp: function (url, callback) {
      if (!url) return null;
      var callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
      window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(scriptJSONP);
        callback(data);
      };

      var scriptJSONP = document.createElement("script");
      scriptJSONP.src =
        url + wvPage.getQuerySimbols(url) + "callback=" + callbackName;
      scriptJSONP.async = false;
      document.body.appendChild(scriptJSONP);
      return scriptJSONP;
    },
  };

  var wvModules = {
    mod: [
      {
        param: "testwv",
        path: "//webvork.com/js/modules/testlanding/wvtests.js",
      },
      {
        param: "cbwv",
        path: "//webvork.com/js/modules/comebacker/comeback.js",
      },
      {
        param: "fpwv",
        path: "//webvork.com/js/modules/fakepay/fakepay.js",
      },
      // {
      //   path: '//webvork.com/js/modules/phonemask/wvmask.js',
      // },
      // {
      //     path: '//webvork.com/js/modules/validation/wvvalid.js',
      // },
    ],
    // Ð—Ð°Ð¿ÑƒÑÐº Ð¼Ð¾Ð´ÑƒÐ»ÐµÐ¹
    init: function () {
      return this.mod.map(function (el) {
        // Ð’ÐºÐ»ÑŽÑ‡Ð°ÐµÐ¼ Ð¼Ð¾Ð´ÑƒÐ»ÑŒ ÐµÑÐ»Ð¸ ÐµÑÑ‚ÑŒ ÐºÑƒÐºÐ° Ð¸Ð»Ð¸ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€
        if (el.param) {
          if (wvParams.isExist(el.param)) {
            return wvModules.appendModule(el.path);
          } else {
            return "";
          }
        }
      });
    },
    // Ð”Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¼Ð¾Ð´ÑƒÐ»Ñ Ð² Ð´Ð¾Ð¼
    appendModule: function (modulePath) {
      var module = document.createElement("script");
      module.type = "text/javascript";
      module.src = modulePath;
      document.body.appendChild(module);
    },
  };

  // Ð£ÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÐ¼ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹
  wvParams.offerId = wvDOM.getAttributeElement(
    wvParams.getHtmlData(),
    "data-offer_id"
  );
  wvParams.pageType = wvDOM.getAttributeElement(
    wvParams.getHtmlData(),
    "data-page_type"
  );

  // Ð¡Ñ‚Ð°Ð²Ð¸Ð¼ ÑÑ‡ÐµÑ‚Ñ‡Ð¸ÐºÐ¸ Ð²ÐµÐ±Ð¼Ð°ÑÑ‚ÐµÑ€Ð°
  wvMetric.set(
    wvPageData.ym,
    wvPageData.ga,
    wvPageData.gtag,
    wvPageData.fb,
    wvPageData.fb2,
    wvPageData.tt,
    wvPageData.allTiktok,
    wvParams.pageType
  );
  wvCookie.set("c_referer", wvPage.getReferrer(), 1);

  // Ð—Ð°Ð¿Ð¾Ð»Ð½ÑÐµÐ¼ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹
  wvPage.init();

  // ÐŸÐ¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð¼Ð¾Ð´ÑƒÐ»ÐµÐ¹ Ñ‡ÐµÑ€ÐµÐ· Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹
  wvModules.init();

  // ÐŸÐ¾Ð´ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ ÐºÐ¾Ð´ Ð½Ð¾Ð¼ÐµÑ€Ð° Ñ‚ÐµÐ»ÐµÑ„Ð¾Ð½Ð° Ð¸ placeholder
  wvPhone.addPhoneCode();
  wvPhone.setPlaceholders();

  // Ð’Ð°Ð»Ð¸Ð´Ð¸Ñ€ÑƒÐµÐ¼ Ð¸Ð¼Ñ Ð´Ð»Ñ Ð§Ð¸Ð»Ð¸Ð¹ÑÐºÐ¸Ñ… Ð»ÐµÐ½Ð´Ð¸Ð½Ð³Ð¾Ð²
  wvName.init();

  // Ð˜Ð·Ð¼ÐµÐ½ÑÐµÐ¼ Ð²Ñ€ÐµÐ¼Ñ ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð¾Ð²Ð°Ð½Ð¸Ñ cookies
  setTimeout(function () {
    wvCookie.updateExpireDate();
  }, 1600);

  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = {
      wvDOM,
      wvParams,
      wvCookie,
      wvMetric,
      wvForm,
      wvLink,
      wvGuid,
      wvPhone,
      wvName,
      wvPage,
      wvModules,
      wvPageData,
    };
  }
})();
