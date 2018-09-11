//进度条模块
(function ($, root) {
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPer = 0;
    var startTime;
    //渲染每一首歌的总时间
    function renderAllTime(time) {
        lastPer = 0;
        curDuration = time;
        //将时间格式进行转换
        var time = formatTimer(time)
        $scope.find('.all-time').html(time);
    }

    function formatTimer(t) {
        t = Math.round(t)
        var m = Math.floor(t/60);
        var s = t-m*60;
        if(m < 10){
            m = '0' + m;
        }
        if(s < 10){
            s = '0' + s;
        }
        return m + ':' + s;
    }
    //开始时间
    function start(p){
        //先判断p是否有值 然后再赋值给lastPer
        lastPer = p === undefined ? lastPer : p;
        cancelAnimationFrame(frameId)
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPer +  (curTime - startTime) / (curDuration * 1000);
            if(percent <= 1){
                updata(percent);
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
                $scope.find(".next-btn").trigger("click");
                console.log(222)
            }
        }
        frame();
    }
    //停止计时
    function stop(){
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) /(curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    //更新区域 左侧时间 + 进度时间
    function updata(per){
        var curTime = curDuration * per;
        curTime = formatTimer(curTime);
        $scope.find('.cur-time').html(curTime);
        var perX = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform:'translateX(' + perX + ')'
        })
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start:start,
        stop:stop,
        updata:updata
    }
})(window.Zepto, window.player || (window.player = {}))