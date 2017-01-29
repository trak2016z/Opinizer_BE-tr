"use strict";

const controller = require('./item-template.controller.js');
const Joi = require("joi");

const field = Joi.object().keys({
    field_name:Joi.string().required(),
    field_type:Joi.number().required(),
    item_field_id:Joi.string(),
    item_template_id:Joi.string().required(),
    creation_date:Joi.string()
});

module.exports = [
    {
        path :'/item-template',
        method:'GET',
        config:{
            handler: controller.getTemplates,
            auth: { mode: 'try' },
        }
    },
    {
        path :'/item-template/{item_template_id}',
        method:'GET',
        config:{
            auth: { mode: 'try' },
            handler: controller.getTemplate
        }
    },
    {
        path :'/item-template',
        method:'POST',
        config:{
            validate: {
                payload: {
                    template_name: Joi.string().min(2).max(128).required(),
                    template_description: Joi.string().max(8192),
                    addFields:Joi.array().items(field)
                }
            },
            auth: { mode: 'try' },
            handler: controller.saveTemplate
        }
    },
    {
        path :'/item-template/{item_template_id}',
        method:'PUT',
        config: {
            validate: {
                payload: {
                    template_name: Joi.string().min(2).max(128).required(),
                    template_description: Joi.string().max(8192),
                    user_id: Joi.number().integer().required(),
                    item_template_id: Joi.number().integer().required(),
                    creation_date: Joi.string(),
                    addFields:Joi.array().items(field),
                    removeFields:Joi.array().items(field)
                }
            },
            handler: controller.updateTemplate
        }
    },
    {
        path :'/item-template/{item_template_id}',
        method:'DELETE',
        config:{
            handler: controller.deleteTemplate
        }
    }/*,
    {
        path :'/item-template/search',
        method:'POST',
        config:{
            handler: controller.searchTemplates,
            auth: false
        }
    },*/
]