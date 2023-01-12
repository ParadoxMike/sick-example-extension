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

        this.srcUris = { // Object to save all uris to be injected into the webview
            css: this.panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionRoot, 'assets', 'css', 'style.css'))),
            normalize: this.panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionRoot, 'assets', 'css', 'normalize.css'))),
            scripts: this.panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionRoot, 'assets', 'js', 'scripts.js'))),
            jquery: this.panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionRoot, 'assets', 'js', 'jquery.min.js'))),
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
                <link href="${this.srcUris.normalize}" rel="stylesheet" type="text/css">
                <link href="${this.srcUris.css}" rel="stylesheet" type="text/css">
            </head>
            <body>
                <div class="main-container">
                    <div class="devices-sidebar">
                        <p>this is the sidebar</p>
                    </div>
                    <div class="device-view">
                        <div class="device-view__head">
                            <p>here the device will be displayed</p>
                        </div>
                        <div class="device-view__compatible-firmware">
                            <div class="divice-view__compatible-firmware-tablehead">
                                <div class="divice-view__compatible-firmware-tablehead_version">
                                    <p>Version</p>
                                </div>
                                <div class="divice-view__compatible-firmware-tablehead_date">
                                    <p>Release date</p>
                                </div>
                                <div class="divice-view__compatible-firmware-tablehead_url">
                                    <p>Download URL</p>
                                </div>
                             </div>
                             <div class="divice-view__compatible-firmware-entry">
                                <div class="divice-view__compatible-firmware-entry_version">
                                    ver. 1.5
                                </div>
                                <div class="divice-view__compatible-firmware-entry_date">
                                    2.5.33
                                </div>
                                <div class="divice-view__compatible-firmware-entry_url">
                                    http://example.com
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
        
                <!-- <script type="text/javascript" src="./jquery.min.js"></script>
                <script type="text/javascript" src="./scripts.js"></script> -->
            </body>
        </html>`;
    }
}