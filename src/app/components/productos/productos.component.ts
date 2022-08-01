import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Productos } from 'src/app/models/productos.models';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [ProductosService]

})
export class ProductosComponent implements OnInit {

  public productoModelGet: Productos;
  public productoModelPost: Productos;
  public productoModelGetId: Productos;
  public token;
  public search;

  constructor(private _productosService: ProductosService,private _usuarioService: UsuarioService) { 
    this.productoModelPost = new Productos('','',0,0);
    this.productoModelGetId = new Productos('','',0,0);

    this.token = this._productosService.obtenerToken();

  }

  ngOnInit(): void {
    this.getProductos();
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

  postProductos(){
    this._productosService.agregarProductos(this.productoModelPost).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);
      }
    )

  }


  getProductosId(idProducto){
    this._productosService.obtenerProductosId(idProducto).subscribe(
      (response) => {
        console.log(response);
        this.productoModelGetId = response.producto;

      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }
  

  putProductos(){
    this._productosService.editarProductos(this.productoModelGetId).subscribe(
      (response)=>{
        
        console.log(response);
        this.getProductos()
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  deleteProductos(idProducto) {
    Swal.fire({
      title: '¿Estas Seguro que quieres eliminar este Producto?',
      text: "¡Esto no puede revertirse!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5271FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
    this._productosService.eliminarProductos(idProducto).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
    Swal.fire(
      'Eliminado',
      'El Producto ha sido eliminado con éxito',
      'success'
      
    )
  }
})
  }

}
