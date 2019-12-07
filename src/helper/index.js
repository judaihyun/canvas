
import { isExist, contextValidator, drawingRect } from './utils';
import {niceScale} from './scale.calculate';
import {ratioCalculator, computeSize} from './size.calculate';
import {mergeConfig} from './merge';


const DEBUG_MODE = false;

let Helper = {};
Helper.niceScale = niceScale;
Helper.ratioCalculator = ratioCalculator;
Helper.contextValidator = contextValidator;
Helper.isExist = isExist;
Helper.drawingRect = drawingRect;
Helper.mergeConfig = mergeConfig;
Helper.computeSize = computeSize;


export { Helper, DEBUG_MODE };