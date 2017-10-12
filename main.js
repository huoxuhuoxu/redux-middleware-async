'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FSA

var writeOverDispatch = function writeOverDispatch(store) {
	return function (next) {
		return function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
				var _action, async, before, fail;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_action = action, async = _action.async, before = _action.before, fail = _action.fail;

								delete action['fail'];
								delete action['before'];
								delete action['async'];

								if (!(async && async instanceof _promise2.default)) {
									_context.next = 8;
									break;
								}

								if (before) {
									next(before());
								}
								_context.next = 8;
								return new _promise2.default(function (resolve) {
									async.then(function (data) {
										action = (0, _extends3.default)({}, action, { async: data });
										resolve(action);
									}, function (err) {
										action = fail ? (0, _extends3.default)({}, action, fail()) : (0, _extends3.default)({}, action, { async: 'fail' });
										resolve(action);
									}).catch(function (err) {
										throw new Error("Error:" + err.toString());
									});
								});

							case 8:
								;
								next(action);

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, undefined);
			}));

			return function (_x) {
				return _ref.apply(this, arguments);
			};
		}();
	};
};

exports.default = writeOverDispatch;
