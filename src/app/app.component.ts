import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, ModelRestaurantFilterInput } from './API.service';
import { Restaurant, Addx } from '../types/restaurant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'amplify-angular-app';

  public createForm: FormGroup;

  public createAddx: FormGroup;

  addxList: Array<Addx>;

  /* declare restaurants variable */
  restaurants: Array<Restaurant>;

  constructor(
    private api: APIService,
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {

    console.log(this.restaurants);//*

    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      userId: ['', Validators.required]
    });

    const f: ModelRestaurantFilterInput = {
        userId: {
          eq: 'usera'
        }
    };

    this.api.ListRestaurants(f).then(event => {
      this.restaurants = event.items;
      console.log(this.restaurants);//*
    });

    this.createAddx = this.fb.group({
      ads: ['', Validators.required]
    });
    this.api.ListAddxs().then(event => {
      this.addxList = event.items;
    });

    /* subscribe to new restaurants being created */
    this.api.OnCreateRestaurantListener.subscribe( (event: any) => {

      const newRestaurant = event.value.data.onCreateRestaurant;
      this.restaurants = [newRestaurant, ...this.restaurants];
    });

    /* subscribe to new restaurants being created */
    this.api.OnCreateAddxListener.subscribe( (event: any) => {
      console.log(event)
      const newAddx = event.value.data.onCreateAddx;
      this.addxList = [newAddx, ...this.addxList];
    });
  }

  public onCreateAddx(addx: Addx): void {
    this.api.CreateAddx(addx).then(event => {
      console.log('addx created!');
      this.createAddx.reset();
    })
    .catch(e => {
      console.log('error creating addx...', e);
    });
  }

  public onCreate(restaurant: Restaurant): void {
    this.api.CreateRestaurant(restaurant).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }


}
