/**
 * Manual.jsx
 * Caller for InDesign Scripts Manuals
 * Javascript for InDesign CC, CS6, CS5.5, CS5
 * Version date: 20150523
 *
 * PURPOSE:
 * ===========
 * Open a html manual in the standard Browser
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
 * EDV-Dienstleistungen
 * CH-Guemligen, Switzerland
 * www.aiedv.ch
 * CopyRight 2015
 *
 * This is NOT free software!
 */

var getAppLanguageCode = function () {
		switch (app.locale) {	// InDesign locales
			case Locale.FRENCH_LOCALE: return("fr");					// French						1279477362 = 'LCFr'
			case Locale.GERMAN_LOCALE: return("de");					// German						1279477613 = 'LCGm'
		}
		// default
		return("en");
	},
	getScriptsPath = function () {
		var fullpath = app.activeScript,
			scriptFile = new File(fullpath);
		return(scriptFile.path);
	},
	appLanguageCode,
	f;

appLanguageCode = getAppLanguageCode();
// currently english manual only
appLanguageCode = "en";

f = new File(getScriptsPath() + "/docs/StoryScissors_Manual_" + appLanguageCode + ".html");
//alert(f.fsName);
f.execute();