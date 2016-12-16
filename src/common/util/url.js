export default {
    params: function(){
        var search = window.location.href;
        var params = {};
        var index = search.indexOf("?");
        if (index != -1) {
            var str = search.substr(index+1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                params[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }

        return params;
    },
    get: function(key){
        if(key){
            return this.params()[key];
        }
    }
}
