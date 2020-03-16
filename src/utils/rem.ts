export default function initRem() {
    // /*rem 自适应*/
    // (function (doc, win) {
    //     const docEl = doc.documentElement,
    //     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    //     recalc = function () {
    //         var clientWidth = docEl.clientWidth;
    //         if (!clientWidth) return;
    //         docEl.style.fontSize = 375/667 * (clientWidth / 375)  + 'rem';
    //     };
    //     if (!doc.addEventListener) return;
    //     win.addEventListener(resizeEvt, recalc, false);
    //     doc.addEventListener('DOMContentLoaded', recalc, false);
    // })(document, window);
    const baseSize = 32
    // 设置 rem 函数
    function setRem () {
        let px = 375;
        if (window.orientation !== 0) { // 屏幕旋转，横屏游戏需要
            px = 667;
        }
        // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
        const scale = document.documentElement.clientWidth / px;
        // 设置页面根节点字体大小
        document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
    }
    // 初始化
    setRem()
    // 改变窗口大小时重新设置 rem
    window.onresize = function () {
        setRem();
    }
    window.onorientationchange = function () {
        setRem();
    }
}