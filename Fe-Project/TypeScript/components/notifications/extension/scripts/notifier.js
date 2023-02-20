/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
    var __webpack_exports__ = {};

    ;// CONCATENATED MODULE: ./components/notifications/notifier-base.ts
    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var EventTrigger = /** @class */ (function () {
        function EventTrigger() {
            this.interval = 5 * 60 * 1000;
            this.notifierTimes = 0;
            this.resetTimes = 0;
        }
        EventTrigger.prototype.RunNotifier = function (runAfterMiliseconds) {
            var _this = this;
            if (runAfterMiliseconds === void 0) { runAfterMiliseconds = 10; }
            if (window.location.href.startsWith('https://store-site')) {
                window.notifierCheckerId = setTimeout(function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.notifierTimes++;
                            console.groupCollapsed();
                            console.log("start notifier times ".concat(this.notifierTimes, " with reset times ").concat(this.resetTimes, " after"), runAfterMiliseconds, new Date());
                            this.clearOldJob();
                            new Notification('tititititititi', {
                                body: "notification at ".concat(new Date().toLocaleTimeString())
                            });
                            // await this.notifier();
                            console.groupEnd();
                            return [2 /*return*/];
                        });
                    });
                }, runAfterMiliseconds);
            }
            else {
                this.RemoveAll();
            }
        };
        EventTrigger.prototype.RemoveAll = function () {
            clearInterval(window.intervalReset);
            this.clearOldJob();
        };
        EventTrigger.prototype.Start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // if (!this.shouldRun()) {
                    //     console.log(`wont run ${this.toolPrefix}`)
                    //     return;
                    // }
                    this.RunNotifier();
                    setInterval(function () {
                        _this.ResetNotifier();
                    }, this.interval);
                    return [2 /*return*/];
                });
            });
        };
        EventTrigger.prototype.ResetNotifier = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.resetTimes++;
                    this.clearOldJob();
                    this.ResetData();
                    this.RunNotifier(5 * 1000 * 60);
                    return [2 /*return*/];
                });
            });
        };
        EventTrigger.prototype.clearOldJob = function () {
            // clearTimeout(window.notifierCheckerId);
            // window.notifierCheckerId = undefined;
        };
        EventTrigger.prototype.StopNofifier = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearTimeout(window.notifierCheckerId);
                    this.shouldStopNotice = true;
                    return [2 /*return*/];
                });
            });
        };
        EventTrigger.prototype.notifier = function () {
            return __awaiter(this, void 0, void 0, function () {
                var jobOptions, requestPermission, notification, nextTriggerAfter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getJobNotification()];
                        case 1:
                            jobOptions = _a.sent();
                            if (!(jobOptions === null || jobOptions === void 0 ? void 0 : jobOptions.notificationOptions)) return [3 /*break*/, 4];
                            if (!(Notification.permission !== "granted")) return [3 /*break*/, 3];
                            return [4 /*yield*/, Notification.requestPermission()];
                        case 2:
                            requestPermission = _a.sent();
                            if (requestPermission !== "granted") {
                                alert("This page is not allowed notifications,notifier tool won't work");
                                return [2 /*return*/];
                            }
                            _a.label = 3;
                        case 3:
                            notification = new Notification('Notifier helper', __assign({
                                // icon: chrome.runtime.getURL('penguin.jpg'),
                                icon: "https://lh3.googleusercontent.com/VykY8YriaQ4CeX5WAfu5jIgwBYMA9M-QFdkcYv8WmiNXrRp0ZtKPTxLa_olxSo7IlW-yBeClRPIdVFGwtgwOxvT1mIcEAXDaWyH27ctiRM4U53ivWipLG8YQxfCteaKfAXYYr2bA07ggxLuK-oX1XL6TxzxDbS08aMMQz9DU3fuKcAfD_8QMdhYPGL8DUUbVv2O_hUdoD7RVz7cLxYgxYkIYp2XAODUG31y1VevXV_1gDOVB-O3uHbcqPNd2Brnbm8EyDW_sLxyDSUGoD4tk7eKkewDtdeLiaqaWbtQNzG5P_jLwh7KEiVZml4dq9g5Yk4tscyjIgSvztgFo-WbVKX9edCc-TLhd6JgTPs6YPn0Ont2cbGoloAZ-VRGvTxJI_HlooOWjJiLW6KaTRBXrX13loNE3kNZRhqfbgTWswLnYglS8CR7rJksMafA8mAInsq4bCTKCj3Qv-ijG1i2WoyprJ7lHzT5ZgmQLsmjxALdLDnE50hbfhYUCftoY6wMl5ti9lZN_OxARdC5yBkOIfM6CwCjV2RO9nWsTIYYfNLHou2SneOC8G-5Ppobe_8OwcfoYbEXfG-M81B8yDIMPe5NbQRGZzCkJDp9aF0CUsyuTh7Q1vyljwRPbeA3a9VsH98NTyPHqa3hpnCHFuCWo1JNmo6vmcVb4YohiBg8iVaTX_HgqxzK3OCkvPMEMQly9LhVlFgrIoC75Id0wiDqQpAgk7toVlDncZFaiPlYzb5uS6hAZ6nwz1H7_SKAo6IsFvEFPuuQ5VNFeCOu2qshqkdo8pyC5yVMrrWi4tNTESDDYONMyfjyJPd67DWIGqDArsvQhd_GmOuC0XwhWc3GTKYN0RQhihmVkCzL-P2Jabm9BA6_d61c6I0fvHRjUnJ6DRneui5Y84IEjRkLZFCZpK2iYJ8OlonMJNHOf0uuQwDkx7u8Y=s328-no?authuser=0"
                            }, jobOptions.notificationOptions));
                            this.populateNotificationEvent(notification);
                            _a.label = 4;
                        case 4:
                            nextTriggerAfter = jobOptions === null || jobOptions === void 0 ? void 0 : jobOptions.nextTriggerAfter;
                            if (nextTriggerAfter) {
                                console.log("run after ".concat(nextTriggerAfter / 1000 / 60, " minutes, equivalent ").concat(nextTriggerAfter / 1000, " seconds, at ").concat(new Date(nextTriggerAfter + Date.now())));
                                this.RunNotifier(nextTriggerAfter);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        EventTrigger.prototype.populateNotificationEvent = function (notification) {
            notification.addEventListener('click', function () {
                window.focus();
            });
        };
        EventTrigger.prototype.refreshActor = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        EventTrigger.prototype.triggerStopNotice = function () {
        };
        return EventTrigger;
    }());
/* harmony default export */ const notifier_base = (EventTrigger);

    ;// CONCATENATED MODULE: ./components/notifications/paasportal/app/paas-portal-notification.ts
    var __extends = (undefined && undefined.__extends) || (function () {
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
    var paas_portal_notification_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var paas_portal_notification_generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    var PaasPortalNotification = /** @class */ (function (_super) {
        __extends(PaasPortalNotification, _super);
        function PaasPortalNotification() {
            var _this = _super.call(this) || this;
            _this.totalDeploymentStep = 0;
            _this.interval = 1000 * 30; // 30s
            _this.toolPrefix = "PaasPortalNotification";
            return _this;
        }
        PaasPortalNotification.prototype.ResetData = function () {
        };
        PaasPortalNotification.prototype.getJobNotification = function () {
            return paas_portal_notification_awaiter(this, void 0, void 0, function () {
                var result, data, jsonData, firstJob, runningStatus;
                return paas_portal_notification_generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4 /*yield*/, (fetch('https://paasportal.episerver.net/projects/a839e1fb-2691-46be-92c0-aeed007b9ac2/recentsynchronizations'))];
                        case 1:
                            data = _a.sent();
                            if (!data.ok) return [3 /*break*/, 3];
                            return [4 /*yield*/, data.json()];
                        case 2:
                            jsonData = _a.sent();
                            firstJob = jsonData.synchronizations[0];
                            if (firstJob.endTime) {
                                return [2 /*return*/, result];
                            }
                            runningStatus = firstJob.status;
                            if (runningStatus == 'AwaitingVerification' || runningStatus == 'Completed' || runningStatus == 'Succeeded') {
                                this.totalDeploymentStep++;
                                result.notificationOptions = {
                                    body: "Deployment is done"
                                };
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, result];
                    }
                });
            });
        };
        PaasPortalNotification.prototype.shouldRun = function () {
            return window.location.href.startsWith('https://paasportal.episerver.net/') && this.totalDeploymentStep < 2;
        };
        return PaasPortalNotification;
    }(notifier_base));
