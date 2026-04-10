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
 * @fileoverview Pre-compiled JS equivalent of google_codelab_step.soy.
 */

goog.provide('googlecodelabs.CodelabStep.Templates');

goog.require('soy');
goog.require('soydata');

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.CodelabStep.Templates.title = function(opt_data) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(
      '<h2 is-upgraded class="step-title"><a href="#' +
      soy.$$escapeHtmlAttribute(opt_data.step) + '">' +
      (opt_data.step + 1) + '. ' + soy.$$escapeHtml(opt_data.label) +
      '</a></h2>');
};
