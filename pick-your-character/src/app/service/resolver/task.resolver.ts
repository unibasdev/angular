import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {ModelService} from "../model.service";
import {C} from "../c";
import {Task} from "../../model/tasks/task";
import {TaskDaoService} from "../dao/task-dao.service";

@Injectable({
  providedIn: 'root'
})
export class TaskResolver implements Resolve<Task | undefined> {
  constructor(
    private model: ModelService,
    private taskDao: TaskDaoService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task | undefined> {
    const taskId = route.params['id'];
    return this.taskDao.get(taskId).pipe(
      tap(task => {
        if (task) {
          this.model.putBean(C.SELECTED_TASK, task);
        }
      })
    );
  }
}
