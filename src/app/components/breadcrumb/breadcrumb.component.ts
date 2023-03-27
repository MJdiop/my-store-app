import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  pageName: string = ''
  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.url.subscribe((params) => {
      this.pageName = params[0].path.replace('-', ' ')
    })
  }
}
