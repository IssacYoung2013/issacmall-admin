import { resolve } from "url";


class MUtil {
    request(param){
        console.log(param);

        return new Promise((resolve,reject)=>{
            $.ajax({
                type        : param.type || 'get',
                url         : param.url  || '',
                dataType    : param.dataType || 'json',
                data        : param.data || null,
                success(res){
                    // 数据请求成功
                    if(0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data,res.msg);
                    }
                    else if (10 === res.status) {
                        // 没有登录状态，强制登录
                        this.doLogin();
                    }
                    else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error(err){
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        })
    }

    doLogin() {
        // window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
}

export default MUtil;