import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../../services/orders.service';
import { environment } from '../../../../../../environments/environment';
import { FileItem, FileUploader } from "ng2-file-upload";

@Component({
    selector: 'order-img',
    templateUrl: './order-image.component.html',
    styleUrls: ['./order-image.component.css']
})

export class OrderImageComponent implements OnInit {

    @Input() order_id: number
    @Input() url: string

    load: boolean = false
    env: string
    image_url: string

    public uploader:FileUploader = new FileUploader({
		allowedMimeType: ['image/png', 'image/jpeg'],
		maxFileSize: 1024000,
		autoUpload: false,
		isHTML5: true,
		method: 'POST',
		itemAlias: 'photo',
		authToken: sessionStorage.getItem("adminToken")
    });
    
    constructor(
        private ordersService: OrdersService
        ) {

            this.env = "../../../assets/images/orders/"
            
            setTimeout(() => {
                this.load = true
                this.image_url = this.url
            }, 300)


    } 

    ngOnInit() {

        // Upload error notifications
		this.uploader.onWhenAddingFileFailed = (item, filter: any, options: any) => {
            if (item.size > 1024000){}
			if(this.uploader.options.allowedMimeType.indexOf(item.type) == -1){}
        };
        
        // Upload file to server instantly (when user selects it)
		this.uploader.onAfterAddingFile = (item :FileItem) => {
            item.url = environment.serverUrl + `/order-photo/${this.order_id}`;
            
			item.upload();
			this.uploader = this.uploader;
        };
        
        // When file is uploaded to the server
		this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {() => {}}
		this.uploader.onErrorItem = (e) => { this.uploader = this.uploader; }
    }

    removePhoto(){
		this.ordersService.removeOrderPhoto(this.order_id).subscribe( e => {})
    }
    
}