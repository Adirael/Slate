// import date.js
(function(){function c(d,b,e){var a=c.resolve(d);if(null==a)throw e=e||d,b=b||"root",a=Error('Failed to require "'+e+'" from "'+b+'"'),a.path=e,a.parent=b,a.require=!0,a;b=c.modules[a];b._resolving||b.exports||(e={exports:{}},e.client=e.component=!0,b._resolving=!0,b.call(this,e.exports,c.relative(a),e),delete b._resolving,b.exports=e.exports);return b.exports}c.modules={};c.aliases={};c.resolve=function(d){"/"===d.charAt(0)&&(d=d.slice(1));for(var b=[d,d+".js",d+".json",d+"/index.js",d+"/index.json"],
e=0;e<b.length;e++){d=b[e];if(c.modules.hasOwnProperty(d))return d;if(c.aliases.hasOwnProperty(d))return c.aliases[d]}};c.normalize=function(d,b){var c=[];if("."!=b.charAt(0))return b;d=d.split("/");b=b.split("/");for(var a=0;a<b.length;++a)".."==b[a]?d.pop():"."!=b[a]&&""!=b[a]&&c.push(b[a]);return d.concat(c).join("/")};c.register=function(d,b){c.modules[d]=b};c.alias=function(d,b){if(!c.modules.hasOwnProperty(d))throw Error('Failed to alias "'+d+'", it does not exist');c.aliases[b]=d};c.relative=
function(d){function b(a){var e=b.resolve(a);return c(e,d,a)}var e=c.normalize(d,"..");b.resolve=function(a){var b=a.charAt(0);if("/"==b)return a.slice(1);if("."==b)return c.normalize(e,a);var b=d.split("/"),f;a:{for(f=b.length;f--;)if("deps"===b[f])break a;f=-1}(f+=1)||(f=0);return a=b.slice(0,f+1).join("/")+"/deps/"+a};b.exists=function(a){return c.modules.hasOwnProperty(b.resolve(a))};return b};c.register("visionmedia-debug/index.js",function(d,b,c){c.exports="undefined"==typeof window?b("./lib/debug"):
b("./debug")});c.register("visionmedia-debug/debug.js",function(c,b,e){function a(f){return a.enabled(f)?function(b){b instanceof Error&&(b=b.stack||b.message);var c=new Date,d=c-(a[f]||c);a[f]=c;b=f+" "+b+" +"+a.humanize(d);window.console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}:function(){}}e.exports=a;a.names=[];a.skips=[];a.enable=function(f){try{localStorage.debug=f}catch(b){}for(var c=(f||"").split(/[\s,]+/),d=c.length,e=0;e<d;e++)f=c[e].replace("*",".*?"),
"-"===f[0]?a.skips.push(RegExp("^"+f.substr(1)+"$")):a.names.push(RegExp("^"+f+"$"))};a.disable=function(){a.enable("")};a.humanize=function(a){return 36E5<=a?(a/36E5).toFixed(1)+"h":6E4<=a?(a/6E4).toFixed(1)+"m":1E3<=a?(a/1E3|0)+"s":a+"ms"};a.enabled=function(f){for(var b=0,c=a.skips.length;b<c;b++)if(a.skips[b].test(f))return!1;b=0;for(c=a.names.length;b<c;b++)if(a.names[b].test(f))return!0;return!1};try{window.localStorage&&a.enable(localStorage.debug)}catch(g){}});c.register("date/index.js",function(c,
b,e){e.exports=b("./lib/parser")});c.register("date/lib/date.js",function(c,b,e){function a(b){if(!(this instanceof a))return new a(b);this._changed={};this.date=new Date(b)}b("debug")("date:date");e.exports=a;a.prototype.clone=function(){return new Date(this.date)};a.prototype.changed=function(a){return void 0===this._changed[a]?!1:this._changed[a]};a.prototype.second=function(a){this.update(1E3*+a);this._changed.seconds=!0;return this};a.prototype.minute=function(a){this.update(6E4*+a);this._changed.minutes=
!0;return this};a.prototype.hour=function(a){this.update(36E5*+a);this._changed.hours=!0;return this};a.prototype.day=function(a){this.update(864E5*+a);this._changed.days=!0;return this};a.prototype.week=function(a){this.update(6048E5*+a);this._changed.weeks=!0;return this};a.prototype.month=function(a){var b=this.date,c=b.getDate();b.setDate(1);a=+a+b.getMonth();b.setMonth(a);a=this.daysInMonth(a);b.setDate(Math.min(a,c));return this};a.prototype.daysInMonth=function(a){var b=this.date.getFullYear();
return 1==a&&(0===b%4&&0!==b%100||0===b%400)?29:28};a.prototype.year=function(a){var b=this.date.getFullYear();this.date.setFullYear(b+ +a);this._changed.years=!0;return this};a.prototype.time=function(a,b,c,d){!1===a?a=this.date.getHours():(a=+a||0,this._changed.hours=a);!1===b?b=this.date.getMinutes():(b=+b||0,this._changed.minutes=b);!1===c?c=this.date.getSeconds():(c=+c||0,this._changed.seconds=c);this.date.setHours(a,b,c);return this};var g="sunday monday tuesday wednesday thursday friday saturday".split(" ");
g.forEach(function(b,c){a.prototype[g[c]]=function(a){this._changed.days=!0;this.updateDay(c,a)}});a.prototype.updateDay=function(a,b){b=+(b||1);var c=(a-this.date.getDay()+7)%7;0<b&&--b;this.update(864E5*(c+7*b));return this};a.prototype.update=function(a){this.date=new Date(this.date.getTime()+a);return this}});c.register("date/lib/parser.js",function(c,b,e){function a(h,b){if(!(this instanceof a))return new a(h,b);"string"==typeof b&&(b=a(b));var c=b||new Date;this.date=new g(c);this.original=
h;this.str=h.toLowerCase();this.stash=[];for(this.tokens=[];"eos"!==this.advance(););f("tokens %j",this.tokens);this.nextTime(c);if(this.date.date==c)throw Error("Invalid date");return this.date.date}var g=b("./date"),f=b("debug")("date:parser"),m="january february march april may june july august september october november december".split(" "),n=/^(\d{1,2})([:.](\d{1,2}))?([:.](\d{1,2}))?\s*([ap]m)/,p=/^(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?/,q=/^at\s?(\d{1,2})$/,k=/\b(sun(day)?|mon(day)?|tues(day)?|wed(nesday)?|thur(sday|s)?|fri(day)?|sat(urday)?)s?\b/,
r=/^((\d{1,2})(st|nd|rd|th))\sof\s(january|february|march|april|may|june|july|august|september|october|november|december)/,s=/\b(last|yesterday|ago)\b/,l=/\b(morning|noon|afternoon|night|evening|midnight)\b/,t=/^(\d*)\s?\b(second|minute|hour|day|week|month|year)[s]?\b\s?ago$/;e.exports=a;a.prototype.advance=function(){var a=this.eos()||this.space()||this._next()||this.last()||this.dayByName()||this.monthByName()||this.timeAgo()||this.ago()||this.yesterday()||this.tomorrow()||this.noon()||this.midnight()||
this.night()||this.evening()||this.afternoon()||this.morning()||this.tonight()||this.meridiem()||this.hourminute()||this.athour()||this.week()||this.month()||this.year()||this.second()||this.minute()||this.hour()||this.day()||this.number()||this.string()||this.other();this.tokens.push(a);return a};a.prototype.lookahead=function(a){var b=a-this.stash.length;if(0==b)return this.lookahead(++a);for(;0<b--;)this.stash.push(this.advance());return this.stash[--a]};a.prototype.peek=function(){return this.lookahead(1)};
a.prototype.next=function(){return this.stashed()||this.advance()};a.prototype.stashed=function(){return this.stash.shift()};a.prototype.skip=function(a){this.str=this.str.substr(Array.isArray(a)?a[0].length:a)};a.prototype.eos=function(){if(!this.str.length)return"eos"};a.prototype.space=function(){var a;if(a=/^([ \t]+)/.exec(this.str))return this.skip(a),this.advance()};a.prototype.second=function(){var a;if(a=/^s(ec|econd)?s?/.exec(this.str))return this.skip(a),"second"};a.prototype.minute=function(){var a;
if(a=/^m(in|inute)?s?/.exec(this.str))return this.skip(a),"minute"};a.prototype.hour=function(){var a;if(a=/^h(r|our)s?/.exec(this.str))return this.skip(a),"hour"};a.prototype.day=function(){var a;if(a=/^d(ay)?s?/.exec(this.str))return this.skip(a),"day"};a.prototype.dayByName=function(){var a;if(a=RegExp("^"+k.source).exec(this.str)){var b=a[1];this.skip(a);this.date[b](1);return a[1]}};a.prototype.monthByName=function(){var a;if(a=r.exec(this.str)){var b=a[2];this.date.date.setMonth(m.indexOf(a[4]));
b&&this.date.date.setDate(parseInt(b)-1);this.skip(a);return a[0]}};a.prototype.timeAgo=function(){var a;if(a=t.exec(this.str))return this.date[a[2]](-a[1]),this.skip(a),"timeAgo"};a.prototype.week=function(){var a;if(a=/^w(k|eek)s?/.exec(this.str))return this.skip(a),"week"};a.prototype.month=function(){var a;if(a=/^mon(th)?(es|s)?\b/.exec(this.str))return this.skip(a),"month"};a.prototype.year=function(){var a;if(a=/^y(r|ear)s?/.exec(this.str))return this.skip(a),"year"};a.prototype.meridiem=function(){var a;
if(a=n.exec(this.str))return this.skip(a),this.time(a[1],a[3],a[5],a[6]),"meridiem"};a.prototype.hourminute=function(){var a;if(a=p.exec(this.str))return this.skip(a),this.time(a[1],a[3],a[5]),"hourminute"};a.prototype.athour=function(){var a;if(a=q.exec(this.str))return this.skip(a),this.time(a[1],0,0,this._meridiem),this._meridiem=null,"athour"};a.prototype.time=function(a,b,c,d){var e=this.date;e.clone();d&&(a="pm"==d&&12>a?+a+12:a,a="am"==d&&12==a?0:a);b=!b&&e.changed("minutes")?!1:b;c=!c&&e.changed("seconds")?
!1:c;e.time(a,b,c)};a.prototype.nextTime=function(a){var b=this.date,c=this.original;if(a<=b.date||s.test(c))return this;k.test(c)?b.day(7):60<(a-b.date)/1E3&&b.day(1);return this};a.prototype.yesterday=function(){var a;if(a=/^(yes(terday)?)/.exec(this.str))return this.skip(a),this.date.day(-1),"yesterday"};a.prototype.tomorrow=function(){var a;if(a=/^tom(orrow)?/.exec(this.str))return this.skip(a),this.date.day(1),"tomorrow"};a.prototype.noon=function(){var a;if(a=/^noon\b/.exec(this.str))return this.skip(a),
this.date.clone(),this.date.date.setHours(12,0,0),"noon"};a.prototype.midnight=function(){var a;if(a=/^midnight\b/.exec(this.str))return this.skip(a),this.date.clone(),this.date.date.setHours(0,0,0),"midnight"};a.prototype.night=function(){var a;if(a=/^night\b/.exec(this.str))return this.skip(a),this._meridiem="pm",this.date.clone(),this.date.date.setHours(19,0,0),"night"};a.prototype.evening=function(){var a;if(a=/^evening\b/.exec(this.str))return this.skip(a),this._meridiem="pm",this.date.clone(),
this.date.date.setHours(17,0,0),"evening"};a.prototype.afternoon=function(){var a;if(a=/^afternoon\b/.exec(this.str)){this.skip(a);this._meridiem="pm";this.date.clone();if(this.date.changed("hours"))return"afternoon";this.date.date.setHours(14,0,0);return"afternoon"}};a.prototype.morning=function(){var a;if(a=/^morning\b/.exec(this.str))return this.skip(a),this._meridiem="am",this.date.clone(),this.date.changed("hours")||this.date.date.setHours(8,0,0),"morning"};a.prototype.tonight=function(){var a;
if(a=/^tonight\b/.exec(this.str))return this.skip(a),this._meridiem="pm","tonight"};a.prototype._next=function(){var a;if(a=/^next/.exec(this.str)){this.skip(a);a=new Date(this.date.date);var b=this.peek();this.date[b]?(this.next(),this.date=g(a),this.date[b](1)):l.test(b)&&this.date.day(1);return"next"}};a.prototype.last=function(){var a;if(a=/^last/.exec(this.str)){this.skip(a);a=new Date(this.date.date);var b=this.peek();this.date[b]?(this.next(),this.date=g(a),this.date[b](-1)):l.test(b)&&this.date.day(-1);
return"last"}};a.prototype.ago=function(){var a;if(a=/^ago\b/.exec(this.str))return this.skip(a),"ago"};a.prototype.number=function(){var a;if(a=/^(\d+)/.exec(this.str)){var b=a[1];this.skip(a);a=this.peek();this.date[a]?("ago"==this.peek()&&(b=-b),this.date[a](b)):this._meridiem?(this.time(b,0,0,this._meridiem),this._meridiem=null):-1<this.original.indexOf("at")&&(this.time(b,0,0,this._meridiem),this._meridiem=null);return"number"}};a.prototype.string=function(){var a;if(a=/^\w+/.exec(this.str))return this.skip(a),
"string"};a.prototype.other=function(){var a;if(a=/^./.exec(this.str))return this.skip(a),"other"}});c.alias("visionmedia-debug/index.js","date/deps/debug/index.js");c.alias("visionmedia-debug/debug.js","date/deps/debug/debug.js");c.alias("visionmedia-debug/index.js","debug/index.js");c.alias("date/index.js","date/index.js");"object"==typeof exports?module.exports=c("date"):"function"==typeof define&&define.amd?define(function(){return c("date")}):this.date=c("date")})();

// Regexes
// 5, 05, 5:30, 5.30, 05:30:10, 05:30.10, 05.30.10, at 5
var rMeridiem = /(at)?\s?(\d{1,2})([:.](\d{1,2}))?([:.](\d{1,2}))?\s*([ap]m)/g;
var rHourMinute = /(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?/g;
var rAtHour = /(at|in)\s?(\d{1,2})/g;
var rDays = /(on)?\s?(sun(day)?|mon(day)?|tues(day)?|wed(nesday)?|thur(sday|s)?|fri(day)?|sat(urday)?)s?/g;
var rMonths = /((\d{1,2})(st|nd|rd|th))\sof\s(january|february|march|april|may|june|july|august|september|october|november|december)/;
var rDayMod = /(in the|this|at)?\s?(morning|noon|afternoon|night|evening|midnight)/;

// Set callback for the app ready event
Pebble.addEventListener("ready", function(e) {
  console.log("connect! " + e.ready);
  console.log(e.type);
});

// Set callback for appmessage events
Pebble.addEventListener("appmessage", function(e) {
  checkText(e.payload["0"]);
});

function checkText(text) {
  if (typeof text === 'string' && text.length > 0 && text.toLowerCase().indexOf('remind') > -1) {
    Pebble.sendAppMessage({
      "0": "Message Received!"
    });
    
    createReminderPin(text.toLowerCase());
  } else {
    Pebble.sendAppMessage({
      "0": "No Good. Try Again. :("
    });
  }
}

function createReminderPin(text) {
  text = text.replace(/remind (me )?(to |about )?/, '');
  
  var time;
  if (/\b(tomorrow|today|minute(s)?|hour(s)?|am|pm)\b/.test(text)) {
    time = date(text).toISOString();
  } else {
    Pebble.sendAppMessage({
      "0": "Could not find a reminder time. Please try again."
    });
    return;
  }
  var task = text.replace(rMeridiem, '');
  task = task.replace(rHourMinute, '');
  task = task.replace(rAtHour, '');
  task = task.replace(rDays, '');
  task = task.replace(rMonths, '');
  task = task.replace(rDayMod, '');
  task = task.replace(/\b(tomorrow|today|minute(s)?|hour(s)?)\b/g, '');
  task = task.replace(/\b(my)\b/g, 'your');
  
  console.log(task, time);
  var pin = {
    "id": "pin-" + time,
    "time": time,
    "layout": {
      "type": "genericPin",
      "title": task.trim(),
      "tinyIcon": "system://images/ALARM_CLOCK"
    },
    "createNotification": {
      "layout": {
        "type": "genericNotification",
        "title": "New Reminder!",
        "tinyIcon": "system://images/NOTIFICATION_FLAG",
        "body": "Your reminder has been saved."
      }
    },
    "reminders": [
      {
        "time": time,
        "layout": {
          "type": "genericReminder",
          "title": task,
          "tinyIcon": "system://images/ALARM_CLOCK"
        }
      }
    ]
  }
  
  sendPin(pin);
}

function sendPin(pin) {
  var API_URL_ROOT = 'https://timeline-api.getpebble.com/';
  var url = API_URL_ROOT + 'v1/user/pins/' + pin.id;
  
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    console.log('timeline: response received: ' + this.responseText);
    Pebble.sendAppMessage({
      "0": "Reminder Set!"
    });
  };
  xhr.onerror = function (e) {
    console.log(JSON.stringify(e));
  };
  xhr.open('PUT', url);
  
  Pebble.getTimelineToken(function (token) {
    console.log(token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-User-Token', '' + token);
    
    xhr.send(JSON.stringify(pin));
    console.log('Request sent!');
  }, function (error) { console.log("Timeline Token error:\n" + error); });
}