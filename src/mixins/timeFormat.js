export default {
    $toTime(time, format) {
        var ret = "";
        // console.log("执行【转换时间格式】函数");
        // console.log("源参数" ,time);
        if (time) {
            var is_date = time instanceof Date;
            var is_num = typeof (time) == 'number';
            // console.log("校验类型 date ,number ,string" ,is_date ,is_num ,typeof(time) == 'string');
            if (is_date) {
                ret = time.toStr(format);
                // console.log("源参数:日期型 结果:" ,ret);
            } else if (is_num) {
                var t = new Date(time);
                ret = t.toStr(format);
                // console.log("源参数:数字型" ,ret);
            } else {
                let reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
                let regExp = new RegExp(reg);
                if (regExp.test(time)) {
                    ret = time;
                } else {
                    ret = time.toTime().toStr(format);
                }
                // console.log("源参数:文本型" ,ret);
            }
        }
        return ret;
    }
}