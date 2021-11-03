import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { breadcrumbConfig } from "./config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public config = breadcrumbConfig;
  public advertisersConfig = this.config.advertisers;
  public campaignConfig = this.config.campaigns;
  public datepickerConfig = this.config.datePicker;
  public advertisersDropdownStyles = "";
  public campaignsDropdownStyles = "";
  public daterangePickerStyles = "";

  breadcrumbsForm: FormGroup;
  advertisers: any[] = [
    { id: "adv001", name: "Adv One", group: "Select ALL" },
    { id: "adv002", name: "Adv Two", group: "Select ALL" },
    { id: "adv003", name: "Adv Three", group: "Select ALL" },
    { id: "adv004", name: "Adv Four", group: "Select ALL" },
    { id: "adv005", name: "Adv Five", group: "Select ALL" },
    { id: "adv006", name: "Adv Six", group: "Select ALL" },
    { id: "adv007", name: "Adv Seven", group: "Select ALL" },
    { id: "adv008", name: "Adv Eight", group: "Select ALL" }
  ];
  campaigns: any[] = [
    { id: "cmp001", name: "Cmpn One", group: "Select ALL" },
    { id: "cmp002", name: "Cmpn Two", group: "Select ALL" },
    { id: "cmp003", name: "Cmpn Three", group: "Select ALL" },
    { id: "cmp004", name: "Cmpn Four", group: "Select ALL" },
    { id: "cmp005", name: "Cmpn Five", group: "Select ALL" },
    { id: "cmp006", name: "Cmpn Six", group: "Select ALL" },
    { id: "cmp007", name: "Cmpn Seven", group: "Select ALL" },
    { id: "cmp008", name: "Cmpn Eight", group: "Select ALL" }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.breadcrumbsForm = this.fb.group({
    //   selectAllAdvertiserIds: false,
    //   selectedAdvertiserIds: [],
    //   selectedCampaignIds: []
    // });

    this.appendStyles();
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

  choosedDate(a, b, c) {
    console.log("choosedDate", a, b, c);
  }
}
