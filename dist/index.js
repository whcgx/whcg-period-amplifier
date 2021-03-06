'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var polymerElement_js = require('@polymer/polymer/polymer-element.js');

/**
 * `WhcgPeriodCompounder`
 * 
 * @customElement
 * @polymer
 */

class WhcgPeriodAmplifier extends polymerElement_js.PolymerElement {
    
    static get properties() {

        return {
            period: {
                type: String,
                notify: true,
                readOnly: false,
            },
            rate: {
                type: String,
                notify: true,
                readOnly: false,
            },
            whcgjsoninput: {
                type: String,
                notify: true,
                readOnly: false,
            },
            label: {
                type: String,
                notify: true,
                readOnly: false,
                value: 'kr'
            },
            amplifier: {
                type: String,
                notify: true,
                readOnly: false,
            },
            whcgjsonoutput: {
                type: String,
                notify: true,
                readOnly: false,
            },
            name: {
                type: String,
                notify: true,
                readOnly: false,
            },
            datapackage: {
                type: String,
                notify: true,
                readOnly: false,
                value: 'cost'
            },
        }
    };

    static get observers() {
        return [
            '_amplifier(period, amplifier, whcgjsoninput)'
        ]
    }


    _amplifier() {

        console.log('A start value');
        console.log(this.period);
        console.log(this.amplifier);
        console.log(this.whcgjsoninput);
        
        let startValue = JSON.parse(this.whcgjsoninput).result[0].data[this.datapackage].dataset;
        console.log(startValue);
        let svobj = Object.values(startValue);
        console.log(svobj);
        //let arr = new Array(Number(this.period)).fill(startValue);
        let mappedArr = svobj.map((element, index) => {
            return element * Number(this.amplifier);
        });

        console.log(mappedArr);

        this.jsonBuilder(mappedArr);
    }

    jsonBuilder(mappedArr) {
        let whcgObj = {};
        whcgObj.result = [];

        function subDataFactory(item) {
            let dataobj = {};
            for (let i = 0; i < item; i++) {
                Object.assign(dataobj, {
                    [String(i)]: mappedArr[i]
                });
            }

            return dataobj;
        }

        function dataFactory(item) {
            let dataobj = {};

            Object.assign(dataobj, {
                [this.datapackage]: {
                    label: this.label,
                    dataset: subDataFactory(item)
                }
            });

            return dataobj;
        }

        function resultElementObjFactory() {
            return {
                object: this.name,
                data: dataFactory.call(this, mappedArr.length)
            }
        }

        whcgObj.result.push(resultElementObjFactory.call(this));

        this.whcgjsonoutput = JSON.stringify(whcgObj);


    }; 
}

window.customElements.define('whcg-period-amplifier', WhcgPeriodAmplifier);

exports.WhcgPeriodAmplifier = WhcgPeriodAmplifier;
