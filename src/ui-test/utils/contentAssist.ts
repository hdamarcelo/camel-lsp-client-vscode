/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License", destination); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TextEditor, ContentAssist, WebDriver } from 'vscode-extension-tester';
import { DefaultWait } from 'vscode-uitests-tooling';

export async function waitUntilContentAssistContains(driver: WebDriver, contentAssist: ContentAssist, editor: TextEditor, expectedContentAssist: string): Promise<ContentAssist> {
    await driver.wait(async function () {
        contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
        const hasItem = await contentAssist.hasItem(expectedContentAssist);
        if (!hasItem) {
            await editor.toggleContentAssist(false);
        }
        return hasItem;
    }, DefaultWait.TimePeriod.DEFAULT);
    return contentAssist;
}