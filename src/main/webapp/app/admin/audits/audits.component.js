"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_1 = require("../../shared");
var AuditsComponent = (function () {
    function AuditsComponent(jhiLanguageService, auditsService, parseLinks, paginationConfig, datePipe) {
        this.jhiLanguageService = jhiLanguageService;
        this.auditsService = auditsService;
        this.parseLinks = parseLinks;
        this.paginationConfig = paginationConfig;
        this.datePipe = datePipe;
        this.jhiLanguageService.setLocations(['audits']);
        this.itemsPerPage = shared_1.ITEMS_PER_PAGE;
        this.page = 1;
        this.reverse = false;
        this.orderProp = 'timestamp';
    }
    AuditsComponent.prototype.getAudits = function () {
        return this.sortAudits(this.audits);
    };
    AuditsComponent.prototype.loadPage = function (page) {
        this.page = page;
        this.onChangeDate();
    };
    AuditsComponent.prototype.ngOnInit = function () {
        this.today();
        this.previousMonth();
        this.onChangeDate();
    };
    AuditsComponent.prototype.onChangeDate = function () {
        var _this = this;
        this.auditsService.query({ page: this.page - 1, size: this.itemsPerPage,
            fromDate: this.fromDate, toDate: this.toDate }).subscribe(function (res) {
            _this.audits = res.json();
            _this.links = _this.parseLinks.parse(res.headers.get('link'));
            _this.totalItems = +res.headers.get('X-Total-Count');
        });
    };
    AuditsComponent.prototype.previousMonth = function () {
        var dateFormat = 'yyyy-MM-dd';
        var fromDate = new Date();
        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
        }
        else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }
        this.fromDate = this.datePipe.transform(fromDate, dateFormat);
    };
    AuditsComponent.prototype.today = function () {
        var dateFormat = 'yyyy-MM-dd';
        // Today + 1 day - needed if the current day must be included
        var today = new Date();
        today.setDate(today.getDate() + 1);
        var date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.toDate = this.datePipe.transform(date, dateFormat);
    };
    AuditsComponent.prototype.sortAudits = function (audits) {
        var _this = this;
        audits = audits.slice(0).sort(function (a, b) {
            if (a[_this.orderProp] < b[_this.orderProp]) {
                return -1;
            }
            else if ([b[_this.orderProp] < a[_this.orderProp]]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return this.reverse ? audits.reverse() : audits;
    };
    return AuditsComponent;
}());
AuditsComponent = __decorate([
    core_1.Component({
        selector: 'jhi-audit',
        templateUrl: './audits.component.html'
    })
], AuditsComponent);
exports.AuditsComponent = AuditsComponent;
