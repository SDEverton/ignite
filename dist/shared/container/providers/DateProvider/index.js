"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("./Implementations/DayjsDateProvider");

_tsyringe.container.registerSingleton('DayjsDateProvider', _DayjsDateProvider.DayjsDateProvider);