import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild, inject, signal } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef; // acessa o elemento HTML que possui esse identificador
  
  @Output() public outputAddItem = new EventEmitter<IListItems>();
  
  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges(); // monitora a mudança de valor dentro do input
      this.inputText.nativeElement.value = ''; // limpa o input após o "envio"

      // gera o id dos items
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;

      // envia para fora estas propriedades
      this.outputAddItem.emit({
        id,
        checked: false,
        value
      })

      return this.inputText.nativeElement.focus(); // após o "envio" o foco volta para o input.
    }
  }
}
