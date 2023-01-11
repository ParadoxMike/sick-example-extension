// Import VS Code API module
import * as vscode from 'vscode';

// import classes
import { DeviceInformationsView } from './DeviceInformationsView';

// Activation method
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('sick-example-extension.openDeviceInformations', () => {
            new DeviceInformationsView(context.extensionPath);
        })
    );

}


// Deactivation method
export function deactivate() {}
