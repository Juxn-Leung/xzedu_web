

export const uploadPic = (file,path) =>{
    const OSS = require("ali-oss");
    var client = new OSS({
        region: "oss-cn-shenzhen",
        endpoint: "oss-cn-shenzhen.aliyuncs.com", //外网域名
        accessKeyId: "LTAI4G1yyR9ebArr79Sd4UzX",
        accessKeySecret: "sgjfwgBn1H96Q55oNOT2ytPIw6l9G0",
        bucket: "education-image"
    });
    const uid = file.lastModified;
    const name = file.name;
    const suffix = name.substr(name.indexOf('.'));

    const fileName = Date.parse(new Date()) +''+ uid + suffix;
    // 支持File对象、Blob数据以及OSS Buffer。
    const data = file;
    const pathName = path;
    return client.put(pathName + fileName, data)
}