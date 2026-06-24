﻿﻿﻿﻿﻿import os
icon_path = os.path.abspath("logo.ico").replace("\\", "/")
desktop = os.path.join(os.environ["USERPROFILE"], "Desktop")
shortcut_path = os.path.join(desktop, "夕阳智语 - SunsetAI.lnk")
vbs_content = "Set WshShell = CreateObject(\"WScript.Shell\")\nSet shortcut = WshShell.CreateShortcut(\"" + shortcut_path + "\")\nshortcut.TargetPath = \"http://localhost:5173/\"\nshortcut.IconLocation = \"" + icon_path + "\"\nshortcut.Description = \"夕阳智语 - AI语音助老助手\"\nshortcut.Save"
with open("create_shortcut.vbs", "w", encoding="utf-8") as f:
    f.write(vbs_content)
print("VBS脚本已创建")
