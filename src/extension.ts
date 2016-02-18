'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var encode = require('encode-html');
var marked = require('marked');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let previewUri = vscode.Uri.parse('html-preview://html-preview');
    
    class MyTextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        
        public provideTextDocumentContent(uri: vscode.Uri): string {
            return this.displayHtml();
        }
        
        private displayHtml() {
            var s = '<h1>kalle</h1>';

             
            return encode(s);
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