Set WshShell = CreateObject("WScript.Shell")
Set shortcut = WshShell.CreateShortcut("C:\Users\26293\Desktop\夕阳智语 - SunsetAI.lnk")
shortcut.TargetPath = "http://localhost:5173/"
shortcut.IconLocation = "C:/Users/26293/Desktop/创意大赛/logo.ico"
shortcut.Description = "夕阳智语 - AI语音助老助手"
shortcut.Save