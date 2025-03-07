"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectDetector = projectDetector;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
function projectDetector(rootFolder, projectConfig) {
    console.log("Project detector called");
    let detected = false;
    for (const [projectType, { requiredFiles, matchAny }] of Object.entries(projectConfig)) {
        if (detected) {
            break;
        }
        let allFilesExist = false;
        if (matchAny) {
            allFilesExist = requiredFiles.some((file) => fs.existsSync(path.join(rootFolder, file)));
        }
        else {
            allFilesExist = requiredFiles.every((file) => fs.existsSync(path.join(rootFolder, file)));
        }
        if (allFilesExist) {
            // vscode.window.showInformationMessage(`This is a ${projectType} project.`);
            detected = true;
            vscode.commands.executeCommand('extension.runParser', rootFolder, projectType)
                .then(() => {
                console.log("HELO WORLD");
                vscode.window.showInformationMessage(`Parser executed successfully for ${projectType} project.`);
                vscode.commands.executeCommand('extension.refreshPackageTree');
            });
        }
    }
}
//# sourceMappingURL=projectDetector.js.map