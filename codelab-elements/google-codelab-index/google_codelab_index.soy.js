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
 * @fileoverview Pre-compiled JS equivalent of google_codelab_index.soy.
 */

goog.provide('googlecodelabs.CodelabIndex.Templates');

goog.require('soy');
goog.require('soydata');

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.CodelabIndex.Templates.card = function(opt_data) {
  var output = '<div class="card-header ' +
      soy.$$escapeHtmlAttribute(opt_data.category) + '-bg">' +
      '<span class="category-icon ' +
      soy.$$escapeHtmlAttribute(opt_data.category) + '-icon"></span>' +
      '<span class="card-duration">';
  if (opt_data.duration) {
    output += '<img src="//codelabs.developers.google.com/images/schedule.svg">';
    output += opt_data.duration == 1 ?
        opt_data.duration + ' min remaining' :
        opt_data.duration + ' mins remaining';
  }
  output += '</span></div><div class="card-description">' +
      soy.$$escapeHtml(opt_data.title) +
      '</div><div class="card-footer ' +
      soy.$$escapeHtmlAttribute(opt_data.category) + '-footer">' +
      '<span class="card-start ' +
      soy.$$escapeHtmlAttribute(opt_data.category) + '-start">Start</span>' +
      '<span class="card-updated">';
  if (opt_data.authors) {
    output += '<div>' + soy.$$escapeHtml(opt_data.authors) + '</div>';
  }
  if (opt_data.updated) {
    output += '<div>Updated ' + soy.$$escapeHtml(opt_data.updated) + '</div>';
  }
  output += '</span></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};

/**
 * @param {Object} opt_data
 * @return {!goog.soy.data.SanitizedHtml}
 */
googlecodelabs.CodelabIndex.Templates.sortby = function(opt_data) {
  var sort = opt_data.sort;
  var categories = opt_data.categories;
  var output = '<div id="sort-by-tabs" class="sort-by-inner">' +
      '<a href="#" sort="alpha"' + (sort == 'alpha' ? ' selected' : '') + '>A-Z</a>' +
      '<a href="#" sort="recent"' + (sort == 'recent' ? ' selected' : '') + '>Recent</a>' +
      '<a href="#" sort="duration"' + (sort == 'duration' ? ' selected' : '') + '>Duration</a>' +
      '</div><div class="sort-by-inner"><select id="codelab-categories">' +
      '<option value="">Category</option>';
  for (var i = 0; i < categories.length; i++) {
    output += '<option value="' + soy.$$escapeHtmlAttribute(categories[i]) + '">' +
        soy.$$escapeHtml(categories[i]) + '</option>';
  }
  output += '</select></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
