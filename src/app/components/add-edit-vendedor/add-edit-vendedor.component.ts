import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { Localidad } from 'src/app/models/localidad';
import { Vendedor } from 'src/app/models/vendedore';
import { VendedorService } from 'src/app/services/vendedor.service';

class ImageSnippet {
  constructor( public src: string, public file: File){}
}

@Component({
  selector: 'app-add-edit-vendedor',
  templateUrl: './add-edit-vendedor.component.html',
  styleUrls: ['./add-edit-vendedor.component.css']
})

export class AddEditVendedorComponent implements OnInit {
  myForm!: FormGroup;
  action: string = 'Crear';
  localidades: Localidad[] = [];
  minDate!: Date;
  maxDate!: Date;
  idVendedor: number = this.aRouter.snapshot.params['id'];
  vendedorData?: Vendedor;
  file!: File;
  selectedFile!: ImageSnippet;
  avatarImg!: any;

  constructor(
    private formBuilder: FormBuilder,
    private _vendedorService: VendedorService,
    private router: Router,
    private aRouter: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 65, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);

    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      usuarioLogin: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      localidadId: [null, Validators.required],
      habilitado: false,
      observaciones: [''],
    })
  }

  ngOnInit(): void {
    this.getLocalidades()
    if(this.idVendedor) {
      this.getVendedor()
      this.action = 'Editar'
      this._vendedorService.getImage(this.idVendedor).subscribe(e => {this.createImageFromBlob(e)})
    }
  }

  getVendedor() {
    this._vendedorService.getVendedores()
      .pipe(tap(v => {
        this.vendedorData = v.filter(v => v.id == this.idVendedor)[0]
        this.myForm.patchValue({
          nombre: this.vendedorData.nombre,
          usuarioLogin: this.vendedorData.usuarioLogin,
          fechaNacimiento: this.vendedorData.fechaNacimiento,
          localidadId: this.vendedorData.localidad.id,
          habilitado: this.vendedorData.habilitado,
          observaciones: this.vendedorData.observaciones
        })
      }))
      .subscribe()
  }

  getLocalidades() {
    this._vendedorService.getLocalidades().subscribe(data => this.localidades = data)
  }

  addVendedor(vendedor: Vendedor) {
    if(this.myForm.status === 'INVALID')return;
    this._vendedorService.addVendedor(vendedor).subscribe()
    this.router.navigate(['/'])
  }

  putVendedor(id: number, vendedor: Vendedor) {
    if(this.myForm.status === 'INVALID') return;
    this._vendedorService.putVendedor(id, vendedor).subscribe()
    this.router.navigate(['/'])
  }

  selectImage(event: any) {
    this.file = event.target.files[0];
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.avatarImg = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

  postImage(id: number) {
    const reader = new FileReader()

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, this.file);

      this._vendedorService.postImage(id, this.selectedFile.file).subscribe()
    })
    reader.readAsDataURL(this.file);
  }

}
