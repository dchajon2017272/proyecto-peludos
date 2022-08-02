import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Productos } from 'src/app/models/productos.models';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.scss'],
  providers: [ProductosService]

})
export class VerProductoComponent implements OnInit {
  public productoModelGet: Productos;

  product: any;
  load: boolean = false; 
  public token;

  public productoModelGetId: Productos;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _productosService: ProductosService
  ) { 
    this.token = this._productosService.obtenerToken();
  }

  ngOnInit(): void {
    
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      console.log(dataRuta.get('idProducto'));
      this.getProductoId(dataRuta.get('idProducto'));
    })
    this.getProductos();
  }

  getProductoId(idProducto){
    this._productosService.obtenerProductosId(idProducto).subscribe({
      next:(response:any)=>{
        this.product = response.producto;
        this.load = true;
      },
      error:(err)=>alert(err.error.mensaje)
    })
  }

  getProductos() {
    
    this._productosService.obtenerProductos(this.token).subscribe(
      (response)=>{
        this.productoModelGet = response.productos;
        console.log(this.productoModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )

  }


}
