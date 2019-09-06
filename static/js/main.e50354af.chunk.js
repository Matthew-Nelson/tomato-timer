(window.webpackJsonppomodoro_v1=window.webpackJsonppomodoro_v1||[]).push([[0],{15:function(e,t,n){e.exports=n.p+"static/media/analog-watch.3fe4eb29.mp3"},16:function(e,t,n){e.exports=n.p+"static/media/school-bell.05ba0837.mp3"},17:function(e,t,n){e.exports=n.p+"static/media/ship-bell.be4257c1.mp3"},18:function(e,t,n){e.exports=n.p+"static/media/temple-bell.63544226.mp3"},20:function(e,t,n){e.exports=n(32)},25:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(19),s=n.n(r),i=(n(25),n(8)),l=n(11),c=n(1),m=n(2),u=n(4),p=n(3),d=n(5);function h(e){return a.a.createElement("div",null,a.a.createElement("h1",null,"Tomato Timer"),a.a.createElement("hr",{style:{borderColor:"dodgerblue"}}))}var g=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("button",{onClick:this.props.changeClock.bind(this,this.props.pomodoroTimeLengthSeconds,"pomodoro")},"Pomodoro"),a.a.createElement("button",{onClick:this.props.changeClock.bind(this,this.props.shortBreakTimeLengthSeconds,"short-break")},"Short Break"),a.a.createElement("button",{onClick:this.props.changeClock.bind(this,this.props.longBreakTimeLengthSeconds,"long-break")},"Long Break"))}}]),t}(o.Component),k=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).displayMessage=function(){var e="";return!1===n.state.isRunning&&"pomodoro"===n.props.timerType&&n.props.startSeconds!==n.state.secondsElapsed?e="Start the clock and get to work!":!1===n.state.isRunning&&"pomodoro"===n.props.timerType&&n.props.startSeconds===n.state.secondsElapsed?e="Good job! You made it to the break. Select whether you are going to take a short or long break.":!0===n.state.isRunning&&"pomodoro"===n.props.timerType?e="You're on the clock, keep focused on the task at hand!":!1===n.state.isRunning&&"pomodoro"!==n.props.timerType&&n.props.startSeconds!==n.state.secondsElapsed?e="Start the clock and take your well earned break!":!1===n.state.isRunning&&"pomodoro"!==n.props.timerType&&n.props.startSeconds===n.state.secondsElapsed?e="Select whether you are headed back to a 'pomodoro' or if you want to take a longer break.":!0===n.state.isRunning&&"pomodoro"!==n.props.timerType&&(e="You're on your break. Get up, stretch, grab a snack or water if needed and relax!"),a.a.createElement("p",null,e)},n.changeClock=function(e,t){n.props.passVarsUp(e,t),n.updateClockState(!1),n.resetClock()},n.updateClockState=function(e){n.setState({isRunning:e})},n.startClock=function(){n.state.isRunning||(n.props.startSeconds===n.state.secondsElapsed&&n.resetClock(),0!==n.state.secondsElapsed&&n.state.secondsElapsed-n.props.startSeconds!==0||n.setState({timeStarted:new Date}),n.updateClockState(!0),n.timerID=setInterval(function(){return n.tick()},1e3))},n.stopClock=function(){n.updateClockState(!1),clearInterval(n.timerID)},n.resetClock=function(){n.stopClock(),n.changeTitle(!1),n.setState({secondsElapsed:0,timeStarted:{}})},n.tick=function(){n.setState({secondsElapsed:n.state.secondsElapsed+1}),n.changeTitle(!0),n.state.secondsElapsed===n.props.startSeconds&&(n.stopClock(),n.props.finishTimer(n.props.timerType,n.props.startSeconds,n.state.timeStarted))},n.changeTitle=function(e){if(!1===e)document.title="Pomodoro";else{var t=n.formatSeconds(n.props.startSeconds-n.state.secondsElapsed);document.title="".concat("Pomodoro"," (").concat(t,")")}},n.skipToEnd=function(){n.setState({secondsElapsed:n.props.startSeconds-2},function(){n.state.isRunning||n.startClock()})},n.formatSeconds=function(e){var t=Math.floor(e/3600),n=Math.floor((e-3600*t)/60),o=e-3600*t-60*n;return t<10&&"00:"===(t="0".concat(t,":"))&&(t=""),n<10&&(n="0".concat(n)),o<10&&(o="0".concat(o)),"".concat(t).concat(n,":").concat(o)},n.state={isRunning:!1,secondsElapsed:0,timeStarted:{}},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"render",value:function(){return a.a.createElement("div",null,this.displayMessage(),a.a.createElement(g,{changeClock:this.changeClock,pomodoroTimeLengthSeconds:this.props.pomodoroTimeLengthSeconds,shortBreakTimeLengthSeconds:this.props.shortBreakTimeLengthSeconds,longBreakTimeLengthSeconds:this.props.longBreakTimeLengthSeconds}),a.a.createElement("h2",{style:E},this.formatSeconds(this.props.startSeconds-this.state.secondsElapsed)),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.startClock},"Start"),a.a.createElement("button",{onClick:this.stopClock},"Stop"),a.a.createElement("button",{onClick:this.resetClock},"Reset")),a.a.createElement("div",{style:f},a.a.createElement("p",{style:{marginTop:0}},"For demonstration purposes, feel free to skip to the end of the timer:"),a.a.createElement("button",{onClick:this.skipToEnd},"Skip to end of Timer")))}}]),t}(o.Component),E={display:"inline-block",padding:"1rem",border:"1px solid red"},f={border:"1px dotted grey",padding:"1rem",margin:"1rem 0"},C=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).submitComment=function(){n.props.editLogComment(n.state.comment),n.setState({editingComment:!1})},n.udpateCommentState=function(e){n.setState({comment:e.target.value})},n.openCommentToEdit=function(){n.setState({editingComment:!0})},n.state={editingComment:n.props.editingComment,comment:n.props.comment},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e;return e=!0===this.state.editingComment?a.a.createElement("div",null,a.a.createElement("textarea",{placeholder:"add comments about how you spent your time",value:this.state.comment,onChange:this.udpateCommentState}),a.a.createElement("button",{onClick:this.submitComment},"Submit")):a.a.createElement("div",null,a.a.createElement("p",null,this.props.comment),a.a.createElement("button",{onClick:this.openCommentToEdit},"Edit Comment")),a.a.createElement("div",null,e)}}]),t}(o.Component),b=function(e){function t(){var e,n;Object(c.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(a)))).editLogComment=function(e,t){n.props.editLogComment(e,t)},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){for(var e=this,t=0,n=0,o=0;o<this.props.timeElements.length;o++)this.props.timeElements[o].isTomato?t++:n++;var r=this.props.timeElements.map(function(t){return a.a.createElement("div",{className:"row",key:t.id},a.a.createElement("div",null,a.a.createElement("button",{onClick:e.props.deleteElement.bind(e,t.id),className:"rm-button"},"x")),a.a.createElement("div",{className:"time-element ".concat(t.isTomato?"tomato":"break")},a.a.createElement("div",null,a.a.createElement("p",{style:{textAlign:"center"}},t.minutes,a.a.createElement("br",null),"minutes"))),a.a.createElement("div",{className:"log-info"},a.a.createElement("p",null,"Time Started: ",t.timeStarted),a.a.createElement("p",null,"Time Completed: ",t.timeStarted),a.a.createElement("p",null,"Date Completed: ",t.dateCompleted)),a.a.createElement("div",null,a.a.createElement(C,{comment:t.comment,editingComment:t.editingComment,editLogComment:e.editLogComment.bind(e,t.id)})))});return a.a.createElement("div",null,a.a.createElement("h2",null,"Completed Time Segments"),a.a.createElement("p",null,"This section acts as a log of the pomodoros and break that you have completed."),a.a.createElement("p",null,"So far, you have ",t," tomatoes completed and have taken ",n," beaks."),a.a.createElement("div",{className:"time-elements-wrapper"},r),a.a.createElement("button",{onClick:this.props.clearElementsCookie},"Clear Log"))}}]),t}(o.Component),S=n(9);function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var y=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).onChange=function(e){var t,o=e.target.name;t=parseInt(e.target.value)?parseInt(e.target.value):e.target.value,n.setState(Object(i.a)({},o,t))},n.onSubmit=function(e){e.preventDefault(),n.props.updateSettings(n.state)},n.restoreDefaults=function(){n.setState(T({},n.props.defaultSettings),function(){n.props.clearSettingsCookie(),n.props.restoreCurrentClockCookie()})},n.state=T({},e.settings),n.onChange=n.onChange.bind(Object(S.a)(n)),n.onSubmit=n.onSubmit.bind(Object(S.a)(n)),n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.alarmSounds.map(function(e){return a.a.createElement("option",{key:e.id,value:e.url},e.name)});return a.a.createElement("div",null,a.a.createElement("h2",null,"SETTINGS"),a.a.createElement("form",{onSubmit:this.onSubmit,id:"settings"},a.a.createElement("p",null,a.a.createElement("strong",null,"Custom Timer Times")),a.a.createElement("div",null,a.a.createElement("p",null,"Pomodoro Time:"),a.a.createElement("input",{type:"number",name:"pomodoroTimeLengthMinutes",value:this.state.pomodoroTimeLengthMinutes,onChange:this.onChange}),a.a.createElement("p",null,"Short Break Time:"),a.a.createElement("input",{type:"number",name:"shortBreakTimeLengthMinutes",value:this.state.shortBreakTimeLengthMinutes,onChange:this.onChange}),a.a.createElement("p",null,"Long Break Time:"),a.a.createElement("input",{type:"number",name:"longBreakTimeLengthMinutes",value:this.state.longBreakTimeLengthMinutes,onChange:this.onChange})),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Sound Picker")),a.a.createElement("select",{name:"alarmSoundUrl",onChange:this.onChange,value:this.state.alarmSoundUrl},e),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Adjust Volume")),a.a.createElement("select",{name:"alarmVolumePercent",onChange:this.onChange,value:this.state.alarmVolumePercent},a.a.createElement("option",{value:"100"},"100%"),a.a.createElement("option",{value:"75"},"75%"),a.a.createElement("option",{value:"50"},"50%"),a.a.createElement("option",{value:"25"},"25%")),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Browser Notification")),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Auto Start Pomodoros and Breaks")),a.a.createElement("p",null,"---"),a.a.createElement("p",null,a.a.createElement("strong",null,"Pomodoros Log View Toggle")),a.a.createElement("button",{type:"submit",value:"submit"},"Save Settings"),a.a.createElement("p",null,"---")),a.a.createElement("button",{onClick:this.restoreDefaults},"Restore Defaults"))}}]),t}(o.Component),O=n(7),j=n.n(O),w=n(15),L=n.n(w),M=n(16),P=n.n(M),B=n(17),D=n.n(B),x=n(18),I=n.n(x),R=n(10);n(31);function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var U=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).createTimeElement=function(e,t,n){var o=n.getMinutes(),a=n.getHours(),r="";a>12?(a-=12,r="PM"):a<12?r="AM":12===a&&(r="PM");var s="".concat(a,":").concat(o," ").concat(r),i=new Date,l=i.getMinutes(),c=i.getHours(),m=i.getUTCMonth()+1,u=i.getUTCDate(),p=i.getUTCFullYear(),d="";c>12?(c-=12,d="PM"):c<12?d="AM":12===c&&(d="PM");var h="".concat(m,"/").concat(u,"/").concat(p),g="".concat(c,":").concat(l," ").concat(d);return{isTomato:"pomodoro"===e,minutes:t/60,id:j()(),comment:"",editingComment:!0,timeStarted:s,timeCompleted:g,dateCompleted:h}},n.finishTimer=function(e,t,o){var a=n.createTimeElement(e,t,o);n.setState({timeElements:[].concat(Object(l.a)(n.state.timeElements),[a])},function(){n.setElementsCookie()}),document.getElementById("alarm-audio").play()},n.deleteElement=function(e){var t=n.state.timeElements.filter(function(t){return t.id!==e});n.setState({timeElements:t},function(){n.setElementsCookie()})},n.getExpDate=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),o=e.getDate(),a=e.getHours(),r=e.getMinutes();return new Date(t,n+1,o,a,r)},n.setElementsCookie=function(){n.props.cookies.set("timeElements",n.state.timeElements,{path:"/",expires:n.getExpDate()})},n.clearElementsCookie=function(){n.setState({timeElements:[]},function(){n.setElementsCookie()})},n.updateSettings=function(e){var t;"pomodoro"===n.state.clock.timerType?t=60*e.pomodoroTimeLengthMinutes:"short-break"===n.state.clock.timerType?t=60*e.shortBreakTimeLengthMinutes:"long-break"===n.state.clock.timerType&&(t=60*e.longBreakTimeLengthMinutes),n.setState({settings:N({},e),clock:{startSeconds:t,timerType:n.state.clock.timerType}},function(){n.setSettingsCookie(),n.setCurrentClockCookie()})},n.setCurrentClockCookie=function(){n.props.cookies.set("currentClockState",n.state.clock,{path:"/",expires:n.getExpDate()})},n.setSettingsCookie=function(){n.props.cookies.set("settings",n.state.settings,{path:"/",expires:n.getExpDate()})},n.clearSettingsCookie=function(){n.setState({settings:N({},n.defaultSettings)},function(){n.setSettingsCookie()})},n.restoreCurrentClockCookie=function(){n.setState({clock:N({},n.defaultClock)},function(){n.setCurrentClockCookie()})},n.changeClockFromVars=function(e,t){n.setState({clock:{startSeconds:e,timerType:t}},function(){n.setCurrentClockCookie()})},n.editLogComment=function(e,t){for(var o=0;o<n.state.timeElements.length;o++)if(n.state.timeElements[o].id===e){var a=N({},n.state.timeElements[o],{comment:t,editingComment:!1}),r=Object(l.a)(n.state.timeElements);r[o]=a,n.setState({timeElements:Object(l.a)(r)},function(){n.setElementsCookie()});break}},n.componentDidMount=function(){n.setState({clock:{startSeconds:60*n.state.settings.pomodoroTimeLengthMinutes,timerType:"pomodoro"}},function(){n.setCurrentClockCookie()}),document.getElementById("alarm-audio").volume=n.state.settings.alarmVolumePercent/100};var o=e.cookies;return n.alarmSounds=[{name:"School Bell",url:P.a,id:j()()},{name:"Ship Bell",url:D.a,id:j()()},{name:"Temple Bell",url:I.a,id:j()()},{name:"Analog Watch",url:L.a,id:j()()}],n.defaultSettings={pomodoroTimeLengthMinutes:25,longBreakTimeLengthMinutes:10,shortBreakTimeLengthMinutes:5,alarmSoundUrl:"/static/media/ship-bell.be4257c1.mp3",alarmVolumePercent:25,browserNotification:!0,autoStartSegments:!1,logViewPomodorosOnly:!1,logListView:!0,logDescendingList:!0},n.defaultClock={startSeconds:1500,timerType:"pomodoro"},n.state={timeElements:o.get("timeElements")||[],settings:o.get("settings")||N({},n.defaultSettings),clock:o.get("currentClockState")||N({},n.defaultClock)},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(h,null),a.a.createElement(k,{startSeconds:this.state.clock.startSeconds,timerType:this.state.clock.timerType,passVarsUp:this.changeClockFromVars,finishTimer:this.finishTimer,pomodoroTimeLengthSeconds:60*this.state.settings.pomodoroTimeLengthMinutes,shortBreakTimeLengthSeconds:60*this.state.settings.shortBreakTimeLengthMinutes,longBreakTimeLengthSeconds:60*this.state.settings.longBreakTimeLengthMinutes}),a.a.createElement("hr",null),a.a.createElement(b,{timeElements:this.state.timeElements,deleteElement:this.deleteElement,clearElementsCookie:this.clearElementsCookie,editLogComment:this.editLogComment}),a.a.createElement("hr",null),a.a.createElement(y,{alarmSounds:this.alarmSounds,defaultSettings:this.defaultSettings,settings:this.state.settings,updateSettings:this.updateSettings,clearSettingsCookie:this.clearSettingsCookie,restoreCurrentClockCookie:this.restoreCurrentClockCookie}),a.a.createElement("audio",{id:"alarm-audio",src:this.state.settings.alarmSoundUrl,type:"audio/mpeg"})))}}]),t}(o.Component),A=Object(R.b)(U);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(R.a,null,a.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.e50354af.chunk.js.map