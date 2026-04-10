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
 * @fileoverview Pre-compiled JS equivalent of google_codelab.soy.
 */

goog.provide('googlecodelabs.Codelab.Templates');

goog.require('soy');
goog.require('soydata');

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.Codelab.Templates.structure = function(opt_data) {
  var feedback = opt_data.feedback;
  var homeUrl = opt_data.homeUrl;
  var output = '<div id="codelab-title">' +
      '<div id="codelab-nav-buttons">' +
      '<a href="' + soy.$$escapeHtmlAttribute(homeUrl) +
      '" id="arrow-back"><i class="material-icons">close</i></a>' +
      '<a href="#" id="menu"><i class="material-icons">menu</i></a>' +
      '</div>' +
      '<div class="codelab-time-container"></div></div>' +
      '<nav id="drawer"></nav>' +
      '<div id="main"><div id="steps"></div>' +
      '<div id="controls"><div id="fabs">' +
      '<a href="#" id="previous-step" title="Previous step">Back</a>' +
      '<div class="spacer"></div>' +
      '<a href="#" id="next-step" title="Next step">Next</a>' +
      '<a href="' + soy.$$escapeHtmlAttribute(homeUrl) +
      '" id="done" hidden title="Codelab complete">Done</a>' +
      '</div></div></div><div class="metadata">';
  if (feedback) {
    output += '<a target="_blank" href="' +
        soy.$$escapeHtmlAttribute(feedback) + '">';
  } else {
    output += '<a href="#" id="codelab-feedback">';
  }
  output += '<i class="material-icons">bug_report</i> Report a mistake</a></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.Codelab.Templates.title = function(opt_data) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(
      '<h1 is-upgraded class="title"><a href="' +
      soy.$$escapeHtmlAttribute(opt_data.url) + '">' +
      soy.$$escapeHtml(opt_data.title) + '</a></h1>');
};

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.Codelab.Templates.timeRemaining = function(opt_data) {
  var time = opt_data.time;
  var label = time == 1 ? time + ' min remaining' : time + ' mins remaining';
  var title = time == 1 ?
      'Estimated time remaining: ' + time + ' minute' :
      'Estimated time remaining: ' + time + ' minutes';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(
      '<div class="time-remaining" tabindex="0" role="timer" title="' +
      soy.$$escapeHtmlAttribute(title) + '">' +
      '<i class="material-icons">access_time</i>' + label + '</div>');
};

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.Codelab.Templates.drawer = function(opt_data) {
  var output = '<div class="codelab-time-container"></div>' +
      '<div class="steps"><ol>';
  for (var i = 0; i < opt_data.steps.length; i++) {
    output += '<li><a href="#' + i + '"><span class="step"><span>' +
        soy.$$escapeHtml(opt_data.steps[i]) + '</span></span></a></li>';
  }
  output += '</ol></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
