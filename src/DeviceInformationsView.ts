//Import VS Code API module
import * as vscode from 'vscode';

export class DeviceInformationsView {

    // private static view: DeviceInformationsView;
    private webViewPanel;

    public constructor() {
        this.webViewPanel = vscode.window.createWebviewPanel(
            'deviceInforamtion',            // internal panel/view type
            'SICK Sensors Inforamtion',     // tab title of the web view
            vscode.ViewColumn.One,          // colum to display the web view in by default
            {}
        );
    }
    // public openView(extensionURI: vscode.Uri) {

    // }
}