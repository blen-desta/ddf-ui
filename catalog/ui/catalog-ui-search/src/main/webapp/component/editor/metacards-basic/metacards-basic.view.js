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
/*global define*/
define([
    'marionette',
    'underscore',
    'jquery',
    '../editor.view',
    'js/store',
    'component/input/metacard/input-metacard.collection.view',
    'component/input/metacard/input-metacard.collection'
], function (Marionette, _, $, EditorView, store, InputMetacardCollectionView, InputMetacardCollection) {

    return EditorView.extend({
        className: 'is-metacards-basic',
        setDefaultModel: function(){
            this.model = store.getSelectedResults();
        },
        onBeforeShow: function(){
            this.editorProperties.show(new InputMetacardCollectionView({
                collection: InputMetacardCollection.createBulkBasic(this.model)
            }));
            this.editorProperties.currentView.$el.addClass("is-list");
            //this.editorProperties.currentView.turnOnLimitedWidth();
        },
        initialize: function(options){
            EditorView.prototype.initialize.call(this, options);
            //this.getValidation();
        },
        getValidation: function(){
            var self = this;
            $.get('/services/search/catalog/metacard/'+this.model.id+'/validation').then(function(response){
                if (!self.isDestroyed){
                    self.editorProperties.currentView.updateValidation(response);
                }
            }).always(function(){
                if (!self.isDestroyed){

                }
            });
        },
        afterCancel: function(){
            this.getValidation();
        },
        afterSave: function(){
            this.getValidation();
        }
    });
});
