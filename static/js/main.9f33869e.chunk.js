(window.webpackJsonppomodoro_v1=window.webpackJsonppomodoro_v1||[]).push([[0],{14:function(e,t,n){e.exports=n.p+"static/media/analog-watch.3fe4eb29.mp3"},15:function(e,t,n){e.exports=n.p+"static/media/school-bell.05ba0837.mp3"},16:function(e,t,n){e.exports=n.p+"static/media/ship-bell.be4257c1.mp3"},17:function(e,t,n){e.exports=n.p+"static/media/temple-bell.63544226.mp3"},20:function(e,t,n){e.exports=n(32)},25:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(18),s=n.n(r),i=(n(25),n(8)),l=n(19),c=n(1),m=n(2),u=n(4),p=n(3),h=n(5);function d(e){return a.a.createElement("div",null,a.a.createElement("h1",null,"My Tomato Timer"))}var g=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("button",{onClick:this.props.changeClock.bind(this,this.props.pomodoroTimeLengthSeconds,"pomodoro")},"Pomodoro"),a.a.createElement("button",{onClick:this.props.changeClock.bind(this,this.props.shortBreakTimeLengthSeconds,"short-break")},"Short Break"),a.a.createElement("button",{onClick:this.props.changeClock.bind(this,this.props.longBreakTimeLengthSeconds,"long-break")},"Long Break"))}}]),t}(o.Component),k=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).changeClock=function(e,t){n.props.passVarsUp(e,t),n.updateClockState(!1),n.resetClock()},n.updateClockState=function(e){n.setState({isRunning:e})},n.startClock=function(){n.state.isRunning||(n.props.startSeconds===n.state.secondsElapsed&&n.resetClock(),n.updateClockState(!0),n.timerID=setInterval(function(){return n.tick()},1e3))},n.stopClock=function(){n.updateClockState(!1),clearInterval(n.timerID)},n.resetClock=function(){n.stopClock(),n.changeTitle(!1),n.setState({secondsElapsed:0})},n.tick=function(){n.setState({secondsElapsed:n.state.secondsElapsed+1}),n.changeTitle(!0),n.state.secondsElapsed===n.props.startSeconds&&(n.stopClock(),n.props.finishTimer(n.props.timerType,n.props.startSeconds))},n.changeTitle=function(e){if(!1===e)document.title="Pomodoro";else{var t=n.formatSeconds(n.props.startSeconds-n.state.secondsElapsed);document.title="".concat("Pomodoro"," (").concat(t,")")}},n.skipToEnd=function(){n.setState({secondsElapsed:n.props.startSeconds-2},function(){n.state.isRunning||n.startClock()})},n.formatSeconds=function(e){var t=Math.floor(e/3600),n=Math.floor((e-3600*t)/60),o=e-3600*t-60*n;return t<10&&"00:"===(t="0".concat(t,":"))&&(t=""),n<10&&(n="0".concat(n)),o<10&&(o="0".concat(o)),"".concat(t).concat(n,":").concat(o)},n.state={isRunning:!1,secondsElapsed:0},n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(g,{changeClock:this.changeClock,pomodoroTimeLengthSeconds:this.props.pomodoroTimeLengthSeconds,shortBreakTimeLengthSeconds:this.props.shortBreakTimeLengthSeconds,longBreakTimeLengthSeconds:this.props.longBreakTimeLengthSeconds}),a.a.createElement("h2",null,"pomodoro"===this.props.timerType?"Pomodoro":"Break"," timer"),a.a.createElement("h2",{style:E},this.formatSeconds(this.props.startSeconds-this.state.secondsElapsed)),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.startClock},"Start"),a.a.createElement("button",{onClick:this.stopClock},"Stop"),a.a.createElement("button",{onClick:this.resetClock},"Reset")),a.a.createElement("button",{onClick:this.skipToEnd},"Skip to end of Timer"))}}]),t}(o.Component),E={display:"inline-block",padding:"1rem",border:"1px solid red"},f=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){for(var e=this,t=0,n=0,o=0;o<this.props.timeElements.length;o++)this.props.timeElements[o].isTomato?t++:n++;var r=this.props.timeElements.map(function(t){return a.a.createElement("div",{key:t.id,className:"time-element ".concat(t.isTomato?"tomato":"break")},a.a.createElement("button",{onClick:e.props.deleteElement.bind(e,t.id),href:"/",className:"rm-button"},"x"),a.a.createElement("div",null,a.a.createElement("p",null,t.minutes)))});return a.a.createElement("div",null,a.a.createElement("h2",null,"COMPLETED SEGMENTS"),a.a.createElement("p",null,"We have ",t," tomatoes completed"),a.a.createElement("p",null,"We have taken ",n," beaks"),a.a.createElement("button",{onClick:this.props.clearElementsCookie},"Clear Log"),a.a.createElement("div",{className:"time-elements-wrapper"},r))}}]),t}(o.Component),b=n(9);function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var v=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).onChange=function(e){var t,o=e.target.name;t=parseInt(e.target.value)?parseInt(e.target.value):e.target.value,n.setState(Object(i.a)({},o,t))},n.onSubmit=function(e){e.preventDefault(),n.props.updateSettings(n.state)},n.restoreDefaults=function(){n.setState(S({},n.props.defaultSettings),function(){n.props.clearSettingsCookie(),n.props.restoreCurrentClockCookie()})},n.state=S({},e.settings),n.onChange=n.onChange.bind(Object(b.a)(n)),n.onSubmit=n.onSubmit.bind(Object(b.a)(n)),n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.alarmSounds.map(function(e){return a.a.createElement("option",{key:e.id,value:e.url},e.name)});return a.a.createElement("div",null,a.a.createElement("h2",null,"SETTINGS"),a.a.createElement("form",{onSubmit:this.onSubmit,id:"settings"},a.a.createElement("p",null,a.a.createElement("strong",null,"Custom Timer Times")),a.a.createElement("div",null,a.a.createElement("p",null,"Pomodoro Time:"),a.a.createElement("input",{type:"number",name:"pomodoroTimeLengthMinutes",value:this.state.pomodoroTimeLengthMinutes,onChange:this.onChange}),a.a.createElement("p",null,"Short Break Time:"),a.a.createElement("input",{type:"number",name:"shortBreakTimeLengthMinutes",value:this.state.shortBreakTimeLengthMinutes,onChange:this.onChange}),a.a.createElement("p",null,"Long Break Time:"),a.a.createElement("input",{type:"number",name:"longBreakTimeLengthMinutes",value:this.state.longBreakTimeLengthMinutes,onChange:this.onChange})),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Sound Picker")),a.a.createElement("select",{name:"alarmSoundUrl",onChange:this.onChange,value:this.state.alarmSoundUrl},e),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Adjust Volume")),a.a.createElement("select",{name:"alarmVolumePercent",onChange:this.onChange,value:this.state.alarmVolumePercent},a.a.createElement("option",{value:"100"},"100%"),a.a.createElement("option",{value:"75"},"75%"),a.a.createElement("option",{value:"50"},"50%"),a.a.createElement("option",{value:"25"},"25%")),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Browser Notification")),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Auto Start Pomodoros and Breaks")),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Log View Pomodoros Only")),a.a.createElement("button",{type:"submit",value:"submit"},"Save Settings"),a.a.createElement("p",null,"---")),a.a.createElement("button",{onClick:this.restoreDefaults},"Restore Defaults"))}}]),t}(o.Component),O=n(7),T=n.n(O),y=n(14),j=n.n(y),L=n(15),w=n.n(L),B=n(16),P=n.n(B),D=n(17),M=n.n(D),x=n(10);n(31);function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var N=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).finishTimer=function(e,t){var o={isTomato:"pomodoro"===e,minutes:t/60,id:T()()};n.setState({timeElements:[].concat(Object(l.a)(n.state.timeElements),[o])},function(){n.setElementsCookie()}),document.getElementById("alarm-audio").play()},n.deleteElement=function(e){var t=n.state.timeElements.filter(function(t){return t.id!==e});n.setState({timeElements:t},function(){n.setElementsCookie()})},n.getExpDate=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),o=e.getDate(),a=e.getHours(),r=e.getMinutes();return new Date(t,n+1,o,a,r)},n.setElementsCookie=function(){n.props.cookies.set("timeElements",n.state.timeElements,{path:"/",expires:n.getExpDate()})},n.clearElementsCookie=function(){n.setState({timeElements:[]},function(){n.setElementsCookie()})},n.updateSettings=function(e){var t;"pomodoro"===n.state.clock.timerType?t=60*e.pomodoroTimeLengthMinutes:"short-break"===n.state.clock.timerType?t=60*e.shortBreakTimeLengthMinutes:"long-break"===n.state.clock.timerType&&(t=60*e.longBreakTimeLengthMinutes),n.setState({settings:V({},e),clock:{startSeconds:t,timerType:n.state.clock.timerType}},function(){n.setSettingsCookie(),n.setCurrentClockCookie()})},n.setCurrentClockCookie=function(){n.props.cookies.set("currentClockState",n.state.clock,{path:"/",expires:n.getExpDate()})},n.setSettingsCookie=function(){n.props.cookies.set("settings",n.state.settings,{path:"/",expires:n.getExpDate()})},n.clearSettingsCookie=function(){n.setState({settings:V({},n.defaultSettings)},function(){n.setSettingsCookie()})},n.restoreCurrentClockCookie=function(){n.setState({clock:V({},n.defaultClock)},function(){n.setCurrentClockCookie()})},n.changeClockFromVars=function(e,t){n.setState({clock:{startSeconds:e,timerType:t}},function(){n.setCurrentClockCookie()})},n.componentDidMount=function(){n.setState({clock:{startSeconds:60*n.state.settings.pomodoroTimeLengthMinutes,timerType:"pomodoro"}},function(){n.setCurrentClockCookie()}),document.getElementById("alarm-audio").volume=n.state.settings.alarmVolumePercent/100};var o=e.cookies;return n.alarmSounds=[{name:"School Bell",url:w.a,id:T()()},{name:"Ship Bell",url:P.a,id:T()()},{name:"Temple Bell",url:M.a,id:T()()},{name:"Analog Watch",url:j.a,id:T()()}],n.defaultSettings={pomodoroTimeLengthMinutes:25,longBreakTimeLengthMinutes:10,shortBreakTimeLengthMinutes:5,alarmSoundUrl:"/static/media/ship-bell.be4257c1.mp3",alarmVolumePercent:25,browserNotification:!0,autoStartSegments:!1,logViewPomodorosOnly:!1,logListView:!0,logDescendingList:!0},n.defaultClock={startSeconds:1500,timerType:"pomodoro"},n.state={timeElements:o.get("timeElements")||[],settings:o.get("settings")||V({},n.defaultSettings),clock:o.get("currentClockState")||V({},n.defaultClock)},n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(d,null),a.a.createElement(k,{startSeconds:this.state.clock.startSeconds,timerType:this.state.clock.timerType,passVarsUp:this.changeClockFromVars,finishTimer:this.finishTimer,pomodoroTimeLengthSeconds:60*this.state.settings.pomodoroTimeLengthMinutes,shortBreakTimeLengthSeconds:60*this.state.settings.shortBreakTimeLengthMinutes,longBreakTimeLengthSeconds:60*this.state.settings.longBreakTimeLengthMinutes}),a.a.createElement("hr",null),a.a.createElement(f,{timeElements:this.state.timeElements,deleteElement:this.deleteElement,clearElementsCookie:this.clearElementsCookie}),a.a.createElement("hr",null),a.a.createElement(v,{alarmSounds:this.alarmSounds,defaultSettings:this.defaultSettings,settings:this.state.settings,updateSettings:this.updateSettings,clearSettingsCookie:this.clearSettingsCookie,restoreCurrentClockCookie:this.restoreCurrentClockCookie}),a.a.createElement("audio",{id:"alarm-audio",src:this.state.settings.alarmSoundUrl,type:"audio/mpeg"})))}}]),t}(o.Component),U=Object(x.b)(N);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(x.a,null,a.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.9f33869e.chunk.js.map