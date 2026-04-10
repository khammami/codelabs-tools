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
 * @fileoverview Minimal shim for safevalues.dom module, providing the
 * safeScriptEl API used by google-codelab-analytics.
 */

goog.module('safevalues.dom');

const {TrustedResourceUrl} = goog.require('goog.html.TrustedResourceUrl');

/**
 * Safe wrapper for script element operations.
 */
const safeScriptEl = {
  /**
   * Safely sets the src attribute on a script element.
   * @param {!HTMLScriptElement} scriptEl
   * @param {!TrustedResourceUrl} url
   */
  setSrc(scriptEl, url) {
    scriptEl.src = goog.html.TrustedResourceUrl.unwrap(url);
  }
};

exports = {safeScriptEl};
