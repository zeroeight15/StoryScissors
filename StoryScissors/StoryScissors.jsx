/**
 * StoryScissors.jsx
 * Caller for StoryScissors.jsxbin
 * Javascript for InDesign CC, CS6, CS5.5, CS5
 * Version date: 20200309
 *
 * PURPOSE:
 * ===========
 * Split one or more stories at one or more selected paragraph styles or at the insertion pointer
 *
 * DISCLAIMER:
 * ===========
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
 * AUTHOR:
 * ===========
 * Andreas Imhof
 * ai@aiedv.ch
 *
 * This is free software!
 * License: GPL3
 */
#target "InDesign"
#targetengine "StoryScissors"


var scriptFile = new File(getScriptsPath() + "/StoryScissorsSupport/StoryScissors.jsxbin");

if (scriptFile.exists == false) {
	scriptFile = new File(getScriptsPath() + "/StoryScissorsSupport/StoryScissors.jsx")
	if (scriptFile.exists == false) {
		alert("StoryScissors binary script not found!\nReinstall the StoryScissors package.");
		exit(0);
	}
}


// call main StoryScissors script
app.doScript(scriptFile, ScriptLanguage.javascript);




function getScriptsPath() {
	var fullpath = app.activeScript;
	var scriptFile = new File(fullpath);
	return(scriptFile.path);
}
