"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Rest = void 0;
var BaseMove_1 = require("../BaseMove");
var Rest = /** @class */ (function (_super) {
    __extends(Rest, _super);
    function Rest(source) {
        var _this = _super.call(this, source) || this;
        _this.source = source;
        _this.effect = function () {
            var target = _this.source;
            target.adjustStamina(100);
        };
        return _this;
    }
    return Rest;
}(BaseMove_1.BaseMove));
exports.Rest = Rest;
