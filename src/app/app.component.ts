import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from "moment";

import { breadcrumbConfig } from "./config";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private dateFormat = "DD-MM-YYYY";
  public config = breadcrumbConfig;
  public advertisersConfig = this.config.advertisers;
  public campaignConfig = this.config.campaigns;
  public datepickerConfig = this.config.datePicker;
  public advertisersDropdownStyles = "";
  public campaignsDropdownStyles = "";
  public daterangePickerStyles = "";

  breadcrumbsForm: FormGroup;
  advertisers: any[] = [];
  selectedAdvertisers: any[] = [];
  campaigns: any[] = [];
  selectedCampaigns: any[] = [];
  selectedDateRange: object = {
    [this.datepickerConfig.startKey || "start"]: moment().subtract(1, "months"),
    [this.datepickerConfig.endKey || "end"]: moment()
  };
  breadcrumbsReqPayload: object = {};

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.getAdvertisers();
    this.appendStyles();
  }

  getAdvertisers(): void {
    this.appService.getAdvertisers().subscribe((advertisers) => {
      this.advertisers = advertisers;
      this.selectedAdvertisers = [advertisers[0].id];
      this.updateReqPayload();
      console.log("breadcrumbsReqPayload", this.breadcrumbsReqPayload);
      this.getCampaigns();
    });
  }

  getCampaigns(): void {
    this.selectedCampaigns = [];
    this.appService
      .getCampaigns(this.breadcrumbsReqPayload)
      .subscribe((campaigns) => {
        console.log("Got New Campaigns");
        this.campaigns = campaigns;
      });
  }

  onAdvertisersSelectionChange(): void {
    this.getCampaigns();
    this.updateReqPayload();
    console.log("breadcrumbsReqPayload", this.breadcrumbsReqPayload);
  }

  onCampaignsSelectionChange(): void {
    this.updateReqPayload();
    console.log("breadcrumbsReqPayload", this.breadcrumbsReqPayload);
  }

  dateRangeUpdated(): void {
    this.getCampaigns();
    this.updateReqPayload();
    console.log("breadcrumbsReqPayload", this.breadcrumbsReqPayload);
  }

  updateReqPayload(): void {
    this.breadcrumbsReqPayload = {
      startDate: this.selectedDateRange[
        this.datepickerConfig.startKey || "start"
      ].format(this.dateFormat),
      endDate: this.selectedDateRange[
        this.datepickerConfig.endKey || "end"
      ].format(this.dateFormat),
      ...(this.selectedAdvertisers.length > 0 && {
        advertiserUIds: this.selectedAdvertisers
      }),
      ...(this.selectedCampaigns.length > 0 && {
        campaignUIds: this.selectedCampaigns
      })
    };
  }

  appendStyles() {
    const styleNode = document.createElement("style");
    styleNode.type = "text/css";
    // browser detection (based on prototype.js)
    if (!!(window.attachEvent && !window.opera)) {
      styleNode.styleSheet.cssText = this.getBreadcrumbStyles();
    } else {
      var styleText = document.createTextNode(this.getBreadcrumbStyles());
      styleNode.appendChild(styleText);
    }
    document.querySelector(".breadcrumbs-form-group").appendChild(styleNode);
  }

  getBreadcrumbStyles() {
    this.advertisersDropdownStyles = this.getMultiSelectDropdownStyles(
      "advertisers",
      this.advertisersConfig.styles
    );
    this.campaignsDropdownStyles = this.getMultiSelectDropdownStyles(
      "campaigns",
      this.campaignConfig.styles
    );
    this.daterangePickerStyles = this.getDaterangePickerStyles(
      "daterangePicker",
      this.datepickerConfig.stylesConfig
    );

    return `
      .breadcrumbs-form-group {
        display: inline-flex;
        background: #fff;
        padding: 10px 10px 10px 0px;
      }
      .breadcrumbs-form-group > * {
        margin-left: 10px;
      }
      .breadcrumbs-form-group .daterangePicker ngx-daterangepicker-material > .md-drppicker .buttons .buttons_input button {
        margin-left: 10px;
      }
      .breadcrumbs-form-group .daterangePicker ngx-daterangepicker-material > .md-drppicker .buttons .buttons_input button.btn.clear {
        position: relative;
        padding-right: 30px;
      }
      .breadcrumbs-form-group .daterangePicker ngx-daterangepicker-material > .md-drppicker .buttons .buttons_input button.btn.clear svg {
        position: absolute;
        top: -3px;
      }
      ${this.advertisersDropdownStyles}
      ${this.campaignsDropdownStyles}
      ${this.daterangePickerStyles}
    }`;
  }

  getMultiSelectDropdownStyles(rootClass, styles) {
    const {
      dropDown,
      selected,
      unselected,
      selectAllButton,
      unselectAllButton,
      arrow
    } = styles || {};
    let dropdownStyles = `.breadcrumbs-form-group .ng-select.${rootClass} .ng-select-container { `;
    let arrowStyles = `.breadcrumbs-form-group .ng-select.${rootClass} .ng-select-container .ng-arrow {`;
    let selectAllButtonStyles = `.breadcrumbs-form-group .ng-select.${rootClass} .ng-select-container .ng-select-all {`;
    let unselectAllButtonStyles = `.breadcrumbs-form-group .ng-select.${rootClass} .ng-select-container .ng-clear {`;
    let unselectedStyles = `.breadcrumbs-form-group .ng-select.${rootClass} .ng-dropdown-panel .ng-dropdown-panel-items .scrollable-content .ng-option {`;
    let selectedStyles = `.breadcrumbs-form-group .ng-select.${rootClass} .ng-dropdown-panel .ng-dropdown-panel-items .scrollable-content .ng-option.ng-option-selected {`;

    dropdownStyles = this.getStylesForSection(dropDown, dropdownStyles);
    arrowStyles = this.getStylesForSection(arrow, arrowStyles);
    selectAllButtonStyles = this.getStylesForSection(
      selectAllButton,
      selectAllButtonStyles
    );
    unselectAllButtonStyles = this.getStylesForSection(
      unselectAllButton,
      unselectAllButtonStyles
    );
    unselectedStyles = this.getStylesForSection(unselected, unselectedStyles);
    selectedStyles = this.getStylesForSection(selected, selectedStyles);

    return `
      ${dropdownStyles}
      ${arrowStyles}
      ${selectAllButtonStyles}
      ${unselectAllButtonStyles}
      ${selectedStyles}
      ${unselectedStyles}
    `;
  }

  getDaterangePickerStyles(rootClass, styles) {
    const { calendar, inputBox } = styles;
    let inputBoxStyles = `.breadcrumbs-form-group .daterangePicker > input { `;
    let calendarStyles = `.breadcrumbs-form-group .daterangePicker ngx-daterangepicker-material > .md-drppicker { margin-top: 5px;`;
    inputBoxStyles = this.getStylesForSection(inputBox, inputBoxStyles);
    calendarStyles = this.getStylesForSection(calendar, calendarStyles);

    return `
      ${inputBoxStyles}
      ${calendarStyles}
    `;
  }

  getStylesForSection(section = {}, initialValue) {
    initialValue = Object.keys(section).reduce((initialValue, key) => {
      initialValue += ` ${key}: ${section[key]};`;
      return initialValue;
    }, initialValue);
    return initialValue + " }";
  }
}
