/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/

const DropdownView = require('../dropdown.view')
const template = require('./dropdown.details-filter.hbs')
const ComponentView = require('../../details-filter/details-filter.view.js')

module.exports = DropdownView.extend({
  template,
  className: 'is-detailsFilter',
  componentToShow: ComponentView,
  initialize() {
    DropdownView.prototype.initialize.call(this)
    this.handleFilter()
    this.listenTo(this.model, 'change:value', this.handleFilter)
  },
  handleFilter() {
    const value = this.model.get('value')
    this.$el.toggleClass('has-filter', value !== undefined && value !== '')
  },
})
