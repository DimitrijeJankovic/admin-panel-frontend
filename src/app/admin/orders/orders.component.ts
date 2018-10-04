import { Component, OnInit } from '@angular/core'
import { OrdersService, IOrder } from '../services/orders.service';
import { OrderItemsService } from '../services/order-items.service'
import { SidebarService } from '../services/sidebar.service'
import { environment } from '../../../environments/environment';
import { FileItem, FileUploader } from "ng2-file-upload";

@Component({
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit{
    
    ordersList: IOrder
    uploadItemlId :number
    env: string

    panelOpenState = false;

    public uploader:FileUploader = new FileUploader({
		allowedMimeType: ['image/png', 'image/jpeg'],
		maxFileSize: 1024000,
		autoUpload: false,
		isHTML5: true,
		method: 'POST',
		itemAlias: 'photo',
		authToken: sessionStorage.getItem("adminToken")
	});

    constructor(private ordersService: OrdersService,
                private orderItemsService: OrderItemsService,
                private sideBar: SidebarService) {

                    this.env = "../../../assets/images/order-items/" 
                } 

    ngOnInit() {
        this.sideBar.show()
        this.getAllOrders()

        // Upload error notifications
		this.uploader.onWhenAddingFileFailed = (item, filter: any, options: any) => {
            if (item.size > 1024000){}
			if(this.uploader.options.allowedMimeType.indexOf(item.type) == -1){}
        };
        
        // Upload file to server instantly (when user selects it)
		this.uploader.onAfterAddingFile = (item :FileItem) => {
            item.url = environment.serverUrl + `/order-item-photo/${this.uploadItemlId}`;
            
			item.upload();
			this.uploader = this.uploader;
        };
        
        // When file is uploaded to the server
		this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => { () => this.getAllOrders() }
		this.uploader.onErrorItem = (e) => { this.uploader = this.uploader; }
    }

    getAllOrders(){
        this.ordersService.getOrdersLeyaout().subscribe((prod: any) => {
            this.ordersList = JSON.parse(prod._body)
            console.log(this.ordersList);
            
        })
    }

    setUploadId(item_id) {
		this.uploadItemlId = item_id;
    }
    
    removePhoto(id: number){
		this.orderItemsService.deleteItemPhoto(id).subscribe( e => { this.getAllOrders() })
        
    }
}