/* harmony default export */ const paas_portal_notification = (PaasPortalNotification);

    ;// CONCATENATED MODULE: ./components/notifications/teams/app-copy/team-notification.ts
    var team_notification_extends = (undefined && undefined.__extends) || (function () {
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
    var team_notification_assign = (undefined && undefined.__assign) || function () {
        team_notification_assign = Object.assign || function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return team_notification_assign.apply(this, arguments);
    };
    var team_notification_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var team_notification_generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    var TeamNofifier = /** @class */ (function (_super) {
        team_notification_extends(TeamNofifier, _super);
        function TeamNofifier() {
            var _this = _super.call(this) || this;
            _this.interval = 6 * 60 * 1000;
            _this._token = undefined;
            _this._storageTimToLive = 1000 * 60 * 3; // 5 mins
            _this._storageKey = 'calander_custom';
            _this._teamStorageKeySuffix = "cache.token.https://api.spaces.skype.com";
            _this._baseUrl = 'https://teams.microsoft.com';
            _this._calanderApi = 'https://teams.microsoft.com/api/mt/part/emea-03/beta/me/calendarEvents';
            _this.dateTicks = 1000 * 60 * 60 * 24;
            _this.todayTime = new Date();
            _this.todayBeginTime = new Date(Math.floor(_this.todayTime / _this.dateTicks) * _this.dateTicks);
            _this.todayEndTime = new Date(_this.todayBeginTime / 1 + _this.dateTicks - 1);
            localStorage.removeItem(_this._storageKey);
            _this.meetings = [];
            _this.toolPrefix = "TeamNofifier";
            _this._reset = true;
            _this.lastNotifyMeeting = undefined;
            return _this;
        }
        TeamNofifier.prototype.ResetData = function () {
            localStorage.removeItem(this._storageKey);
            this._reset = true;
        };
        TeamNofifier.prototype.getJobNotification = function () {
            var _a, _b;
            return team_notification_awaiter(this, void 0, void 0, function () {
                var result, todayMeetings, closestMeeting, checkedTime, modifiedMessage, startAfter, lastTimeNotify, meetingsAfterCheckedTime, nextTriggerAfter, nextMetting;
                return team_notification_generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            result = {};
                            console.log('start get notification of ', this.toolPrefix);
                            return [4 /*yield*/, this.getOrCreateCalanderOnStorage()];
                        case 1:
                            todayMeetings = _c.sent();
                            if (!todayMeetings || !todayMeetings.length) {
                                return [2 /*return*/, result];
                            }
                            checkedTime = new Date();
                            modifiedMessage = this._getCheckModifiedrMeetingMessage(todayMeetings, checkedTime);
                            if (modifiedMessage) {
                                return [2 /*return*/, {
                                    nextTriggerAfter: 1 * 1000,
                                    notificationOptions: {
                                        body: "Meetings are up to date ".concat(modifiedMessage, ",\n click for more detail")
                                    }
                                }];
                            }
                            startAfter = 0;
                            lastTimeNotify = (_b = (_a = this.lastNotifyMeeting) === null || _a === void 0 ? void 0 : _a.startTime) !== null && _b !== void 0 ? _b : checkedTime;
                            meetingsAfterCheckedTime = todayMeetings.filter(function (m) {
                                return Math.round((m.startTime - lastTimeNotify) / 1000) > -1;
                            });
                            result.nextTriggerAfter = 10 * 1000;
                            closestMeeting = meetingsAfterCheckedTime.at(0);
                            nextTriggerAfter = undefined;
                            nextMetting = meetingsAfterCheckedTime.at(1);
                            // console.groupCollapsed();
                            if (closestMeeting) {
                                nextTriggerAfter = 10 * 1000;
                                startAfter = Math.round((closestMeeting.startTime - checkedTime) / 1000);
                                if (startAfter <= 15) {
                                    this.lastNotifyMeeting = closestMeeting;
                                    result.notificationOptions = {
                                        body: "Meeting \"".concat(closestMeeting.title, "\"\nwill start after ").concat(startAfter, " seconds \nat ").concat(closestMeeting.startTime.toLocaleTimeString())
                                    };
                                }
                                else {
                                    nextMetting = closestMeeting;
                                }
                                if (nextMetting) {
                                    nextTriggerAfter = Math.max(nextMetting.startTime - checkedTime - 10 * 1000, nextTriggerAfter);
                                }
                                result.nextTriggerAfter = nextTriggerAfter;
                                console.log('closest meeeintg, start after ,result', closestMeeting, startAfter, result);
                            }
                            else {
                                result.notificationOptions = {
                                    body: 'There is no meeting from now,\nwill notify if has new meeting'
                                };
                                console.log('there is no meeting from now');
                            }
                            // console.groupEnd();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        TeamNofifier.prototype._getCheckModifiedrMeetingMessage = function (todayMeetings, checkedTime) {
            var _this = this;
            var modifyMessage = "";
            if (this._reset) {
                this._reset = false;
                this.meetings = this.meetings.filter(function (m) {
                    return Math.round((m.startTime - checkedTime) / 1000) > -1;
                });
                var removedMeetings = this.meetings.filter(function (m) { return todayMeetings.every(function (n) { return n.objectId !== m.objectId; }); });
                var newCreatedMeeting = todayMeetings.filter(function (m) { return _this.meetings.every(function (n) { return n.objectId !== m.objectId; }); });
                this.meetings = todayMeetings;
                if (removedMeetings.length) {
                    var index_1 = 0;
                    modifyMessage += "removed ".concat(removedMeetings.length, "\n");
                    removedMeetings.forEach(function (remove) {
                        modifyMessage += "".concat(index_1 == 0 ? '' : ',', " ").concat(remove.title, " at ").concat(remove.startTime.toLocaleTimeString());
                    });
                }
                if (newCreatedMeeting.length) {
                    var index_2 = 0;
                    modifyMessage += "added ".concat(newCreatedMeeting.length, " \n");
                    newCreatedMeeting.forEach(function (add) {
                        modifyMessage += "".concat(index_2 == 0 ? '' : ',', " ").concat(add.title, " at ").concat(add.startTime.toLocaleTimeString());
                    });
                }
            }
            return modifyMessage;
        };
        TeamNofifier.prototype.populateNotificationEvent = function (notification) {
            notification.addEventListener('click', function () {
                window.focus();
                window.location.hash = '/calendarv2';
                // window.open(`${this._baseUrl}/_#/calendarv2`)
            });
        };
        TeamNofifier.prototype.shouldRun = function () {
            return window.location.href.startsWith(this._baseUrl);
        };
        TeamNofifier.prototype.getOrSetToken = function () {
            var _a;
            return team_notification_awaiter(this, void 0, void 0, function () {
                var localStorageTokenKey, stringData, tokenKey;
                var _this = this;
                return team_notification_generator(this, function (_b) {
                    if (this._token) {
                        return [2 /*return*/, this._token];
                    }
                    localStorageTokenKey = Object.keys(localStorage).find(function (m) { return m.endsWith(_this._teamStorageKeySuffix); });
                    if (localStorageTokenKey) {
                        stringData = localStorage.getItem(localStorageTokenKey);
                        if (stringData) {
                            tokenKey = (_a = JSON.parse(stringData)) === null || _a === void 0 ? void 0 : _a.token;
                            this._token = tokenKey;
                        }
                    }
                    return [2 /*return*/, this._token];
                });
            });
        };
        TeamNofifier.prototype.getTodayCalander = function () {
            return team_notification_awaiter(this, void 0, void 0, function () {
                var tokenKey, calendarResponse, jsonData, checkedTime_1, todayMeetings;
                return team_notification_generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrSetToken()];
                        case 1:
                            tokenKey = _a.sent();
                            if (!tokenKey) return [3 /*break*/, 4];
                            return [4 /*yield*/, fetch("".concat(this._calanderApi, "?StartDate=").concat(this.todayBeginTime.toUTCString(), "&EndDate=").concat(this.todayEndTime.toUTCString()), {
                                headers: {
                                    'authorization': "Bearer ".concat(tokenKey)
                                },
                            })];
                        case 2:
                            calendarResponse = _a.sent();
                            if (!calendarResponse.ok) return [3 /*break*/, 4];
                            return [4 /*yield*/, calendarResponse.json()];
                        case 3:
                            jsonData = _a.sent();
                            checkedTime_1 = Date.now();
                            todayMeetings = jsonData.value.map(function (m) {
                                return {
                                    startTime: new Date(m.startTime),
                                    title: m.subject,
                                    objectId: m.objectId
                                };
                            }).filter(function (m) {
                                return Math.round((m.startTime - checkedTime_1) / 1000) > -1;
                            });
                            return [2 /*return*/, todayMeetings];
                        case 4: return [2 /*return*/, []];
                    }
                });
            });
        };
        TeamNofifier.prototype.getOrCreateCalanderOnStorage = function () {
            return team_notification_awaiter(this, void 0, void 0, function () {
                var meetingCache, storageItem, jsonData, expiredTime, checkedTime, todayMeetings, meetingsToSave;
                return team_notification_generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            meetingCache = undefined;
                            storageItem = localStorage.getItem(this._storageKey);
                            if (storageItem) {
                                jsonData = JSON.parse(storageItem);
                                expiredTime = jsonData.expiredTo;
                                checkedTime = new Date();
                                if (expiredTime < checkedTime) {
                                    localStorage.removeItem(this._storageKey);
                                    meetingCache = undefined;
                                }
                                else {
                                    meetingCache = jsonData.meetings.map(function (m) {
                                        return team_notification_assign(team_notification_assign({}, m), { startTime: new Date(m.startTime) });
                                    });
                                }
                            }
                            if (!!meetingCache) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getTodayCalander()];
                        case 1:
                            todayMeetings = _a.sent();
                            if (todayMeetings) {
                                meetingsToSave = {
                                    expiredTo: Date.now() + this._storageTimToLive,
                                    meetings: todayMeetings
                                };
                                meetingCache = todayMeetings;
                                localStorage.setItem(this._storageKey, JSON.stringify(meetingsToSave));
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/, meetingCache];
                    }
                });
            });
        };
        return TeamNofifier;
    }(notifier_base));


    ;// CONCATENATED MODULE: ./components/notifications/main.ts


    var NotifierHelper = /** @class */ (function () {
        function NotifierHelper() {
        }
        NotifierHelper.prototype.StartNotify = function () {
            var listNotifications = [new TeamNofifier(), new paas_portal_notification()];
            listNotifications.forEach(function (notifier) {
                notifier.Start();
            });
        };
        return NotifierHelper;
    }());


    ;// CONCATENATED MODULE: ./app-main.ts

    window.addEventListener('load', function () {
        setTimeout(function () {
            console.log('start version 3');
            var notifierHelper = new NotifierHelper();
            notifierHelper.StartNotify();
        }, 1000);
    });

    /******/
})()
    ;