$(function () {

    load()
    $("#title").on("keydown",function(event){
        if (event.keyCode === 13 && $(this).val() != ""){
            // if($(this).val === ""){
            //     return;
            // }
            // else{
                //    先读取本地的原数据
                var local = getData();
                // 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把数组存到local里
                saveData(local);
                load();
                $(this).val("");
            // }
        }
    })
    // 点击input触发事件
    $("ul,ol").on("click","input",function(){
        // 先获取本地存储的数据，修改数据，保存到本地存储里，重新渲染页面
        var data = getData();
        var index = $(this).siblings(".delete").attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
   
    
    })

    // 删除事件
    $("ul,ol").on("click",".delete",function(){
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index,1);
        saveData(data);
        load();
    })

    // 读取本地原数据
    function getData(){
        var data = localStorage.getItem("todolist");
        if(data !== null){
            // 获取本地数据
            return JSON.parse(data);
        }
        else{
            return [];
        }
    }
    // 保存本地存储数据
    function saveData(data){
        localStorage.setItem("todolist",JSON.stringify(data));
    }
    // 渲染加载页面
    function load(){
        var olnum = 0;
        var ulnum = 0;
        $("ul,ol").empty();
        var datas = getData();
        $.each(datas,function(i,n){
            if(n.done){
                $("ol").prepend("<li><input type = 'checkbox' id = 'check' checked = 'checked'><p>" + n.title + "</p><span class= 'delete' id=" + i + "></span></li >")
                olnum++;
            }
            else{
                $("ul").prepend("<li><input type = 'checkbox' id = 'check' ><p>" + n.title + "</p><span class= 'delete' id=" + i + "></span></li >")
                ulnum++;
            }
        })
        $(".todo").children(".num").text(ulnum)
        $(".done").children(".num").text(olnum)
    }
})