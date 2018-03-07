import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Navbar } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { GlobalFunction } from '../../providers/global-function';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { INotice } from '../../models/notice.m';


@IonicPage()
@Component({
  selector: 'page-howtouse',
  templateUrl: 'howtouse.html',
})
export class HowtousePage {

  @ViewChild(Navbar) navbar: Navbar;

  selectedItem = null;

  notices: Observable<INotice[]>;

  constructor(
    private afDB: AngularFireDatabase,
    private translate: TranslateService,
    private element: ElementRef,
    private globalFunction: GlobalFunction
  ) {}

  ionViewDidLoad() {
    this.navbar.backButtonClick = (e:UIEvent) => {
      this.globalFunction.moveBack();
    }

    this.loadData();
  }

  ionViewDidLeave() {
  }

  swipeEvent(ev) {
    if (ev.direction == 4) {
      this.globalFunction.moveBack();
    }
  }

  loadData() {
    const itemsRef = this.afDB.list('/usage');

    this.notices = itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ ...c.payload.val(), expanded: false }));
    });
  }

  expandItem(item) {
    item.expanded = !item.expanded;
    if (item.expanded) {
      let strHeight = this.element.nativeElement.querySelector('#'+item.idx+'>p').offsetHeight + "px";
      item.style = {'max-height': strHeight};
    } else {
      item.style = {'max-height': '0'};
    }

    if (this.selectedItem != item && this.selectedItem != null) {
      this.selectedItem.expanded = false;
      this.selectedItem.style = {'max-height': '0'};
    }
    this.selectedItem = item;
  }
}
