local screen = {guiGetScreenSize()}
local browser = createBrowser(screen[1], screen[2], true, true)
local link = "http://mta/local/html/index.html"

function browserRender()
    dxDrawImage(0, 0, screen[1], screen[2], browser, 0, 0, 0, tocolor(255, 255, 255, 255), true)
end

addEventHandler("onClientBrowserCreated", browser, function()
	loadBrowserURL(source, link)
    addEventHandler("onClientRender", root, browserRender)
end)

function createNotify(title, type, message, time,pos)
    if not pos then pos = "left" end
    executeBrowserJavascript(browser, 'window.postMessage({action : "notification",type :"'..type..'",title : "'..title..'",message : "'..message..'",time :'..time..',position :"'..pos..'"})')
end
addEvent("createNotify", true)
addEventHandler("createNotify", root, createNotify)
