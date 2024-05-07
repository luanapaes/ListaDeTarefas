import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.interface';
import { json } from 'body-parser';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>([this.#parseItem()]);
  getListItems = this.#setListItems.asReadonly();

  #parseItem(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public getInputAndAddItem(value: IListItems){
    localStorage.setItem('@my-list', JSON.stringify([value])
    )
  }
}
