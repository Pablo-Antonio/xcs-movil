import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { CommentService } from '../../core/services/http-request/comment.service';
import { Validators } from '../../../utils/custom-validators';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  providers: [FormBuilder]
})
export class InfoPage implements OnInit {
  title: string = 'Más información';
  commentForm: FormGroup;

  constructor(
    private commentServ: CommentService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.formBuil()
  }

  formBuil(){
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.require],
      subject: ['', Validators.require],
      email: ['', Validators.email]
    });
  }

  async submit(){
    if(this.commentForm.valid){
      const loading = await this.loadingCtrl.create({message: 'Un momento'});
      await loading.present();
      this.commentServ.setComment(this.commentForm.value).then(async res => {
        loading.dismiss();
        if(res.status){
          const alert = await this.alertCtrl.create({
            header: 'Exito',
            message: 'Los datos se han guardado correctamente',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
          });
          await alert.present();
          this.commentForm.reset();
        }else{
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Ha ocurrido un error al grabar los datos',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
          });
          await alert.present();
        }
      }).catch(async err => {
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Alerta',
          message: 'Ocurrio un error al conectar con el servidor',
          buttons: [
            {
              text: 'Reintentar',
              handler: () => this.submit()
            },{
              text: 'Ok',
              role: 'cancel'
            }
          ]
        });
        await alert.present();
        console.log(err);
      });
    }
  }

  openAdd(){
    const browser = this.iab.create('https://addinteli.com.mx/');
    browser.show();
  }
}
