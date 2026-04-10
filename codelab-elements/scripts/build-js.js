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

const {execFileSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
fs.mkdirSync(distDir, {recursive: true});

const compilerPath = require.resolve('google-closure-compiler/cli.js');
const closureLibDir = path.join(
    __dirname, '..', 'node_modules', 'google-closure-library', 'closure');
const shimsDir = path.join(__dirname, '..', 'shims');

/**
 * Common Closure Compiler flags.
 *
 * Uses SIMPLE compilation (instead of the original ADVANCED) because the
 * pre-compiled Soy template shims and safevalues shim are not annotated
 * for ADVANCED optimizations. Migrating to ES modules + tree-shaking via
 * Rollup/esbuild is planned as a follow-up to restore smaller bundles.
 */
const commonFlags = [
  '--compilation_level=SIMPLE',
  '--language_in=ECMASCRIPT_NEXT',
  '--language_out=ECMASCRIPT5_STRICT',
  '--process_closure_primitives',
  '--rewrite_polyfills=false',
  '--export_local_property_definitions',
  '--isolation_mode=IIFE',
  '--generate_exports',
  '--dependency_mode=PRUNE',
  '--hide_warnings_for=node_modules',
  // Include Closure Library
  '--js=' + closureLibDir + '/goog/**.js',
  '--js=!' + closureLibDir + '/goog/**_test.js',
  '--js=!' + closureLibDir + '/goog/demos/**',
  '--js=!' + closureLibDir + '/goog/debug/fpsdisplay.js',
  // Include shims (soy runtime, safevalues)
  '--js=' + shimsDir + '/soyutils.js',
  '--js=' + shimsDir + '/safevalues_dom.js',
];

/**
 * Compiles JS sources using Closure Compiler and writes the output.
 * @param {Object} config
 * @param {string[]} config.srcs - Source JS files (relative to codelab-elements/).
 * @param {string[]} config.entryPoints - Closure entry point namespaces.
 * @param {string} config.outputFile - Output filename in dist/.
 */
function compileJS(config) {
  const srcs = config.srcs.map(
      (s) => '--js=' + path.join(__dirname, '..', s));
  const entryFlags = config.entryPoints.map(
      (ep) => '--entry_point=' + ep);
  const args = [
    compilerPath,
    ...commonFlags,
    ...entryFlags,
    ...srcs,
    '--js_output_file=' + path.join(distDir, config.outputFile),
  ];

  execFileSync('node', args, {stdio: 'inherit', cwd: path.join(__dirname, '..')});
}

// Build codelab-elements.js: analytics + codelab + about + step + survey
// Each component is compiled separately and concatenated, matching Bazel behavior.
const codelabElementsComponents = [
  {
    srcs: [
      'google-codelab-analytics/google_codelab_analytics.js',
      'google-codelab-analytics/google_codelab_analytics_def.js',
    ],
    entryPoints: ['googlecodelabs.CodelabAnalyticsDef'],
    outputFile: '_analytics.js',
  },
  {
    srcs: [
      'google-codelab/google_codelab.soy.js',
      'google-codelab/google_codelab.js',
      'google-codelab/google_codelab_def.js',
    ],
    entryPoints: ['googlecodelabs.CodelabDef'],
    outputFile: '_codelab.js',
  },
  {
    srcs: [
      'google-codelab-about/google_codelab_about.soy.js',
      'google-codelab-about/google_codelab_about.js',
      'google-codelab-about/google_codelab_about_def.js',
    ],
    entryPoints: ['googlecodelabs.CodelabAboutDef'],
    outputFile: '_about.js',
  },
  {
    srcs: [
      'google-codelab-step/google_codelab_step.soy.js',
      'google-codelab-step/google_codelab_step.js',
      'google-codelab-step/google_codelab_step_def.js',
    ],
    entryPoints: ['googlecodelabs.CodelabStepDef'],
    outputFile: '_step.js',
  },
  {
    srcs: [
      'google-codelab-survey/google_codelab_survey.soy.js',
      'google-codelab-survey/google_codelab_survey.js',
      'google-codelab-survey/google_codelab_survey_def.js',
    ],
    entryPoints: ['googlecodelabs.CodelabSurveyDef'],
    outputFile: '_survey.js',
  },
];

for (const component of codelabElementsComponents) {
  console.log('  Compiling ' + component.outputFile + '...');
  compileJS(component);
}

// Concatenate all component outputs into codelab-elements.js
const codelabElementsOutput = codelabElementsComponents.map((c) => {
  return fs.readFileSync(path.join(distDir, c.outputFile), 'utf8');
});
fs.writeFileSync(
    path.join(distDir, 'codelab-elements.js'),
    codelabElementsOutput.join('\n'));

// Clean up temporary files
for (const component of codelabElementsComponents) {
  fs.unlinkSync(path.join(distDir, component.outputFile));
}

console.log('  Created codelab-elements.js');

// Build codelab-index.js
console.log('  Compiling codelab-index.js...');
compileJS({
  srcs: [
    'google-codelab-index/google_codelab_index.soy.js',
    'google-codelab-index/google_codelab_index.js',
    'google-codelab-index/google_codelab_index_def.js',
    'google-codelab-index/google_codelab_index_cards.js',
    'google-codelab-index/google_codelab_index_cards_def.js',
  ],
  entryPoints: [
    'googlecodelabs.CodelabIndex.CardsDef',
    'googlecodelabs.CodelabIndexDef',
  ],
  outputFile: 'codelab-index.js',
});
console.log('  Created codelab-index.js');
