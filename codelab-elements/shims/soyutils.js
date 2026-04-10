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
 * @fileoverview Minimal Soy runtime utilities for pre-compiled templates.
 * Provides the subset of soyutils_usegoog.js needed by this project's
 * templates.
 */

goog.provide('soy');
goog.provide('soydata');
goog.provide('soydata.VERY_UNSAFE');

goog.require('goog.soy.data.SanitizedContent');
goog.require('goog.soy.data.SanitizedContentKind');
goog.require('goog.soy.data.SanitizedHtml');

/**
 * Escapes HTML special characters in a string.
 * @param {*} value The value to escape. May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.$$escapeHtml = function(value) {
  return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
};

/**
 * Escapes HTML special characters in a string for use as an attribute value.
 * @param {*} value The value to escape.
 * @return {string} The escaped attribute value.
 */
soy.$$escapeHtmlAttribute = function(value) {
  return soy.$$escapeHtml(value);
};

/**
 * Creates a SanitizedHtml object from a known-safe HTML string.
 * @param {string} html
 * @return {!goog.soy.data.SanitizedHtml}
 * @suppress {invalidCasts}
 */
soydata.VERY_UNSAFE.ordainSanitizedHtml = function(html) {
  var content = String(html);
  return /** @type {!goog.soy.data.SanitizedHtml} */ ({
    content: content,
    contentDir: null,
    contentKind: goog.soy.data.SanitizedContentKind.HTML,
    toString: function() { return content; },
    toSafeHtml: function() {
      return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
          content, null);
    },
    getContent: function() { return content; }
  });
};
