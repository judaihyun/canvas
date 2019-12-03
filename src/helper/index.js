
import {niceScale} from './scale.calculate';
import {ratioCalculator, computeSize} from './size.calculate';
import { isExist, contextValidator, drawingRect } from './utils';
import {mergeConfig} from './merge';
import { computedSize } from '../options/values';

'use strict'

const DEBUG_MODE = false;

function debugConsole(str) {
    if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE)
        console.log(str);
}


let Helper = {};
Helper.niceScale = niceScale;
Helper.ratioCalculator = ratioCalculator;
Helper.contextValidator = contextValidator;
Helper.isExist = isExist;
Helper.drawingRect = drawingRect;
Helper.mergeConfig = mergeConfig;
Helper.computeSize = computeSize;

console.dir(Helper);

export { debugConsole, Helper, DEBUG_MODE };