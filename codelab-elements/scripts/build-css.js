/**
 * @license
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const sass = require('sass');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
fs.mkdirSync(distDir, {recursive: true});

/**
 * Compiles SCSS files and concatenates the results.
 * @param {string[]} scssFiles - Array of SCSS file paths (relative to codelab-elements/).
 * @param {string} outputFile - Output filename in dist/.
 */
function buildCSS(scssFiles, outputFile) {
  const results = scssFiles.map((file) => {
    const filePath = path.join(__dirname, '..', file);
    const result = sass.compile(filePath, {style: 'compressed'});
    return result.css;
  });
  const outputPath = path.join(distDir, outputFile);
  fs.writeFileSync(outputPath, results.join('\n'));
  console.log(`  Created ${outputFile}`);
}

// codelab-elements.css: concat of google-codelab, google-codelab-about,
//   google-codelab-step, google-codelab-survey SCSS outputs
buildCSS([
  'google-codelab/index.scss',
  'google-codelab-about/google_codelab_about.scss',
  'google-codelab-step/google_codelab_step.scss',
  'google-codelab-survey/google_codelab_survey.scss',
], 'codelab-elements.css');

// codelab-index.css: google-codelab-index SCSS output
buildCSS([
  'google-codelab-index/google_codelab_index.scss',
], 'codelab-index.css');
