import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from "@angular/material/table";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize, combineAll, mergeAll} from 'rxjs/operators';
import {merge, fromEvent, Subscription, throwError, Observable, forkJoin, combineLatest} from "rxjs";
import { Lesson } from '../model/lesson';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    lessons: Lesson[];

    subs: Subscription;

    loading = false;

    displayedColumns = ['select', 'seqNo', 'description', 'duration'];
    expandedLesson: Lesson = null;

    selection = new SelectionModel<Lesson>(true, []);

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {

    }

    ngOnInit() {
        this.course = this.route.snapshot.data["course"];
        this.loadLessonsPage();
    }

    loadLessonsPage() {
      this.loading = true;
      this.coursesService.findLessons(
          this.course.id,
          this.sort?.direction ?? "asc",
          this.paginator?.pageIndex ?? 0,
          this.paginator?.pageSize ?? 3,
          this.sort?.active ?? "seqNo")
          .pipe(
              tap(lessons => this.lessons = lessons),
              catchError(err => {
                  console.log("Error loading lessons", err);
                  alert("Error loading lessons.");
                  return throwError(err);

              }),
              finalize(() => this.loading = false)
          )
          .subscribe();
    }

    ngAfterViewInit() {
      //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      //merge(this.sort.sortChange, this.paginator.page)
      this.paginator.page
          .pipe(
              tap(() => this.loadLessonsPage())
          )
          .subscribe();

      this.sort.sortChange
          .pipe(
              tap(() => this.loadLessonsPage())
          )
          .subscribe();
    }
    onToggleLesson(lesson: Lesson) {
      if (lesson == this.expandedLesson) {
        this.expandedLesson = null;
      } else {
        this.expandedLesson = lesson;
      }
    }

    onLessonToggle(lesson: Lesson) {
      this.selection.toggle(lesson);
      console.log('isSelected' + this.selection.isSelected);
    }

    isAllSelected() {
      return this.selection.selected.length == this.lessons.length;
    }
    toggleAll() {
      if (this.isAllSelected()) {
        this.selection.clear();
      } else {
        this.selection.select(...this.lessons);
      }
    }
    ngOnDestroy() {
      this.subs.unsubscribe();
    }

}
