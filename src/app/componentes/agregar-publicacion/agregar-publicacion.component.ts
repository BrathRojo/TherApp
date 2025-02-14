import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionService } from '../../services/publicacion.service';

@Component({
  selector: 'app-agregar-publicacion',
  templateUrl: './agregar-publicacion.component.html',
  styleUrl: './agregar-publicacion.component.scss'
})
export class AgregarPublicacionComponent {
      publicacionForm: FormGroup;
      
        constructor(private fb: FormBuilder, private router: Router, private pubService: PublicacionService) {
          this.publicacionForm = this.fb.group({
            publicacion: ['', Validators.required],
            archivo: ['']
          });
        }
        
        onSubmit(): void {
          console.log('Publicando', this.publicacionForm.value);
          
          if (this.publicacionForm.valid) {
            const contenidos = [
              {
                tipo: 'texto',
                url: ''
              }
            ];
            // contenidos.append('publicacion', JSON.stringify(contenidos));

            // const formData = new FormData();
            // formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
            // if (this.selectedFile) {
            //   formData.append('foto', this.selectedFile);
            // }

            const publicacion = {
              publicacion: this.publicacionForm.get('publicacion')?.value,
              fechaPublicacion: new Date(),
              contenidos: contenidos
            };

            this.pubService.publicar(publicacion).subscribe(
              response => {
                console.log('Publicacion añadida correctamente', response);

                this.router.navigate(['/home']);
              },
              error => {
                console.error('Error subiendo la publicacion', error);
              }
            );
          }
        }

}