import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor() {}

  getAdvertisers(): Observable<any[]> {
    const advertisers = of([
      { id: "adv001", name: "Adv One", group: "Select ALL", selected: true },
      { id: "adv002", name: "Adv Two", group: "Select ALL" },
      { id: "adv003", name: "Adv Three", group: "Select ALL" },
      { id: "adv004", name: "Adv Four", group: "Select ALL" },
      { id: "adv005", name: "Adv Five", group: "Select ALL" },
      { id: "adv006", name: "Adv Six", group: "Select ALL" },
      { id: "adv007", name: "Adv Seven", group: "Select ALL" },
      { id: "adv008", name: "Adv Eight", group: "Select ALL" }
    ]);
    return advertisers;
  }

  getCampaigns(req): Observable<any[]> {
    console.log("req payload for Campaigns", req); // this request contains selected advertiserIds, startDate and endDate to fetch campains
    const campaigns = of([
      { id: "cmp001", name: "Cmpn One", group: "Select ALL" },
      { id: "cmp002", name: "Cmpn Two", group: "Select ALL" },
      { id: "cmp003", name: "Cmpn Three", group: "Select ALL" },
      { id: "cmp004", name: "Cmpn Four", group: "Select ALL" },
      { id: "cmp005", name: "Cmpn Five", group: "Select ALL" },
      { id: "cmp006", name: "Cmpn Six", group: "Select ALL" },
      { id: "cmp007", name: "Cmpn Seven", group: "Select ALL" },
      { id: "cmp008", name: "Cmpn Eight", group: "Select ALL" }
    ]);
    return campaigns;
  }
}
