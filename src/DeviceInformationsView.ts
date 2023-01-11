//Import VS Code API module
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class DeviceInformationsView {

    // private static view: DeviceInformationsView;
    private panel;

    public constructor(extensionRoot: string) {
        this.panel = vscode.window.createWebviewPanel(
            'deviceInforamtion',            // internal panel/view type
            'SICK Sensors Inforamtion',     // tab title of the web view
            vscode.ViewColumn.One,          // colum to display the web view in by default
            {
                // set the extensios assets folder as local resource root to make css, js etc. available
                localResourceRoots: [vscode.Uri.file(path.join(extensionRoot, 'assets'))]
            }
        );

        this.panel.webview.html = fs.readFileSync(path.join(extensionRoot,'assets','sensorInfo.html'), 'utf8');
    }
}