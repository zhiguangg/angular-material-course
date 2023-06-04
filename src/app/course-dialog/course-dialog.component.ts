import {Component, Inject, OnInit, ViewEncapsulation, inject} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialog,  MatDialogConfig,  MatDialogRef} from '@angular/material/dialog';
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  description: string;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) course: Course,
    @Inject(MatDialogRef) private matDialogRef) {

  }

    ngOnInit() {
      this.form = this.fb.group({
        description: ['', Validators.required],
        category: ['BEGINNER', Validators.required],
        releasedAt: [new Date(), Validators.required],
        longDescription: ['', Validators.required]
      })
    }

    save() {
      this.matDialogRef.close(this.form.value);
    }

    close() {
      this.matDialogRef.close();
    }
}

export function openCourseDialog(dialog: MatDialog, course: Course) {

  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';
  config.data = { ...course };

  const dialogRef = dialog.open(CourseDialogComponent, config);

  return dialogRef.afterClosed();
}

