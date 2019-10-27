import VConsole from 'vconsole';
const vConsole = new VConsole();

const isAndroid = /Android/.test(navigator.userAgent);

//pc 手写sessionid 方便调试
if (CONSTANT.platform === 'pc')
  sessionStorage.setItem('sessionid', '2244f24a-1412-4989-9796-52ba2243fed1');

export default CONSTANT;
