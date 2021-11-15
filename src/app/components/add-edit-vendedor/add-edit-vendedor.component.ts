import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Localidad } from 'src/app/models/localidad';
import { Vendedor } from 'src/app/models/vendedore';
import { LocalidadService } from 'src/app/services/localidad.service';
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
    private vendedorService: VendedorService,
    private localidadService: LocalidadService,
    private router: Router,
    private aRouter: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear - 66, currentMonth, currentDay + 1);
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDay);

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
      this.vendedorService.getImage(this.idVendedor).subscribe(e => {this.createImageFromBlob(e)})
    }
  }

  getVendedor() {
    this.vendedorService.getVendedores()
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
    this.localidadService.getLocalidades().subscribe(data => this.localidades = data)
  }

  addVendedor(vendedor: Vendedor) {
    if(!this.myForm.valid)return;
    this.vendedorService.addVendedor(vendedor).subscribe()
    this.router.navigate(['/'])
  }

  putVendedor(id: number, vendedor: Vendedor) {
    if(!this.myForm.valid) return;
    this.vendedorService.putVendedor(id, vendedor).subscribe()
    if(this.selectedFile) {
      this.vendedorService.postImage(id, this.selectedFile.file).subscribe()
    }
    this.router.navigate(['/'])
  }

  selectImage(event: any) {
    const reader = new FileReader();
    this.file = event.target.files[0];

    if(this.file) {
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.selectedFile = new ImageSnippet(event.target.result, this.file);
        this.avatarImg = reader.result;
      }
    }
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
}
