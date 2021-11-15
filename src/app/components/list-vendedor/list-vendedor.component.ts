import { Component, OnInit } from '@angular/core';
import { Vendedor } from 'src/app/models/vendedore';
import { VendedorService } from 'src/app/services/vendedor.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../shared/message/message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-vendedor',
  templateUrl: './list-vendedor.component.html',
  styleUrls: ['./list-vendedor.component.css']
})

export class ListVendedorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'usuarioLogin', 'localidad', 'habilitado', 'fechaNacimiento', 'observaciones', 'acciones' ];
  vendedores: Vendedor[] = []
  showDialog: boolean = false;

  constructor(private _vendedorService: VendedorService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllVendedores()
  }

  getAllVendedores() {
    this._vendedorService.getVendedores()
    .subscribe(data => this.vendedores = data);
  }

  openDialog(id: number): void {
      const dialogRef = this.dialog.open(MessageComponent, {
        width: '350px',
        data: {message: 'Esta seguro que desea eliminar el vendedor?'},
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === 'aceptar') {
          this._vendedorService.deleteVendedor(id).subscribe(v =>  this.vendedores = this.vendedores.filter(v => v.id !== id))
        }
      });
    }
}

