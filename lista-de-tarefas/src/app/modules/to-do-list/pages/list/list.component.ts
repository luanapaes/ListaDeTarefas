import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.interface';
import { json } from 'body-parser';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, JsonPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parseItem());
  public getListItems = this.#setListItems.asReadonly();

  #parseItem(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')// traz como array de objetos
  }

  public getInputAndAddItem(value: IListItems){
    localStorage.setItem('@my-list', JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItem())
  }

  public deletarTodosItems(){
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItem())
  }

}
