//base64转码（压缩完成后的图片为base64编码，这个方法可以将base64编码转回file文件）
function dataURLtoFile(dataurl,fileName) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr],fileName, {
        type: mime
    });

}
//压缩图片
export const compressImg = (file)=> {
    var src;
    var files;
    var fileSize = parseFloat(parseInt(file['size']) / 1024 / 1024).toFixed(2);
    var fileName = file.name;
    var read = new FileReader();
    read.readAsDataURL(file);
    return new Promise(function (resolve, reject) {
        read.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                //默认按比例压缩
                var w = this.width,
                    h = this.height;
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var base64;
                // 创建属性节点
                canvas.setAttribute("width", w);
                canvas.setAttribute("height", h);
                ctx.drawImage(this, 0, 0, w, h);
                if (fileSize < 0.5) {
                    //如果图片小于0.5兆 那么不执行压缩操作
                    base64 = canvas.toDataURL(file['type'], 1);
                } else if (fileSize > 0.5 && fileSize < 1) {
                    //如果图片大于0.5M并且小于1M 那么压缩0.5
                    base64 = canvas.toDataURL(file['type'], 0.5);
                } else {
                    //如果图片超过1m 那么压缩0.2
                    base64 = canvas.toDataURL(file['type'], 0.2);
                }
                // 回调函数返回file的值（将base64编码转成file）
                files = dataURLtoFile(base64,fileName); //如果后台接收类型为base64的话这一步可以省略

                resolve(files)
            };
        };
    })
};