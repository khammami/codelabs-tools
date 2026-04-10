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

/**
 * @fileoverview Pre-compiled JS equivalent of google_codelab_about.soy.
 */

goog.provide('googlecodelabs.CodelabAbout.Templates');

goog.require('soy');
goog.require('soydata');

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.CodelabAbout.Templates.about = function(opt_data) {
  var output = '';
  if (opt_data.codelabTitle) {
    output += '<div class="codelab-title">';
    for (var i = 0; i < opt_data.codelabTitle.length; i++) {
      output += '<div class="token">' +
          soy.$$escapeHtml(opt_data.codelabTitle[i]) + '</div>';
    }
    output += '</div>';
  }
  output += '<div class="about-card"><h2 class="title">About this codelab</h2>';
  if (opt_data.lastUpdated) {
    output += '<div class="last-updated">' +
        '<i class="material-icons">subject</i>Last updated ' +
        soy.$$escapeHtml(opt_data.lastUpdated) + '</div>';
  }
  output += '<div class="authors"><i class="material-icons">account_circle</i>';
  if (opt_data.authors) {
    output += 'Written by ' + soy.$$escapeHtml(opt_data.authors);
  } else {
    output += 'Written by a Googler';
  }
  output += '</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
