import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=> ImageListSelectComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>ImageListSelectComponent),
      multi:true
    }
  ]
})
export class ImageListSelectComponent implements OnInit, ControlValueAccessor {

  @Input() title="选择：";
  @Input() cols="6";
  @Input() rowHeight="44px";
  @Input() items:Array<string>=[];
  @Input() itemWidth = "40px";
  @Input() useSvgIcon = false ;
  private propagationChange = (_:any) =>{};

  private  selected;

  constructor() { }

  writeValue(obj: any): void{
    //将form的操作返回到本组件
    this.selected = obj ;
  }

  registerOnChange(fn: any): void{
    //将本组件的变化告诉form表单
    this.propagationChange = fn ;
  };

  registerOnTouched(fn: any): void{};
  
  onChange(i){
    this.selected = this.items[i];
    //此操作是将本组件的变化返回给form
    this.propagationChange(this.selected)
  }

  validate(c:FormControl):{[key:string]:any}{
    return this.selected ? null : {
      imageListInvalid:true
    }
  }

  ngOnInit() {}

}
