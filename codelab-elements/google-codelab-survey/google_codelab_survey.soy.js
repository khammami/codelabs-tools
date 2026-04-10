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
 * @fileoverview Pre-compiled JS equivalent of google_codelab_survey.soy.
 */

goog.provide('googlecodelabs.CodelabSurvey.Templates');

goog.require('soy');
goog.require('soydata');

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.CodelabSurvey.Templates.survey = function(opt_data) {
  var output = '<div class="survey-questions" survey-name="' +
      soy.$$escapeHtmlAttribute(opt_data.surveyName) + '">';
  for (var i = 0; i < opt_data.surveyQuestions.length; i++) {
    var q = opt_data.surveyQuestions[i];
    output += '<div class="survey-question-wrapper"><h4>' +
        soy.$$escapeHtml(q.question) + '</h4>';
    if (q.options && q.options.length) {
      output += '<div class="survey-question-options">';
      for (var j = 0; j < q.options.length; j++) {
        var opt = q.options[j];
        output += '<label class="survey-option-wrapper" id="' +
            soy.$$escapeHtmlAttribute(opt.radioId) + '-label" for="' +
            soy.$$escapeHtmlAttribute(opt.radioId) + '">' +
            '<span class="option-text">' +
            soy.$$escapeHtml(opt.radioTitle) + '</span>' +
            '<input type="radio" id="' +
            soy.$$escapeHtmlAttribute(opt.radioId) + '" name="' +
            soy.$$escapeHtmlAttribute(q.question) + '">' +
            '<span class="custom-radio-button"></span></label>';
      }
      output += '</div>';
    }
    output += '</div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
