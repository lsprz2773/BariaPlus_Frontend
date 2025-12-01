import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Modal} from '../../shared/modal';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: Modal) { }
  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params['login'] === 'true') {
        this.modalService.openModal();

        this.router.navigate([], {
          queryParams: {login : null},
          queryParamsHandling:  "merge"
        });
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
