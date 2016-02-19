'use strict';
import * as vscode from 'vscode';

// https://www.npmjs.com/package/encode-html
import encode = require('encode-html');
// https://www.npmjs.com/package/marked
import marked = require('marked');
/*marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: false,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
*/


export function activate(context: vscode.ExtensionContext) {
    let previewUri = vscode.Uri.parse('html-preview://html-preview');
    
    class MyTextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        
        public provideTextDocumentContent(uri: vscode.Uri): string {
            return this.displayHtml();
        }
        
        private displayHtml() {
            var renderer = new marked.Renderer();
 
            renderer.heading = function (text, level) {
            
                return '<h' + level + '>' + text + '</h' + level + '>';
            };

             let editor = vscode.window.activeTextEditor;
            if (editor.document.languageId === 'markdown') {
                let text = editor.document.getText();
                let htmlText = encode(marked(text, {renderer:renderer}));
                
                return htmlText; 
            }
            else {
                return null;
            }
            
            
        }
    }
    
    let provider = new MyTextDocumentContentProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider('html-preview', provider);

    let disposable = vscode.commands.registerCommand('extension.previewHtml', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two).then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}