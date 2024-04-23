import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { BalanceService } from '../../core/services/http-request/balance.service';
import { Validators } from '../../../utils/custom-validators';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html'
})
export class BalancePage implements OnInit {
  title: string = 'Consulta de saldo';
  numberForm: FormGroup;
  selfConsul: string = null;
  data:any = false;

  constructor(
    private balanceServ: BalanceService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storageServ: StorageService
  ) { }

  ngOnInit() {
    this.formBuil();
    this.storageServ.getPNumber().then(pn => {
      if(!!pn){
        this.selfConsul = pn;
        this.submit({phone_number: pn});
      }
    })
  }

  formBuil(){
    this.numberForm = this.formBuilder.group({
      phone_number: ['', Validators.phoneNumber]
    });
  }

  async processRejected(status: string){
    let msj = '';
    switch (status) {
      case 'Active':
        msj = 'No cuentas con un paquete activo, por favor realiza una recarga';
      break;
      case 'Suspend':
        msj = 'La linea ha sido suspendida, favor de comunicarse con su distribuidor';
      break;
      case 'Barring':
        msj = 'Estimado usuario favor de insertar su sim en un equipo compatible con nuestra red';
      break;
      case 'Idle':
        msj = 'No se ha activado ningun plan, favor de comunicarse con su distribuidor';
      break;
      case 'Unanswered':
        msj = 'La linea no ha sido registrada, favor de comunicarse con su distribuidor';
      break;
      default:
        msj = 'Error de comunicación, favor de intentarlo mas tarde';
    }
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: msj,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async submit(auto:any = false){
    if(this.numberForm.valid || auto){
      const value = auto? auto : this.numberForm.value;
      const loading = await this.loadingCtrl.create({message: 'Un momento'});
      await loading.present();
      this.balanceServ.getBalance(value).then(async res => {
        loading.dismiss();
        if(res.status == 'Active' && res.expire_date != 0){
          this.renderReport(res, value.phone_number);
          this.numberForm.reset();
        }else{
          this.processRejected(res.status)
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

  formatDate(date: string){
    return `${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)}`
  }

  getPercent(total: number, unused: number){
    return total? ((total - unused) / total).toFixed(2) : 1;
  }

  getDaysLeft(dateEnd: string){
    let ini = new Date().getTime();
    let end = new Date(dateEnd).getTime();

    var diff = end - ini;
    return Math.ceil(diff/(1000*60*60*24));
  }

  renderReport(data: any, pn: string){
    data.percentData = this.getPercent(data.data.total, data.data.unused);
    data.percentDataThr = this.getPercent(data.data_thr.total, data.data_thr.unused);
    data.percentDataFree = this.getPercent(data.data_free.total, data.data_free.unused);
    data.percentMin = this.getPercent(data.min.total, data.min.unused);
    data.percentSms = this.getPercent(data.sms.total, data.sms.unused);
    
    data.daysLeft = this.getDaysLeft(this.formatDate(data.expire_date));
    data.phone_number = pn;
    this.data = data;
  }

  async savePNumber(pn: string){
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '¿Quieres guardar este número? si existe alguno este lo reemplazara ',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.storageServ.setPNumber(pn);
            this.selfConsul = pn;
          }
        },{
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async delePNumber(){
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '¿Quieres eliminar este número?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.storageServ.delPNumber();
            this.selfConsul = null;
          }
        },{
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
}
