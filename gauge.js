﻿/*!
 * SimpleGauge v1.0 - Vanilla Javascript chart
 * Copyright 2024 Silvio Delgado (https://github.com/silviodelgado)
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 * https://github.com/silviodelgado/SimpleGauge
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else {
        root.gauge = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';

    let container, title, indicator;
    let degrees = 0;
    const values = {
        min: 0,
        max: 0,
        current: 0
    }

    const load_container = (selector) => {
        container = document.querySelector(selector);
        if (!container) {
            console.error('Container \'' + selector + '\' not found.');
            return;
        }
        values.min = container.dataset.min || 0;
        values.max = container.dataset.max || 100;
        if (container.classList.contains('gauge-initializated')) {
            title = container.querySelector('.gauge-title');
            indicator = container.querySelector('.gauge-indicator');
        }
    };

    const init = (selector) => {
        load_container(selector);        
        values.current = container.dataset.initial || 0;
        container.classList.add('gauge');
        indicator = document.createElement('div');
        indicator.classList.add('gauge-indicator');
        title = document.createElement('h1');
        title.classList.add('gauge-title');
        container.appendChild(title);
        container.appendChild(indicator);
        container.classList.add('gauge-initializated');
        update_gauge();
    };
    
    const update_gauge = () => {   
        container.dataset.current = values.current;
        degrees = Math.round((values.current / values.max) * 180);
        title.innerText = values.current;
        indicator.style.setProperty('--gauge-rotation', `${degrees}deg`);
    };
    
    const set = (selector, newCurrent) => {
        load_container(selector);
        if (newCurrent < values.min) {
            newCurrent = values.min;
        }
        if (newCurrent > values.max) {
            newCurrent = values.max;
        }
        values.current = newCurrent;
        update_gauge();
    };

    const reset = (selector) => {
        load_container(selector);
        values.current = container.dataset.initial;
        update_gauge();    
    };

    return {
        init,
        set,
        reset
    }
});