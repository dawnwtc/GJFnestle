// 处理对话框输入
function onbuttonclick(idStr)
{
    switch(idStr)
    {
        case "getDocName":{
                let doc = window.Application.ActiveWorkbook
                let textValue = ""
                if (!doc){
                    textValue = textValue + "当前没有打开任何文档"
                    return
                }
                textValue = textValue + doc.Name
                document.getElementById("text_p").innerHTML = textValue
                break
            }
        case "createTaskPane":{
                let tsId = window.Application.PluginStorage.getItem("taskpane_id")
                if (!tsId){
                    let tskpane = window.Application.CreateTaskPane(GetUrlPath() + "/taskpane.html")
                    let id = tskpane.ID
                    window.Application.PluginStorage.setItem("taskpane_id", id)
                    tskpane.Visible = true
                }else{
                    let tskpane = window.Application.GetTaskPane(tsId)
                    tskpane.Visible = true
                }
                break
            }
        case "newDoc":{
            window.Application.Workbooks.Add()
            break
        }
        case "addString":{
            let curSheet = window.Application.ActiveSheet;
            if (curSheet){
                curSheet.Cells.Item(1, 1).Formula="Hello, wps加载项!" + curSheet.Cells.Item(1, 1).Formula
            }
            break;
        }
        case "closeDoc":{
            if (window.Application.Workbooks.Count < 2)
            {
                alert("当前只有一个文档，别关了。")
                break
            }
                
            let doc = window.Application.ActiveWorkbook
            if (doc)
                doc.Close()
            break
        }
    }
    
}

window.onload = ()=>{
    var xmlReq = WpsInvoke.CreateXHR();
    var url = location.origin + "/.debugTemp/NotifyDemoUrl"
    xmlReq.open("GET", url);
    xmlReq.onload = function (res) {
        var node = document.getElementById("DemoSpan");
        window.document.getElementById("DemoSpan").innerHTML = res.target.responseText;
    };
    xmlReq.send();
}

// 删除行相关函数
function confirmDelete() {
    let lineNumbersText = document.getElementById("lineNumbers").value.trim();
    if (!lineNumbersText) {
        alert("请输入要删除的行号！");
        return;
    }

    let lineNumbers = lineNumbersText.split('\n').map(line => parseInt(line.trim(), 10)).filter(line => !isNaN(line));
    if (lineNumbers.length === 0) {
        alert("行号无效！");
        return;
    }

    lineNumbers.sort((a, b) => b - a); // 按降序排列行号

    let curSheet = window.Application.ActiveSheet;
    if (!curSheet) {
        alert("没有活动的工作表！");
        return;
    }

    lineNumbers.forEach(lineNumber => {
        if (lineNumber > 0) {
            curSheet.Rows.Item(lineNumber).Delete();
        }
    });

    alert("行删除完成！");
}

// 安排行程相关函数
function loadScheduleData(region, name) {
    const url = `${GetUrlPath()}/table.html?region=${encodeURIComponent(region)}&name=${encodeURIComponent(name)}`;
    const dialog = window.Application.ShowDialog(url, "行程表", 400*window.devicePixelRatio, 300*window.devicePixelRatio, false);
}

// 编辑行程表相关函数
function editScheduleData(region, name) {
    const url = `${GetUrlPath()}/edit.html?region=${encodeURIComponent(region)}&name=${encodeURIComponent(name)}`;
    window.Application.ShowDialog(url, "编辑行程表", 400*window.devicePixelRatio, 300*window.devicePixelRatio, false);
}