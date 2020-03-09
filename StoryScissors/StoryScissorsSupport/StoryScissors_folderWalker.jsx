/*
 * StoryScissors_folderWalker.jsx
 * Javascript for InDesign CS5+
 * Version date: 20150523
 *
 * PURPOSE:
 * ========
 * Automated folder walker to batch-create exports from InDesign documents.
 * Walks a folder structure, opens any InDesign document and calls the 
 * main export script 'ExportCurrentDocument.jsx'.
 *
 * Instructions:
 * -------------
 * Make a copy of this Script into the folder where 'ExportCurrentDocument.jsx' is located (one up).
 * then create an export settings file:
 * Call 'ExportCurrentDocument.jsx' from InDesign's Scripts palette and make your settings.
 * Cancel the dialog. This creates the file 'settings.set' in the sub folder 'zz_Settings' within your home folder: ~BatchXSLT4InDesignComm/Scripts/.
 * Rename this 'settings.set' to identify the purpose of these settings like 'settings_Product1.set'.
 *
 * Make a copy of the file 'BatchExportExample.jt' within the folder 'zz_Settings' and name it 'BatchExport.jt'.
 * With a plain text editor edit the job tickets within the lines
 * # ************ JobTickets Section starts here
 * and 
 * # ************ JobTickets Section ends here
 * Two jobtickets are already contained but are disabled with the commands "state=0"
 * Settings descriptions may be found after the line # ************ Comments Section
 * You may edit, add, delete any of of the jobtickets to match your needs.
 *
 * Any number of jobtickets may be defined to act on subfolders within the base batch folder 
 * "~/Export/BATCHin"
 * The core connection between a jobticket and a certain folder is the keyword "jtSubFolder" witch 
 * must point to a folder within "~/Export/BATCHin".
 * Example:
 * a jobticket with the entry
 * jtSubFolder=myNews
 * will act on the folder path
 * ~/Export/BATCHin/myNews
 * 
 * Call the script from the InDesign Script palette and the export will start with variable settings for each batch folder.
 *
 *
 * IMPORTANT NOTES
 * ===============
 * 1. MAKE SURE, YOUR MACHINE (INDESIGN) HAS A LOT OF MEMORY AVAILABLE!
 *    Best is 4GB... or it may crash.
 * 2. INSTALL ALL FONTS USED IN THE DOCUMENTS!
 *    Otherwise the InDesign documents will re-flow with replaced fonts.
 * 3. InDesign document file names must end with '.indd'
 * 4. InDesign document file names and folder names MAY NOT CONTAIN SLASHES  '/' OR BACKSLASHES  '\'
 *
 * DISCLAIMER:
 * ===============
 * Absolutely no warranty. Use it as is or modify it to match your needs.
 *
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE PRODUCER OR
 * ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
 * USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 *
 * Author: Andreas Imhof, www.aiedv.ch
 */

// ****** Configurable SETTINGS ******

var mainfolder = "/TempKundendaten",

/****************************
 * here we go.....
 *
 * walk a folder tree and export all .indd files
 */
	scriptFile = "",
	had2work = false,
	call_level = 0,
	num_docs_done = 0,

