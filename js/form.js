/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/form.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  "use strict";

  window.addEventListener('DOMContentLoaded', formReady);

  function formReady() {
    var gdpr = document.getElementById('appt_gdpr_id');

    if (gdpr !== null) {
      gdpr.addEventListener('change', gdprCheck);
      gdprCheck.apply(gdpr);
    }

    var f = document.getElementById("srgdev-ncfp_frm");
    f.addEventListener("submit", formSubmit); // chrome bfcache

    setTimeout(function () {
      f.autocomplete = "on";
    }, 1000);
    makeDpu(f.getAttribute("data-pps"));
    document.getElementById("srgdev-ncfp_sel-dummy").addEventListener("click", selClick);
    setTimeout(function () {
      var b = document.getElementById("srgdev-ncfp_fbtn");
      var txt; // translations are done on the backend (bug???)

      if (b.hasAttribute("data-tr-ses-to")) {
        txt = b.getAttribute('data-tr-ses-to');
      } else {
        // Back-up ????
        txt = 'Session Timeout. Reload.';
      }

      b.disabled = true;
      b.textContent = txt;
    }, 900000);
  }

  function gdprCheck() {
    var btn = document.getElementById("srgdev-ncfp_fbtn");

    if (this.checked) {
      if (btn.hasAttribute('shade')) btn.removeAttribute('shade');
    } else {
      if (!btn.hasAttribute('shade')) btn.setAttribute('shade', "1");
    }

    if (this.hasAttribute("err")) {
      this.removeAttribute("err");
    }

    if (this.hasAttribute("required")) {
      this.removeAttribute("required");
    }
  }

  function clearFormErr() {
    this.setCustomValidity('');

    if (this.getAttribute('err')) {
      this.removeAttribute('err');
      this.removeEventListener("focus", clearFormErr, false);
    } else {
      this.removeEventListener("input", clearFormErr, false);
    }
  }

  function formSubmit(e) {
    var lee = 0;
    var el = document.getElementById("srgdev-ncfp_fbtn");

    if (el.disabled === true) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    el = document.getElementById("srgdev-ncfp_sel-hidden");
    var sdx = el.selectedIndex;
    var tzi;

    if (sdx === -1 || el.value === "") {
      el = document.getElementById("srgdev-ncfp_sel-dummy");
      el.setAttribute('err', 'err');
      el.addEventListener("focus", clearFormErr, false);
      lee = 1;
    } else {
      tzi = el.dataRef[sdx].tzi;
    }

    el = document.getElementById("srgdev-ncfp_talk_type");

    if (el !== null) {
      sdx = el.selectedIndex;

      if (sdx !== 1 && sdx !== 2) {
        el.setAttribute('err', 'err');
        el.addEventListener("focus", clearFormErr, false);
        lee = 1;
      }
    }

    el = document.getElementById("srgdev-ncfp_fname");

    if (el.value.length < 3) {
      el.setCustomValidity(t('appointments', 'Name is required.'));
      el.addEventListener("input", clearFormErr, false);
      lee = 1;
    }

    el = document.getElementById("srgdev-ncfp_femail");

    if (el.value.length < 5 || el.value.indexOf("@") === -1 || el.value.indexOf("@") > el.value.lastIndexOf(".")) {
      el.setCustomValidity(t('appointments', 'Email is required.'));
      el.addEventListener("input", clearFormErr, false);
      lee = 1;
    } // Phone field is optional
    // match [0-9], '.()-+,/' and ' ' (space) at least 9 digits


    el = document.getElementById("srgdev-ncfp_fphone");

    if (el !== null && (el.value === '' || el.value.length < 9 || /^[0-9 .()\-+,/]*$/.test(el.value) === false)) {
      el.setCustomValidity(t('appointments', 'Phone number is required.'));
      el.addEventListener("input", clearFormErr, false);
      lee = 1;
    } //Check for custom inputs


    var elms = document.getElementById('srgdev-ncfp-main-inputs').children;

    for (var i = 0, elm, l = elms.length; i < l; i++) {
      elm = elms[i];

      if (elm.hasAttribute('data-more')) {
        if (elm.tagName === 'INPUT' || elm.tagName === 'TEXTAREA') {
          var cv = elm.value.trim();

          if (elm.getAttribute('data-more') === 'r1' && cv === '') {
            elm.setCustomValidity(t('appointments', 'Required.'));
            elm.addEventListener("input", clearFormErr, false);
            lee = 1;
          } else if (elm.hasAttribute('type') && elm.getAttribute('type') === 'number' && isNaN(cv)) {
            elm.setCustomValidity(t('appointments', 'Number required.'));
            elm.addEventListener("input", clearFormErr, false);
            lee = 1;
          }
        }
      }
    }

    el = document.getElementById('appt_gdpr_id');

    if (el !== null && el.checked === false) {
      el.setAttribute("err", "err");
      el.setAttribute("required", "1");
      lee = 1;
    }

    if (lee !== 0) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    document.getElementById("srgdev-ncfp_fbtn-spinner").style.display = "inline-block";
    el = document.createElement("input");
    el.type = "hidden";
    el.name = "tzi";
    el.value = tzi;
    this.appendChild(el);
  }

  function selClick(e) {
    var elm = document.getElementById("srgdev-dpu_main-cont");

    if (elm.getAttribute("data-open") === null) {
      elm.setAttribute("data-open", '');
    } else {
      elm.removeAttribute("data-open");
    }

    e.preventDefault();
    return false;
  }

  function dateClick(e) {
    var n = this.id.slice(13);
    var c = this.parentElement.curActive;
    if (c === n) return;
    document.getElementById('srgdev-dpu_dc' + c).removeAttribute('data-active');
    document.getElementById('srgdev-dpu_dc' + n).setAttribute('data-active', '');
    this.parentElement.curActive = n;
    if (n.slice(-1) === 'e') n = 'e';
    if (c.slice(-1) === 'e') c = 'e';
    document.getElementById('srgdev-dpu_tc' + c).removeAttribute('data-active');
    document.getElementById('srgdev-dpu_tc' + n).setAttribute('data-active', '');
    e.stopPropagation();
  }

  function timeClick(e) {
    var t = e.target;

    if (t.parentElement.dpuClickID !== undefined) {
      t = t.parentElement;
    }

    if (t.dpuClickID !== undefined) {
      document.getElementById('srgdev-ncfp_sel-dummy').value = t.parentElement.getAttribute('data-dm') + ' - ' + t.timeAt;
      var elm = document.getElementById('srgdev-ncfp_sel-hidden');
      elm.selectedIndex = t.dpuClickID;
      elm.value = elm.dataRef[t.dpuClickID].d;
      var dur = elm.dataRef[t.dpuClickID].dur;
      elm = document.getElementById('srgdev-ncfp_dur-cont');

      if (dur === null || dur.length === 1) {
        elm.style.display = 'none';
      } else {
        var opts = elm.lastElementChild.children;
        var tr = window.t('appointments', 'Minutes');
        opts[0].textContent = dur[0] + " " + tr;

        for (var o, i = 1, l = Math.max(opts.length, dur.length); i < l; i++) {
          if (i >= opts.length) {
            // create
            o = document.createElement('option');
            o.className = 'srgdev-ncfp-form-option';
            o.appendChild(document.createTextNode(''));
            elm.lastElementChild.appendChild(o);
          } else {
            o = opts[i];

            if (i >= dur.length) {
              o.style.display = 'none';
              continue;
            }
          }

          o.style.display = 'block';
          o.value = i;
          o.textContent = dur[i] + " " + tr;
        }

        elm.style.display = 'block';
      }

      elm.lastElementChild.value = 0;
      document.getElementById("srgdev-dpu_main-cont").removeAttribute("data-open");
    }
  }

  function prevNextDPU(e) {
    var p; // e.target===undefined when we do initial "scroll" @see makeDpu()

    if (e.target !== undefined) {
      p = e.target.parentElement;

      if (e.target.id === "srgdev-dpu_bf-back") {
        if (p.curDP > 0) p.curDP--;
      } else {
        if (p.curDP < p.maxDP) p.curDP++;

        if (p.curDP === p.maxDP) {
          e.target.setAttribute('disabled', '');
        } else {
          e.target.removeAttribute('disabled');
        }
      }
    } else {
      p = e;
    }

    if (p.curDP === 0) {
      p.firstElementChild.setAttribute('disabled', '');
    } else {
      p.firstElementChild.removeAttribute('disabled');
    }

    if (p.curDP === p.maxDP) {
      p.lastElementChild.setAttribute('disabled', '');
    } else {
      p.lastElementChild.removeAttribute('disabled');
    } // TODO: find first not empty and select it ?


    document.getElementById("srgdev-dpu_main-date").style.left = "-" + p.curDP * 5 * 4.6 + "em";
  }

  function addSwipe(cont, bfc) {
    cont.touchInfo = {
      x: 0,
      y: 0,
      id: -1
    };
    cont.bfNav = bfc;
    cont.addEventListener("touchstart", swipeStart);
    cont.addEventListener("touchend", swipeEnd);
  }
  /** @param {TouchEvent} e */


  function swipeStart(e) {
    if (e.changedTouches !== undefined && e.changedTouches.length > 0) {
      var cc = e.changedTouches[0];
      var ti = this.touchInfo;
      ti.x = cc.clientX;
      ti.y = cc.clientY;
      ti.id = cc.identifier;
    }
  }
  /** @param {TouchEvent} e */


  function swipeEnd(e) {
    if (e.changedTouches !== undefined && e.changedTouches.length > 0) {
      var cc = e.changedTouches[0];
      var ti = this.touchInfo;

      if (cc.identifier === ti.id) {
        var dx = cc.clientX - ti.x | 0;
        var dy = cc.clientY - ti.y | 0;

        var _t = dx >> 31;

        var dx_abc = dx + _t ^ _t;
        _t = dy >> 31;

        if (dx_abc > (dy + _t ^ _t) && dx_abc > 50) {
          if (dx < 0) {
            // swipe left - push next
            this.bfNav.lastElementChild.click();
          } else {
            // swipe right - push prev
            this.bfNav.firstElementChild.click();
          }
        }
      }

      ti.id = -1;
    }
  }

  function makeDpu(pps) {
    var PPS_NWEEKS = "nbrWeeks";
    var PPS_EMPTY = "showEmpty";
    var PPS_FNED = "startFNED";
    var PPS_WEEKEND = "showWeekends";
    var PPS_SHOWTZ = "showTZ";
    var PPS_TIME2 = "time2Cols";
    var PPS_END_TIME = "endTime";
    var pso = {};
    var ta = pps.split('.');

    for (var a, _l = ta.length, i = 0; i < _l; i++) {
      a = ta[i].split(':');
      pso[a[0]] = +a[1];
    }

    var min_days = 7 * pso[PPS_NWEEKS];
    var s = document.getElementById('srgdev-ncfp_sel-hidden');

    if (s.getAttribute("data-state") !== '2') {
      console.log("data-state: ", s.getAttribute("data-state"));
      return;
    } // There is a problem with js translations without Vue, so just get it from PHP for now


    var dpuTrHdr = s.getAttribute("data-hdr");
    var dpuTrBack = s.getAttribute("data-tr-back");
    var dpuTrNext = s.getAttribute("data-tr-next");
    var dpuTrNA = s.getAttribute("data-tr-not-available");
    var mn;
    var dn;

    if (window.monthNames !== undefined) {
      mn = window.monthNames;
    } else {
      mn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }

    if (window.dayNames !== undefined) {
      dn = window.dayNames;
    } else {
      dn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }

    var has_intl = window.Intl && _typeof(window.Intl) === "object";
    var lang = document.documentElement.lang;
    var tf;

    if (has_intl) {
      var f = new Intl.DateTimeFormat([lang], {
        hour: "numeric",
        minute: "2-digit"
      });
      tf = f.format;
    } else {
      tf = function tf(d) {
        return d.toLocaleTimeString();
      };
    }

    var tfz;

    if (has_intl) {
      var _f = new Intl.DateTimeFormat([lang], {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short"
      });

      tfz = _f.format;
    } else {
      tfz = function tfz(d) {
        return d.toLocaleTimeString();
      };
    }

    var df;

    if (has_intl) {
      var _f2 = new Intl.DateTimeFormat([lang], {
        month: "long"
      });

      df = _f2.format;
    } else {
      df = function df(d) {
        return mn[d.getMonth()];
      };
    }

    var wf;

    if (has_intl) {
      var _f3 = new Intl.DateTimeFormat([lang], {
        weekday: "short"
      });

      wf = _f3.format;
    } else {
      wf = function wf(d) {
        return dn[d.getDay()];
      };
    }

    var wft;

    if (has_intl) {
      var _f4 = new Intl.DateTimeFormat([lang], {
        weekday: "short",
        month: "long",
        day: "2-digit"
      });

      wft = _f4.format;
    } else {
      wft = function wft(d) {
        return d.toDateString();
      };
    }

    var wff;

    if (has_intl) {
      var _f5 = new Intl.DateTimeFormat([lang], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });

      wff = _f5.format;
    } else {
      wff = function wff(d) {
        return d.toLocaleDateString();
      };
    }

    var dta = [];
    var tzn = undefined;

    if (has_intl) {
      try {
        tzn = Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (e) {
        console.log("no Intl timeZone ", e);
      }

      if (typeof tzn !== "string") tzn = undefined;
    }

    for (var md = new Date(), tzo, tzi, _t2, tStr, atStr, sp, sp2, dur, dur_idx, ts, endTime = pso[PPS_END_TIME], showTZ = pso[PPS_SHOWTZ], ia = s.getAttribute("data-info").split(','), _l2 = ia.length, _i = 0, ds; _i < _l2; _i++) {
      //TODO: remove 'U' from ds
      ds = ia[_i];
      sp = ds.indexOf(":", 8);
      md.setTime(+ds.substr(1, sp - 1) * 1000);
      tzo = md.getTimezoneOffset();
      _t2 = ds.charAt(0);

      if (showTZ === 0) {
        tStr = atStr = tf(md);
      } else {
        tStr = atStr = tfz(md);

        if (endTime === 1) {
          tStr = tf(md); // no tz override
        }
      }

      ts = md.getTime(); // dur_idx=""

      dur = null;

      if (endTime === 1 || _t2 === 'T') {
        sp2 = sp + 1; // sp must be the pos of the last used ':'

        sp = ds.indexOf(":", sp2);

        if (_t2 === "T") {
          dur = ds.substr(sp2, sp - sp2).split(';').map(function (n) {
            return n | 0;
          });
        }

        if (endTime === 1 && dur !== null && dur.length < 2) {
          if (_t2 === "T") {
            // console.log("dur",dur)
            md.setTime(ts + dur[0] * 60000);
          } else {
            // sp2 is end time
            sp2 = +ds.substr(sp2, sp - sp2) * 1000;
            md.setTime(ts + (sp2 - ts));
          }

          if (showTZ === 0) {
            tStr += ' - ' + tf(md);
          } else {
            tStr += ' - ' + tfz(md);
          }
        }
      }

      if (tzn !== undefined) {
        tzi = _t2 + tzn;
      } else {
        // fallback, needs to be done for every date because of daylight savings
        var ao = Math.abs(tzo);
        var h = Math.floor(ao / 60);
        var m = ao - h * 60; // offset sign is reversed https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset

        tzi = _t2 + (tzo > 0 ? '-' : '+') + (h < 10 ? '0' + h : h) + (m < 10 ? '0' + m : m);
      }

      sp++;
      sp2 = ds.indexOf(":", sp);
      dta[_i] = {
        rts: ts,
        d: ds.substr(sp, sp2 - sp),
        t: ds.substr(sp2 + 2),
        // +2 is for ":_"
        dur: dur,
        tzi: tzi,
        time: tStr,
        timeAt: atStr
      };
    }

    dta.sort(function (a, b) {
      return a.rts > b.rts ? 1 : -1;
    });
    dta.push({
      rts: 0,
      d: "",
      t: "",
      tzi: "",
      time: ""
    }); //last option to finalize the loop
    // console.log(dta)

    s.dataRef = dta;
    var l = dta.length;
    var cont = document.createElement('div');
    cont.id = "srgdev-dpu_main-cont";
    cont.className = "srgdev-dpu-bkr-cls";
    var lcd = document.createElement('div');
    lcd.id = "srgdev-dpu_main-header";
    lcd.appendChild(document.createTextNode(dpuTrHdr));
    var lcdBF = document.createElement('div');
    lcdBF.id = "srgdev-dpu_main-hdr-icon";
    lcdBF.className = "icon-close";
    lcdBF.addEventListener('click', function () {
      document.getElementById("srgdev-dpu_main-cont").removeAttribute("data-open");
    });
    lcd.appendChild(lcdBF);
    cont.appendChild(lcd);
    lcdBF = document.createElement('div');
    lcdBF.maxDP = 0;
    lcdBF.curDP = 0;
    lcdBF.id = "srgdev-dpu_bf-cont";
    lcdBF.appendChild(document.createElement("span"));
    lcdBF.appendChild(document.createElement("span"));
    lcdBF.firstElementChild.id = "srgdev-dpu_bf-back";
    lcdBF.firstElementChild.appendChild(document.createTextNode(dpuTrBack));
    lcdBF.firstElementChild.addEventListener("click", prevNextDPU);
    lcdBF.firstElementChild.setAttribute('disabled', '');
    lcdBF.lastElementChild.id = "srgdev-dpu_bf-next";
    lcdBF.lastElementChild.appendChild(document.createTextNode(dpuTrNext));
    lcdBF.lastElementChild.addEventListener("click", prevNextDPU);
    cont.appendChild(lcdBF);
    lcd = document.createElement('div');
    lcd.id = "srgdev-dpu_main-date";
    lcd.className = "srgdev-dpu-bkr-cls";
    lcd.style.left = "0em";
    addSwipe(lcd, lcdBF);
    cont.appendChild(lcd);
    var lcTime = document.createElement('div');
    lcTime.id = "srgdev-dpu_main-time";
    cont.appendChild(lcTime);
    var lcc = 0;
    var rccN = 5;
    var d = new Date();
    var lastUD = -1;
    var an = -1;
    var do_break = false;

    var makeDateCont = function makeDateCont(d, is_empty) {
      var e1 = document.createElement("div");
      e1.id = "srgdev-dpu_dc" + lcc + (is_empty ? "e" : "");
      e1.className = 'srgdev-dpu-date-cont' + (is_empty ? " srgdev-dpu-dc-empty" : "");
      var e2 = document.createElement('span');
      e2.className = d.getDay() !== 0 ? 'srgdev-dpu-date-wd' : 'srgdev-dpu-date-wd srgdev-dpu-date-wd-sunday';
      e2.appendChild(document.createTextNode(wf(d)));
      e1.appendChild(e2);
      e2 = document.createElement('span');
      e2.className = 'srgdev-dpu-date-dn';
      e2.appendChild(document.createTextNode(d.getDate()));
      e1.appendChild(e2);
      e2 = document.createElement('span');
      e2.className = 'srgdev-dpu-date-md';
      e2.appendChild(document.createTextNode(df(d)));
      e1.appendChild(e2);
      e1.addEventListener('click', dateClick);

      if (lcc === rccN) {
        rccN += 5;
        lcdBF.maxDP++;
        if (lcc > min_days) do_break = true;
      }

      ++lcc;
      return e1;
    };

    var td = new Date();
    td.setSeconds(1);
    td.setMinutes(0);
    td.setHours(0);

    if (pso[PPS_EMPTY] === 1 && pso[PPS_FNED] === 0) {
      // Need to prepend empty days so the week start on Monday
      var _ts = dta[0].rts;
      d.setTime(_ts);
      d.setSeconds(1);
      d.setMinutes(0);
      d.setHours(0);
      var fd = d.getDay();

      if (fd > 0 && fd < 6) {
        td.setTime(d.getTime() - 86400000 * (fd - 1));
      }
    }

    var tu_class; // Time columns

    if (pso[PPS_TIME2] === 0 || pso[PPS_END_TIME] === 1) {
      tu_class = 'srgdev-dpu-time-unit' + (pso[PPS_END_TIME] === 1 ? "_tn" : "");
    } else {
      tu_class = 'srgdev-dpu-time-unit2';
    }

    for (var tl, _ts2, _ti, ets, tts, _te, pe, dto, _i2 = 0; _i2 < l; _i2++) {
      dto = dta[_i2];
      _ts2 = dto.rts;
      if (_ts2 === 0) break;
      d.setTime(_ts2);
      var ud = d.getDate();

      if (lastUD !== ud) {
        // if(do_break) break
        // Show "empty" days ...
        tts = td.getTime();
        td.setTime(d.getTime());
        td.setSeconds(1);
        td.setMinutes(0);
        td.setHours(0);
        ets = td.getTime();

        if (pso[PPS_EMPTY] === 1) {
          while (tts < ets) {
            td.setTime(tts); // Deal with weekends

            if (pso[PPS_WEEKEND] === 0) {
              // only show weekdays
              _ti = td.getDay();
            } else {
              // show all days
              _ti = 1;
            }

            if (_ti !== 0 && _ti !== 6) {
              lcd.appendChild(makeDateCont(td, true));
              if (do_break) break;
            }

            tts += 86400000;
          }
        }

        if (do_break) {
          d = td;
          break;
        }

        td.setTime(tts + 86400000);
        _te = makeDateCont(d, false);

        if (an === -1) {
          an = lcc - 1;

          _te.setAttribute('data-active', '');
        }

        lcd.appendChild(_te);
        _te = document.createElement('div');
        _te.id = "srgdev-dpu_tc" + (lcc - 1);
        _te.className = 'srgdev-dpu-time-cont';
        pe = document.createElement('div');
        pe.className = "srgdev-dpu-tc-full-date";
        pe.appendChild(document.createTextNode(wff(d)));

        _te.appendChild(pe);

        pe = document.createElement('div');
        pe.setAttribute('data-dm', wft(d));
        pe.className = "srgdev-dpu-tc-tu-wrap";

        _te.appendChild(pe);

        lcTime.appendChild(_te);
        lastUD = ud;
      }

      _te = document.createElement("span");
      _te.className = tu_class;
      _te.dpuClickID = _i2;
      _te.timeAt = dto.timeAt; // te.appendChild(document.createTextNode(tf(d)))

      _te.appendChild(document.createTextNode(dto.time));

      if (dto.t !== "") {
        tl = document.createElement("span");
        tl.className = "srgdev-dpu-appt-title";
        tl.appendChild(document.createTextNode(dto.t));

        _te.appendChild(tl);
      }

      pe.appendChild(_te);
    } // fill in empty space


    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(1);
    d.setTime(d.getTime() + 86400000); // lcc%=5

    if (lcc % 5 > 0) {
      for (var _ti2, _l3 = 5 - lcc % 5, _i3 = 0; _i3 < _l3; _i3++) {
        _ti2 = d.getDay(); // Deal with weekends

        if (pso[PPS_WEEKEND] === 0) {
          // only show weekdays
          _ti2 = d.getDay();
        } else {
          // show all days
          _ti2 = 1;
        }

        if (_ti2 !== 0 && _ti2 !== 6) {
          lcd.appendChild(makeDateCont(d, true));
        } else {
          //skipping weekend
          _i3--;
        }

        d.setTime(d.getTime() + 86400000);
      }
    } // Make empty time cont


    var te = document.createElement('div');
    te.id = "srgdev-dpu_tce";
    te.className = 'srgdev-dpu-time-cont';
    te.appendChild(document.createTextNode(dpuTrNA));
    lcTime.appendChild(te);
    lcTime.firstElementChild.setAttribute('data-active', '');
    lcd.curActive = an.toString();
    cont.addEventListener("click", timeClick);
    document.getElementById('srgdev-ncfp_sel_cont').appendChild(cont); // let's make sure the correct date square is shown...
    // ... 5 is the number of available slots per pagination page

    var ti = Math.floor(an / 5);

    if (ti > 0) {
      lcdBF.curDP = ti;
      prevNextDPU(lcdBF);
    }
  }
})();

/***/ })

/******/ });
//# sourceMappingURL=form.js.map