'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// FSA

var writeOverDispatch = function writeOverDispatch(store) {
	return function (next) {
		return function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action) {
				var _action, async, before, fail, after, bAsync;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_action = action, async = _action.async, before = _action.before, fail = _action.fail, after = _action.after;
								bAsync = false;

								delete action['fail'];
								delete action['before'];
								delete action['async'];
								delete action['after'];

								if (!(async && async instanceof Promise)) {
									_context.next = 11;
									break;
								}

								bAsync = true;
								if (before) {
									next(before());
								}
								_context.next = 11;
								return new Promise(function (resolve) {
									async.then(function (data) {
										action = _extends({}, action, { async: data });
										resolve(action);
									}, function (err) {
										action = fail ? _extends({}, action, fail()) : _extends({}, action, { async: 'fail' });
										resolve(action);
									}).catch(function (err) {
										throw new Error("Error:" + err.toString());
									});
								});

							case 11:
								;
								next(action);
								if (after && bAsync) {
									next(after());
								};

							case 15:
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