walkFolder = function (theFolder,call_level) {	// walk a folder object
	var myFolder = new Folder(theFolder),
		contentArr = myFolder.getFiles();	// get all contained files and folders

	/*
		var paths = "";
		for (var i = 0; i < contentArr.length; i++) {
			paths += contentArr[i].fsName + "\n";
		}
		alert(paths);
		return;
	*/

	for (var i = 0; i < contentArr.length; i++) {
		var myDocument, myDocumentWin, old_userInteractionLevel, old_enableRedraw;
		if (ScriptUI.environment.keyboardState.ctrlKey && ScriptUI.environment.keyboardState.shiftKey) {
			alert("User abort\nprocessed documents: " + num_docs_done);
			exit(0);
		}

		// want to skip some folders?
		if (contentArr[i].fsName.indexOf("/__Fonts/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/_Ai_DocBook/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/_IND TestDocs Ai/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Aebi/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/accessAmericaGroup/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Awesomeimports/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/BZ/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/COMYAN/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Creabo/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/DDSR/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Edipresse/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Fontsets/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/FraubrunnerAnzeiger/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/GDI/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Groepper/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Heike Rapp/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/HKSG shednet/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/IBV/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/IFMR/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/IndianaUniversityPress/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/JeffClark/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/LBE/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/LerNetz/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/media-cucina/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Mettler-Toledo/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Modlitewnik/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/nativemedia/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/NEUBAD/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/nougat/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Pearson CN/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Production Journal/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/ristretto/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/SatzUmehr/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/Schaffner/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/SenseStyle/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/SourceHOV/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/suissetec/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/TAmedia/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/TaniaAffentranger/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/TimesOfIndia/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/ulrich-media/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/VCS/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/VoconcesEnvironement/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/WEH/") >= 0) continue;
		if (contentArr[i].fsName.indexOf("/WesternProducer/") >= 0) continue;

		

		// is a folder: recall us
		if (contentArr[i] instanceof Folder) 	{
			walkFolder(contentArr[i],++call_level);
		}
		else {	// is a file
			if (contentArr[i].name.indexOf(".") == 0) continue;	// is hidden Unix file
			var is_indd_file = false;	// true when this is indesign document
			do {
				// check if it is a .indd file
				if (endsWith(contentArr[i].name.toLowerCase(),".indd") == true) { is_indd_file = true; break; }
				if (contentArr[i].name.indexOf(".") < 0) {	// has no filename extension - might be one on OSX
					var ftype = detectFileType(contentArr[i]);
					if (ftype == "indd") { is_indd_file = true; break; }
				}
			} while (false);
			if (is_indd_file) {	// call exporter script
				var path = getPath(contentArr[i].fsName,contentArr[i].name);
				//alert("walkFolder():\ncontentArr[i]: " + contentArr[i] + "\n\npath:" + path + "\n\nname: " + contentArr[i].name + "\n\nfullName: " + contentArr[i].fullName + "\n\nabsoluteURI: " + contentArr[i].absoluteURI + "\n\nfsName: " + contentArr[i].fsName);
				
				// open the document
				old_userInteractionLevel = app.scriptPreferences.userInteractionLevel;
				app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;
				old_enableRedraw = app.scriptPreferences.enableRedraw;
				app.scriptPreferences.enableRedraw = true;
				try {
					myDocument = app.open(contentArr[i],false);	// do not show window now! this prevents some dialogs from beeing shown!
				}
				catch (Exception) {} 
				finally {
					if (myDocument == null) { 
						continue;
					}
					myDocumentWin = myDocument.windows.add();		// show the document window ...
					myDocumentWin.bringToFront();
					//myDocumentWin.show();
					$.gc();
					$.sleep(1000);	// let window breath
				}

				// call StoryScissors
				// STRESS TEST: split at ALL paragraphs
				app.doScript(scriptFile, ScriptLanguage.javascript, ["*","SILENT:0,SILENT_COLSPLIT:1,NO_COMLETION_MESSAGE:0,ENTIRE_DOCUMENT:1,NO_MENU:0"], UndoModes.ENTIRE_SCRIPT);

				// check for STOP
				if (ScriptUI.environment.keyboardState.ctrlKey && ScriptUI.environment.keyboardState.shiftKey) {
					alert("User abort\nprocessed documents: " + num_docs_done);
					exit(0);
				}
				num_docs_done++;

				// and close document
				try {
					myDocument.close(SaveOptions.NO);
				} catch(e) {}

				app.scriptPreferences.userInteractionLevel = old_userInteractionLevel;
				app.scriptPreferences.enableRedraw = old_enableRedraw;

				$.gc();
				$.sleep(200);
			}
		}
	}
	return(had2work);
},

detectFileType = function (thefile) {
	if (thefile.exists == false) return ("");
	var chars = "";
	var numchars = 10;
	try {
		thefile.encoding = "BINARY";
		var err = thefile.open("r");
		chars = thefile.read(numchars);
	}
	catch (Exception) {} 
	finally {
		thefile.close();
	}
	if (chars.length < numchars) return("");

	// InDesign files start with hex: 06 06   ED  F5  D8 1D 46  E5
	//							 dec:  6  6  237 245 216 29 70 229
	if (   (chars.charCodeAt(0) == 6)
		&& (chars.charCodeAt(1) == 6)
		&& (chars.charCodeAt(2) == 237)
		&& (chars.charCodeAt(3) == 245)
		&& (chars.charCodeAt(4) == 216)
		&& (chars.charCodeAt(5) == 29)
		&& (chars.charCodeAt(6) == 70)
		&& (chars.charCodeAt(7) == 229)
		) { return ("indd"); }

	return ("");
},

/****************************
 * return path portion of full path/name
 */
getPath = function (pathname,name) {
	if ((name == null) || (name == "")) return(pathname);
	return(pathname.substr(0,pathname.length-name.length));
},

getScriptsPath = function () {
	var fullpath = app.activeScript;
	var scriptFile = new File(fullpath);
	return(scriptFile.path);
},

endsWith = function (str,subs) {
	return (str.match(subs+"$")==subs);
};

scriptFile = new File(getScriptsPath() + "/StoryScissors.jsx"),


walkFolder(mainfolder);
alert("processed documents: " + num_docs_done);
