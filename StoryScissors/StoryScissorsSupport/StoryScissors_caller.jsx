/**
 * StoryScissors_caller.jsx
 * Javascript for InDesign CC, CS6
 * Version date: 20200309
 *
 * PURPOSE:
 * ===========
 * Split a selected story at a given paragraph name or at the insertion pointer
 *
 * DISCLAIMER:
 * ===========
 * Absolutely no warranty. Use it as is or modify it to match your needs
 *
 * AUTHOR:
 * ===========
 * Andreas Imhof
 * ai@aiedv.ch
 *
 * This is free software!
 * License: GPL3
 *
 */

var scriptFile = new File(getScriptsPath() + "/StoryScissors.jsx"),
	frames_splitted = -1, ex_message, which;

//StoryScissors("",{"SILENT":1,"NO_MENU":1});		// silently split at InsertionPointer
//app.doScript(scriptFile, ScriptLanguage.javascript, ["","SILENT:1,NO_MENU:1"], UndoModes.FAST_ENTIRE_SCRIPT);


		// UndoModes.FAST_ENTIRE_SCRIPT results in erroneous behavior!!! DON'T USE, but use UndoModes.ENTIRE_SCRIPT
which = 2;
try {

	switch (which) {
		case 0:	// open menu
			app.doScript(scriptFile, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT);
			break;


		case 1:	// split selected frame at given paragraph names
			app.doScript(scriptFile, ScriptLanguage.javascript, ["PortName,PortName_2,Kasten ZwiTitel,Titel,27 Kurz Oberzeile/1,26 Kurz Oberzeile,17 GT Zwischentitel","SILENT:0,SILENT_COLSPLIT:1,ENTIRE_DOCUMENT:0,NO_MENU:0,frameAdjustMode:1"], UndoModes.ENTIRE_SCRIPT);
			break;


		case 2:	// split entire document at given paragraph names
			app.doScript(scriptFile, ScriptLanguage.javascript, ["PortName,PortName_2,FromPort,Kasten ZwiTitel,Titel,27 Kurz Oberzeile/1,26 Kurz Oberzeile,17 GT Zwischentitel","SILENT:0,SILENT_COLSPLIT:1,NO_COMLETION_MESSAGE:1,ENTIRE_DOCUMENT:1,NO_MENU:0"], UndoModes.ENTIRE_SCRIPT);
			break;


		case 3:	// split at ALL paragraphs
			app.doScript(scriptFile, ScriptLanguage.javascript, ["*","SILENT:0,SILENT_COLSPLIT:1,NO_COMLETION_MESSAGE:1,ENTIRE_DOCUMENT:1,NO_MENU:0"], UndoModes.ENTIRE_SCRIPT);
			break;
	}
} catch(err) {}


// get the number of splitted frames and evtl. an error message
frames_splitted = app.doScript("#targetengine 'StoryScissors'\rStoryScissors_exitCode();", ScriptLanguage.javascript, undefined, UndoModes.entireScript);
ex_message = app.doScript("#targetengine 'StoryScissors'\rStoryScissors_exception();", ScriptLanguage.javascript, undefined, UndoModes.entireScript);
alert("Splitting done.");







function getScriptsPath() {
	var fullpath = app.activeScript;
	var scriptFile = new File(fullpath);
	return(scriptFile.path);
}





/*
retcode = app.doScript(
    'app.doScript(scriptFile, ScriptLanguage.javascript, ["26 Kurz Oberzeile,27 Kurz Oberzeile/1,17 GT Zwischentitel","SILENT_COLSPLIT:1,ENTIRE_DOCUMENT:1,NO_MENU:1"], UndoModes.FAST_ENTIRE_SCRIPT);',
    undefined,
    undefined,
    UndoModes.ENTIRE_SCRIPT
    );
*/
