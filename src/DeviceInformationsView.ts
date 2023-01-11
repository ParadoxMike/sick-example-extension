//Import VS Code API module
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class DeviceInformationsView {

    // private static view: DeviceInformationsView;
    private panel;
    private srcUris;

    public constructor(extensionRoot: string) {
        this.panel = vscode.window.createWebviewPanel(
            'deviceInforamtion',            // internal panel/view type
            'SICK Sensors Inforamtion',     // tab title of the web view
            vscode.ViewColumn.One,          // colum to display the web view in by default
            {
                // set the extensios assets folder as local resource root to make css, js etc. available
                localResourceRoots: [vscode.Uri.file(path.join(extensionRoot, 'assets'))],
                enableScripts: true
            }
        );

        this.srcUris = {
            css: this.panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionRoot, 'assets', 'css', 'style.css')))
        };

        this.panel.webview.html = this.generateHtml();
    }

    private generateHtml() {
        return `<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!DOCTYPE html>
        <html>
            <head>
                <title>SICK Sensors Inforamtion</title>
                <meta charset="UTF-8">
                <link href="${this.srcUris.css}" rel="stylesheet" type="text/css">
            </head>
            <body>
                <div class="main-container">
                    <div class="devices-sidebar">
                        <p>this is the sidebar</p>
                    </div>
                    <div class="device-view">
                        <p>this is the device view</p>
                    </div>
                </div>
        
                <!-- <script type="text/javascript" src="./jquery.min.js"></script>
                <script type="text/javascript" src="./scripts.js"></script> -->
            </body>
        </html>`;
    }
}