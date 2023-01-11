//Import VS Code API module
import * as vscode from 'vscode';

//Activation method
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('sick-example-extension.openDeviceInformations', () => {

        })
    );

}

//Deactivation method
export function deactivate() {}
